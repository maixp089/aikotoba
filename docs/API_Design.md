#  API設計書

---

## 0. エンドポイント一覧

| No | API名 | メソッド | エンドポイント |
|---|---|---|---|
| 1. | ユーザー存在チェックAPI | GET | `/users/search` |
| 2. | ユーザー新規登録API | POST | `/users` |
| 3. | ユーザー情報取得API | GET | `/users/{user_id}` |
| 4. | プレゼン音声評価API | POST | `/presentations` |
| 5. | スコア一覧取得API | GET | `/users/{user_id}/scores` |
| 6. | ランキング取得API | GET | `/ranking` |

---

## 1. ユーザー存在チェックAPI

（1）**概要**  
指定した `firebase_uid` で登録済みユーザーを検索する。

（2）**エンドポイント**
```

GET /users/search

```

（3）**メソッド**  
GET

（4）**リクエスト**  
クエリパラメータ:
```

firebase\_uid (string, 必須)

````

（5）**レスポンス**  
- 登録あり
```json
{
  "id": "b121d128-2ae7-455e-8efb-7ef9c7e9d3c8",
  "firebase_uid": "test_uid_999",
  "name": "山田太郎",
  "age": 10,
  "icon_image": "sample_icon.png",
  "created_at": "2025-07-04T06:52:09.000Z"
}
````

* 登録なし

```json
null
```

（6）**認証**
なし（firebase\_uidをフロントから取得）

---

## 2. ユーザー新規登録API

（1）**概要**
新しいユーザーを登録する。

（2）**エンドポイント**

```
POST /users
```

（3）**メソッド**
POST

（4）**リクエスト**
Content-Type: `application/json`

```json
{
  "firebase_uid": "test_uid_999",
  "name": "山田太郎",
  "age": 10,
  "icon_image": "sample_icon.png"
}
```

（5）**レスポンス**

* 成功

```json
{
  "id": "b121d128-2ae7-455e-8efb-7ef9c7e9d3c8",
  "firebase_uid": "test_uid_999",
  "name": "山田太郎",
  "age": 10,
  "icon_image": "sample_icon.png",
  "created_at": "2025-07-04T06:52:09.000Z"
}
```

* 重複エラー

```json
{
  "detail": "このfirebase_uidは既に登録されています"
}
```

（6）**認証**
なし（firebase\_uidをフロントから取得）

---

## 3. ユーザー情報取得API

（1）**概要**
指定IDのユーザー情報を取得する。

（2）**エンドポイント**

```
GET /users/{user_id}
```

（3）**メソッド**
GET

（4）**リクエスト**
パスパラメータ:

```
user_id (UUID, 必須)
```

（5）**レスポンス**

* 成功

```json
{
  "id": "b121d128-2ae7-455e-8efb-7ef9c7e9d3c8",
  "firebase_uid": "test_uid_999",
  "name": "山田太郎",
  "age": 10,
  "icon_image": "sample_icon.png",
  "created_at": "2025-07-04T06:52:09.000Z"
}
```

* 該当なし

```json
{
  "detail": "ユーザーが見つかりません"
}
```

（6）**認証**
Firebase AuthenticationのIDトークン（任意で保護する場合）

---

## 4. プレゼン音声評価API

（1）**概要**
音声ファイルをアップロードし、文字起こし・スコア・コメントを取得する。

（2）**エンドポイント**

```
POST /presentations
```

（3）**メソッド**
POST

（4）**リクエスト**
Content-Type: `multipart/form-data`

| パラメータ    | 型      | 説明                  |
| -------- | ------ | ------------------- |
| file     | File   | 音声ファイル（webm, wavなど） |
| theme    | string | 今日のテーマ              |
| duration | number | プレゼン時間（秒）           |

例:

```
file: プレゼン音声ファイル
theme: 夏休みの思い出
duration: 180
```

ヘッダ:

```
Authorization: Bearer {Firebase ID Token}
```

（5）**レスポンス**

```json
{
  "word_score": 82,
  "flow_score": 78,
  "expression_score": 85,
  "hook_score": 70,
  "confidence_score": 88,
  "total_score": 81,
  "well_done": "堂々とした発表（はっぴょう）でした！",
  "next_challenge": "もう少し具体例（ぐたいてきれい）を入れてみましょう。"
}
```

* エラー

```json
{
  "detail": "音声ファイルが必須です"
}
```

（6）**認証**
必須（Firebase AuthenticationのIDトークン）

---

## 5. スコア一覧取得API

（1）**概要**
指定ユーザーの発表履歴スコアを取得する。

（2）**エンドポイント**

```
GET /users/{user_id}/scores
```

（3）**メソッド**
GET

（4）**リクエスト**
パスパラメータ:

```
user_id (UUID, 必須)
```

ヘッダ:

```
Authorization: Bearer {Firebase ID Token}
```

（5）**レスポンス**

```json
[
  {
    "presentation_id": "c2b...9e2",
    "created_at": "2025-05-20T10:00:00.000Z",
    "total_score": 81,
    "well_done": "堂々とした発表（はっぴょう）でした！",
    "next_challenge": "もう少し具体例（ぐたいてきれい）を入れてみましょう。"
  },
  {
    "presentation_id": "a15...ee7",
    "created_at": "2025-05-21T10:00:00.000Z",
    "total_score": 85,
    "well_done": "声がしっかり届いていた！",
    "next_challenge": "話の順番を意識しましょう。"
  }
]
```

（6）**認証**
必須（Firebase AuthenticationのIDトークン）

---

## 6. ランキング取得API

（1）**概要**
今週のスコアランキングを取得する。

（2）**エンドポイント**

```
GET /ranking
```

（3）**メソッド**
GET

（4）**リクエスト**
クエリパラメータ:

```
week (string, オプション)
```

ヘッダ:

```
Authorization: Bearer {Firebase ID Token}
```

（5）**レスポンス**

```json
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
  }
]
```

（6）**認証**
必須（Firebase AuthenticationのIDトークン）

---

```
