terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
  }
  
  backend "s3" {
    bucket = "ai-redteam-terraform-state"
    key    = "state/terraform.tfstate"
    region = "us-east-1"
  }
}

# Configure AWS provider
provider "aws" {
  region = var.aws_region
}

# EKS Cluster variables
variable "cluster_name" {
  description = "Name of the EKS cluster"
  type        = string
  default     = "ai-redteam-cluster"
}

variable "cluster_version" {
  description = "Kubernetes version for the EKS cluster"
  type        = string
  default     = "1.24"
}

variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

# Create VPC for EKS cluster
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 3.0"

  name = "ai-redteam-vpc"
  cidr = var.vpc_cidr

  azs             = ["${var.aws_region}a", "${var.aws_region}b", "${var.aws_region}c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_nat_gateway   = true
  single_nat_gateway   = true
  enable_dns_hostnames = true

  tags = {
    "kubernetes.io/cluster/${var.cluster_name}" = "shared"
    Environment = "production"
    Project     = "AI-RedTeam"
  }

  public_subnet_tags = {
    "kubernetes.io/cluster/${var.cluster_name}" = "shared"
    "kubernetes.io/role/elb"                    = "1"
  }

  private_subnet_tags = {
    "kubernetes.io/cluster/${var.cluster_name}" = "shared"
    "kubernetes.io/role/internal-elb"           = "1"
  }
}

# Create EKS cluster
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 18.0"

  cluster_name    = var.cluster_name
  cluster_version = var.cluster_version

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  cluster_endpoint_private_access = true
  cluster_endpoint_public_access  = true

  # Node groups configuration
  eks_managed_node_groups = {
    main = {
      desired_size = 2
      min_size     = 2
      max_size     = 5

      instance_types = ["t3.medium"]
      capacity_type  = "ON_DEMAND"
      
      tags = {
        Environment = "production"
        Project     = "AI-RedTeam"
      }
    }
  }

  # Enable IAM OIDC provider for the EKS cluster
  enable_irsa = true

  tags = {
    Environment = "production"
    Project     = "AI-RedTeam"
  }
}

# Create IAM roles for service accounts (IRSA)
module "vpc_cni_irsa" {
  source  = "terraform-aws-modules/iam/aws//modules/iam-role-for-service-accounts-eks"
  version = "~> 5.0"

  role_name             = "vpc-cni-role"
  attach_vpc_cni_policy = true
  vpc_cni_enable_ipv4   = true

  oidc_providers = {
    main = {
      provider_arn               = module.eks.oidc_provider_arn
      namespace_service_accounts = ["kube-system:aws-node"]
    }
  }

  tags = {
    Environment = "production"
    Project     = "AI-RedTeam"
  }
}

# Create Amazon RDS for PostgreSQL
resource "aws_db_subnet_group" "ai_redteam" {
  name       = "ai-redteam-db-subnet-group"
  subnet_ids = module.vpc.private_subnets

  tags = {
    Name        = "AI RedTeam DB Subnet Group"
    Environment = "production"
    Project     = "AI-RedTeam"
  }
}

resource "aws_security_group" "rds" {
  name        = "ai-redteam-rds-sg"
  description = "Allow PostgreSQL traffic"
  vpc_id      = module.vpc.vpc_id

  ingress {
    description = "PostgreSQL"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = module.vpc.private_subnets_cidr_blocks
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "AI RedTeam RDS Security Group"
    Environment = "production"
    Project     = "AI-RedTeam"
  }
}

resource "aws_db_instance" "postgres" {
  identifier             = "ai-redteam-postgres"
  engine                 = "postgres"
  engine_version         = "13.7"
  instance_class         = "db.t3.medium"
  allocated_storage      = 20
  max_allocated_storage  = 100
  storage_type           = "gp2"
  storage_encrypted      = true
  db_name                = "ai_redteam"
  username               = "postgres"
  password               = var.db_password
  db_subnet_group_name   = aws_db_subnet_group.ai_redteam.name
  vpc_security_group_ids = [aws_security_group.rds.id]
  skip_final_snapshot    = true
  backup_retention_period = 7
  
  tags = {
    Name        = "AI RedTeam PostgreSQL"
    Environment = "production"
    Project     = "AI-RedTeam"
  }
}

