# app/llm/schemas.py（まいさんの内容そのままコピペ）

from pydantic import BaseModel
from typing import Dict

class FeedbackRequest(BaseModel):
    # ユーザーからもらう内容
    transcript: str

class FeedbackContent(BaseModel):
    word: str
    flow: str
    expression: str
    hook: str
    confidence: str

class FeedbackResponse(BaseModel):
    word_score: int
    flow_score: int
    expression_score: int
    hook_score: int
    confidence_score: int
    feedback: FeedbackContent
    total_score: int
    well_done: str
    next_challenge: str