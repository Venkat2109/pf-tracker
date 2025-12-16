from pydantic import BaseModel
from datetime import date
from decimal import Decimal

class TransactionIn(BaseModel):
    account_id: int
    category_id: int
    amount: Decimal
    type: str
    date: date
    note: str | None = None

class TransactionOut(TransactionIn):
    id: int

    class Config:
        orm_mode = True
