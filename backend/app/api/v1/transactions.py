from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from app.db import get_session
from app.models import Transaction
from app.schemas import TransactionIn, TransactionOut

router = APIRouter()

@router.post("/", response_model=TransactionOut, status_code=201)
def create_transaction(
    payload: TransactionIn,
    session: Session = Depends(get_session),
):
    transaction = Transaction(**payload.model_dump())
    session.add(transaction)
    session.commit()
    session.refresh(transaction)
    return transaction

@router.get("/", response_model=list[TransactionOut])
def list_transactions(
    session: Session = Depends(get_session),
):
    statement = select(Transaction)
    return session.exec(statement).all()
