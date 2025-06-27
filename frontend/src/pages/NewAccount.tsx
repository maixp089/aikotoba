import React, { useState } from "react";

const NewAccount = () => {
  const [userName, setUserName] = useState("");
  const [grade, setGrade] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // POSTするデータを用意
    const data = {
      user_name: userName,
      age: Number(grade), // 数値として送る
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
    // 入力リセット
    setUserName("");
    setGrade("");
  } catch {
    setResult("通信エラー");
  }
};

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f5f5f5"
    }}>
      <div style={{
        background: "white",
        borderRadius: "24px",
        boxShadow: "0 4px 32px #aaa4",
        padding: "48px 36px",
        width: "350px",
        textAlign: "center"
      }}>
        <h2 style={{ marginBottom: "32px", fontSize: "2rem" }}>新規登録</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="ユーザ名"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "16px", borderRadius: "8px", border: "1px solid #ccc" }}
            required
          />
          <input
            type="number"
            placeholder="学年（例：4）"
            value={grade}
            onChange={e => setGrade(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "16px", borderRadius: "8px", border: "1px solid #ccc" }}
            required
          />
          <div style={{
            border: "2px dashed #bbb",
            borderRadius: "16px",
            height: "120px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#888",
            marginBottom: "24px"
          }}>
            アイコン画像（？）
          </div>
          <button
            type="submit"
            style={{
              background: "#e3eded",
              border: "none",
              borderRadius: "8px",
              padding: "12px 0",
              width: "100%",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >登録</button>
        </form>
        {result && (
          <div style={{ marginTop: "24px", color: result.startsWith("登録成功") ? "green" : "red" }}>
            {result}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewAccount;
