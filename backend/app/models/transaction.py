from typing import Optional
from datetime import date
from sqlmodel import SQLModel, Field


class Transaction(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: Optional[int] = Field(default=None, index=True)

    account_id: int

    # ✅ Store category directly as text (frontend-only categories)
    category: str = Field(default="Others", index=True)

    amount: float
    type: str
    date: date
    note: Optional[str] = None
