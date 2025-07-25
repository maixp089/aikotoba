## 目次
① アプリ本体API（FastAPI：ポート8000）
| No. | 機能名                  | メソッド | エンドポイント                        | 主なパラメータ・備考          |
|-----|-------------------------|----------|---------------------------------------|------------------------------|
| 1   | ユーザー存在チェック    | GET      | /users/search                         | firebase_uid（query, 必須）  |
| 2   | ユーザー新規登録        | POST     | /users                                | JSON（firebase_uid, name, age, icon_image）|
| 3   | ユーザー情報取得        | GET      | /users/{user_id}                      | user_id（パス, 必須）        |
| 4   | 音声評価（AIスコア取得）| POST     | /audio-feedback                       | FormData（file, user_id）    |
| 5   | スコア一覧取得          | GET      | /users/{user_id}/scores               | user_id（パス, 必須）        |
| 6   | スコア詳細取得          | GET      | /api/audio-feedback/{feedback_id}     | feedback_id（パス, 必須）    |


➁ 決済API（Stripe専用サーバー：ポート4242 / backend/stripe-demo）
| No. | 機能名                  | メソッド | エンドポイント                        | 主なパラメータ・備考          |
|-----|-------------------------|----------|---------------------------------------|------------------------------|
| 7   | 決済セッション作成（Stripe）| POST     | 	/api/payments/checkout-session              | JSON（user_id）　　 ※ backend/stripe-demo（ポート4242）で実行              |



---

## 共通事項

- ベースURL（アプリ本体API）：  
  `http://localhost:8000`（FastAPI）

- 決済API（Stripe用）：  
  `http://localhost:4242`（Express / backend/stripe-demo）

- 認証：  
  基本なし（Googleログイン後のfirebase_uidまたはuser_idを利用）

- データ形式：  
  JSON（音声アップロードのみ multipart/form-data）

- **API仕様（Swagger）**：  
  アプリ本体API（FastAPI）：[http://localhost:8000/docs](http://localhost:8000/docs)

※ 決済API（Stripe）はSwaggerに含まれていません

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

```sh
{
  "id": "b121d128-2ae7-455e-8efb-7ef9c7e9d3c8",
  "firebase_uid": "test_uid_999",
  "age": 10,
  "icon_image": "sample_icon.png",
  "created_at": "2025-07-04T06:52:09.000Z"
}
```
### レスポンス例（登録なし）

```null```

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
```sh
{
  "firebase_uid": "test_uid_999",
  "name": "山田太郎",
  "age": 10,
  "icon_image": "sample_icon.png"
}
```
### リクエストボディ仕様

| フィールド     | 型      | 必須 | 説明                   |
|----------------|---------|------|------------------------|
| firebase_uid   | string  | ○    | Google認証で得られるID |
| name           | string  | ○    | ユーザー名             |
| age            | integer | △    | 年齢（未設定可）       |
| icon_image     | string  | △    | プロフィール画像URL    |

### レスポンス例（成功時）
```sh
{
  "id": "b121d128-2ae7-455e-8efb-7ef9c7e9d3c8",
  "firebase_uid": "test_uid_999",
  "name": "山田太郎",
  "age": 10,
  "icon_image": "sample_icon.png",
  "created_at": "2025-07-04T06:52:09.000Z"
}
```
### レスポンス例（重複エラー）
```
{
  "detail": "このfirebase_uidは既に登録されています"
}
```
---

## 3. ユーザー情報取得

| 項目           | 内容                                   |
|----------------|----------------------------------------|
| メソッド       | GET                                    |
| エンドポイント | `/users/{user_id}`                     |
| パスパラメータ | `user_id`（UUID, 必須）                |
| 概要           | 指定IDのユーザー情報取得               |

### リクエスト例
```
GET /users/b121d128-2ae7-455e-8efb-7ef9c7e9d3c8
```

### レスポンス例（成功時）
```
{
  "id": "b121d128-2ae7-455e-8efb-7ef9c7e9d3c8",
  "firebase_uid": "test_uid_999",
  "name": "山田太郎",
  "age": 10,
  "icon_image": "sample_icon.png",
  "created_at": "2025-07-04T06:52:09.000Z"
}
```
### レスポンス例（該当なし）
```
{
  "detail": "ユーザーが見つかりません"
}
```
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
```
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
```
### レスポンス例
```
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
```
---

## 5. スコア一覧取得

| 項目           | 内容                                    |
|----------------|-----------------------------------------|
| メソッド       | GET                                     |
| エンドポイント | `/users/{user_id}/scores`               |
| パスパラメータ | `user_id`（UUID, 必須）                 |
| 概要           | 指定ユーザーのスコア履歴一覧を取得       |

### レスポンス例
```sh
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
```
---

## 6. スコア詳細取得

| 項目           | 内容                                    |
|----------------|-----------------------------------------|
| メソッド       | GET                                     |
| エンドポイント | `/api/audio-feedback/{feedback_id}`      |
| パスパラメータ | `feedback_id`（int, 必須）              |
| 概要           | 指定フィードバックIDの詳細を取得         |

### リクエスト例
```
GET /api/audio-feedback/123
```

### レスポンス例
```
{
  "id": 123,
  "user_id": "b121d128-2ae7-455e-8efb-7ef9c7e9d3c8",
  "presentation_id": 456,
  "total_score": 81,
  "well_done": "堂々とした発表でした！",
  "next_challenge": "もう少し具体例を入れてみましょう。",
  "created_at": "2025-07-04T12:34:56"
}
```
---

## 7. 決済セッション作成（Stripe）

| 項目           | 内容                                    |
|----------------|-----------------------------------------|
| メソッド       | POST                                    |
| エンドポイント |	`/api/payments/checkout-session`            |
| 内容           | Stripe決済用のCheckoutセッション作成     |
| リクエスト     | JSON（user_id必須）                          |
| レスポンス     | JSON（id: セッションID）                 |
| サーバー       | backend/stripe-demo（ポート4242）        |

### リクエスト例
```json
POST http://localhost:4242/api/payments/checkout-session
Content-Type: application/json

{
  "user_id": "b121d128-2ae7-455e-8efb-7ef9c7e9d3c8"
}
```

### レスポンス例
```json
{
  "id": "cs_test_a1b2c3d4e5f6g7h8i9"
}
```



