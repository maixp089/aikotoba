# app/db/schemas.py
from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime

class UserBase(BaseModel):
    firebase_uid: str
    name: str    
    age: Optional[int] = None
    icon_image: Optional[str] = None

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: UUID
    created_at: datetime

    class Config:
        orm_mode = True


class PresentationBase(BaseModel):
    transcript: Optional[str] = None
    audio_url: Optional[str] = None

class PresentationCreate(PresentationBase):
    user_id: UUID

class Presentation(PresentationBase):
    id: int
    user_id: UUID
    created_at: datetime

    class Config:
        orm_mode = True

class FeedbackBase(BaseModel):
    transcript: str
    word_score: Optional[int] = None
    flow_score: Optional[int] = None
    expression_score: Optional[int] = None
    hook_score: Optional[int] = None
    confidence_score: Optional[int] = None
    total_score: Optional[int] = None
    well_done: Optional[str] = None
    next_challenge: Optional[str] = None

class FeedbackCreate(FeedbackBase):
    user_id: UUID
    presentation_id: int

class Feedback(FeedbackBase):
    id: int
    user_id: UUID
    presentation_id: int
    created_at: datetime

    class Config:
        orm_mode = True




# #　============以下developの内容============
# from pydantic import BaseModel
# from uuid import UUID
# from datetime import datetime

# class UserBase(BaseModel):
#     firebase_uid: str
#     name: str    
#     age: int | None = None
#     icon_image: str | None = None

# class UserCreate(UserBase):
#     pass

# class User(UserBase):
#     id: UUID
#     created_at: datetime
#     class Config:
#         orm_mode = True
