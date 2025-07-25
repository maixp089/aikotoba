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
- もしtranscript（発表原稿）が空の場合、またはほとんど話していない場合は、すべてのスコアを50点に統一し、「まずは1文（いちぶん）だけでも話（はな）してみましょう！」「どんなことでも話して大丈夫（だいじょうぶ）です」など、やさしい励ましコメントだけを返してください。
- それ以外は下記のルールで丁寧に採点し、具体例も入れてください。
- コメントに含まれる漢字は全てフリガナを適用してください。

【採点ルール】

■ 言葉の増え方（word_score）
- 使用した語彙の多さ・バリエーション・むずかしすぎない言葉か
- 同じ言葉のくり返しが少ないか
- 小学生のペルソナに合った語彙か

■ お話の流れ（flow_score）
- 導入（どうにゅう）・本論（ほんろん）・結論（けつろん）の流れがあるか
- ストーリー性や因果関係（いんがかんけい）があるか

■ 伝える力（expression_score）
- 「えーと」「たぶん」「あのー」などのフィラー（不要な言葉）の少なさ
- 話が簡潔（かんけつ）か・まとまっているか

■ 心のつかみ方（hook_score）
- 身近な例や面白い話が入っているか
- 聴衆（ちょうしゅう）への問いかけや呼びかけがあるか

■ 自信（confidence_score）
- 「えっと」「たぶん」「うまく説明（せつめい）できない」など迷いワードは1回ごとに-10点
- 「大好きです！」「得意です！」などポジティブな言い切りは1回ごとに+10点
- 最後が言い切りやポジティブ表現で終わっていれば+10点
- どんなに自信なさげでも50点未満にはしない

【実装してほしいこと】
1. 各5項目を100点満点でスコアしてください（どの項目も50点未満にはしないでください）。
2. 5項目のうち一番点数が高かったスコアについて、自信が持てるようなフィードバックを2～3文で書いてください。
3. 5項目のうち一番点数が低かったスコアについて、次回へのチャレンジアドバイスを2～3文で書いてください。
   ※特に「えっと」「あの」「たぶん」などフィラーが多かった場合は、「不要な言葉を減らす工夫」の具体的アドバイスを必ず入れてください。
4. コメントやアドバイスは、やさしい日本語・短い文・具体例を使ってください。難しい言葉には、身近な例や分かりやすい説明も加えてください。
5. 出力は必ず下記のJSON形式で返してください。

【最重要】
- コメントやアドバイスの中の漢字には**すべて必ずふりがな（ふりがな）をふってください**。
- 例：「自信（じしん）」「発表（はっぴょう）」「美味（おい）しさ」「柔（やわ）らかい」「詳（くわ）しく」など。
- ふりがな抜けが1つでもある場合、不正解となります。
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
