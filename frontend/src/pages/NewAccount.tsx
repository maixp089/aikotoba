import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Card from "../components/Card";

const iconList = [
  { name: "ネコ", value: "neko", src: "/icons/neko.png" },
  { name: "トリ", value: "tori", src: "/icons/tori.png" },
  { name: "ワシ", value: "washi", src: "/icons/washi.png" },
  { name: "クマ", value: "kuma", src: "/icons/kuma.png" },
];

const NewAccount = () => {
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  

  // 親画面(Home)からfirebase_uidを受け取る
  const firebase_uid = location.state?.firebase_uid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIcon || !firebase_uid) return; // 必須チェック

    const data = {
      firebase_uid, // ← 必須！
      name: userName, // ← 指示通りnameに！
      age: age ? Number(age) : null,
      icon_image: `${selectedIcon}.png`, // or 画像URL
    };

    try {
      const res = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        // 重複などのエラーもここに入る
        const err = await res.json();
        alert(err.detail ?? "登録に失敗しました");
        return;
      }
      const user = await res.json();
      setUserName("");
      setAge("");
      setSelectedIcon(null);
      // 登録完了時はマイページへ遷移
      navigate(`/mypage/${user.id}`);
    } catch {
      alert("通信エラーが発生しました");
    }
  };

  // ボタンエリアをJSXで定義（下帯に渡す！）
  const bottomBar = (
    <>
      <Link
        to="/"
        style={{
          flex: 1,
          display: "inline-block",
          padding: "13px 0",
          background: "#19848e",
          color: "#fff",
          borderRadius: "34px",
          fontSize: "1.1rem",
          fontWeight: "bold",
          textDecoration: "none",
          boxShadow: "0 5px #10676c",
          letterSpacing: "1.4px",
          fontFamily: "'M PLUS Rounded 1c', 'Kosugi Maru', sans-serif",
          border: "none",
          textAlign: "center",
          outline: "none",
          transition: "background 0.2s",
        }}
      >
        ← もどる
      </Link>
      <button
        type="submit"
        form="register-form"
        style={{
          flex: 1,
          background: "#f2687b",
          color: "#fff",
          borderRadius: "34px",
          fontSize: "1.1rem",
          fontWeight: "bold",
          boxShadow: "0 5px #c35665",
          letterSpacing: "1.4px",
          fontFamily: "'M PLUS Rounded 1c', 'Kosugi Maru', sans-serif",
          border: "none",
          textAlign: "center",
          outline: "none",
          padding: "13px 0",
          margin: 0,
          cursor: "pointer",
          transition: "background 0.2s",
        }}
      >
        登録
      </button>
    </>
  );

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
      <Card title="はじめる" bottomBar={bottomBar}>
        <form id="register-form" onSubmit={handleSubmit}>
          {/* ユーザー名 */}
          <input
            type="text"
            placeholder="おなまえ"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            style={{
              width: "100%",
              padding: "11px 12px",
              marginBottom: "13px",
              borderRadius: "14px",
              border: "2px solid #aad5bb",
              fontSize: "1.09em",
              background: "#f6ffef",
              fontFamily: "inherit",
              boxShadow: "0 2px 10px #cce7d266",
              outline: "none",
              transition: "border 0.2s",
              boxSizing: "border-box",
            }}
            required
          />
          {/* 年齢 */}
          <div style={{ marginBottom: "12px" }}>
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
                padding: "11px 12px",
                borderRadius: "14px",
                border: "2px solid #aad5bb",
                fontSize: "1.09em",
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
          {/* アイコン選択 */}
          <div
            style={{
              border: "2px dashed #aad5bb",
              borderRadius: "20px",
              minHeight: "90px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#a5b499",
              marginBottom: "19px",
              background: "#fcfff5",
              fontSize: "1.04em",
              fontFamily: "inherit",
              boxSizing: "border-box",
              gap: "10px",
              flexWrap: "wrap",
              padding: "7px",
            }}
          >
            {iconList.map(icon => (
              <div
                key={icon.value}
                onClick={() => setSelectedIcon(icon.value)}
                style={{
                  border: selectedIcon === icon.value ? "3px solid #f2687b" : "2px solid #aad5bb",
                  borderRadius: "15px",
                  padding: "4px 5px",
                  margin: "0 2px",
                  background: selectedIcon === icon.value ? "#fff0ef" : "#fff",
                  cursor: "pointer",
                  textAlign: "center",
                  boxShadow: selectedIcon === icon.value ? "0 2px 8px #f2687b33" : "",
                  transition: "border 0.2s, background 0.2s",
                  minWidth: 52,
                  minHeight: 70,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={icon.src} alt={icon.name} style={{ width: 38, height: 38, marginBottom: 1 }} />
                <div style={{ fontSize: "0.92em" }}>{icon.name}</div>
              </div>
            ))}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default NewAccount;