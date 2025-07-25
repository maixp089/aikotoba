# コーディング規約

このドキュメントは、本プロジェクトのフロントエンド（TypeScript/React）およびバックエンド（Python/FastAPI）におけるコーディング規約をまとめたものです。プロジェクトの品質・可読性・保守性向上のため、必ず遵守してください。

---

## フロントエンド（TypeScript/React）

### 基本方針
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) を参考にしたルールを採用します。
- 型安全性を重視し、TypeScriptの型定義を徹底してください。
- 関数コンポーネント＋フックを推奨します。

### コーディングルール
- インデントはスペース2つ。
- セミコロンは必ず付ける。
- シングルクォート（'）を推奨。
- 1行の長さは最大100文字。
- JSX内のpropsは1行1プロパティ。
- 不要なconsole.logやデバッグコードはコミットしない。
- 変数・関数名はキャメルケース（例: userName, fetchData）。
- ファイル名はパスカルケースまたはキャメルケース（例: MyComponent.tsx, userApi.ts）。
- 型定義は明示的に（anyの多用禁止）。
- React Hooksは適切に使用。
- 不要なimportは削除。

### 推奨ツール
- Linter: `eslint`（Airbnb設定推奨）
- フォーマッター: `prettier`
- 型チェック: `typescript`

#### 導入例
```bash
npm install --save-dev eslint prettier eslint-config-airbnb eslint-plugin-react eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react-hooks @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

---

## バックエンド（Python/FastAPI）

### 基本方針
- [PEP8](https://pep8ja.readthedocs.io/ja/latest/) に準拠します。
- 可読性・一貫性・シンプルさを重視します。

### コーディングルール
- インデントはスペース4つ。
- 1行の長さは最大79文字。
- 関数・変数名はスネークケース（例: user_name, fetch_data）。
- クラス名はパスカルケース（例: UserModel, ApiClient）。
- 型アノテーションを積極的に使用。
- 不要なimportや未使用変数は削除。
- ドキュメンテーション文字列（docstring）を関数・クラスに記載。
- 例外処理は適切に（try-exceptの乱用禁止）。
- SQLAlchemyモデルやスキーマは明確に分離。
- secretsやパスワード等はコードに直書きしない。

### 推奨ツール
- Linter: `flake8`
- フォーマッター: `black`
- 型チェック: `mypy`

### 開発用ツールの導入方法（Docker環境）

開発用ツール（black、flake8、mypy）は Docker 環境で管理します。  
ローカルPCへの直接 `pip install` は不要です。

#### 【導入パターン】

#### パターン① とりあえずまとめて管理する場合（シンプルにしたい場合）

`backend/requirements.txt` に開発ツールもそのまま追記してください。

```
#requirements.txt
fastapi  
uvicorn  
sqlalchemy  
psycopg2-binary  
↓ 開発用ツールも追加  
flake8  
black 
mypy
```
この場合、Dockerビルド時(`docker compose up -d --build
`)に自動でインストールされます。

#### パターン② 本番と開発で分けたい場合（推奨）

`backend/requirements.txt`（本番用）と  
`backend/requirements-dev.txt`（開発用）に分けて管理します。
```
# requirements-dev.txt
-r requirements.txt

flake8
black
mypy

Dockerfileで以下を実行：

COPY requirements.txt .
COPY requirements-dev.txt .
RUN pip install -r requirements-dev.txt
```
---

### 【実行方法】

Dockerコンテナ内で以下を実行してください。

### Lintチェック
docker compose exec backend flake8

### フォーマット（チェックだけ）
docker compose exec backend black --check .

### フォーマット実行（自動修正）
docker compose exec backend black .

### 型チェック
docker compose exec backend mypy .

---

### 【注意】

- `pip install`はローカルで直接実行しません。  
- Docker環境で統一管理してください。


---

## その他
- Pull Request時は必ずlint/format/type-checkを実行し、エラーがないことを確認してください。
- 迷った場合は、既存コードや公式ドキュメントを参考にしてください。
- 本ドキュメントは随時アップデートします。 