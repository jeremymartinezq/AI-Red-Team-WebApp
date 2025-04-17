from datetime import datetime
from typing import List, Optional
from uuid import UUID

from app.core.security import get_password_hash
from app.models.user import UserCreate, UserUpdate, UserInDB

# In a real application, this would be replaced with a database connection
# For simplicity, we'll use an in-memory database here
_users_db = {}


def get_user_by_email(email: str) -> Optional[UserInDB]:
    """
    Get a user by email
    """
    for user in _users_db.values():
        if user.email == email:
            return user
    return None


def get_user_by_id(user_id: str) -> Optional[UserInDB]:
    """
    Get a user by ID
    """
    return _users_db.get(user_id)


def create_user(user_in: UserCreate) -> UserInDB:
    """
    Create a new user
    """
    # Check if user already exists
    db_user = get_user_by_email(user_in.email)
    if db_user:
        raise ValueError(f"User with email {user_in.email} already exists")
    
    # Create new user
    hashed_password = get_password_hash(user_in.password)
    user_id = str(UUID.uuid4())
    
    db_user = UserInDB(
        id=user_id,
        email=user_in.email,
        hashed_password=hashed_password,
        full_name=user_in.full_name,
        is_active=True,
        role=user_in.role,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    
    # Save user to database
    _users_db[user_id] = db_user
    
    return db_user


def update_user(user_id: str, user_in: UserUpdate) -> Optional[UserInDB]:
    """
    Update a user
    """
    # Get user from database
    db_user = get_user_by_id(user_id)
    if not db_user:
        return None
    
    # Update user fields
    user_data = db_user.dict()
    
    if user_in.email is not None:
        user_data["email"] = user_in.email
    
    if user_in.full_name is not None:
        user_data["full_name"] = user_in.full_name
    
    if user_in.is_active is not None:
        user_data["is_active"] = user_in.is_active
    
    if user_in.role is not None:
        user_data["role"] = user_in.role
    
    if user_in.password is not None:
        user_data["hashed_password"] = get_password_hash(user_in.password)
    
    user_data["updated_at"] = datetime.utcnow()
    
    # Save updated user to database
    db_user = UserInDB(**user_data)
    _users_db[user_id] = db_user
    
    return db_user


def get_users() -> List[UserInDB]:
    """
    Get all users
    """
    return list(_users_db.values())


def delete_user(user_id: str) -> bool:
    """
    Delete a user
    """
    if user_id in _users_db:
        del _users_db[user_id]
        return True
    return False 