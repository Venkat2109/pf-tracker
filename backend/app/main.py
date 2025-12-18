from fastapi import FastAPI
from app.api.v1 import transactions
from app.db import create_db_and_tables

app = FastAPI(title="PF Tracker API")

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/")
def root():
    return {
        "message": "PF Tracker API is running",
        "docs": "/docs"
    }

app.include_router(
    transactions.router,
    prefix="/api/v1/transactions",
    tags=["Transactions"]
)
