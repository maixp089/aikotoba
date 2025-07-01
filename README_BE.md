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

以上


