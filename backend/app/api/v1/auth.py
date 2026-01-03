from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from passlib.context import CryptContext

from app.db import get_session
from app.models.user import User
from app.schemas import UserCreate, UserLogin, Token
from app.security import create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


@router.post("/register")
def register_user(
    payload: UserCreate,
    session: Session = Depends(get_session),
):
    existing = session.exec(
        select(User).where(User.email == payload.email)
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    user = User(
        email=payload.email,
        username=payload.username,  # ✅ now valid
        hashed_password=hash_password(payload.password),
    )

    session.add(user)
    session.commit()
    session.refresh(user)

    return {"message": "User created successfully"}


@router.post("/login", response_model=Token)
def login_user(
    payload: UserLogin,
    session: Session = Depends(get_session),
):
    user = session.exec(
        select(User).where(User.email == payload.email)
    ).first()

    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({
        "sub": str(user.id),
        "username": user.username  # ✅ ADD THIS
    })

    return {"access_token": token}
