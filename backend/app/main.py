from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import users  # ← 分割したusers.pyをimport

app = FastAPI()

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # 許可するフロントエンドのURL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# users APIをルーティングとして追加
app.include_router(users.router)

# 必要に応じて他のapi/もinclude
# from app.api import audio, feedback
# app.include_router(audio.router)
# app.include_router(feedback.router)
