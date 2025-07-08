# # app/api/audio.py
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends, Form
from sqlalchemy.orm import Session
from ..whisper.transcription import transcribe_audio
from app.llm.client import call_gpt4o_mini
from app.db import models, schemas, database
import uuid
import datetime

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
    if not file.filename.endswith((".wav", ".mp3", ".m4a", ".webm")):
        raise HTTPException(status_code=400, detail="Unsupported file type")

    if user_id is None:
        raise HTTPException(status_code=400, detail="user_idが必要です")

    # 1) 文字起こし実行
    transcript = await transcribe_audio(file)

    # LLMで文字起こしテキストに対してフィードバックを取得
    try:
        feedback_result = call_gpt4o_mini(transcript)
        print("== LLMの戻り値 ==", feedback_result)
    except Exception as e:
        print("== LLM呼び出しで例外 ==", e)
        raise HTTPException(status_code=500, detail="LLMの呼び出しに失敗しました")

    # 3) DB保存処理
    try:
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

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"DB保存失敗: {str(e)}")

    # 4) フラットなレスポンスで返す
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


# # app/api/audio.py(FEでの動作確認時に使用していたコード)
# from fastapi import APIRouter, UploadFile, File, HTTPException
# from ..whisper.transcription import transcribe_audio
# from app.llm.client import call_gpt4o_mini

# router = APIRouter()

# @router.post("/audio-feedback")
# async def audio_feedback(file: UploadFile = File(...)):
#     if not file.filename.endswith((".wav", ".mp3", ".m4a", ".webm")):
#         raise HTTPException(status_code=400, detail="Unsupported file type")

#     # 1) 文字起こし実行
#     transcript = await transcribe_audio(file)

#     # 2) LLMにフィードバック依頼 (例外キャッチで原因確認)
#     try:
#         feedback_result = call_gpt4o_mini(transcript)
#         print("== LLMの戻り値 ==", feedback_result)
#     except Exception as e:
#         print("== LLM呼び出しで例外 ==", e)
#         raise HTTPException(status_code=500, detail="LLMの呼び出しに失敗しました")

#     # 3) フラットなレスポンスで返す
#     return {
#         "transcript": transcript,
#         "word_score": feedback_result["word_score"],
#         "flow_score": feedback_result["flow_score"],
#         "expression_score": feedback_result["expression_score"],
#         "hook_score": feedback_result["hook_score"],
#         "confidence_score": feedback_result["confidence_score"],
#         "total_score": feedback_result["total_score"],
#         "well_done": feedback_result["well_done"],
#         "next_challenge": feedback_result["next_challenge"]
#     }



# # app/api/audio.py

# from fastapi import APIRouter, UploadFile, File, HTTPException
# from ..whisper.transcription import transcribe_audio
# from app.llm.client import call_gpt4o_mini

# router = APIRouter()

# @router.post("/audio-feedback")
# async def audio_feedback(file: UploadFile = File(...)):
#     if not file.filename.endswith((".wav", ".mp3", ".m4a", ".webm")):
#         raise HTTPException(status_code=400, detail="Unsupported file type")

#     # 1) 文字起こし実行
#     transcript = await transcribe_audio(file)

#     # 2) LLMにフィードバック依頼 (例外キャッチで原因確認)
#     try:
#         feedback_result = call_gpt4o_mini(transcript)
#         print("== LLMの戻り値 ==", feedback_result)
#     except Exception as e:
#         print("== LLM呼び出しで例外 ==", e)
#         raise HTTPException(status_code=500, detail="LLMの呼び出しに失敗しました")

#     # 3) フラットなレスポンスで返す
#     return {
#         "transcript": transcript,
#         "word_score": feedback_result["word_score"],
#         "flow_score": feedback_result["flow_score"],
#         "expression_score": feedback_result["expression_score"],
#         "hook_score": feedback_result["hook_score"],
#         "confidence_score": feedback_result["confidence_score"],
#         "total_score": feedback_result["total_score"],
#         "well_done": feedback_result["well_done"],
#         "next_challenge": feedback_result["next_challenge"]
#     }

