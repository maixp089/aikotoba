# # app/api/audio.py
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends, Form
from sqlalchemy.orm import Session
from ..whisper.transcription import transcribe_audio
from app.llm.client import call_gpt4o_mini
from app.db import models, schemas, database
import uuid
import datetime
from loguru import logger

router = APIRouter()

# DBセッション依存
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/audio-feedback")
async def audio_feedback(
    file: UploadFile = File(...),
    user_id: str = Form(...),  # Formでuser_idを受け取る
    db: Session = Depends(get_db)
):
    logger.info(f"audio-feedback API called: user_id={user_id}, filename={file.filename}")
    if not file.filename.endswith((".wav", ".mp3", ".m4a", ".webm")):
        logger.info("Unsupported file type")
        raise HTTPException(status_code=400, detail="Unsupported file type")

    if user_id is None:
        logger.info("user_idが未指定")
        raise HTTPException(status_code=400, detail="user_idが必要です")

    # 1) 文字起こし実行
    logger.info("音声ファイルの文字起こし開始")
    transcript = await transcribe_audio(file)
    logger.info("文字起こし完了")

    # LLMで文字起こしテキストに対してフィードバックを取得
    try:
        logger.info("LLMフィードバック取得開始")
        feedback_result = call_gpt4o_mini(transcript)
        logger.info("LLMフィードバック取得完了")
    except Exception as e:
        logger.error(f"LLM呼び出しで例外: {e}")
        raise HTTPException(status_code=500, detail="LLMの呼び出しに失敗しました")

    # 3) DB保存処理
    try:
        logger.info("DB保存処理開始")
        # Presentationレコード作成
        presentation = models.Presentation(
            user_id=uuid.UUID(user_id),
            transcript=transcript,
            audio_url=None,  # 今はファイル保存処理なしのためNone
            created_at=datetime.datetime.utcnow(),
        )
        db.add(presentation)
        db.commit()
        db.refresh(presentation)

        # Feedbackレコード作成
        feedback = models.Feedback(
            user_id=uuid.UUID(user_id),
            presentation_id=presentation.id,
            total_score=feedback_result["total_score"],
            well_done=feedback_result["well_done"],
            next_challenge=feedback_result["next_challenge"],
            created_at=datetime.datetime.utcnow(),
        )
        db.add(feedback)
        db.commit()
        logger.info("DB保存処理完了")

    except Exception as e:
        logger.error(f"DB保存失敗: {e}")
        db.rollback()
        raise HTTPException(status_code=500, detail=f"DB保存失敗: {str(e)}")

    # 4) フラットなレスポンスで返す
    logger.info("audio-feedback API正常終了")
    return {
        "transcript": transcript,
        "word_score": feedback_result["word_score"],
        "flow_score": feedback_result["flow_score"],
        "expression_score": feedback_result["expression_score"],
        "hook_score": feedback_result["hook_score"],
        "confidence_score": feedback_result["confidence_score"],
        "total_score": feedback_result["total_score"],
        "well_done": feedback_result["well_done"],
        "next_challenge": feedback_result["next_challenge"],
    }


