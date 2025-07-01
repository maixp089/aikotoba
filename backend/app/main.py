from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app.db import models, schemas, database

app = FastAPI()

# CORS（フロントからのリクエストを許可）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ユーザー新規登録API
@app.post("/users", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.user_name == user.user_name).first()
    if db_user:
        raise HTTPException(status_code=400, detail="ユーザー名は既に使われています")
    new_user = models.User(
        user_name=user.user_name,
        age=user.age
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# ユーザー全一覧
@app.get("/users", response_model=list[schemas.User])
def read_users(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    return users

# 指定ユーザー1件取得（IDで！）
@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="ユーザーが見つかりません")
    return user

# --- 必要に応じて追加 ---
# 例: ユーザー名から検索, 削除, 更新など
