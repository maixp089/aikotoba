# app/backend/Dockerfile

# 最新かつ安定版のベースイメージ（脆弱性対策として bullseye を明記）
FROM python:3.11-slim-bullseye

# 作業ディレクトリの作成
WORKDIR /app

# OSパッケージのセキュリティアップデート（脆弱性対策）
RUN apt-get update && apt-get upgrade -y && apt-get clean

# Python依存関係をインストール
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# アプリケーション本体をコピー
COPY ./app ./app

# test_openai.py をコピー
COPY ./test_openai.py ./test_openai.py

# サーバー起動コマンド（FastAPI）
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]