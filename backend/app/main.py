# FastAPIでAPIサーバーを作るための準備
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app.db import models, schemas, database
from uuid import UUID 

# FastAPIアプリ本体を作成
app = FastAPI()

# CORSミドルウェア（別サーバーのフロントからリクエストを許可する設定）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # 許可するフロントエンドのURL
    allow_credentials=True,  # 認証情報のやりとりも許可
    allow_methods=["*"],     # 全HTTPメソッド（GET/POST/PUT/DELETEなど）許可
    allow_headers=["*"],     # 全てのヘッダー許可
)

# データベースセッションを取得するための関数
def get_db():
    db = database.SessionLocal()
    try:
        yield db  # dbをAPI関数で使えるようにする
    finally:
        db.close()  # 終わったら必ず閉じる

# --- 新規登録API（ユーザーは最大4人まで） ---
@app.post("/users", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    MAX_USERS = 4  # 上限人数

    user_count = db.query(models.User).count()  # 現在登録されている人数を数える
    if user_count >= MAX_USERS:
        raise HTTPException(status_code=400, detail=f"ユーザー上限（{MAX_USERS}人）に達しました")

    # ユーザー名がすでに使われていないかチェック
    db_user = db.query(models.User).filter(models.User.user_name == user.user_name).first()
    if db_user:
        raise HTTPException(status_code=400, detail="ユーザー名は既に使われています")
    
    # 新しいユーザーを作る
    new_user = models.User(
        user_name=user.user_name,  # ユーザー名
        age=user.age               # 年齢
    )
    db.add(new_user)      # DBに追加する
    db.commit()           # 反映する
    db.refresh(new_user)  # 最新情報でnew_userを更新
    return new_user       # フロントへ返す

# --- 全ユーザー一覧を取得 ---
@app.get("/users", response_model=list[schemas.User])
def read_users(db: Session = Depends(get_db)):
    users = db.query(models.User).all()  # すべてのユーザーを取得
    return users

# --- ユーザー1件取得（ID指定） ---
@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="ユーザーが見つかりません")
    return user

# --- ユーザー名であいまい検索 ---
@app.get("/users/search/", response_model=list[schemas.User])
def search_users(user_name: str, db: Session = Depends(get_db)):
    users = db.query(models.User).filter(models.User.user_name.contains(user_name)).all()
    return users

# --- ユーザー削除 ---
@app.delete("/users/{user_id}")
def delete_user(user_id: UUID, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="ユーザーが見つかりません")
    db.delete(user)
    db.commit()
    return {"message": "削除しました"}

# --- ユーザー情報更新 ---
@app.put("/users/{user_id}", response_model=schemas.User)
def update_user(user_id: str, user_update: schemas.UserCreate, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="ユーザーが見つかりません")
    user.user_name = user_update.user_name  # ユーザー名を更新
    user.age = user_update.age              # 年齢を更新（ここをbirthday→ageに直した！）
    db.commit()
    db.refresh(user)
    return user
