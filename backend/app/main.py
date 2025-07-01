# app/main.py

from fastapi import FastAPI
from app.api.audio import router as audio_router

app = FastAPI()

app.include_router(audio_router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI + Docker!"}



