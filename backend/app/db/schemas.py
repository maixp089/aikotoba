from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class UserBase(BaseModel):
    firebase_uid: str
    name: str    
    age: int | None = None
    icon_image: str | None = None

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: UUID
    created_at: datetime
    class Config:
        orm_mode = True

class ScoreRecord(BaseModel):
    presentation_id: int
    transcript: str
    audio_url: str
    presentation_created_at: datetime
    total_score: int
    well_done: str
    next_challenge: str
    feedback_created_at: datetime

class Feedback(BaseModel):
    id: int
    user_id: UUID  
    presentation_id: int
    total_score: int
    well_done: str
    next_challenge: str
    created_at: datetime

    class Config:
        orm_mode = True