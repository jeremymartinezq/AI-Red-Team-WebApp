import os
from typing import List, Optional, Dict, Any, Union

from pydantic_settings import BaseSettings
from pydantic import validator, Field, PostgresDsn, RedisDsn


class Settings(BaseSettings):
    # API Settings
    API_V1_STR: str = "/api"
    PROJECT_NAME: str = "AI Red Team Security WebApp"
    
    # CORS
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:3000")
    ALLOWED_HOSTS: List[str] = ["localhost", "127.0.0.1"]
    
    # Database
    DATABASE_URL: PostgresDsn = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@postgres:5432/ai_redteam")
    
    # Redis
    REDIS_URL: RedisDsn = os.getenv("REDIS_URL", "redis://redis:6379/0")
    
    # JWT Authentication
    JWT_SECRET: str = os.getenv("JWT_SECRET", "CHANGE_ME_IN_PRODUCTION")
    JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")
    JWT_EXPIRATION: int = int(os.getenv("JWT_EXPIRATION", "3600"))
    
    # OpenAI
    OPENAI_API_KEY: Optional[str] = os.getenv("OPENAI_API_KEY")
    OPENAI_ORG_ID: Optional[str] = os.getenv("OPENAI_ORG_ID")
    
    # Application Settings
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    DEBUG: bool = os.getenv("DEBUG", "True").lower() == "true"
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")
    
    # Security Settings
    ENABLE_SANDBOX: bool = os.getenv("ENABLE_SANDBOX", "True").lower() == "true"
    MAX_PAYLOAD_SIZE: str = os.getenv("MAX_PAYLOAD_SIZE", "10MB")
    RATE_LIMIT: int = int(os.getenv("RATE_LIMIT", "100"))
    
    class Config:
        env_file = ".env"
        case_sensitive = True
        
    @validator("OPENAI_API_KEY")
    def validate_openai_api_key(cls, v: Optional[str], values: Dict[str, Any]) -> str:
        if not v and values.get("ENVIRONMENT") == "production":
            raise ValueError("OPENAI_API_KEY is required in production mode")
        return v


# Create settings instance
settings = Settings() 