from datetime import datetime
from typing import Optional, List
from uuid import UUID, uuid4

from pydantic import BaseModel, EmailStr, Field


class TokenData(BaseModel):
    """
    Token data model for JWT authentication
    """
    user_id: Optional[str] = None
    email: Optional[str] = None
    role: Optional[str] = None


class UserBase(BaseModel):
    """
    Base user model with common fields
    """
    email: EmailStr
    is_active: bool = True
    full_name: Optional[str] = None


class User(UserBase):
    """
    User model for registration
    """
    password: str


class UserCreate(User):
    """
    User model for creating a new user
    """
    role: str = "user"  # Default role


class UserUpdate(BaseModel):
    """
    User model for updating user information
    """
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None
    role: Optional[str] = None


class UserInDB(UserBase):
    """
    User model stored in the database
    """
    id: UUID = Field(default_factory=uuid4)
    hashed_password: str
    role: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True


class UserOut(UserBase):
    """
    User model returned to the client
    """
    id: UUID
    role: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True 