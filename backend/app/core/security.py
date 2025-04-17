from datetime import datetime, timedelta
from typing import Any, Optional, Union

import bcrypt
from jose import jwt
from passlib.context import CryptContext

from app.core.config import settings

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a password against a hash
    """
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """
    Hash a password
    """
    return pwd_context.hash(password)


def generate_salt() -> str:
    """
    Generate a random salt for password hashing
    """
    return bcrypt.gensalt().decode()


def create_jwt_token(
    subject: Union[str, Any],
    expires_delta: Optional[timedelta] = None,
    claims: dict = None,
) -> str:
    """
    Create a JWT token with claims
    """
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.JWT_EXPIRATION)
    
    to_encode = {"exp": expire, "sub": str(subject)}
    
    if claims:
        to_encode.update(claims)
    
    encoded_jwt = jwt.encode(
        to_encode, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM
    )
    
    return encoded_jwt 