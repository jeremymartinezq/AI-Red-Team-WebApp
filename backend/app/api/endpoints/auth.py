from datetime import datetime, timedelta
from typing import Any, Optional

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from pydantic import BaseModel

from app.core.config import settings
from app.core.security import get_password_hash, verify_password
from app.models.user import User, UserInDB
from app.services.user_service import get_user_by_email

router = APIRouter()

# Token models
class Token(BaseModel):
    access_token: str
    token_type: str
    user_id: str
    email: str
    role: str
    expires_at: int


class TokenData(BaseModel):
    user_id: Optional[str] = None
    email: Optional[str] = None
    role: Optional[str] = None


# Create OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/login")


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Create a JWT access token
    """
    to_encode = data.copy()
    
    # Set expiration
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(seconds=settings.JWT_EXPIRATION)
    
    to_encode.update({"exp": expire})
    
    # Create JWT token
    encoded_jwt = jwt.encode(
        to_encode, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM
    )
    return encoded_jwt


def authenticate_user(email: str, password: str) -> Optional[UserInDB]:
    """
    Authenticate a user by email and password
    """
    user = get_user_by_email(email)
    
    if not user:
        return None
    
    if not verify_password(password, user.hashed_password):
        return None
    
    return user


@router.post("/login", response_model=Token)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    user = authenticate_user(form_data.username, form_data.password)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token with user info
    access_token_expires = timedelta(seconds=settings.JWT_EXPIRATION)
    expires_at = (datetime.utcnow() + access_token_expires).timestamp()
    
    token_data = {
        "sub": str(user.id),
        "email": user.email,
        "role": user.role,
    }
    
    access_token = create_access_token(
        data=token_data, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": str(user.id),
        "email": user.email,
        "role": user.role,
        "expires_at": int(expires_at),
    }


@router.post("/register", response_model=Token)
async def register_user(user_data: User) -> Any:
    """
    Register a new user
    """
    # Check if user already exists
    existing_user = get_user_by_email(user_data.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists",
        )
    
    # Create new user (implementation in services/user_service.py)
    # create_user function would go here
    
    # Return token as if user logged in
    access_token_expires = timedelta(seconds=settings.JWT_EXPIRATION)
    expires_at = (datetime.utcnow() + access_token_expires).timestamp()
    
    token_data = {
        "sub": "123",  # This would be the actual user ID in a real implementation
        "email": user_data.email,
        "role": "user",  # Default role
    }
    
    access_token = create_access_token(
        data=token_data, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": "123",  # This would be the actual user ID
        "email": user_data.email,
        "role": "user",
        "expires_at": int(expires_at),
    } 