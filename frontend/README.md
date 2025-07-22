# あいことば🤖 フロントエンド README

## 📋 プロジェクト概要

このアプリケーションは、AIを活用したプレゼンテーション練習支援システムのフロントエンドです。ユーザーが音声でプレゼンテーションを録音し、AIが自動で文字起こしとフィードバックを提供します。

### 🎯 主な機能

- **Google認証**: Firebase Authenticationを使用した安全なログイン
- **プレゼンテーション録音**: リアルタイム音声録音機能
- **AI評価**: 音声を自動で文字起こしし、AIがフィードバックを生成
- **スコア管理**: 練習履歴とスコアの保存・表示
- **レスポンシブデザイン**: モバイルファーストのUI/UX
- **決済機能（Stripe）**: Stripeを利用した有料機能の決済が可能

---

## 🛠 使用技術・依存ライブラリ

### コア技術

- **React 19.1.0**: 最新のReactフレームワーク
- **TypeScript 5.8.3**: 型安全性を確保
- **Vite 7.0.0**: 高速なビルドツール

### UI/UX

- **カスタムCSS**: アプリ固有のスタイリング

### 認証・バックエンド連携

- **Firebase 11.10.0**: Google認証とプロジェクト管理
- **React Router DOM 7.6.3**: クライアントサイドルーティング

### 開発ツール

- **ESLint 9.29.0**: コード品質管理
- **Prettier 3.6.1**: コードフォーマット
- **TypeScript ESLint 8.34.1**: TypeScript用リンティング

### 依存パッケージ詳細

```json
{
  "dependencies": {
    "@tailwindcss/vite": "^4.1.11",
    "firebase": "^11.10.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-router-dom": "^7.6.3",
    "tailwindcss": "^4.1.11"
  }
}
```

---

## 🏗 ディレクトリ構成

```
frontend/
├── public/                 # icon
│   └── icons/             # アプリケーションアイコン
├── src/
│   ├── assets/            # 背景画像・リソース
│   │   └── images/
│   ├── components/        # 再利用可能コンポーネント
│   │   ├── IconButton.tsx  # ページ遷移アイコン共通
│   │   ├── Background.tsx  # 背景
│   │   ├── Card.tsx        # 共通ヘッダーフッター
│   │   ├── index.tsx       # コンポーネントをまとめてimportする
│   │   ├── Layout.tsx
│   │   └── ...
│   ├── lib/              # ライブラリ設定
│   │   └── firebase.ts   # Firebase設定
│   ├── pages/            # ページコンポーネント
│   │   ├── Home.tsx     　　  　　　　 # ホーム画面（あいことば）
│   │   ├── NewAccount.tsx             # 新規登録ページ
│   │   ├── MyPage.tsx                 # マイページ
│   │   ├── PresentationSetting.tsx    # プレゼン設定画面
│   │   ├── Presentation.tsx           # プレゼンテーション画面
│   │   ├── Evaluation.tsx             # 評価画面
│   │   ├── Record.tsx 　              # 記録画面
│   │   ├── EvaluationDetail.tsx 　    # 記録詳細画面
│   │   ├── Pay.tsx 　                 # 決済画面
│   │   ├── Cancel.tsx 　              # 決済キャンセル画面
│   │   ├── Success.tsx 　             # 決済成功画面
│   │   └── ...
│   ├── App.tsx           # メインアプリケーション
│   ├── main.tsx          # エントリーポイント
│   └── index.css         # グローバルスタイル
├── package.json          # 依存関係管理
├── tsconfig.json         # TypeScript設定
├── vite.config.ts        # Vite設定
└── eslint.config.js      # ESLint設定
```

---

## 🚀 セットアップ手順

### 1. 前提条件

- Node.js 18.0.0以上
- npm または yarn
- Git

### 2. プロジェクトクローン

```bash
git clone https://github.com/ms-engineer-bc25-04/sec9_teamB.git
cd sec9_teamB/frontend
```

### 3. 依存パッケージのインストール

```bash
npm install
```

### 4. 環境変数設定 

`.env`ファイルをfrontendルートに作成し、Firebase設定を追加：

```env
# Firebase設定
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Stripe（決済）用公開キー
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxx   # Stripeの公開キー（フロント用）
```

（Stripe決済機能を利用する場合は、バックエンドのstripe-demoサーバーも起動してください）  

[※全ての環境変数設定（共通セットアップ手順）](./README.md) 

### 5. 開発サーバー起動

```bash
npm run dev
```

