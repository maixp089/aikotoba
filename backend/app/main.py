# app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 

from app.api.audio import router as audio_router
# from app.api import feedback 　# フィードバックAPIはフロントエンドから直接呼び出さないので、ルーティングから外す


app = FastAPI()

# CORS設定を追加
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # フロントエンドのURLを指定
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(audio_router, prefix="/api")
# app.include_router(feedback.router, prefix="/api") 　# 不要につきコメントアウト

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI + Docker!"}


# フィードバックAPIルート
# app.include_router(feedback.router)





# # app/main.py

# from fastapi import FastAPI
# from app.api.audio import router as audio_router

# app = FastAPI()

# app.include_router(audio_router, prefix="/api")

# @app.get("/")
# def read_root():
#     return {"message": "Hello from FastAPI + Docker!"}



