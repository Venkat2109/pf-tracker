from fastapi import APIRouter, Depends, HTTPException
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
    return session.exec(select(Transaction)).all()


@router.put("/{transaction_id}", response_model=TransactionOut)
def update_transaction(
    transaction_id: int,
    payload: TransactionIn,
    session: Session = Depends(get_session),
):
    transaction = session.get(Transaction, transaction_id)

    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")

    for key, value in payload.model_dump().items():
        setattr(transaction, key, value)

    session.commit()
    session.refresh(transaction)
    return transaction


@router.delete("/{transaction_id}", status_code=204)
def delete_transaction(
    transaction_id: int,
    session: Session = Depends(get_session),
):
    transaction = session.get(Transaction, transaction_id)

    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")

    session.delete(transaction)
    session.commit()
