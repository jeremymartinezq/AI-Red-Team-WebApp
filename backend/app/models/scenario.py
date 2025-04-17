from datetime import datetime
from enum import Enum
from typing import List, Optional, Dict, Any
from uuid import UUID, uuid4

from pydantic import BaseModel, Field


class AttackType(str, Enum):
    """
    Types of attacks that can be simulated
    """
    PHISHING = "phishing"
    BRUTE_FORCE = "brute_force"
    MALWARE = "malware"
    RECON = "recon"
    CUSTOM = "custom"


class AttackStatus(str, Enum):
    """
    Status of an attack scenario
    """
    DRAFT = "draft"
    PLANNED = "planned"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    ABORTED = "aborted"


class ScenarioTarget(BaseModel):
    """
    Target information for a scenario
    """
    name: str
    description: Optional[str] = None
    ip_address: Optional[str] = None
    hostname: Optional[str] = None
    port: Optional[int] = None
    operating_system: Optional[str] = None
    services: Optional[List[str]] = None
    vulnerabilities: Optional[List[str]] = None


class ScenarioStep(BaseModel):
    """
    Step in an attack scenario
    """
    id: UUID = Field(default_factory=uuid4)
    name: str
    description: str
    attack_type: AttackType
    commands: Optional[List[str]] = None
    payload: Optional[str] = None
    status: AttackStatus = AttackStatus.DRAFT
    output: Optional[str] = None
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    order: int
    metadata: Optional[Dict[str, Any]] = None


class ScenarioBase(BaseModel):
    """
    Base scenario model with common fields
    """
    name: str
    description: str
    objective: str
    attack_type: AttackType
    difficulty: int = Field(ge=1, le=10)
    tags: List[str] = []
    is_ai_generated: bool = False


class ScenarioCreate(ScenarioBase):
    """
    Scenario model for creating a new scenario
    """
    targets: List[ScenarioTarget]
    steps: Optional[List[ScenarioStep]] = None


class ScenarioUpdate(BaseModel):
    """
    Scenario model for updating a scenario
    """
    name: Optional[str] = None
    description: Optional[str] = None
    objective: Optional[str] = None
    attack_type: Optional[AttackType] = None
    difficulty: Optional[int] = None
    tags: Optional[List[str]] = None
    targets: Optional[List[ScenarioTarget]] = None
    steps: Optional[List[ScenarioStep]] = None
    status: Optional[AttackStatus] = None


class ScenarioInDB(ScenarioBase):
    """
    Scenario model stored in the database
    """
    id: UUID = Field(default_factory=uuid4)
    created_by: UUID
    targets: List[ScenarioTarget]
    steps: List[ScenarioStep] = []
    status: AttackStatus = AttackStatus.DRAFT
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    success_rate: Optional[float] = None
    report_id: Optional[UUID] = None

    class Config:
        orm_mode = True


class ScenarioOut(ScenarioInDB):
    """
    Scenario model returned to the client
    """
    pass 