from typing import Any, List, Optional

from fastapi import APIRouter, Depends, HTTPException, status, Query

from app.core.dependencies import get_current_active_user, get_red_team_user
from app.models.user import UserInDB
from app.models.payload import (
    PayloadCreate,
    PayloadUpdate,
    PayloadOut,
    PayloadGenerationRequest,
    PayloadType,
    PayloadLanguage,
)
from app.services.payload_service import (
    create_payload,
    update_payload,
    get_payloads,
    get_payload_by_id,
    delete_payload,
    generate_payload_with_ai,
    test_payload,
)

router = APIRouter()


@router.get("/", response_model=List[PayloadOut])
async def read_payloads(
    skip: int = 0,
    limit: int = 100,
    payload_type: Optional[PayloadType] = None,
    language: Optional[PayloadLanguage] = None,
    current_user: UserInDB = Depends(get_current_active_user),
) -> Any:
    """
    Retrieve payloads with optional filtering by type and language.
    """
    return get_payloads(
        skip=skip, limit=limit, payload_type=payload_type, language=language
    )


@router.post("/", response_model=PayloadOut)
async def create_payload_endpoint(
    payload_in: PayloadCreate,
    current_user: UserInDB = Depends(get_red_team_user),
) -> Any:
    """
    Create new payload. Red team or admin only.
    """
    try:
        payload = create_payload(payload_in, current_user.id)
        return payload
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.get("/{payload_id}", response_model=PayloadOut)
async def read_payload_by_id(
    payload_id: str,
    current_user: UserInDB = Depends(get_current_active_user),
) -> Any:
    """
    Get a specific payload by id.
    """
    payload = get_payload_by_id(payload_id)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Payload not found",
        )
    
    return payload


@router.put("/{payload_id}", response_model=PayloadOut)
async def update_payload_by_id(
    payload_id: str,
    payload_in: PayloadUpdate,
    current_user: UserInDB = Depends(get_red_team_user),
) -> Any:
    """
    Update a payload. Red team or admin only.
    """
    payload = update_payload(payload_id, payload_in)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Payload not found",
        )
    
    return payload


@router.delete("/{payload_id}", response_model=bool)
async def delete_payload_by_id(
    payload_id: str,
    current_user: UserInDB = Depends(get_red_team_user),
) -> Any:
    """
    Delete a payload. Red team or admin only.
    """
    result = delete_payload(payload_id)
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Payload not found",
        )
    
    return result


@router.post("/generate", response_model=PayloadOut)
async def generate_payload_endpoint(
    request: PayloadGenerationRequest,
    current_user: UserInDB = Depends(get_red_team_user),
) -> Any:
    """
    Generate a payload using AI. Red team or admin only.
    """
    try:
        payload = generate_payload_with_ai(request, current_user.id)
        return payload
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.post("/{payload_id}/test", response_model=dict)
async def test_payload_endpoint(
    payload_id: str,
    current_user: UserInDB = Depends(get_red_team_user),
) -> Any:
    """
    Test a payload in a sandboxed environment. Red team or admin only.
    """
    try:
        result = test_payload(payload_id)
        return result
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error testing payload: {str(e)}",
        ) 