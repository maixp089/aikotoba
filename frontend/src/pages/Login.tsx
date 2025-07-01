import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackToHome from "../components/BackToHome"; // ←これだけ使う

type User = {
  user_id: string;
  user_name: string;
  age: number;
};

const Login = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then(res => {
        if (!res.ok) throw new Error("ユーザー取得失敗");
        return res.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("ユーザー取得に失敗しました");
        setLoading(false);
      });
  }, []);

  // 選択ユーザーでマイページに遷移
  const handleLogin = (user: User) => {
    navigate(`/mypage/${user.user_id}`);
  };

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
        width: "350px",
        textAlign: "center"
      }}>
        <h1 style={{ marginBottom: "32px", fontSize: "2rem" }}>ログインページ</h1>
        {loading ? (
          <div>読み込み中...</div>
        ) : error ? (
          <div style={{ color: "red" }}>{error}</div>
        ) : users.length === 0 ? (
          <div>ユーザーがいません</div>
        ) : (
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginBottom: "32px"
          }}>
            {users.map(user => (
              <button
                key={user.user_id}
                onClick={() => handleLogin(user)}
                style={{
                  width: "100%",
                  padding: "14px",
                  background: "#333",
                  color: "#fff",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  letterSpacing: "2px"
                }}
              >
                {user.user_name}
              </button>
            ))}
          </div>
        )}
        {/* 下部にホームへ戻るボタン */}
        <BackToHome />
      </div>
    </div>
  );
};

export default Login;
