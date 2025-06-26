# app/db/schemas.py

from pydantic import BaseModel, EmailStr

# クライアントから受け取るデータ（作成用）
class UserCreate(BaseModel):
    name: str
    email: EmailStr

# クライアントに返すデータ（レスポンス用）
class User(BaseModel):
    id: int
    name: str
    email: EmailStr

    class Config:
        orm_mode = True
