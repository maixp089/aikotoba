from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class UserBase(BaseModel):
    firebase_uid: str
    age: int | None = None
    icon_image: str | None = None

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: UUID
    created_at: datetime
    class Config:
        orm_mode = True
