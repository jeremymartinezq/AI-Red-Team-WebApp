from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer

from app.api.routes import api_router
from app.core.config import settings
from app.core.dependencies import get_current_user

app = FastAPI(
    title="AI Red Team Security WebApp API",
    description="API for AI-Powered Red Team Security operations",
    version="0.1.0",
)

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """
    Root endpoint providing API information.
    """
    return {
        "api": "AI Red Team Security WebApp API",
        "version": "0.1.0",
        "status": "operational"
    }

# Include routers from API folder
app.include_router(api_router, prefix="/api")

# Add a health check endpoint
@app.get("/health")
async def health_check():
    """
    Health check endpoint for monitoring.
    """
    return {"status": "healthy"} 