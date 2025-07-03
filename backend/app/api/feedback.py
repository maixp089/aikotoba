# フロントからの呼び出し不要なのでルーティングから外す（廃止）








# # /app/api/feedback.py（まいさんの内容そのままコピペ）

# from fastapi import APIRouter
# from app.llm.client import call_gpt4o_mini
# from app.llm.schemas import FeedbackRequest, FeedbackResponse 

# router = APIRouter()

# @router.post("/feedback", response_model=FeedbackResponse)
# def get_feedback(request: FeedbackRequest):
#     result = call_gpt4o_mini(request.transcript)
#     return FeedbackResponse(
#         word_score=result["word_score"],
#         flow_score=result["flow_score"],
#         expression_score=result["expression_score"],
#         hook_score=result["hook_score"],
#         confidence_score=result["confidence_score"],
#         feedback=result["feedback"],
#         total_score=result["total_score"],
#         well_done=result["well_done"],
#         next_challenge=result["next_challenge"]
#     )