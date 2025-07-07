# app/db/crud.py

from sqlalchemy.orm import Session
from app.db import models, schemas

def create_presentation(db: Session, presentation: schemas.PresentationCreate) -> models.Presentation:
    db_presentation = models.Presentation(
        user_id=presentation.user_id,
        transcript=presentation.transcript,
        audio_url=presentation.audio_url,
    )
    db.add(db_presentation)
    db.commit()
    db.refresh(db_presentation)
    return db_presentation

def create_feedback(db: Session, feedback: schemas.FeedbackCreate) -> models.Feedback:
    db_feedback = models.Feedback(
        user_id=feedback.user_id,
        presentation_id=feedback.presentation_id,
        total_score=feedback.total_score,
        well_done=feedback.well_done,
        next_challenge=feedback.next_challenge,
        # 他のスコアも追加可能
    )
    db.add(db_feedback)
    db.commit()
    db.refresh(db_feedback)
    return db_feedback



# #　============以下developの内容============
# app/db/crud.py

from sqlalchemy.orm import Session
from app.db import models, schemas

# ユーザーを新規作成する関数
def create_user(db: Session, user: schemas.UserCreate) -> models.User:
    db_user = models.User(name=user.name, email=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# ユーザーを全件取得する関数
def get_users(db: Session) -> list[models.User]:
    return db.query(models.User).all()

# IDでユーザーを取得する関数
def get_user_by_id(db: Session, user_id: int) -> models.User | None:
    return db.query(models.User).filter(models.User.id == user_id).first()
