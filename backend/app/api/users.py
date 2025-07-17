from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import models, schemas, database
from uuid import UUID
from loguru import logger

router = APIRouter(
    prefix="/users",
    tags=["users"]
)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 1. ユーザー存在チェック（firebase_uidで検索）
@router.get("/search", response_model=schemas.User | None)
def search_user(firebase_uid: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.firebase_uid == firebase_uid).first()
    return user  # 見つからなければnull（None）で返る

# 2. ユーザー新規登録
@router.post("/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    logger.info(f"ユーザー新規登録API: firebase_uid={user.firebase_uid}, name={user.name}")
    # firebase_uidの重複チェック
    db_user = db.query(models.User).filter(models.User.firebase_uid == user.firebase_uid).first()
    if db_user:
        logger.info("firebase_uid重複: 登録済み")
        raise HTTPException(status_code=400, detail="このfirebase_uidは既に登録されています")

    new_user = models.User(
        firebase_uid=user.firebase_uid,
        name=user.name,   
        age=user.age,
        icon_image=user.icon_image,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    logger.info(f"ユーザー新規登録完了: user_id={new_user.id}")
    return new_user

# 3. ユーザー情報取得（user_id=UUID指定で1件取得）
@router.get("/{user_id}", response_model=schemas.User)
def read_user(user_id: UUID, db: Session = Depends(get_db)):
    logger.info(f"ユーザー情報取得API: user_id={user_id}")
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user is None:
        logger.info("ユーザーが見つかりません")
        raise HTTPException(status_code=404, detail="ユーザーが見つかりません")
    logger.info(f"ユーザー情報取得成功: user_id={user.id}")
    return user

# 4. paidフラグをTrueにするAPI（決済後に呼び出す）//★追加　決済後「練習する」ボタン使える
@router.post("/{user_id}/paid")
def set_paid(user_id: UUID, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="ユーザーが見つかりません")
    user.paid = True
    db.commit()
    return {"ok": True}
