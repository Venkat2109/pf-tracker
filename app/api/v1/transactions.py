from fastapi import APIRouter, Depends
from typing import List
from sqlmodel import Session, select
from app.db import get_session
from app.schemas import TransactionIn, TransactionOut
from app.models import Transaction

router = APIRouter()

@router.post("/", response_model=TransactionOut)
def create_transaction(payload: TransactionIn, session: Session = Depends(get_session)):
    obj = Transaction(**payload.model_dump())
    session.add(obj)
    session.commit()
    session.refresh(obj)
    return obj

@router.get("/", response_model=List[TransactionOut])
def list_transactions(session: Session = Depends(get_session)):
    return session.exec(select(Transaction)).all()
