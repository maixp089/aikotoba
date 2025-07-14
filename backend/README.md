# バックエンド開発環境構築手順（Docker利用）

バックエンド（FastAPI）、DB（PostgreSQL・pgAdmin）の3つのDockerコンテナを利用。 環境構築手順は下記の通り。

---

## 前提条件

- DockerおよびDocker Composeがインストールされていること
- Gitリポジトリをローカルにクローン済みであること

---

## 環境起動手順

1. **リポジトリをクローンまたは最新取得**

```bash
git clone <リポジトリURL>
cd <プロジェクトディレクトリ>
git checkout feature/setup-backend-db  # 必要に応じてブランチ切り替え
````

2. **Dockerコンテナをビルド＆起動**

```bash
docker compose up -d --build
```

3. **コンテナ起動状況を確認**

```bash
docker ps
```

下記3つのコンテナが起動していればOK。

* `fastapi_backend`（FastAPIアプリ）
* `postgres_db`（PostgreSQLデータベース）
* `pgadmin`（PostgreSQL管理用GUI）

---

## DBマイグレーションと初期データ投入

1. **マイグレーションファイルを自動生成**

```bash
docker compose exec backend alembic revision --autogenerate -m "create users table"
```

2. **マイグレーションを適用**

```bash
docker compose exec backend alembic upgrade head
```

3. **ダミーデータを投入**

```bash
docker compose exec backend python app/db/seed.py
```

---

## 確認

* FastAPI APIの動作確認

```bash
curl http://localhost:8000
```

* Swagger UIにアクセス

[http://localhost:8000/docs](http://localhost:8000/docs)

* pgAdminにアクセスしてDBを管理

[http://localhost:5050](http://localhost:5050)
ログイン情報は `.env` または `docker-compose.yml` に記載

---

## コンテナ停止・削除

```bash
docker compose down
```

---

## 注意事項

* `.env` ファイルの設定は環境に合わせて変更する
---

## 使用技術・依存ライブラリ
- Python 3.10以上
- FastAPI
- SQLAlchemy
- Alembic
- PostgreSQL
- OpenAI API（Whisper, GPT）
- その他: requirements.txt 参照

### 主要依存パッケージ（抜粋）
- fastapi
- uvicorn
- sqlalchemy
- alembic
- psycopg2-binary
- python-dotenv
- openai
- python-multipart

---

## セットアップ手順（Docker未使用の場合）

1. Python仮想環境の作成（推奨）
```bash
python -m venv venv
source venv/bin/activate  # Windowsは venv\Scripts\activate
```
2. 依存パッケージのインストール
```bash
pip install -r requirements.txt
```

---

## 開発・テスト・起動コマンド

- 開発サーバー起動（ローカル）
```bash
uvicorn app.main:app --reload
```
- マイグレーション
```bash
alembic upgrade head
```
- テスト（pytest等を導入した場合）
```bash
pytest
```

---

## 環境変数設定例（.envサンプル）

```
# .env.example
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
OPENAI_API_KEY=sk-xxxxxxx
SECRET_KEY=your_secret_key
```

---

## APIエンドポイント概要（例）

- GET `/` ... 動作確認用
- GET `/users` ... ユーザー一覧取得
- POST `/users` ... ユーザー新規作成
- GET `/users/{user_id}` ... ユーザー詳細取得
- DELETE `/users/{user_id}` ... ユーザー削除
- GET `/score` ... スコア取得
- POST `/audio/upload` ... 音声アップロード
- POST `/audio/transcribe` ... 音声→テキスト変換

詳細は [docs/API.md](../docs/API.md) も参照してください。

---

以上