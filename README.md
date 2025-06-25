# sec9_teamB

# 役割分担

## タスク

- 設計(要件定義)まい
- 技術調査・技術選定

　　全員で

- **画面設計、DB設計、API設計**

　　画面設計：ともみさん<br>

　　DB設計：しおりさん<br>
　　API設計：のりこさん<br>

- 非機能要件設計<br>
  品質保証（静的解析、テスト、カバレッジ）：しおりさん<br>

　　セキュリティ対策設計：まい<br>

- (開発環境構築)<br>

　　フロント：ともみさん<br>

　　バック：のりこさん<br>

　　DB：しおりさん<br>


## ディレクトリ構成（6/25現在）

```
project-root/
├── frontend/                    # フロントエンド（Next.js）
│
├── backend/                     # バックエンド（FastAPI）
│   ├── app/                     # FastAPIアプリ本体
│   │   ├── main.py              # FastAPIエントリポイント
│   │   ├── api/                 # ルーティング（順次追加）
│   │   ├── db/                  # DB関連（models, crud, schemas, connect）
│   │   │   ├── database.py　　　 # SQLAlchemyの接続設定・セッション管理
│   │   │   ├── models.py　　　　 # テーブル定義（ORMモデルクラス）
│   │   │   ├── crud.py　　　　　 # 各モデルに対するCRUD処理関数
│   │   │   └── schemas.py　　　　# Pydanticでのデータバリデーション（入出力用）
│   │   └── core/                # 設定・認証（必要なら）
│   │       └── config.py       # 環境変数の読み込みやアプリ共通設定を管理
│   ├── requirements.txt        #Pythonで使う外部ライブラリの一覧を記述
│   └── Dockerfile              #コンテナの設計を定義
│
├── docker-compose.yml           # バックエンド + DB 起動管理
├── .env                         # DB接続情報など
└── README.md
```