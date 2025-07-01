# app/db/schemas.py

from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime

class UserCreate(BaseModel):
    user_name: str
    age: Optional[int]

class User(BaseModel):
    user_id: UUID
    user_name: str
    age: Optional[int]
    created_at: datetime

    class Config:
        orm_mode = True
