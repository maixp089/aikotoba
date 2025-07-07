from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import models, schemas, database
from uuid import UUID

router = APIRouter(
    prefix="/api",
    tags=["feedback"] 
)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
@router.get("/audio-feedback/{feedback_id}", response_model=schemas.Feedback)
def get_feedback(feedback_id: int, db: Session = Depends(get_db)):
    feedback = db.query(models.Feedback).filter(models.Feedback.id == feedback_id).first()
    if not feedback:
        raise HTTPException(status_code=404, detail="Feedback not found")
    return feedback
