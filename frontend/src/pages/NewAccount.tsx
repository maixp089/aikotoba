import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const NewAccount = () => {
  const [userName, setUserName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      user_name: userName,
      birthday: birthday,
    };

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
      setBirthday("");

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
          maxWidth: "370px",
          textAlign: "center",
          position: "relative",
          border: "3px solid #b7d7bb",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            marginBottom: "32px",
            fontSize: "2.1rem",
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

          {/* 生年月日はlabel上置き式！ */}
          <div style={{ marginBottom: "18px" }}>
            <label
              htmlFor="birthday"
              style={{
                display: "block",
                textAlign: "left",
                fontSize: "1.07em",
                color: "#8aaa6b",
                fontWeight: 700,
                marginBottom: "3px",
                marginLeft: "8px",
                letterSpacing: "0.05em",
              }}
            >
              おたんじょうび <span style={{ color: "#b9b9b9", fontWeight: 400, fontSize: "0.98em" }}></span>
            </label>
            <input
              id="birthday"
              type="date"
              value={birthday}
              onChange={e => setBirthday(e.target.value)}
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

          <div
            style={{
              border: "2.5px dashed #aad5bb",
              borderRadius: "22px",
              height: "120px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#a5b499",
              marginBottom: "26px",
              background: "#fcfff5",
              fontSize: "1.13em",
              fontFamily: "inherit",
              boxSizing: "border-box",
            }}
          >
            アイコン画像（？）
          </div>

          <button
            type="submit"
            style={{
              background: "linear-gradient(90deg,#b7e7b0 10%, #ffe699 90%)",
              border: "none",
              borderRadius: "14px",
              padding: "15px 0",
              width: "100%",
              fontSize: "1.15rem",
              fontWeight: "bold",
              color: "#5a7042",
              boxShadow: "0 4px 10px #b7d7bb45, 0 2px 0 #fffbe9 inset",
              letterSpacing: "0.03em",
              cursor: "pointer",
              marginBottom: "12px",
              fontFamily: "inherit",
              transition: "background 0.2s",
              boxSizing: "border-box",
            }}
          >
            登録
          </button>
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
        <div
          style={{
            marginTop: "32px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link
            to="/"
            style={{
              display: "inline-block",
              padding: "15px 36px",
              background: "linear-gradient(90deg,#fcfff5 60%, #d4efd7 100%)",
              color: "#47704c",
              borderRadius: "14px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              textDecoration: "none",
              boxShadow: "0 2px 8px #b7d7bb44",
              border: "2px solid #aad5bb",
              letterSpacing: "0.02em",
              fontFamily: "inherit",
              transition: "background 0.2s",
              boxSizing: "border-box",
            }}
          >
            ← ホームへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewAccount;
