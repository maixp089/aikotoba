import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BackToHome, ToPresentation, ToRanking, ToRecord } from "../components";

type User = {
  user_id: string;
  user_name: string;
  age: number;
};

const UserHome = () => {
  const { user_id } = useParams<{ user_id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user_id) return;
    fetch(`http://localhost:8000/users/${user_id}`)
      .then((res) => {
        if (!res.ok) throw new Error("ユーザー取得失敗");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [user_id]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f5f5",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        background: "white",
        borderRadius: "24px",
        boxShadow: "0 4px 32px #aaa4",
        padding: "48px 36px",
        width: "420px",
        textAlign: "center"
      }}>
        <div style={{ display: "flex", gap: "20px", marginBottom: "32px" }}>
          <BackToHome />
          <div style={{
            background: "#8c71f7",
            color: "#fff",
            borderRadius: "14px",
            padding: "10px 32px",
            fontWeight: "bold",
            fontSize: "1.2rem"
          }}>
            {loading
              ? "読み込み中..."
              : user
                ? `${user.user_name} さん`
                : "ユーザー未取得"}
          </div>
        </div>
        <div style={{
          border: "2px solid #e168e1",
          borderRadius: "50%",
          width: "220px",
          height: "220px",
          margin: "0 auto 32px auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.2rem",
          color: "#aaa"
        }}>
          ここに育成・アイコンなど
        </div>
        <div style={{ display: "flex", gap: "18px", justifyContent: "center", marginBottom: "16px" }}>
          <ToPresentation />
          <ToRecord />
        </div>
        <div>
          <ToRanking />
        </div>
      </div>
    </div>
  );
};

export default UserHome;