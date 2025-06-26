# app/db/crud.py

from sqlalchemy.orm import Session
from app.db import models, schemas

# ユーザーを新規作成する関数
def create_user(db: Session, user: schemas.UserCreate) -> models.User:
    db_user = models.User(name=user.name, email=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# ユーザーを全件取得する関数
def get_users(db: Session) -> list[models.User]:
    return db.query(models.User).all()

# IDでユーザーを取得する関数
def get_user_by_id(db: Session, user_id: int) -> models.User | None:
    return db.query(models.User).filter(models.User.id == user_id).first()
