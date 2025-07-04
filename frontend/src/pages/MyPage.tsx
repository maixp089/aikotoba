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

  // ここに仮でローカルストレージからアイコンを取得（なければデフォルト）
  const getIconSrc = (userName: string) => {
    const iconName = localStorage.getItem(`icon_${userName}`); // "kuma"などが入っている
    return iconName
      ? `/icons/${iconName}.png`
      : "/icons/neko.png";
  };

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
          padding: "38px 16px 36px 16px",
          width: "100%",
          maxWidth: 390, // iPhoneXサイズに近く
          minWidth: 320,
          textAlign: "center",
          border: "3px solid #e8debe",
          boxSizing: "border-box",
        }}
      >
        {/* ヘッダー */}
        <div
          style={{
            display: "flex",
            gap: "18px",
            alignItems: "center",
            marginBottom: "28px",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: 320,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <BackToHome />
          <div
            style={{
              background: "#7c75ea",
              color: "#fff",
              borderRadius: "16px",
              padding: "10px 28px",
              fontWeight: "bold",
              fontSize: "1.16rem",
              letterSpacing: "0.05em",
              minWidth: "120px",
              textAlign: "center",
            }}
          >
            {loading
              ? "読み込み中..."
              : user
              ? `${user.user_name} さん`
              : "ユーザー未取得"}
          </div>
        </div>

        {/* アイコン＋年齢 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#fcf6ea",
            border: "2.5px solid #e8debe",
            borderRadius: "20px",
            boxShadow: "2px 5px 0 #e8debe44, 0 1px 8px #f3e7c233",
            padding: "18px 8px",
            margin: "0 auto 22px auto",
            maxWidth: 320,
            gap: "18px",
          }}
        >
          {/* アイコン */}
          <div
            style={{
              width: 70,
              height: 70,
              background: "#fff",
              border: "2.5px solid #b7d7bb",
              borderRadius: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 6px #e4eedc33",
              flexShrink: 0,
              marginRight: "8px",
            }}
          >
            <img
              src={user ? getIconSrc(user.user_name) : "/icons/neko.png"}
              alt="icon"
              style={{ width: 54, height: 54 }}
            />
          </div>
          {/* ユーザー名＋年齢 */}
          <div style={{ textAlign: "left" }}>
            <span
              style={{
                fontSize: "1.7rem",
                fontWeight: 700,
                color: "#595241",
                letterSpacing: "0.03em",
                lineHeight: 1.1,
                marginBottom: "6px",
                wordBreak: "break-all",
                fontFamily: "'M PLUS Rounded 1c','Kosugi Maru',sans-serif",
              }}
            >
              {user ? user.user_name : ""}
            </span>
            <br />
            <span
              style={{
                fontSize: "1.04rem",
                color: "#ad9f84",
                fontWeight: 600,
                marginLeft: 2,
                lineHeight: 1.1,
              }}
            >
              {user && user.age !== undefined ? `年齢：${user.age}` : ""}
            </span>
          </div>
        </div>

        {/* 育成サークル */}
        <div
          style={{
            border: "3px solid #b399eb",
            borderRadius: "50%",
            width: "150px",
            height: "150px",
            margin: "0 auto 32px auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.1rem",
            color: "#b0a7be",
            background: "#f9f5fd",
            marginBottom: "32px",
          }}
        >
          ここに育成・アイコンなど
        </div>

        {/* メニューボタン */}
        <div style={{
          display: "flex",
          gap: "16px",
          justifyContent: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}>
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
