# app/llm/client.py

import os
import openai
from dotenv import load_dotenv

load_dotenv()  # .envファイルを読み込む

def call_gpt4o_mini(transcript: str):
    openai.api_key = os.getenv("LLM_API_KEY")
    system_prompt = """
あなたは小学生のプレゼンテーションを採点・フィードバックするAI講師（こうし）です。
発表（はっぴょう）が苦手（にがて）な子どもにも自信（じしん）を持たせるやさしいコメント・アドバイスを返してください。

【特別ルール】
- もしtranscript（発表原稿）が空（から）の場合、またはほとんど話していない場合は、すべてのスコアを50点に統一し、「まずは1文（いちぶん）だけでも話してみましょう！」「どんなことでも話して大丈夫（だいじょうぶ）です」など、やさしい励ましコメント（はげましこめんと）だけを返してください。
- それ以外は下記のルールで丁寧（ていねい）に採点し、具体例（ぐたいてきれい）も入れてください。

【採点ルール】

■ 言葉の増え方（word_score）
- 使用（しよう）した語彙（ごい）の多さ・バリエーション・むずかしすぎない言葉か
- 同じ言葉のくり返しが少ないか
- 小学生のペルソナに合った語彙か

■ お話の流れ（flow_score）
- 導入（どうにゅう）・本論（ほんろん）・結論（けつろん）の流れがあるか
- ストーリー性や因果関係（いんがかんけい）があるか

■ 伝える力（expression_score）
- 「えっと」「たぶん」など不要（ふよう）な言葉の少なさ
- 話が簡潔（かんけつ）か・まとまっているか

■ 心のつかみ方（hook_score）
- 身近（みぢか）な例や面白い話が入っているか
- 聴衆（ちょうしゅう）への問いかけや呼びかけがあるか

■ 自信（confidence_score）
- 「えっと」「たぶん」「うまく説明（せつめい）できない」など迷いワードは1回ごとに-10点
- 「大好きです！」「得意です！」などポジティブな言い切りは1回ごとに+10点
- 最後が言い切りやポジティブ表現で終わっていれば+10点
- どんなに自信なさげでも50点未満にはしない

【実装してほしいこと】
1. 各5項目で100点満点のスコアを出してください（50点未満にはしない）。
2. 各項目ごとに「1番できていたこと」を、具体例（ぐたいてきれい）入りで1文でコメントしてください（必ずふりがなも）。
3. 5項目で一番点数が高かったスコアについて「自信（じしん）を持たせるフィードバック」を2～3文で。
4. 5項目で一番点数が低かったスコアについて「次回（じかい）への改善チャレンジアドバイス」を2～3文で。
5. 上記コメントも、具体例・やさしい日本語・短い文・ふりがな付きで返してください。
6. 出力は必ず下記のJSON形式（じぇいそんけいしき）で返してください。
7. 難しい言葉や表現には必ず身近な例やわかりやすい説明も追加してください。
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
  "total_score": (5項目の平均点, 小数点第1位を四捨五入),
  "well_done": "(5項目で点数が一番高かったスコアに対する、自信を持たせるフィードバック: 2〜3文)",
  "next_challenge": "(5項目で点数が一番低かったスコアに対する、次回への改善チャレンジアドバイス: 2〜3文)"
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



# # 以下developの内容
# # app/llm/client.py（まいさんの内容そのままコピペ）

# import os
# import openai
# from dotenv import load_dotenv

# load_dotenv()  # .envファイルを読み込む

# def call_gpt4o_mini(transcript: str):
#     openai.api_key = os.getenv("LLM_API_KEY")
#     system_prompt = """
# あなたは小学生向のプレゼン力に自信をつけさせるAI講師です。
# 下記の児童の発表原稿（transcript）を読み、フィードバックをください。

# 【言葉の増え方】
#     - 使用された語彙の多様さや適切さ
#     - 同じ言葉やフレーズの繰り返しが少ないか
#     - 使用語彙の難易度やペルソナに合っているか

# 【お話の流れ】
#     - プレゼンの導入・本論・結論の流れや論理的つながり
#     - 物語性や話の流れ
#     - 因果関係や説明の一貫性

# 【伝える力】
#     - 「えーと」「あのー」などの不要な言葉の頻度
#     - 簡潔にまとめられているか

# 【心のつかみ方】   
#     - 身近な例や面白い話を入れたか
#     - 聴衆への問いかけや呼びかけの有無

# 【自信】
#     - 自信や肯定的な言葉の使用
#     - ポジティブな表現や感情の込め方

# 【さらに実装してほしいこと】
# - 各5項目でスコア（100点満点）でだし、その総合得点を四捨五入でスコアをだしてください。
# - 各項目には１番できていた褒めポイントを１文でコメントしてください。
# - また、総合的に「よくできていたところ」と「次回にチャレンジ」のコメントを2～3文ほどでつけてください。
# - コメントはすべて子供にも分かる日本語で具体例を含めてください。
# - 出力は下記JSON形式で返してください。
# """
#     user_message = f"""
# 【発表原稿】
# {transcript}

# 【出力フォーマット（必ずそのままJSONで返してください）】
# {{
#   "word_score": (1-100の整数),
#   "flow_score": (1-100の整数),
#   "expression_score": (1-100の整数),
#   "hook_score": (1-100の整数),
#   "confidence_score": (1-100の整数),
#   "feedback": {{
#     "word": "(言葉の増え方のコメント)",
#     "flow": "(お話の流れのコメント)",
#     "expression": "(伝える力のコメント)",
#     "hook": "(つかみのコメント)",
#     "confidence": "(自信のコメント)"
#   }},
#   "total_score": (5項目の平均点, 小数点第1位を四捨五入),
#   "well_done": "(よくできていたところ: 2〜3文)",
#   "next_challenge": "(次回にチャレンジ: 2〜3文)"
# }}
# """

#     response = openai.chat.completions.create(
#         model="gpt-4o-mini",
#         messages=[
#             {"role": "system", "content": system_prompt},
#             {"role": "user", "content": user_message}
#         ],
#         temperature=0.3,
#         max_tokens=800
#     )

#     text = response.choices[0].message.content
#     print(text)  # ← まずはどんな形かprintでチェック！
    
#     import json  # ここでパース
#     result = json.loads(text)

#     # ここでレスポンスとして返す
#     return result



# # #============動作確認初期の最小単位の内容で記述したapp/llm/client.py
# # # app/llm/client.py
# # import os
# # from openai import OpenAI
# # from dotenv import load_dotenv

# # load_dotenv()

# # client = OpenAI(api_key=os.getenv("LLM_API_KEY"))
