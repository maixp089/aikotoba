import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// --- アイコン名と画像パスのマップ ---
const iconSrcMap: { [key: string]: string } = {
  neko: "/icons/neko.png",
  tori: "/icons/tori.png",
  washi: "/icons/washi.png",
  kuma: "/icons/kuma.png",
};

type User = {
  user_id: string;
  user_name: string;
  age: number;
  icon: string;    // ←ここ追加
};

const Login = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:8000/users");
        if (!res.ok) throw new Error("ユーザー取得失敗");
        const data = await res.json();
        setUsers(data);
      } catch {
        setError("ユーザー取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleLogin = (user: User) => {
    navigate(`/mypage/${user.user_id}`);
  };

  const handleDelete = async (userId: string) => {
    if (!window.confirm("本当に削除しますか？")) return;
    setDeleteLoading(userId);
    setError(null);
    try {
      const res = await fetch(`http://localhost:8000/users/${userId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.detail ? "削除失敗: " + data.detail : "削除に失敗しました");
        return;
      }
      // localStorage関係は削除OK
      const refetch = async () => {
        const res2 = await fetch("http://localhost:8000/users");
        setUsers(await res2.json());
      };
      await refetch();
    } catch {
      setError("通信エラー（削除）");
    } finally {
      setDeleteLoading(null);
    }
  };

  // icon名から画像パスを返す
  const getIconSrc = (iconName: string) => {
    return iconSrcMap[iconName as keyof typeof iconSrcMap] || "/icons/neko.png";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(120deg,#d3edd7 0%, #e6f1dc 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'M PLUS Rounded 1c', 'Kosugi Maru', sans-serif",
      }}
    >
      <div
        style={{
          background: "#fff8e7",
          borderRadius: "28px",
          boxShadow: "0 6px 28px #b7d7bb66, 0 1.5px 0 #fffbe9 inset",
          padding: "26px 12px 20px 12px",
          width: "100%",
          maxWidth: "375px",
          minWidth: "320px",
          textAlign: "center",
          border: "3px solid #e8debe",
          boxSizing: "border-box",
        }}
      >
        <h1
          style={{
            marginBottom: "20px",
            fontSize: "2.0rem",
            fontWeight: "bold",
            letterSpacing: "0.03em",
            color: "#5a7042",
            textShadow: "1px 2px 0 #fffbe9, 0 4px 6px #b7d7bb55",
          }}
        >
          アカウントページ
        </h1>
        {loading ? (
          <div>読み込み中...</div>
        ) : error ? (
          <div style={{ color: "red", marginBottom: "16px" }}>{error}</div>
        ) : users.length === 0 ? (
          <div>ユーザーがいません</div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginBottom: "18px",
              width: "100%",
              maxWidth: "335px",
              margin: "0 auto 18px auto",
            }}
          >
            {users.map(user => (
              <div
                key={user.user_id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "#fcf6ea",
                  border: "2.5px solid #e8debe",
                  borderRadius: "20px",
                  boxShadow: "2px 5px 0 #e8debe44, 0 1px 8px #f3e7c233",
                  padding: "15px 11px 15px 15px",
                  minWidth: 0,
                  maxWidth: 330,
                  margin: "0 auto",
                  position: "relative",
                  justifyContent: "space-between",
                  gap: "0px",
                }}
              >
                {/* アイコン */}
                <div
                  style={{
                    width: 54,
                    height: 54,
                    background: "#fff",
                    border: "2.5px solid #b7d7bb",
                    borderRadius: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 6px #e4eedc33",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={getIconSrc(user.icon)} // ←ここを user.icon で！
                    alt="icon"
                    style={{ width: 38, height: 38 }}
                  />
                </div>
                {/* ユーザー名＋年齢 */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    flex: 1,
                    minWidth: 0,
                    marginLeft: "18px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleLogin(user)}
                  tabIndex={0}
                  role="button"
                >
                  <span
                    style={{
                      fontSize: "1.36rem",
                      fontWeight: 700,
                      color: "#595241",
                      letterSpacing: "0.03em",
                      fontFamily: "'M PLUS Rounded 1c','Kosugi Maru',sans-serif",
                      lineHeight: 1.1,
                      marginBottom: "6px",
                      wordBreak: "break-all",
                    }}
                  >
                    {user.user_name}
                  </span>
                  {user.age !== undefined && user.age !== null && user.age !== 0 && (
                    <span
                      style={{
                        fontSize: "1.00rem",
                        color: "#ad9f84",
                        fontWeight: 600,
                        letterSpacing: "0.03em",
                        marginTop: 2,
                        marginLeft: 2,
                        lineHeight: 1.1,
                      }}
                    >
                      年齢：{user.age}
                    </span>
                  )}
                </div>
                {/* 削除ボタン */}
                <button
                  onClick={() => handleDelete(user.user_id)}
                  disabled={deleteLoading === user.user_id}
                  style={{
                    marginLeft: "12px",
                    background: "none",
                    color: "#fa4a7a",
                    fontWeight: 900,
                    fontSize: "1.28rem",
                    border: "none",
                    boxShadow: "none",
                    cursor: deleteLoading ? "not-allowed" : "pointer",
                    outline: "none",
                    padding: 0,
                    letterSpacing: "0.03em",
                    fontFamily: "'M PLUS Rounded 1c', 'Kosugi Maru', sans-serif",
                    lineHeight: 1,
                  }}
                >
                  {deleteLoading === user.user_id ? "削除中..." : "削除"}
                </button>
              </div>
            ))}
          </div>
        )}
        <div
          style={{
            marginTop: "18px",
            width: "100%",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Link
            to="/"
            style={{
              flex: 1,
              maxWidth: "175px",
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
            ← ホームへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;