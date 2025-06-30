from fastapi import FastAPI, UploadFile, File, HTTPException
import io
import os
from openai import OpenAI
from dotenv import load_dotenv

# .envファイルから環境変数を読み込む
load_dotenv()

app = FastAPI()

# OpenAIクライアントを環境変数からAPIキーで初期化
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# 動作確認用のルート（アクセスするとメッセージを返す）

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI + Docker!"}

# 音声ファイルを受け取ってWhisper APIで文字起こしするエンドポイント
@app.post("/api/audio-to-text")
async def audio_to_text(file: UploadFile = File(...)):
    # 対応ファイル形式チェック（wav, mp3, m4aのみ受け付け）
    if not file.filename.endswith((".wav", ".mp3", ".m4a")):
        raise HTTPException(status_code=400, detail="Unsupported file type")

    # アップロードされたファイルをバイトデータとして読み込む
    contents = await file.read()
    # バイトデータをファイルオブジェクト風にラップ
    audio_file = io.BytesIO(contents)
    audio_file.name = file.filename  # Whisper APIにファイル名を伝えるため設定

    # Whisper APIに音声ファイルを送って文字起こし結果を取得
    transcript = client.audio.transcriptions.create(
        file=audio_file,
        model="whisper-1"
   )


    # 文字起こしテキストをJSON形式で返す
    return {"text": transcript.text}
