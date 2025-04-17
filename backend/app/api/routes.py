from fastapi import APIRouter

from app.api.endpoints import auth, users, scenarios, payloads, reports, scanning

# Main API router
api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(scenarios.router, prefix="/scenarios", tags=["Scenarios"])
api_router.include_router(payloads.router, prefix="/payloads", tags=["Payloads"])
api_router.include_router(reports.router, prefix="/reports", tags=["Reports"])
api_router.include_router(scanning.router, prefix="/scanning", tags=["Scanning"]) 