# Create ElastiCache Redis cluster
resource "aws_elasticache_subnet_group" "ai_redteam" {
  name       = "ai-redteam-cache-subnet-group"
  subnet_ids = module.vpc.private_subnets

  tags = {
    Name        = "AI RedTeam Cache Subnet Group"
    Environment = "production"
    Project     = "AI-RedTeam"
  }
}

resource "aws_security_group" "redis" {
  name        = "ai-redteam-redis-sg"
  description = "Allow Redis traffic"
  vpc_id      = module.vpc.vpc_id

  ingress {
    description = "Redis"
    from_port   = 6379
    to_port     = 6379
    protocol    = "tcp"
    cidr_blocks = module.vpc.private_subnets_cidr_blocks
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "AI RedTeam Redis Security Group"
    Environment = "production"
    Project     = "AI-RedTeam"
  }
}

resource "aws_elasticache_cluster" "redis" {
  cluster_id           = "ai-redteam-redis"
  engine               = "redis"
  engine_version       = "6.x"
  node_type            = "cache.t3.small"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis6.x"
  port                 = 6379
  subnet_group_name    = aws_elasticache_subnet_group.ai_redteam.name
  security_group_ids   = [aws_security_group.redis.id]
  
  tags = {
    Name        = "AI RedTeam Redis"
    Environment = "production"
    Project     = "AI-RedTeam"
  }
}

# Create ECR repositories for Docker images
resource "aws_ecr_repository" "backend" {
  name                 = "ai-redteam-backend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name        = "AI RedTeam Backend Repository"
    Environment = "production"
    Project     = "AI-RedTeam"
  }
}

resource "aws_ecr_repository" "frontend" {
  name                 = "ai-redteam-frontend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name        = "AI RedTeam Frontend Repository"
    Environment = "production"
    Project     = "AI-RedTeam"
  }
}

# Create S3 bucket for application assets (reports, etc.)
resource "aws_s3_bucket" "assets" {
  bucket = "ai-redteam-assets"

  tags = {
    Name        = "AI RedTeam Assets"
    Environment = "production"
    Project     = "AI-RedTeam"
  }
}

resource "aws_s3_bucket_acl" "assets_acl" {
  bucket = aws_s3_bucket.assets.id
  acl    = "private"
}

resource "aws_s3_bucket_server_side_encryption_configuration" "assets_encryption" {
  bucket = aws_s3_bucket.assets.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# Create IAM role for the application to access S3 and other AWS services
resource "aws_iam_role" "app_role" {
  name = "ai-redteam-app-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRoleWithWebIdentity"
        Effect = "Allow"
        Principal = {
          Federated = module.eks.oidc_provider_arn
        }
        Condition = {
          StringEquals = {
            "${replace(module.eks.oidc_provider_arn, "/^(.*provider/)/", "")}:sub": "system:serviceaccount:default:ai-redteam-sa"
          }
        }
      }
    ]
  })

  tags = {
    Environment = "production"
    Project     = "AI-RedTeam"
  }
}

resource "aws_iam_policy" "app_policy" {
  name        = "ai-redteam-app-policy"
  description = "Policy for AI RedTeam application"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:ListBucket",
          "s3:DeleteObject"
        ]
        Effect   = "Allow"
        Resource = [
          aws_s3_bucket.assets.arn,
          "${aws_s3_bucket.assets.arn}/*"
        ]
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "app_policy_attachment" {
  role       = aws_iam_role.app_role.name
  policy_arn = aws_iam_policy.app_policy.arn
}

# Variables
variable "db_password" {
  description = "Password for the database"
  type        = string
  sensitive   = true
}

# Outputs
output "eks_cluster_endpoint" {
  description = "Endpoint for EKS control plane"
  value       = module.eks.cluster_endpoint
}

output "eks_cluster_id" {
  description = "EKS cluster ID"
  value       = module.eks.cluster_id
}

output "db_instance_endpoint" {
  description = "Endpoint for RDS instance"
  value       = aws_db_instance.postgres.endpoint
}

output "redis_endpoint" {
  description = "Endpoint for Redis cluster"
  value       = aws_elasticache_cluster.redis.cache_nodes.0.address
}

output "backend_ecr_repository_url" {
  description = "URL of the backend ECR repository"
  value       = aws_ecr_repository.backend.repository_url
}

output "frontend_ecr_repository_url" {
  description = "URL of the frontend ECR repository"
  value       = aws_ecr_repository.frontend.repository_url
} 