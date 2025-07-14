# Frontend 開発手順

- `npm create vite@latest` vite
- `cd frontend`
- `npm install` プロジェクトに必要なパッケージをインターネットからダウンロードしてインストール。パッケージリストは`package.json`に記載。
- `npm run dev` vite+Reactローカルサーバー起動確認
- ``
- ``
  テスト

---

## 使用技術・依存ライブラリ
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Firebase（認証）
- React Router DOM
- Prettier, ESLint
- 依存パッケージは package.json 参照

---

## セットアップ手順

1. 依存パッケージのインストール
```bash
npm install
```

---

## 開発・ビルド・起動コマンド

- 開発サーバー起動
```bash
npm run dev
```
- 本番ビルド
```bash
npm run build
```
- Lintチェック
```bash
npm run lint
```
- Lint自動修正
```bash
npm run lint:fix
```
- フォーマット
```bash
npm run format
```

---

## 環境変数設定例（.envサンプル）

```
# .env.example
VITE_FIREBASE_API_KEY=xxxxxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxxxxx
VITE_FIREBASE_PROJECT_ID=xxxxxxx
VITE_FIREBASE_STORAGE_BUCKET=xxxxxxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxxxxxx
VITE_FIREBASE_APP_ID=xxxxxxx
```

---

## 画面イメージ・使い方
- ホーム画面でGoogleログイン
- プレゼンテーマ・時間を選択
- 録音ボタンで発表を録音
- AIが自動で文字起こし・フィードバック
- マイページでスコアや履歴を確認

（画面イメージ画像は `docs/` 配下や、ここに追加可能です）

---
