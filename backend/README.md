# あいことば🤖 バックエンド README

## 📋 プロジェクト概要

本バックエンドは、**FastAPI** を用いたWeb APIサーバーです。  
音声認識（Whisper）、AIフィードバック（OpenAI GPT）、ユーザー・発表・スコア管理など、プレゼン練習アプリの中核ロジックを担います。

- **決済API（Stripe）**: Stripeを利用した有料機能の決済APIを提供
- **API設計書・ER図・DB設計書**は [docs/](../docs/) を参照してください。

---

## 🛠 技術スタック・主要ライブラリ

- Python 3.10 以上
- FastAPI
- SQLAlchemy / Alembic
- PostgreSQL
- OpenAI API（Whisper, GPT）
- Docker / Docker Compose
- Stripe（決済API）
- その他: requirements.txt 参照

### requirements.txt 抜粋

```
fastapi
uvicorn
sqlalchemy
alembic
psycopg2-binary
python-dotenv
openai>=0.27.0
python-multipart
```

---

## 🏗️ ディレクトリ構成

```
backend/
├── app/
│   ├── api/                # APIルーター群
│   │   ├── users.py          # user関連
│   │   ├── score.py          # 評価関連
│   │   ├── audio.py          # 音声認識→フィードバック
│   │   ├── audio_feedback.py # 記録ページ
│   ├── db/                 # DB関連
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── database.py
│   │   └── seed.py
│   ├── llm/                # LLM（GPT）連携
│   │   └── client.py
│   ├── whisper/            # Whisper連携
│   │   ├── client.py
│   │   └── transcription.py
│   └── main.py        # エントリーポイント
├── stripe-demo/        # Stripe決済デモAPIサーバー（決済機能用）
├── alembic/           # マイグレーション
├── alembic.ini
├── requirements.txt
└── ...
```

---

## 🚀 開発環境構築・起動手順

### 1. 前提条件

- Docker / Docker Compose
- Git

### 2. リポジトリ取得

```bash
git clone https://github.com/ms-engineer-bc25-04/sec9_teamB.git
cd sec9_teamB
```

### 3. .envファイル作成

- backend/stripe-demo内に `.env` ファイルを作成し、下記のように記載してください。
```env
STRIPE_SECRET_KEY=sk_test_xxx    
``` 
[※全ての環境変数設定（共通セットアップ手順）](./README.md) 

### 4. Dockerで起動

```bash
docker compose up -d --build
cd backend/stripe-demo
npm install
node server.js   # Stripe決済サーバー起動
```

- FastAPI（swagger）: [http://localhost:8000/docs](http://localhost:8000/docs)
- pgAdmin: [http://localhost:5050](http://localhost:5050)  
  （初期ログインは `docker-compose.yml` 参照）
- Stripe決済API: [http://localhost:4242](http://localhost:4242)

### コンテナ起動状況を確認

```bash
docker ps
```

下記3つのコンテナが起動していればOK。

* `fastapi_backend`（FastAPIアプリ）
* `postgres_db`（PostgreSQLデータベース）
* `pgadmin`（PostgreSQL管理用GUI）


### 5. マイグレーション・初期データ投入

1. **マイグレーションファイルを自動生成**

```bash
docker compose exec backend alembic revision --autogenerate -m "create users table"
```

2. **マイグレーション適用・初期データ投入**

```bash
docker compose exec backend alembic upgrade head
docker compose exec backend python app/db/seed.py
```

---


## 🔌 API概要

- GET `/` ... 動作確認
- GET `/users/search?firebase_uid=xxx` ... Firebase UIDでユーザー検索
- POST `/users/` ... ユーザー新規作成
- GET `/users/{user_id}` ... ユーザー詳細取得
- GET `/users/{user_id}/scores` ... 発表スコア履歴取得
- POST `/api/audio-feedback` ... 音声ファイルアップロード→文字起こし＋AIフィードバック
- GET `/api/audio-feedback/{feedback_id}` ... フィードバック詳細取得
- POST `/users/{user_id}/paid` ... ユーザーの有償フラグ（paid）をtrueにする（決済完了後に呼び出し）

> 詳細なAPI仕様・リクエスト/レスポンス例は [docs/API.md](../docs/API.md) を参照

---

## 🧩 実装のポイント

### 1. CORS設定

- フロントエンド（例: `http://localhost:5173`）からのAPIアクセスを許可

### 2. DBマイグレーション

- Alembicでスキーマ管理
- `alembic.ini`/`alembic/` ディレクトリ参照

### 3. Whisper連携

- `app/whisper/transcription.py` で音声→テキスト変換
- OpenAI Whisper API利用

### 4. GPT連携

- `app/llm/client.py` でOpenAI GPT-4o-miniを呼び出し
- ふりがな付き日本語フィードバックを自動生成

### 5. 音声アップロードAPI

- `/api/audio-feedback` で音声ファイルを受け取り
- 文字起こし→AIフィードバック→DB保存→結果返却

### 6. 決済API（Stripe）

- Stripeを利用した決済APIサーバー（`stripe-demo/` ディレクトリ）を同梱
- エンドポイント例：
  - POST `/create-checkout-session` ... Stripe Checkoutセッション作成
- 詳細は `backend/stripe-demo/server.js` を参照

### 7. スキーマ例（Pydantic）

```python
class User(BaseModel):
    id: UUID
    firebase_uid: str
    name: str
    age: int | None
    icon_image: str | None
    created_at: datetime
    class Config:
        orm_mode = True
```

---

## 📝 DB・モデル設計

- モデル定義は `app/db/models.py` を参照
- Alembicでマイグレーション管理
- ER図・詳細設計は [docs/DB.md](../docs/DB.md) 参照

---

## 🐳 Docker構成

- `backend` ... FastAPIアプリ
- `db` ... PostgreSQL
- `pgadmin` ... DB管理GUI

```yaml
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    env_file:
      - .env
    depends_on:
      - db
  db:
    image: postgres:15
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
  pgadmin:
    image: dpage/pgadmin4
    ports:
      - "5050:80"
    depends_on:
      - db
volumes:
  postgres_data:
```

---

## 🐛 トラブルシューティング

- **DB接続エラー**: .envのDB設定、PostgreSQLの起動確認
- **API認証エラー**: OpenAI/WhisperのAPIキー確認
- **マイグレーション失敗**: Alembicのバージョン・DBスキーマ確認
- **CORSエラー**: フロントエンドURLの許可設定を確認

---

## 📚 参考・ドキュメント

- [FastAPI公式](https://fastapi.tiangolo.com/ja/)
- [SQLAlchemy](https://docs.sqlalchemy.org/ja/latest/)
- [Alembic](https://alembic.sqlalchemy.org/en/latest/)
- [OpenAI API](https://platform.openai.com/docs/)
- [PostgreSQL](https://www.postgresql.jp/)

---

## 📝 その他

- コーディング規約・詳細設計は [docs/Coding_Style.md](../docs/Coding_Style.md) 参照
- API設計・DB設計は [docs/API.md](../docs/API.md), [docs/DB.md](../docs/DB.md) 参照

---

このREADMEは随時アップデートされます。不明点はチームまでご相談ください。



