from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from app.db import get_session
from app.schemas import TransactionIn, TransactionOut
from app.dependencies import get_current_user_id  # ✅ NEW
from app.models import Transaction


router = APIRouter()


# ✅ CREATE (transaction belongs to logged-in user)
@router.post("/", response_model=TransactionOut, status_code=201)
def create_transaction(
    payload: TransactionIn,
    user_id: int = Depends(get_current_user_id),  # ✅ NEW
    session: Session = Depends(get_session),
):
    transaction = Transaction(
        **payload.model_dump(),
        user_id=user_id  # ✅ IMPORTANT
    )
    session.add(transaction)
    session.commit()
    session.refresh(transaction)
    return transaction


# ✅ READ (only this user's transactions)
@router.get("/", response_model=list[TransactionOut])
def list_transactions(
    user_id: int = Depends(get_current_user_id),  # ✅ NEW
    session: Session = Depends(get_session),
):
    return session.exec(
        select(Transaction).where(Transaction.user_id == user_id)
    ).all()


# ✅ UPDATE (only owner can edit)
@router.put("/{transaction_id}", response_model=TransactionOut)
def update_transaction(
    transaction_id: int,
    payload: TransactionIn,
    user_id: int = Depends(get_current_user_id),  # ✅ NEW
    session: Session = Depends(get_session),
):
    transaction = session.get(Transaction, transaction_id)

    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")

    # 🔒 Ownership check
    if transaction.user_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized")

    for key, value in payload.model_dump().items():
        setattr(transaction, key, value)

    session.commit()
    session.refresh(transaction)
    return transaction


# ✅ DELETE (only owner can delete)
@router.delete("/{transaction_id}", status_code=204)
def delete_transaction(
    transaction_id: int,
    user_id: int = Depends(get_current_user_id),  # ✅ NEW
    session: Session = Depends(get_session),
):
    transaction = session.get(Transaction, transaction_id)

    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")

    # 🔒 Ownership check
    if transaction.user_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized")

    session.delete(transaction)
    session.commit()