アプリケーションは `http://localhost:5173` で起動します。

---

## 📱 画面構成・ルーティング

### ルーティング構造

```typescript
// App.tsx のルーティング設定
<Routes>
      {/* ホーム */}
      <Route path="/" element={<Home />} />
      {/* 新規登録・ログイン */}
      <Route path="/new-account" element={<NewAccount />} />
      <Route path="/login" element={<Login />} />
      {/* ユーザーのマイページ */}
      <Route path="/users/:userId/mypage" element={<MyPage />} />
      {/* テーマと時間選択画面 */}
      <Route path="/users/:userId/presentationSetting" element={<PresentationSetting />} />
      {/* 発表・評価・記録画面 */}
      <Route path="/users/:userId/presentation" element={<Presentation />} />
      <Route path="/users/:userId/record" element={<Record />} />
      <Route path="/users/:userId/scoring" element={<Scoring />} />
      <Route path="/users/:userId/evaluation" element={<Evaluation />} />
      {/* 評価詳細 */}
      <Route path="/users/:userId/evaluation/:feedback_id" element={<EvaluationDetail />} />
      {/* 音声テスト用 */}
      <Route path="/audio-test" element={<AudioRecorderTest />} />
      {/* Pay決済ページ */}
      <Route path="/users/:userId/pay" element={<Pay />} />
      {/* Pay決済完了ページ */}
      <Route path="/success" element={<Success />} />
      {/* Pay決済キャンセルページ */}
       <Route path="/cancel" element={<Cancel />} />
</Routes>
```

### 主要画面の説明

#### 🏠 ホーム画面 (`Home.tsx`)

- Googleログイン機能
- アプリケーションの入り口
- グラデーション背景とカードUI

#### 👤 マイページ (`MyPage.tsx`)

- ユーザー情報表示
- 最高スコアの表示
- ナビゲーションメニュー

#### 🎤 プレゼンテーション画面 (`Presentation.tsx`)

- 音声録音機能
- タイマー表示
- リアルタイム録音状態管理

#### 📊 評価画面 (`Evaluation.tsx`)

- AIフィードバック表示
- スコア表示
- 詳細な評価結果

---

## 🔧 開発・ビルド・起動コマンド

### 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# ビルドプレビュー
npm run preview
```

### コード品質管理

```bash
# Lintチェック
npm run lint

# Lint自動修正
npm run lint:fix

# コードフォーマット
npm run format
```

---

## 🎨 コンポーネント設計

### 主要コンポーネント

#### `Card.tsx`

- アプリケーション全体で使用されるカードUI
- タイトル、コンテンツ、フッターバーをサポート
- レスポンシブデザイン対応

#### `IconButton.tsx`

- アイコンボタンの統一コンポーネント
- サイズ、アイコン、アクションをカスタマイズ可能

### コンポーネント使用例

```typescript
// Cardコンポーネントの使用例
<Card
  title="カスタムタイトル"
  bottomBar={customFooter}
  style={{ margin: "20px" }}
>
  <div>コンテンツ</div>
</Card>

// IconButtonコンポーネントの使用例
<IconButton
  onClick={handleClick}
  iconSrc="/icons/back.png"
  alt="戻る"
  size={55}
/>
```

---

## 🔌 API連携

### バックエンドAPI連携

- **ベースURL**: `http://localhost:8000`
- **決済API**: `http://localhost:4242`（Stripe決済サーバー）
- **プロキシ設定**: Viteの設定でAPIリクエストをプロキシ

### 主要APIエンドポイント

#### ユーザー関連

```typescript
// ユーザー検索
GET /users/search?firebase_uid=${firebase_uid}

// ユーザー情報取得
GET /users/${userId}

// スコア取得
GET /users/${userId}/scores
```

#### 音声・評価関連

```typescript
// 音声フィードバック送信
POST /api/audio-feedback
Content-Type: multipart/form-data
Body: {
  file: Blob,
  user_id: string
}
```

### API使用例

```typescript
// 音声データ送信の例
const sendAudioToAPI = async (blob: Blob) => {
  const formData = new FormData();
  formData.append("file", blob, "recording.webm");
  formData.append("user_id", userId);

  const res = await fetch("http://localhost:8000/api/audio-feedback", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data;
};
```

---

## 🔐 認証システム

### Firebase Authentication

- Googleログイン機能
- セキュアなユーザー管理
- トークンベース認証

### 認証フロー

