from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1 import transactions
from app.db import create_db_and_tables

app = FastAPI(
    title="PF Tracker API",
    version="1.0.0",
    description="Backend API for the PF Tracker application"
)

# ✅ CORS (important for frontend → backend communication)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Create tables on startup
@app.on_event("startup")
def on_startup():
    create_db_and_tables()

# ✅ Health check
@app.get("/")
def root():
    return {
        "message": "PF Tracker API is running",
        "docs": "/docs"
    }

# ✅ API routes
app.include_router(
    transactions.router,
    prefix="/api/v1/transactions",
    tags=["Transactions"]
)
