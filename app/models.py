from sqlmodel import SQLModel, Field
from datetime import date
from decimal import Decimal
from typing import Optional

class Transaction(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: Optional[int] = None   # Reserved for later when auth is added
    account_id: int
    category_id: int
    amount: Decimal
    type: str
    date: date
    note: Optional[str] = None
