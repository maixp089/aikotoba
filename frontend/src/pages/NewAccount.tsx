import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// キャラクターリスト
const iconList = [
  { name: "ねこ", value: "neko", src: "/neko.png" },
  { name: "とり", value: "tori", src: "/tori.png" },
  { name: "わし", value: "washi", src: "/washi.png" },
  { name: "くま", value: "kuma", src: "/kuma.png" },
];

const NewAccount = () => {
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // アイコンが未選択の場合はエラー
    if (!selectedIcon) {
      setResult("アイコンを選択してください");
      return;
    }

    // 通常のAPI送信（アイコンはlocalStorageのみ）
    const data = {
      user_name: userName,
      age: age ? Number(age) : null,
    };

    // ★ここでlocalStorageに保存
    // "icon_ユーザー名" というキーで保存
    localStorage.setItem("icon_" + userName, selectedIcon);

    try {
      const res = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        setResult("エラー：" + (err.detail || "登録に失敗しました"));
        return;
      }

      const resData = await res.json();
      setResult("登録成功! user_id: " + resData.user_id);

      setUserName("");
      setAge("");
      setSelectedIcon(null);

      setTimeout(() => {
        navigate("/login");
      }, 800);
    } catch {
      setResult("通信エラー");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(120deg,#d4efd7 0%, #f8f5e1 100%)",
        fontFamily: "'M PLUS Rounded 1c', 'Kosugi Maru', 'sans-serif'",
      }}
    >
      <div
        style={{
          background: "#fff8e7",
          borderRadius: "28px",
          boxShadow: "0 6px 28px #b7d7bb66, 0 1.5px 0 #fffbe9 inset",
          padding: "46px 24px 42px 24px",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
          position: "relative",
          border: "3px solid #b7d7bb",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            marginBottom: "32px",
            fontSize: "2.3rem",
            fontWeight: "bold",
            letterSpacing: "0.03em",
            color: "#5a7042",
            textShadow: "1px 2px 0 #fffbe9, 0 4px 6px #b7d7bb55",
          }}
        >
          新規登録
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="おなまえ"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 16px",
              marginBottom: "16px",
              borderRadius: "16px",
              border: "2px solid #aad5bb",
              fontSize: "1.13em",
              background: "#f6ffef",
              fontFamily: "inherit",
              boxShadow: "0 2px 10px #cce7d266",
              outline: "none",
              transition: "border 0.2s",
              boxSizing: "border-box",
            }}
            required
          />

          <div style={{ marginBottom: "18px" }}>
            <input
              id="age"
              type="number"
              placeholder="ねんれい"
              value={age}
              min={0}
              max={120}
              onChange={e => setAge(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: "16px",
                border: "2px solid #aad5bb",
                fontSize: "1.13em",
                background: "#f6ffef",
                fontFamily: "inherit",
                boxShadow: "0 2px 10px #cce7d266",
                outline: "none",
                color: "#444",
                transition: "border 0.2s",
                boxSizing: "border-box",
              }}
              required
            />
          </div>

          {/* --- キャラクターアイコン選択エリア --- */}
          <div
            style={{
              border: "2.5px dashed #aad5bb",
              borderRadius: "22px",
              minHeight: "120px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#a5b499",
              marginBottom: "26px",
              background: "#fcfff5",
              fontSize: "1.13em",
              fontFamily: "inherit",
              boxSizing: "border-box",
              gap: "16px",
              flexWrap: "wrap",
              padding: "12px"
            }}
          >
            {iconList.map(icon => (
              <div
                key={icon.value}
                onClick={() => setSelectedIcon(icon.value)}
                style={{
                  border: selectedIcon === icon.value ? "3px solid #f2687b" : "2px solid #aad5bb",
                  borderRadius: "18px",
                  padding: "6px 8px",
                  margin: "0 2px",
                  background: selectedIcon === icon.value ? "#fff0ef" : "#fff",
                  cursor: "pointer",
                  textAlign: "center",
                  boxShadow: selectedIcon === icon.value ? "0 2px 8px #f2687b55" : "",
                  transition: "border 0.2s, background 0.2s"
                }}
              >
                <img src={icon.src} alt={icon.name} style={{ width: 44, height: 44, marginBottom: 2 }} />
                <div style={{ fontSize: "0.98em" }}>{icon.name}</div>
              </div>
            ))}
          </div>

          {/* --- ボタンエリアここから --- */}
          <div
            style={{
              display: "flex",
              gap: "18px",
              justifyContent: "center",
              width: "100%",
              padding: "16px 0 4px 0",
              background: "none",
              boxSizing: "border-box",
            }}
          >
            <Link
              to="/"
              style={{
                flex: 1,
                display: "inline-block",
                padding: "18px 0",
                background: "#19848e",
                color: "#fff",
                borderRadius: "38px",
                fontSize: "1.35rem",
                fontWeight: "bold",
                textDecoration: "none",
                boxShadow: "0 6px #10676c",
                letterSpacing: "2px",
                fontFamily: "'M PLUS Rounded 1c', 'Kosugi Maru', sans-serif",
                border: "none",
                textAlign: "center",
                outline: "none",
                borderBottom: "none",
                transition: "background 0.2s",
              }}
            >
              ← ホームへ戻る
            </Link>
            <button
              type="submit"
              style={{
                flex: 1,
                background: "#f2687b",
                color: "#fff",
                borderRadius: "38px",
                fontSize: "1.35rem",
                fontWeight: "bold",
                boxShadow: "0 6px #c35665",
                letterSpacing: "2px",
                fontFamily: "'M PLUS Rounded 1c', 'Kosugi Maru', sans-serif",
                border: "none",
                textAlign: "center",
                outline: "none",
                borderBottom: "none",
                padding: "18px 0",
                margin: 0,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              登録
            </button>
          </div>
          {/* --- ボタンエリアここまで --- */}
        </form>
        {result && (
          <div
            style={{
              marginTop: "20px",
              color: result.startsWith("登録成功") ? "#48915b" : "#b75552",
              fontWeight: "bold",
            }}
          >
            {result}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewAccount;
