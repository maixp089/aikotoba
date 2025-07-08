# app/whisper/transcription.py

import io
from fastapi import UploadFile
from app.whisper.client import client  # Whisper専用クライアントを使うように変更

async def transcribe_audio(file: UploadFile) -> str:
    contents = await file.read()
    audio_file = io.BytesIO(contents)
    audio_file.name = file.filename

    transcript = client.audio.transcriptions.create(
        file=audio_file,
        model="whisper-1"
    )
    return transcript.text
