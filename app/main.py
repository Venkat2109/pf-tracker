import os
from fastapi import FastAPI
from app.api.v1 import transactions
from app.db import create_db_and_tables

app = FastAPI(title="PF Tracker")

app.include_router(
    transactions.router,
    prefix="/api/v1/transactions",
    tags=["transactions"]
)

@app.on_event("startup")
def on_startup():
    if os.getenv("ENV") != "test":
        create_db_and_tables()
