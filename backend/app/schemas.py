from typing import Optional
from datetime import date
from sqlmodel import SQLModel


# =========================
# TRANSACTION SCHEMAS
# =========================

class TransactionIn(SQLModel):
    account_id: int
    category_id: int
    amount: float
    type: str
    date: date
    note: Optional[str] = None


class TransactionOut(TransactionIn):
    id: int
    user_id: int

    class Config:
        from_attributes = True


# =========================
# AUTH SCHEMAS
# =========================

class UserCreate(SQLModel):
    email: str
    password: str
    username: Optional[str] = None   # ✅ ADD THIS


class UserLogin(SQLModel):
    email: str
    password: str


class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"
