# テスト報告書
[テスト作業中のbranchはコチラ](https://github.com/ms-engineer-bc25-04/sec9_teamB/tree/feature/qa-test)

---
## 1. プロジェクト情報

- プロジェクト名：あいことば
- 報告日：2025 年 07 月 21 日
- 作成者：石川　しおり

---

## 2. テスト方針・品質保証範囲

- 目的：システム全体（API・UI・DB）の品質・信頼性・保守性を担保
- 保証範囲：API 機能・UI 操作性・データ整合性・連携動作・セキュリティ

---

## 3. テスト環境・運用

- Docker Compose で全サービス起動
- CI（GitHub Actions）で静的解析・テスト自動化
- テスト DB は PostgreSQL

---

## 4. テスト実施状況・カバレッジ

| テスト種別    | 区分     | 実施ケース数 | 合格ケース数 | 不合格ケース数 | 実施率（%） | 合格率（%） |
| ------------- | -------- | ------------ | ------------ | -------------- | ----------- | ----------- |
| 静的解析 🔍   | frontend | -            | -            | -              | -           | -           |
| 静的解析 🔍   | backend  | -            | -            | -              | -           | -           |
| 単体テスト 🧪 | frontend | 1            | 1            | 0              | 100         | 100.0       |
| 単体テスト 🧪 | backend  | 3            | 3            | 0              | 100         | 100.0       |
| 結合テスト 🔗 | frontend | 0            | 0            | 0              | 0           | 0           |
| 結合テスト 🔗 | backend  | 0            | 0            | 0              | 0           | 0           |
| E2E 🕹️        | frontend | 0            | 0            | 0              | 0           | 0           |

### カバレッジ結果 📊

| 区分     | ステートメント | 分岐 |
| -------- | -------------- | ---- |
| frontend | 82%            | 80%  |
| backend  | 82%            | 80%  |

（詳細は CI ツールのレポートを参照）

---

## 5. テスト対象ファイル一覧

### フロントエンド

- src/**tests**/sample.test.tsx 　 🧪
- frontend/tests/integration.test.tsx 　 🔗

### バックエンド

- backend/tests/test_audio_api.py 　 🧪
- backend/tests/test_score_api.py 　 🧪
- backend/tests/test_user_api.py 　 🧪

---

## 6. 不具合概要

| 対象項目      | 不具合 ID | 対象ファイル                        | 発生場所            | 概要                           | テストエラー内容                    | 状態                         |
| ------------- | --------- | ----------------------------------- | ------------------- | ------------------------------ | ----------------------------------- | ---------------------------- |
| 単体テスト 🧪 | BUG-002   | backend/tests/test_score_api.py     | /audio-feedback API | 音声ファイルサイズ判定誤り     | サイズ判定ロジックで AssertionError | 修正済（テストパス確認済み） |
| 結合テスト 🔗 | BUG-001   | frontend/tests/integration.test.tsx | ログイン画面        | パスワード誤入力時の挙動不具合 | エラー表示が正しく出ない            | 対応中                       |


---

## 7. テスト関連ファイル構成

```
.
├─backend
│  ├─app
│  │  ├─api                 # API実装（テスト対象）
│  │  ├─db                  # DB関連（テスト対象）
│  ├─tests                  # バックエンドAPI・DBのテストコード
│  │  ├─unit                # 🧪 単体テスト（pytest, Mock）
│  │  ├─integration         # 🔗 結合テスト（API-DB連携、マイグレーション）
│  │  ├─e2e                 # 🕹️ E2Eテスト（必要に応じてAPI連携確認）
│  │  ├─coverage            # 📊 カバレッジレポート（pytest-cov等）
│  │  ├─mocks               # 🪆 モック定義
│  └─...                    # その他バックエンド関連
├─frontend
│  ├─src                    # フロント実装（テスト対象）
│  ├─tests                  # フロントエンドのテストコード
│  │  ├─unit                # 🧪 単体テスト（Vitest, React Testing Library）
│  │  ├─integration         # 🔗 結合テスト（Vitest, MSW）
│  │  ├─e2e                 # 🕹️ E2Eテスト（Cypress）
│  │  ├─coverage            # 📊 カバレッジレポート（Vitest）
│  │  ├─mocks               # 🪆 MSW等のモック定義
│  └─...                    # その他フロント関連
├─.github
│  └─workflows
│      └─ci.yml             # 🤖 CI/CD用ワークフロー
├─docs
│  └─Test_Report.md         # 📄 テスト報告書
├─.eslintrc.js              # ESLint設定
├─.prettierrc               # Prettier設定
├─.flake8                   # flake8設定
├─pyproject.toml            # black/pytest等Python設定
└─...                       # その他プロジェクトファイル
```

---

## 8. 今後の課題・改善点

- 一部テストケースで実施率不足のため、追加実施が必要
- E2E テストの拡充と自動化推進を検討中
- テスト環境のさらなる安定化が課題

---