1. ホーム画面でGoogleログイン
2. Firebase UIDをバックエンドで検索
3. ユーザー存在確認
4. 新規ユーザーの場合は登録画面へ
5. 既存ユーザーの場合はマイページへ

### 認証コード例

```typescript
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";

const handleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const firebase_uid = result.user.uid;
    // バックエンドでユーザー検索
    const res = await fetch(`/users/search?firebase_uid=${firebase_uid}`);
    const data = await res.json();

    if (data) {
      navigate(`/users/${data.id}/mypage`);
    } else {
      navigate("/new-account", { state: { firebase_uid } });
    }
  } catch (error) {
    console.error("ログインエラー:", error);
    alert("Googleログインに失敗しました");
  }
};
```

---

## 🎯 音声録音機能

### MediaRecorder API使用

- Web Audio APIを使用した音声録音
- リアルタイム録音状態管理
- 自動停止機能

### 録音機能の実装

```typescript
// 録音開始
const handleStart = () => {
  if (audioRef.current && audioState === "ready") {
    audioRef.current.start();
  }
};

// 録音停止
const handleStop = () => {
  if (audioRef.current && audioState === "recording") {
    audioRef.current.stop();
  }
};

// 録音データ処理
mediaRecorder.onstop = async () => {
  const blob = new Blob(chunksRef.current, { type: "audio/webm" });
  await sendAudioToAPI(blob);
};
```

---

## 🎨 UI/UX設計

### デザインシステム

- **カラーパレット**:
  - プライマリ: `#4bb3a7` (ティール)
  - セカンダリ: `#f4bc21` (イエロー)
  - 背景: グラデーション (`#d4efd7` → `#f8f5e1`)

### レスポンシブデザイン

- モバイルファーストアプローチ
- タブレット・デスクトップ対応
- フレキシブルレイアウト

### アニメーション・インタラクション

- スムーズな画面遷移
- ホバーエフェクト
- ローディング状態表示

---

## 🧪 テスト・デバッグ

### 開発用機能

- `/audio-test` ルートで音声録音テスト
- コンソールログでのデバッグ情報
- エラーハンドリング

### デバッグツール

```typescript
// 開発環境でのデバッグ
console.log("APIレスポンス", data);
console.error("エラー詳細:", error);
```

---

## 📦 ビルド・デプロイ

### 本番ビルド

```bash
npm run build
```

### ビルド成果物

- `dist/` ディレクトリに最適化されたファイルが生成
- 静的ファイルとしてデプロイ可能

### デプロイ先

- Vercel
- Netlify
- Firebase Hosting
- その他の静的ホスティングサービス

---

## 🔧 設定ファイル

### Vite設定 (`vite.config.ts`)

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:8000",
    },
  },
});
```

### TypeScript設定 (`tsconfig.app.json`)

- 厳密な型チェック
- React JSXサポート
- モダンなES2022ターゲット

### ESLint設定 (`eslint.config.js`)

- React Hooksルール
- TypeScriptサポート
- コード品質管理

---

## 🤝 開発ガイドライン

### コーディング規約

- TypeScriptの厳密モード使用
- ESLint + Prettierでコード品質管理
- コンポーネントは関数型コンポーネント
- Hooksを活用した状態管理

[詳しくはコチラ](../docs/Coding_Style.md)

### ファイル命名規則

- コンポーネント: PascalCase (`MyComponent.tsx`)
- ページ: PascalCase (`Home.tsx`)
- ユーティリティ: camelCase (`firebase.ts`)
- 定数: UPPER_SNAKE_CASE

### コミットメッセージ規約

```
- fix：バグ修正
- add：新規（ファイル）機能追加
- update：機能修正（バグではない）
- remove：削除（ファイル）
```

---

## 🐛 トラブルシューティング

### よくある問題

#### 1. 音声録音が動作しない

- ブラウザのマイク権限を確認
- HTTPS環境での実行を確認
- MediaRecorder APIのサポート確認

#### 2. Firebase認証エラー

- 環境変数の設定確認
- Firebaseプロジェクトの設定確認
- ドメインの許可リスト確認

#### 3. API通信エラー

- バックエンドサーバーの起動確認
- プロキシ設定の確認
- CORS設定の確認

### デバッグ手順

1. ブラウザの開発者ツールでエラー確認
2. ネットワークタブでAPI通信確認
3. コンソールログで詳細確認

---

## 📚 参考資料・リソース

### 公式ドキュメント

- [React 19 Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)

### 関連ライブラリ

- [React Router DOM](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ESLint](https://eslint.org/)
