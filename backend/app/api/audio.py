# app/api/audio.py

from fastapi import APIRouter, UploadFile, File, HTTPException
from ..whisper.transcription import transcribe_audio
from app.llm.client import call_gpt4o_mini

router = APIRouter()

@router.post("/audio-feedback")
async def audio_feedback(file: UploadFile = File(...)):
    if not file.filename.endswith((".wav", ".mp3", ".m4a", ".webm")):
        raise HTTPException(status_code=400, detail="Unsupported file type")

    # 1) 文字起こし実行
    transcript = await transcribe_audio(file)

    # 2) LLMにフィードバック依頼
    feedback_result = call_gpt4o_mini(transcript)

    # 3) 文字起こしとフィードバックをまとめて返す
    return {
        "transcript": transcript,
        "feedback": feedback_result
    }



# WhisperとLLMのエンドポイント統合前
# # app/api/audio.py

# from fastapi import APIRouter, UploadFile, File, HTTPException
# from ..whisper.transcription import transcribe_audio

# router = APIRouter()

# @router.post("/audio-to-text")
# async def audio_to_text(file: UploadFile = File(...)):
#     if not file.filename.endswith((".wav", ".mp3", ".m4a", ".webm")):
#         raise HTTPException(status_code=400, detail="Unsupported file type")

#     text = await transcribe_audio(file)
#     return {"text": text}

