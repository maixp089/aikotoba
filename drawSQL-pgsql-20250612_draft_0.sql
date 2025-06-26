CREATE TABLE "6"."photo_tag（写真とタグの中間）"(
    "photo_id" UUID NOT NULL,
    "tag_id" UUID NOT NULL
);
ALTER TABLE
    "6"."photo_tag（写真とタグの中間）" ADD PRIMARY KEY("photo_id");
CREATE TABLE "5"."tag（タグ情報）"(
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL
);
ALTER TABLE
    "5"."tag（タグ情報）" ADD PRIMARY KEY("id");
CREATE TABLE "4"."feedback（AIフィードバック）"(
    "id" UUID NOT NULL,
    "photo_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "4"."feedback（AIフィードバック）" ADD PRIMARY KEY("id");
CREATE TABLE "3"." photo（写真情報）"(
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "child_id" UUID NOT NULL,
    "image_url" VARCHAR(1024) NOT NULL,
    "caption" TEXT NOT NULL,
    "crbiginteated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "3"." photo（写真情報）" ADD PRIMARY KEY("id");
CREATE TABLE "2"."child（子どもの情報）"(
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "birthdatebigint" DATE NOT NULL,
    "gender" VARCHAR(10) NOT NULL,
    "personalitybigint" VARCHAR(50) NOT NULL
);
ALTER TABLE
    "2"."child（子どもの情報）" ADD PRIMARY KEY("id");
CREATE TABLE "1"." user（ユーザー情報）"(
    "id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "firebase_uidvarchbigintar(100)" BIGINT NOT NULL,
    "namebigint" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "1"." user（ユーザー情報）" ADD PRIMARY KEY("id");
ALTER TABLE
    "1"." user（ユーザー情報）" ADD CONSTRAINT "1_ user（ユーザー情報）_email_unique" UNIQUE("email");
ALTER TABLE
    "2"."child（子どもの情報）" ADD CONSTRAINT "2_child（子どもの情報）_id_foreign" FOREIGN KEY("id") REFERENCES "1"." user（ユーザー情報）"("id");
ALTER TABLE
    "4"."feedback（AIフィードバック）" ADD CONSTRAINT "4_feedback（aiフィードバック）_photo_id_foreign" FOREIGN KEY("photo_id") REFERENCES "6"."photo_tag（写真とタグの中間）"("photo_id");
ALTER TABLE
    "3"." photo（写真情報）" ADD CONSTRAINT "3_ photo（写真情報）_id_foreign" FOREIGN KEY("id") REFERENCES "1"." user（ユーザー情報）"("id");
ALTER TABLE
    "2"."child（子どもの情報）" ADD CONSTRAINT "2_child（子どもの情報）_id_foreign" FOREIGN KEY("id") REFERENCES "3"." photo（写真情報）"("id");
ALTER TABLE
    "5"."tag（タグ情報）" ADD CONSTRAINT "5_tag（タグ情報）_id_foreign" FOREIGN KEY("id") REFERENCES "3"." photo（写真情報）"("id");