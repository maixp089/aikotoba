## 目次

| No. | 機能名                  | メソッド | エンドポイント              | 主なパラメータ・備考          |
|-----|-------------------------|----------|-----------------------------|------------------------------|
| 1   | ユーザー存在チェック    | GET      | /users/search               | firebase_uid（query, 必須）  |
| 2   | ユーザー新規登録        | POST     | /users                      | JSON（firebase_uid, name, age, icon_image）|
| 3   | ユーザー情報取得        | GET      | /users/{user_id}            | user_id（パス, 必須）        |
| 4   | 音声評価（AIスコア取得）| POST     | /audio-feedback             | FormData（file, user_id）    |
| 5   | フィードバック取得      | GET      | /audio-feedback             | user_id（query, 必須）       |
| 6   | スコア一覧取得          | GET      | /users/{user_id}/scores     | user_id（パス, 必須）        |
| 7   | ランキング取得          | GET      | /ranking                    | week（query, 任意）          |

---

## 共通事項

- ベースURL例：`http://localhost:8000`
- 認証：基本なし（Googleログイン後のfirebase_uidまたはuser_idを利用）
- データ形式：JSON（音声アップロードのみmultipart/form-data）
- **Swagger（API仕様＆Try機能）**：  
  [http://localhost:8000/docs](http://localhost:8000/docs)
---

## 1. ユーザー存在チェック

| 項目             | 内容                               |
|------------------|------------------------------------|
| メソッド         | GET                                |
| エンドポイント   | `/users/search`                    |
| クエリパラメータ | `firebase_uid`（string, 必須）     |
| 概要             | 指定したfirebase_uidでユーザー検索  |
| 認証             | なし（Googleログイン後利用）        |

### リクエスト例

GET /users/search?firebase_uid=test_uid_999

### レスポンス例（登録あり）

{
  "id": "b121d128-2ae7-455e-8efb-7ef9c7e9d3c8",
  "firebase_uid": "test_uid_999",
  "age": 10,
  "icon_image": "sample_icon.png",
  "created_at": "2025-07-04T06:52:09.000Z"
}

### レスポンス例（登録なし）

null

---

## 2. ユーザー新規登録

| 項目             | 内容                                   |
|------------------|----------------------------------------|
| メソッド         | POST                                   |
| エンドポイント   | `/users`                               |
| リクエストボディ | JSON（firebase_uid, name, age, icon_image）|
| 概要             | 新しいユーザーを登録                   |
| 認証             | なし                                   |

### リクエスト例

{
  "firebase_uid": "test_uid_999",
  "name": "山田太郎",
  "age": 10,
  "icon_image": "sample_icon.png"
}

### リクエストボディ仕様

| フィールド     | 型      | 必須 | 説明                   |
|----------------|---------|------|------------------------|
| firebase_uid   | string  | ○    | Google認証で得られるID |
| name           | string  | ○    | ユーザー名             |
| age            | integer | △    | 年齢（未設定可）       |
| icon_image     | string  | △    | プロフィール画像URL    |

### レスポンス例（成功時）

{
  "id": "b121d128-2ae7-455e-8efb-7ef9c7e9d3c8",
  "firebase_uid": "test_uid_999",
  "name": "山田太郎",
  "age": 10,
  "icon_image": "sample_icon.png",
  "created_at": "2025-07-04T06:52:09.000Z"
}

### レスポンス例（重複エラー）

{
  "detail": "このfirebase_uidは既に登録されています"
}

---

## 3. ユーザー情報取得

| 項目           | 内容                                   |
|----------------|----------------------------------------|
| メソッド       | GET                                    |
| エンドポイント | `/users/{user_id}`                     |
| パスパラメータ | `user_id`（UUID, 必須）                |
| 概要           | 指定IDのユーザー情報取得               |

### リクエスト例

GET /users/b121d128-2ae7-455e-8efb-7ef9c7e9d3c8

### レスポンス例（成功時）

{
  "id": "b121d128-2ae7-455e-8efb-7ef9c7e9d3c8",
  "firebase_uid": "test_uid_999",
  "name": "山田太郎",
  "age": 10,
  "icon_image": "sample_icon.png",
  "created_at": "2025-07-04T06:52:09.000Z"
}

### レスポンス例（該当なし）

{
  "detail": "ユーザーが見つかりません"
}

---

## 4. 音声評価（AIスコア取得）

| 項目           | 内容                                    |
|----------------|-----------------------------------------|
| メソッド       | POST                                    |
| エンドポイント | `/audio-feedback`                       |
| 内容           | 音声ファイルをアップロードしAIスコア取得 |
| リクエスト     | multipart/form-data（file, user_id）     |
| レスポンス     | JSON（スコア・コメント等）               |

### リクエスト方法

- FormDataで「file」キー＋音声ファイル送信
- 拡張子例：.webm, .mp3, .wav, .m4a

#### JavaScript送信例

const blob = new Blob(audioChunks, { type: 'audio/webm' });
const formData = new FormData();
formData.append('file', blob, 'recording.webm');
fetch('http://localhost:8000/audio-feedback', {
  method: 'POST',
  body: formData,
})
  .then(res => res.json())
  .then(data => {
    // スコアやコメントをdataから取得
  });

### レスポンス例

{
  "transcript":"こんにちは。みんなも一緒にサッカーしませんか",
  "word_score": 82,
  "flow_score": 78,
  "expression_score": 85,
  "hook_score": 70,
  "confidence_score": 88,
  "total_score": 81,
  "well_done": "堂々とした発表でした！",
  "next_challenge": "もう少し具体例を入れてみましょう。"
}

---

## 5. フィードバック取得

| 項目           | 内容                              |
|----------------|-----------------------------------|
| メソッド       | GET                               |
| エンドポイント | `/audio-feedback`                 |
| クエリパラメータ | `user_id`（UUID, 必須）          |
| 内容           | 最新フィードバックの取得           |

### リクエスト例

GET /audio-feedback?user_id=123

### レスポンス例

{
  "id": "b123a1c2-d456-789e-0f12-34567abcdef1",
  "user_id": 123,
  "transcript": "こんにちは。みんなも一緒にサッカーしませんか",
  "word_score": 82,
  "flow_score": 78,
  "expression_score": 85,
  "hook_score": 70,
  "confidence_score": 88,
  "total_score": 81,
  "well_done": "堂々とした発表でした！",
  "next_challenge": "もう少し具体例を入れてみましょう。",
  "created_at": "2025-07-04T12:34:56"
}

---

## 6. スコア一覧取得

| 項目           | 内容                                    |
|----------------|-----------------------------------------|
| メソッド       | GET                                     |
| エンドポイント | `/users/{user_id}/scores`               |
| パスパラメータ | `user_id`（UUID, 必須）                 |
| 概要           | 指定ユーザーのスコア履歴一覧を取得       |

### レスポンス例

[
  {
    "presentation_id": "c2b...9e2",
    "created_at": "2025-05-20T10:00:00.000Z",
    "total_score": 81,
    "well_done": "堂々とした発表でした！",
    "next_challenge": "もう少し具体例を入れてみましょう。"
  },
  {
    "presentation_id": "a15...ee7",
    "created_at": "2025-05-21T10:00:00.000Z",
    "total_score": 85,
    "well_done": "声がしっかり届いていた！",
    "next_challenge": "話の順番を意識しよう。"
  }
]

---

## 7. ランキング取得

| 項目           | 内容                                       |
|----------------|--------------------------------------------|
| メソッド       | GET                                        |
| エンドポイント | `/ranking`                                 |
| クエリパラメータ | `week`（任意, 例: 2025-07-01）           |
| 概要           | 今週のユーザーランキングを取得             |

### リクエスト例

GET /ranking
GET /ranking?week=2025-07-01

### レスポンス例

[
  {
    "rank": 1,
    "user_id": "b121d128-2ae7-455e-8efb-7ef9c7e9d3c8",
    "name": "Aくん",
    "icon_image": "icon1.png",
    "score": 97
  },
  {
    "rank": 2,
    "user_id": "a5e42d12-15b4-4129-9947-879b2d36b13f",
    "name": "Bくん",
    "icon_image": "icon2.png",
    "score": 90
  },
  {
    "rank": 3,
    "user_id": "ef891024-4421-4a72-81b5-cf2e1db18eb9",
    "name": "Cくん",
    "icon_image": "icon3.png",
    "score": 85
  }
]

### フィールド説明

| フィールド    | 型    | 説明                         |
|---------------|-------|------------------------------|
| rank          | int   | 順位                         |
| user_id       | UUID  | ユーザーID                   |
| name          | string| ユーザー名                   |
| icon_image    | string| プロフィール画像             |
| score         | int   | 今週の合計スコア or 最新スコア|

---

## 備考・リンク

- 画面設計 Notion：https://www.notion.so/2238f7a03628802b8610f45128158766?pvs=21
- DB設計 Notion：https://www.notion.so/DB-2238f7a036288046a982cf6a2022cebe?pvs=21