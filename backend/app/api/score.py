from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import models, schemas, database
from uuid import UUID

router = APIRouter(
    prefix="/users",
    tags=["scores"] 
)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 5. スコア一覧取得（ユーザーごとの発表スコア履歴を返すAPI）
@router.get("/{user_id}/scores", response_model=list[schemas.ScoreRecord])
def get_user_scores(user_id: UUID, db: Session = Depends(get_db)):
    # user_idで発表を絞り、JOINでフィードバックも取得
    results = (
        db.query(models.Feedback, models.Presentation)
        .join(models.Presentation, models.Presentation.id == models.Feedback.presentation_id)
        .filter(models.Presentation.user_id == user_id)
        .order_by(models.Feedback.created_at.desc())
        .all()
    )

    # JOIN結果をScoreRecord型に整形
    score_list = []
    for feedback, presentation in results:
        score_list.append(
            schemas.ScoreRecord(
                feedback_id=feedback.id,
                presentation_id=presentation.id,
                transcript=presentation.transcript,
                audio_url=presentation.audio_url,
                presentation_created_at=presentation.created_at,
                total_score=feedback.total_score,
                well_done=feedback.well_done,
                next_challenge=feedback.next_challenge,
                feedback_created_at=feedback.created_at,
            )
        )
    return score_list
