# **DB 設計書 **

## **1. 概要**

アプリ概要および DB に関する情報を記載する。

---

## **2. テーブル一覧**

---

### **2.1 user（ユーザー情報）**

**目的**: アプリユーザーの基本情報を管理
**主キー**: `id`

| カラム名     | データ型     | 説明                                 |
| ------------ | ------------ | ------------------------------------ |
| id           | UUID         | 主キー                               |
| email        | VARCHAR(255) | ユーザーのメールアドレス（ユニーク） |
| firebase_uid | VARCHAR(255) | Firebase 認証用 UID                  |
| name         | VARCHAR(100) | ユーザー名（表示名）                 |
| password     | VARCHAR(255) | ハッシュ化されたログイン用パスワード |
| created_at   | TIMESTAMP    | アカウント作成日時                   |

---

### **2.2 child（子どもの情報）**

**目的**: ユーザーの子どもの属性を管理
**主キー**: `id`
**外部キー**: `user_id → user.id`

| カラム名    | データ型     | 説明                                                       |
| ----------- | ------------ | ---------------------------------------------------------- |
| id          | UUID         | 主キー                                                     |
| user_id     | UUID         | 親ユーザーの ID（外部キー）                                |
| name        | VARCHAR(100) | 子どもの名前                                               |
| birthdate   | DATE         | 生年月日（年齢計算に使用）                                 |
| gender      | VARCHAR(10)  | 性別（例：'male', 'female', 'other'）                      |
| personality | VARCHAR(50)  | 性格タイプ（例：shy, curious, active など）※固定選択肢想定 |

---

### **2.3 photo（写真情報）**

**目的**: 登録された写真と関連情報を管理
**主キー**: `id`
**外部キー**: `user_id → user.id`, `child_id → child.id（nullable）`

| カラム名   | データ型         | 説明                              |
| ---------- | ---------------- | --------------------------------- |
| id         | UUID             | 主キー                            |
| user_id    | UUID             | 投稿したユーザーの ID（外部キー） |
| child_id   | UUID（nullable） | 関連付ける子どもの ID（外部キー） |
| image_url  | VARCHAR(1024)    | 写真の URL                        |
| caption    | TEXT             | 写真の説明・メモ（長文を許容）    |
| created_at | TIMESTAMP        | 写真の投稿日時                    |

---

### **2.4 feedback（AI フィードバック情報）**

**目的**: AI が写真に対して生成したアドバイスを管理
**主キー**: `id`
**外部キー**: `photo_id → photo.id`

| カラム名   | データ型  | 説明                              |
| ---------- | --------- | --------------------------------- |
| id         | UUID      | 主キー                            |
| photo_id   | UUID      | 対象の写真 ID（外部キー）         |
| content    | TEXT      | AI が生成したアドバイスのテキスト |
| created_at | TIMESTAMP | フィードバック生成日時            |

---

### **2.5 tag（タグ情報）**

**目的**: 写真に付与できるタグ一覧（分類）を管理
**主キー**: `id`

| カラム名 | データ型     | 説明                       |
| -------- | ------------ | -------------------------- |
| id       | UUID         | 主キー                     |
| name     | VARCHAR(100) | タグ名（ユニーク制約推奨） |

---

### **2.6 photo_tag（写真とタグの中間テーブル）**

**目的**: 多対多関係（1 枚の写真に複数タグ）を管理
**主キー**: `photo_id`, `tag_id`
**外部キー**: `photo_id → photo.id`, `tag_id → tag.id`

| カラム名 | データ型 | 説明                |
| -------- | -------- | ------------------- |
| photo_id | UUID     | 写真 ID（外部キー） |
| tag_id   | UUID     | タグ ID（外部キー） |

---

<!-- **備考:**
- `user_id`はNULLを許容（開発時の仮対応）
- デフォルト金額は500円
- 通貨は`JPY`をデフォルト値とする
- ステータスは`pending`をデフォルト値とする -->

---

## **3. リレーション**

---

### **3.1 child（子どもの情報）**

- **user** は他のすべての主要テーブル（`child`, `photo`, `feedback`, `photo_tag` など）と関連する。
- **child** は `user` に依存する。親子関係の一部として `user_id` を外部キーに持つ。
- **photo** は `user` および `child` に依存する。写真が誰のもので、どの子どもに紐づくかを記録する。
- **feedback** は `photo` に依存する。写真ごとの AI アドバイスとして `photo_id` を参照する。
- **tag** は独立だが、**photo_tag** を通じて `photo` と多対多の関係を形成する。
- **photo_tag** は `photo` と `tag` の中間テーブルとなる。両者のリレーションを保持する。

---

### **3.2 リレーション構造図 **

```plaintext
User (1) ──── (N) Child
User (1) ──── (N) Photo
Photo (1) ──── (1) Feedback
Child (1) ──── (N) Photo（nullable）
Photo (N) ──── (N) Tag（via PhotoTag）
```

```
erDiagram

  USER ||--o{ CHILD : has
  USER ||--o{ PHOTO : owns
  CHILD ||--o{ PHOTO : associated_with
  PHOTO ||--|| FEEDBACK : generates
  PHOTO ||--o{ PHOTO_TAG : tagged_with
  TAG ||--o{ PHOTO_TAG : includes

  USER {
    UUID id PK
    VARCHAR email
    VARCHAR firebase_uid
    VARCHAR name
    VARCHAR password
    TIMESTAMP created_at
  }

  CHILD {
    UUID id PK
    UUID user_id FK
    VARCHAR name
    DATE birthdate
    VARCHAR gender
    VARCHAR personality
  }

  PHOTO {
    UUID id PK
    UUID user_id FK
    UUID child_id FK
    VARCHAR image_url
    TEXT caption
    TIMESTAMP created_at
  }

  FEEDBACK {
    UUID id PK
    UUID photo_id FK
    TEXT content
    TIMESTAMP created_at
  }

  TAG {
    UUID id PK
    VARCHAR name
  }

  PHOTO_TAG {
    UUID photo_id FK
    UUID tag_id FK
  }
```


---

### **3.3 依存関係 **

| テーブル名  | 依存先（外部キー）                |
| ----------- | --------------------------------- |
| `child`     | `user.id`                         |
| `photo`     | `user.id`, `child.id（nullable）` |
| `feedback`  | `photo.id`                        |
| `photo_tag` | `photo.id`, `tag.id`              |
| `tag`       | なし（独立テーブル）              |

---

<!-- ## **4. 意思決定ログ**
- **created_at**、**updated_at**は、TIMESTAMP型からDATETIME型に変更。
- アプリ全般でタイムゾーン**Asia/Tokyo**を設定しているため、JSTで記録される。UTCに変換される部分に関しては **"+09:00"** の記載にて対応。 -->
