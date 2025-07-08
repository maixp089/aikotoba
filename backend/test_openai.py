# APIキーの動作確認

from openai import OpenAI

client = OpenAI(
  api_key="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"
)

completion = client.chat.completions.create(
  model="gpt-4o-mini",
  store=True,
  messages=[
    {"role": "user", "content": "write a haiku about ai"}
  ]
)

print(completion.choices[0].message);
