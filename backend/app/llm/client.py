# app/llm/client.py（まいさんの内容そのままコピペ）

import os
import openai
from dotenv import load_dotenv

load_dotenv()  # .envファイルを読み込む

def call_gpt4o_mini(transcript: str):
    openai.api_key = os.getenv("LLM_API_KEY")
    system_prompt = """
あなたは小学生向のプレゼン力に自信をつけさせるAI講師です。
下記の児童の発表原稿（transcript）を読み、フィードバックをください。

【言葉の増え方】
    - 使用された語彙の多様さや適切さ
    - 同じ言葉やフレーズの繰り返しが少ないか
    - 使用語彙の難易度やペルソナに合っているか

【お話の流れ】
    - プレゼンの導入・本論・結論の流れや論理的つながり
    - 物語性や話の流れ
    - 因果関係や説明の一貫性

【伝える力】
    - 「えーと」「あのー」などの不要な言葉の頻度
    - 簡潔にまとめられているか

【心のつかみ方】   
    - 身近な例や面白い話を入れたか
    - 聴衆への問いかけや呼びかけの有無

【自信】
    - 自信や肯定的な言葉の使用
    - ポジティブな表現や感情の込め方

【さらに実装してほしいこと】
- 各5項目でスコア（100点満点）でだし、その総合得点を四捨五入でスコアをだしてください。
- 各項目には１番できていた褒めポイントを１文でコメントしてください。
- また、総合的に「よくできていたところ」と「次回にチャレンジ」のコメントを2～3文ほどでつけてください。
- コメントはすべて子供にも分かる日本語で具体例を含めてください。
- 出力は下記JSON形式で返してください。
"""
    user_message = f"""
【発表原稿】
{transcript}

【出力フォーマット（必ずそのままJSONで返してください）】
{{
  "word_score": (1-100の整数),
  "flow_score": (1-100の整数),
  "expression_score": (1-100の整数),
  "hook_score": (1-100の整数),
  "confidence_score": (1-100の整数),
  "feedback": {{
    "word": "(言葉の増え方のコメント)",
    "flow": "(お話の流れのコメント)",
    "expression": "(伝える力のコメント)",
    "hook": "(つかみのコメント)",
    "confidence": "(自信のコメント)"
  }},
  "total_score": (5項目の平均点, 小数点第1位を四捨五入),
  "well_done": "(よくできていたところ: 2〜3文)",
  "next_challenge": "(次回にチャレンジ: 2〜3文)"
}}
"""

    response = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ],
        temperature=0.3,
        max_tokens=800
    )

    text = response.choices[0].message.content
    print(text)  # ← まずはどんな形かprintでチェック！
    
    import json  # ここでパース
    result = json.loads(text)

    # ここでレスポンスとして返す
    return result



# #============動作確認初期の最小単位の内容で記述したapp/llm/client.py
# # app/llm/client.py
# import os
# from openai import OpenAI
# from dotenv import load_dotenv

# load_dotenv()

# client = OpenAI(api_key=os.getenv("LLM_API_KEY"))
