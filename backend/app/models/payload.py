from datetime import datetime
from enum import Enum
from typing import List, Optional, Dict, Any
from uuid import UUID, uuid4

from pydantic import BaseModel, Field, validator


class PayloadType(str, Enum):
    """
    Types of payloads that can be generated
    """
    REVERSE_SHELL = "reverse_shell"
    BIND_SHELL = "bind_shell"
    WEB_SHELL = "web_shell"
    COMMAND_EXECUTION = "command_execution"
    DATA_EXFILTRATION = "data_exfiltration"
    KEYLOGGER = "keylogger"
    BACKDOOR = "backdoor"
    RANSOMWARE_SIMULATION = "ransomware_simulation"
    CUSTOM = "custom"


class PayloadLanguage(str, Enum):
    """
    Programming languages for payloads
    """
    PYTHON = "python"
    POWERSHELL = "powershell"
    BASH = "bash"
    JAVASCRIPT = "javascript"
    PHP = "php"
    CSHARP = "csharp"
    GO = "go"
    RUBY = "ruby"


class PayloadStatus(str, Enum):
    """
    Status of a payload
    """
    DRAFT = "draft"
    READY = "ready"
    TESTED = "tested"
    DEPLOYED = "deployed"
    FAILED = "failed"


class PayloadBase(BaseModel):
    """
    Base payload model with common fields
    """
    name: str
    description: str
    payload_type: PayloadType
    language: PayloadLanguage
    tags: List[str] = []
    is_ai_generated: bool = False


class PayloadCreate(PayloadBase):
    """
    Payload model for creating a new payload
    """
    code: str
    parameters: Optional[Dict[str, Any]] = None


class PayloadUpdate(BaseModel):
    """
    Payload model for updating a payload
    """
    name: Optional[str] = None
    description: Optional[str] = None
    payload_type: Optional[PayloadType] = None
    language: Optional[PayloadLanguage] = None
    code: Optional[str] = None
    parameters: Optional[Dict[str, Any]] = None
    tags: Optional[List[str]] = None
    status: Optional[PayloadStatus] = None


class PayloadInDB(PayloadBase):
    """
    Payload model stored in the database
    """
    id: UUID = Field(default_factory=uuid4)
    created_by: UUID
    code: str
    parameters: Optional[Dict[str, Any]] = None
    status: PayloadStatus = PayloadStatus.DRAFT
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    success_rate: Optional[float] = None
    is_obfuscated: bool = False
    
    @validator('code')
    def validate_code_not_malicious(cls, v):
        """
        Basic validation to ensure code doesn't contain actual malicious indicators.
        In a real application, this would be more sophisticated.
        """
        # List of potentially dangerous commands/imports that would be checked
        malicious_patterns = [
            "rm -rf /",
            "format C:",
            "crypto.mining",
            "System.Diagnostics.Process.Start(",
            "eval(base64.decode",
        ]
        
        for pattern in malicious_patterns:
            if pattern.lower() in v.lower():
                raise ValueError(f"Code contains potentially harmful pattern: {pattern}")
        
        return v

    class Config:
        orm_mode = True


class PayloadOut(PayloadInDB):
    """
    Payload model returned to the client
    """
    pass


class PayloadGenerationRequest(BaseModel):
    """
    Request to generate a payload using AI
    """
    payload_type: PayloadType
    language: PayloadLanguage
    description: str
    target_os: Optional[str] = None
    parameters: Optional[Dict[str, Any]] = None
    complexity: int = Field(1, ge=1, le=10)
    is_obfuscated: bool = False
    additional_requirements: Optional[str] = None 