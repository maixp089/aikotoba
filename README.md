# 🤖あいことば🤖

## 概要（What’s this?）
あいことばは、小学4年生（10歳）くらいの子どもたちを主な対象とした「自分の考えを自信を持って話す力」を育てるWebアプリです。
プレゼンを録音・AIがフィードバック・点数化・ランキング形式で、楽しみながらプレゼン力を高められます。

---

## 目的・背景（Why this app?）
日本の子どもは「みんなの前で発表するのが苦手」「自分の意見を伝える自信がない」傾向が強い。
学校や家庭だけでは体系的なプレゼン教育や語彙力のトレーニング機会が少ない。
授業や発表の場で自分の言葉で意見を伝えられるようになりたい。
そんな子どもたちが、皆の前で自信を持って発表できるためのアプリです！

---

## 主な機能（Features）

- 音声認識
  - 発表を録音すると、AIが音声をテキストに変換（音声認識）
  - 変換されたテキストをもとに、AIがフィードバックや採点を自動で生成
- AIによる自動フィードバック  
  音声データをAIが解析し、下記の5項目の観点で採点・総合スコアとアドバイスを返します。
    - 語彙力（言葉の増え方）
    - 論理性（お話の流れ）
    - 伝える力
    - 聴衆の心のつかみ方
    - 自信
- 最高スコアがマイページに表示されます。
- 決済機能（Stripe連携 
  - Stripeを利用した有料機能の決済が可能です。

---

## 技術構成（Tech stack）
| 項目           | 技術／サービス名                             | 備考・説明                        |
|----------------|------------------------------------------|---------------------------------|
| フロントエンド  | React（Vite）＋ TypeScript                | UI構築／SPA                     |
| バックエンド    | FastAPI（Python）                         | Web APIサーバー                 |
| DB             | PostgreSQL                                | データ永続化                    |
| 音声録音       | MediaRecorder API（Web標準）              | ブラウザ上での音声録音           |
| 音声認識       | OpenAI Whisper                            | 音声→テキスト変換               |
| AI解析         | GPT-4o-mini                               | フィードバック生成／自動採点     |
| 認証           | Firebase Authentication（Googleログイン）  | 安全なログイン・ユーザー管理      |
| 決済       | Stripe                               | 有料機能の決済処理          |

---

## 各種リンク（Useful Links）

### 🟦 ローカルサービス（Local Services）

