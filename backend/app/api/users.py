from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import models, schemas, database
from uuid import UUID

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
    # firebase_uidの重複チェック
    db_user = db.query(models.User).filter(models.User.firebase_uid == user.firebase_uid).first()
    if db_user:
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
    return new_user

# 3. ユーザー情報取得（user_id=UUID指定で1件取得）
@router.get("/{user_id}", response_model=schemas.User)
def read_user(user_id: UUID, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="ユーザーが見つかりません")
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
