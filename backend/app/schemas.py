from typing import Optional
from datetime import date
from sqlmodel import SQLModel

class TransactionIn(SQLModel):
    account_id: int
    category_id: int
    amount: float
    type: str
    date: date
    note: Optional[str] = None

class TransactionOut(TransactionIn):
    id: int

    class Config:
        from_attributes = True
