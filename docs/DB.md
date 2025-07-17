# データベース設計書

## 1. usersテーブル

| カラム名       | 型            | 説明                      |
| -------------- | ------------- | ------------------------- |
| id             | uuid (PK)     | 自動採番                  |
| firebase_uid   | string(unique)| FirebaseのUID             |
| name           | string        | ユーザー名                |
| age            | int           | 年齢                      |
| icon_image     | string        | アイコン画像のURL         |
| created_at     | datetime      | 登録日時                  |
| paid           | boolean       | 有償ユーザーかどうか（決済済みならtrue）|

---

## 2. paymentsテーブル（決済履歴）

| カラム名           | 型           | 説明                                      |
| ------------------ | ------------ | ----------------------------------------- |
| id                 | int (PK)     | 決済履歴ID（自動採番）                   |
| user_id            | uuid (FK)    | users.idへの外部キー                     |
| amount             | int          | 決済金額（単位: 円）                     |
| status             | string       | 決済ステータス（例: succeeded, failed等）|
| stripe_session_id  | string       | StripeのセッションID                     |
| created_at         | datetime     | 決済日時                                 |

---

## 3. presentationsテーブル（発表データ）

| カラム名       | 型          | 説明                         |
| -------------- | ----------- | ---------------------------- |
| id             | int (PK)    | 発表データID（自動採番）     |
| user_id        | uuid (FK)   | users.idへの外部キー         |
| transcript     | text        | 発表の文字起こし             |
| audio_url      | string      | 発表音声ファイル（保存URL等）|
| created_at     | datetime    | 発表日                       |

---

## 4. feedbacksテーブル

| カラム名         | 型         | 備考／説明                       |
| ---------------- | ---------- | -------------------------------- |
| id               | int (PK)   | 主キー（自動採番）               |
| user_id          | uuid (FK)  | usersテーブルの外部キー          |
| presentation_id  | int (FK)   | presentations.idへの外部キー     |
| total_score      | int        | 総合スコア                       |
| well_done        | text       | よかったポイント                 |
| next_challenge   | text       | 次回のチャレンジ                 |
| created_at       | datetime   | 登録日時                         |

---

**備考：**  
- PK：主キー（Primary Key）  
- FK：外部キー（Foreign Key）  
- 日時型（datetime）はUTC基準  
- paidカラムは決済完了時にtrueとなる  
- paymentsテーブルはStripe決済の履歴を管理  

**ER図：[docs/aikotoba.er.png](/docs/aikotoba.er.png)**  
