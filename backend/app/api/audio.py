# app/api/audio.py

from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from sqlalchemy.orm import Session
from ..whisper.transcription import transcribe_audio
from app.llm.client import call_gpt4o_mini
from app.db.database import get_db
from app.db import crud, schemas

router = APIRouter()

@router.post("/audio-feedback")
async def audio_feedback(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),  # ← DBセッションを取得するための依存注入。DB操作に必須。
):
    # ファイル形式のチェック。対応していない拡張子なら400エラーを返す
    if not file.filename.endswith((".wav", ".mp3", ".m4a", ".webm")):
        raise HTTPException(status_code=400, detail="Unsupported file type")

    # 音声ファイルの文字起こしを非同期で実行
    transcript = await transcribe_audio(file)

    # LLMで文字起こしテキストに対してフィードバックを取得
    try:
        feedback_result = call_gpt4o_mini(transcript)
        print("== LLMの戻り値 ==", feedback_result)
    except Exception as e:
        print("== LLM呼び出しで例外 ==", e)
        raise HTTPException(status_code=500, detail="LLMの呼び出しに失敗しました")

    # DBに保存するためのPydanticスキーマを作成
    feedback_in = schemas.FeedbackCreate(
        transcript=transcript,
        word_score=feedback_result.get("word_score"),
        flow_score=feedback_result.get("flow_score"),
        expression_score=feedback_result.get("expression_score"),
        hook_score=feedback_result.get("hook_score"),
        confidence_score=feedback_result.get("confidence_score"),
        total_score=feedback_result.get("total_score"),
        well_done=feedback_result.get("well_done"),
        next_challenge=feedback_result.get("next_challenge"),
        # user_idやpresentation_idなど必要なフィールドもあればここでセット
    )

    # crud.pyのcreate_feedback関数を呼び、DBにデータを保存
    feedback_db = crud.create_feedback(db, feedback_in)

    # 保存したDBレコードをレスポンスとして返す
    return feedback_db


# # #　============以下developの内容============
# # # app/api/audio.py
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

