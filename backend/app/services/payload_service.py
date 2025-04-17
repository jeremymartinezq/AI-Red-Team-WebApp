from datetime import datetime
from typing import List, Optional, Dict, Any
from uuid import UUID

import openai
from pydantic import ValidationError

from app.core.config import settings
from app.models.payload import (
    PayloadCreate,
    PayloadUpdate,
    PayloadInDB,
    PayloadGenerationRequest,
    PayloadType,
    PayloadLanguage,
    PayloadStatus,
)

# In a real application, this would be replaced with a database connection
# For simplicity, we'll use an in-memory database here
_payloads_db = {}


def get_payload_by_id(payload_id: str) -> Optional[PayloadInDB]:
    """
    Get a payload by ID
    """
    return _payloads_db.get(payload_id)


def create_payload(payload_in: PayloadCreate, user_id: UUID) -> PayloadInDB:
    """
    Create a new payload
    """
    payload_id = str(UUID.uuid4())
    
    db_payload = PayloadInDB(
        id=payload_id,
        created_by=user_id,
        name=payload_in.name,
        description=payload_in.description,
        payload_type=payload_in.payload_type,
        language=payload_in.language,
        code=payload_in.code,
        parameters=payload_in.parameters,
        tags=payload_in.tags,
        is_ai_generated=payload_in.is_ai_generated,
        status=PayloadStatus.DRAFT,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
        is_obfuscated=False,
    )
    
    # Save payload to database
    _payloads_db[payload_id] = db_payload
    
    return db_payload


def update_payload(payload_id: str, payload_in: PayloadUpdate) -> Optional[PayloadInDB]:
    """
    Update a payload
    """
    # Get payload from database
    db_payload = get_payload_by_id(payload_id)
    if not db_payload:
        return None
    
    # Update payload fields
    payload_data = db_payload.dict()
    
    for field, value in payload_in.dict(exclude_unset=True).items():
        if value is not None:
            payload_data[field] = value
    
    payload_data["updated_at"] = datetime.utcnow()
    
    # Save updated payload to database
    db_payload = PayloadInDB(**payload_data)
    _payloads_db[payload_id] = db_payload
    
    return db_payload


def get_payloads(
    skip: int = 0,
    limit: int = 100,
    payload_type: Optional[PayloadType] = None,
    language: Optional[PayloadLanguage] = None,
) -> List[PayloadInDB]:
    """
    Get all payloads with optional filtering
    """
    payloads = list(_payloads_db.values())
    
    # Filter by type if provided
    if payload_type:
        payloads = [p for p in payloads if p.payload_type == payload_type]
    
    # Filter by language if provided
    if language:
        payloads = [p for p in payloads if p.language == language]
    
    # Apply pagination
    return payloads[skip : skip + limit]


def delete_payload(payload_id: str) -> bool:
    """
    Delete a payload
    """
    if payload_id in _payloads_db:
        del _payloads_db[payload_id]
        return True
    return False


def generate_payload_with_ai(request: PayloadGenerationRequest, user_id: UUID) -> PayloadInDB:
    """
    Generate a payload using the OpenAI API
    """
    try:
        # Set up OpenAI API
        openai.api_key = settings.OPENAI_API_KEY
        
        # Construct a prompt for the AI based on the request
        prompt = _construct_payload_prompt(request)
        
        # Make API call to generate code
        response = openai.Completion.create(
            model="gpt-3.5-turbo-instruct",  # or other appropriate model
            prompt=prompt,
            max_tokens=1500,
            temperature=0.7,
            top_p=1.0,
            frequency_penalty=0.0,
            presence_penalty=0.0,
        )
        
        # Extract generated code
        generated_code = response.choices[0].text.strip()
        
        # Create payload
        payload_create = PayloadCreate(
            name=f"{request.payload_type.value} - {request.language.value}",
            description=request.description,
            payload_type=request.payload_type,
            language=request.language,
            code=generated_code,
            parameters=request.parameters,
            tags=[request.payload_type.value, request.language.value],
            is_ai_generated=True,
        )
        
        # Save to database
        payload = create_payload(payload_create, user_id)
        
        return payload
    
    except (ValidationError, Exception) as e:
        # In a real application, handle specific exceptions appropriately
        raise Exception(f"Failed to generate payload: {str(e)}")


def _construct_payload_prompt(request: PayloadGenerationRequest) -> str:
    """
    Construct a prompt for the AI based on the request
    """
    # Base prompt template
    prompt = f"""
    Generate a {request.language.value} payload for {request.payload_type.value}.
    
    Description: {request.description}
    
    """
    
    # Add target OS if provided
    if request.target_os:
        prompt += f"Target OS: {request.target_os}\n"
    
    # Add parameters if provided
    if request.parameters:
        prompt += "Parameters:\n"
        for key, value in request.parameters.items():
            prompt += f"- {key}: {value}\n"
    
    # Add complexity level
    prompt += f"Complexity level (1-10): {request.complexity}\n"
    
    # Add obfuscation request if needed
    if request.is_obfuscated:
        prompt += "Please include basic obfuscation techniques to make the code less detectable.\n"
    
    # Add additional requirements if provided
    if request.additional_requirements:
        prompt += f"Additional requirements: {request.additional_requirements}\n"
    
    # Add ethical disclaimer and educational purpose reminder
    prompt += """
    IMPORTANT: This code is for educational purposes only. Make sure it:
    1. Does not contain actual malicious code that could cause harm
    2. Includes comments explaining each section for educational value
    3. Has obvious simulation markers to show it's not meant for actual malicious use
    4. Can be easily detected by security tools (no advanced evasion)
    
    Return only the code without any additional explanation.
    """
    
    return prompt


def test_payload(payload_id: str) -> Dict[str, Any]:
    """
    Test a payload in a sandboxed environment (simulated)
    In a real application, this would run the payload in a container or VM
    """
    payload = get_payload_by_id(payload_id)
    if not payload:
        raise ValueError("Payload not found")
    
    # In a real application, this would execute the payload in a safe environment
    # and return the results. For this demo, we'll simulate success.
    
    # Update payload status
    update_payload(
        payload_id, 
        PayloadUpdate(status=PayloadStatus.TESTED, success_rate=0.95)
    )
    
    return {
        "success": True,
        "execution_time": 0.75,  # seconds
        "output": f"Successfully executed {payload.name} payload in sandbox environment",
        "warnings": [],
        "details": {
            "memory_usage": "12.5MB",
            "cpu_usage": "3%",
            "network_connections": 1,
        }
    } 