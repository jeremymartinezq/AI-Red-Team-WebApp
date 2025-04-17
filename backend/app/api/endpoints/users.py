from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException, status

from app.core.dependencies import get_current_active_user, get_admin_user
from app.models.user import UserCreate, UserUpdate, UserOut, UserInDB
from app.services.user_service import create_user, update_user, get_users, get_user_by_id, delete_user

router = APIRouter()


@router.get("/", response_model=List[UserOut])
async def read_users(
    skip: int = 0,
    limit: int = 100,
    current_user: UserInDB = Depends(get_admin_user),
) -> Any:
    """
    Retrieve users. Admin only.
    """
    users = get_users()
    return users[skip : skip + limit]


@router.post("/", response_model=UserOut)
async def create_user_endpoint(
    user_in: UserCreate,
    current_user: UserInDB = Depends(get_admin_user),
) -> Any:
    """
    Create new user. Admin only.
    """
    try:
        user = create_user(user_in)
        return user
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.get("/me", response_model=UserOut)
async def read_user_me(
    current_user: UserInDB = Depends(get_current_active_user),
) -> Any:
    """
    Get current user.
    """
    return current_user


@router.put("/me", response_model=UserOut)
async def update_user_me(
    user_in: UserUpdate,
    current_user: UserInDB = Depends(get_current_active_user),
) -> Any:
    """
    Update current user.
    """
    # Prevent users from changing their own role
    if user_in.role is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Users cannot change their own role",
        )
    
    user = update_user(str(current_user.id), user_in)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    
    return user


@router.get("/{user_id}", response_model=UserOut)
async def read_user_by_id(
    user_id: str,
    current_user: UserInDB = Depends(get_admin_user),
) -> Any:
    """
    Get a specific user by id. Admin only.
    """
    user = get_user_by_id(user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    
    return user


@router.put("/{user_id}", response_model=UserOut)
async def update_user_by_id(
    user_id: str,
    user_in: UserUpdate,
    current_user: UserInDB = Depends(get_admin_user),
) -> Any:
    """
    Update a user. Admin only.
    """
    user = update_user(user_id, user_in)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    
    return user


@router.delete("/{user_id}", response_model=bool)
async def delete_user_by_id(
    user_id: str,
    current_user: UserInDB = Depends(get_admin_user),
) -> Any:
    """
    Delete a user. Admin only.
    """
    # Prevent admins from deleting themselves
    if user_id == str(current_user.id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Users cannot delete themselves",
        )
    
    result = delete_user(user_id)
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    
    return result 