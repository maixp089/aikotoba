from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # ←追加
from sqlalchemy.orm import Session
from app.db import models, schemas, database

app = FastAPI()

# ここにCORSミドルウェア追加
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # フロント側のURL
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

@app.get("/users", response_model=list[schemas.User])
def read_users(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    return users

@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="ユーザーが見つかりません")
    return user
