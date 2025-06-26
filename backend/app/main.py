# app/main.py

from fastapi import FastAPI
from app.db import models
from app.db.database import engine

# テーブルを作成（初回起動時に）
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# 動作確認用のルート
@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI + Docker!"}