- [pgAdmin (http://localhost:5050)](http://localhost:5050) — PostgreSQL管理ツール（pgAdmin）
- [バックエンドAPI (http://localhost:8000)](http://localhost:8000) — FastAPIサーバー（APIドキュメント: /docs）
- [Stripeデモサーバー (http://localhost:4242)](http://localhost:4242) — Stripe決済デモサーバー
- [フロントエンド (http://localhost:5173)](http://localhost:5173) — Reactフロントエンド

### 🟦 API関連

- [API設計書 / API Documentation (API.md)](./docs/API.md)
- [DB設計書 / DB Documentation (DB.md)](./docs/DB.md)
- [ER図イメージ / ER Diagram](./docs/aikotoba.er.png)

### 🟩 テスト関連（Testing）

- [テスト設計書 / Test Design Document](./docs/Test_Design_Document.md)
- [テスト報告書 / Test Report](./docs/Test_Report.md)

### 🟨 開発・その他（Development & Others）

- [フロントエンドREADME / Frontend README](./frontend/README.md)
- [バックエンドREADME / Backend README](./backend/README.md)
- [コーディング規約 / Coding Guidelines](./docs/Coding_Style.md)
- [シェルスクリプト使い方 / Shell Script Usage](./docs/sh.info.md)

---

## ディレクトリ構成（Directory Structure）

### 1. プロジェクト直下
```
sec9_teamB/
├── backend/           # バックエンド（fastAPIサーバー）
│   └── stripe-demo/   # Stripe決済デモAPIサーバー（決済機能用）
├── frontend/          # フロントエンド（Reactアプリ）
├── docs/              # ドキュメント類
├── docker-compose.yml # Docker構成ファイル
├── README.md          # プロジェクト説明
├── tool.sh            # シェルスクリプト
├── .env               # 直ルートenvファイル（postgre関連、Whisper_API_key、LLM_API_key）Git管理外
└── ...
```

### 2. フロントエンド（frontend/）
```
frontend/
├── src/
│   ├── components/    # 再利用可能なReactコンポーネント
│   ├── pages/         # 画面単位のコンポーネント
│   ├── assets/        # 画像・フォント等（背景等）
│   ├── lib/           # ライブラリ・ユーティリティ
│   ├── mocks/         # モックデータ
│   ├── App.tsx        # ルートコンポーネント
│   └── main.tsx       # エントリーポイント
├── public/            # 画像（アイコン等）
├── package.json       # npmパッケージ管理
├── .env               # front側envファイル（Firebase、stripe関連）
└── ...
```

### 3. バックエンド（backend/）
```
backend/
├── app/
│   ├── api/           # APIエンドポイント
│   ├── db/            # データベース関連（models, schemas, crud等）
│   ├── llm/           # LLM連携関連
│   ├── whisper/       # Whisper連携関連
│   └── main.py        # FastAPIエントリーポイント
├── stripe-demo/       # 決済機能関連
├── alembic/           # マイグレーション管理
├── requirements.txt   # Python依存パッケージ
├── .env               # backend側envファイル（STRIPE_SECRET_KEY）
└── ...
```
---

## 開発ルール（Development Rules）
### 1. ブランチ運用

#### 1-1. ブランチの命名規則

- **開発ブランチ**: `develop`
    - 最新の統合ブランチ
    - 直接コミットせず、Pull Request (PR)を通じてのみマージする
- **機能開発ブランチ**: `feature/xxx_name` 
    - 新しい機能を開発するためのブランチ
    - `develop`ブランチから派生させる

#### 1-2. ブランチ作成ルール

- 新しいタスクごとにブランチを作成する
- 作業終了後は、PRを通じて`develop`へマージする

#### 2-1. ブランチ作成からマージまでのフロー

1. `develop`ブランチから`feature/xxx`（xxxは機能）ブランチを切る。
2. そのブランチで開発する。
3. PRを作成する。
4. PRをレビューする。
5. PRを承認する。
    1. 修正がある場合はPRコメント機能でPR作成者に返す。
    2. 修正後、再度同一ブランチでcommit, pushすると同一PRに自動的に追加される。
6. `develop`ブランチへマージする。

#### 2-2. PR記載項目

- PRテンプレート使用
    - PRタイトルは「feature/xxxからdevelopにPR」
    - やったこと
    - 確認したこと
    - 作業者
    - 補足 (スクショなど)
- メンバーへのメンション: プルリクが出たことの周知

#### 2-3. レビュー

- 1人のレビュアーによる承認が必要 ⇨ PR対応可能な人が対応: プルリクコメントに 👀 を付ける。
- 大きな変更は、細かくPRを分割する。
- レビュー後の修正では再度承認を得る (2-1.の手順5参照)。

#### 2-4. マージルール

- `main`や`develop`への直接マージは禁止。必ずPRを通す。
- 細かくPRとマージを行い、コンフリクトを最小化する。

### 3. コミットメッセージ規則

- fix：バグ修正
- add：新規（ファイル）機能追加
- update：機能修正（バグではない）
- remove：削除（ファイル）

---

## 共通セットアップ手順(General Setup Instructions)

### 1. リポジトリのクローン
```bash
git clone https://github.com/ms-engineer-bc25-04/sec9_teamB.git
cd sec9_teamB
```

### 2. 必要なバージョン
- Node.js: v18以上推奨
- Python: 3.10以上推奨
- Docker/Docker Compose（推奨）

### 3. サブディレクトリごとのセットアップ
- フロントエンド: [frontend/README.md](./frontend/README.md) を参照
- バックエンド: [backend/README.md](./backend/README.md) を参照

---

## .envファイルの設定

- プロジェクト直下に `.env` ファイルを作成し、下記のように記載してください。

```env
# --- データベース(PostgreSQL)設定 ---
POSTGRES_DB=app_db             
POSTGRES_USER=app_user          
POSTGRES_PASSWORD=securepassword 
POSTGRES_HOST=db               
POSTGRES_PORT=5432              

# --- OpenAI Whisper APIキー ---
WHISPER_API_KEY=sk-xxxxxxx     

# --- OpenAI GPT/LLM APIキー ---
LLM_API_KEY=sk-xxxxxxx         
```

- frontend側に `.env` ファイルを作成し、下記のように記載してください。
```env
# --- Firebase設定 ---
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# --- Stripe（決済）用公開キー ---
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxx  
```
- backend/stripe-demo内に `.env` ファイルを作成し、下記のように記載してください。
```env
STRIPE_SECRET_KEY=sk_test_xxx    
```  
---

## ライセンス
- MIT License  
このアプリはMs.Engineer2504teamBが開発しています。

---