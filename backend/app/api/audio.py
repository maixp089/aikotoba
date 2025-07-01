# app/api/audio.py

from fastapi import APIRouter, UploadFile, File, HTTPException
from ..whisper.transcription import transcribe_audio

router = APIRouter()

@router.post("/audio-to-text")
async def audio_to_text(file: UploadFile = File(...)):
    if not file.filename.endswith((".wav", ".mp3", ".m4a")):
        raise HTTPException(status_code=400, detail="Unsupported file type")

    text = await transcribe_audio(file)
    return {"text": text}
