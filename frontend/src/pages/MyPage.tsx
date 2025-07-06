import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/Card";

// ユーザー型
type User = {
  id: string;
  name: string;
  age: number;
  icon_image: string;
};

const menuButtons = [
  {
    key: "back",
    img: "/icons/back.png",
    alt: "もどる",
    to: "/",
  },
  {
    key: "practice",
    img: "/icons/practice.png",
    alt: "練習する",
    to: "/presentation",
  },
  {
    key: "record",
    img: "/icons/record.png",
    alt: "きろく",
    to: "/record",
  },
];

const MyPage = () => {
  const { user_id } = useParams<{ user_id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getIconSrc = (icon_image: string) => {
    return icon_image ? `/icons/${icon_image}` : "/icons/neko.png";
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

  // 下部バー
  const bottomBar = (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "0 18px",
        background: "#4bb3a7",
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        minHeight: 80,
      }}
    >
      {menuButtons.map((btn) => (
        <button
          key={btn.key}
          onClick={() => navigate(btn.to)}
          style={{
            background: "none",
            border: "none",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            minWidth: 44,
            padding: 0,
          }}
        >
          <img
            src={btn.img}
            alt={btn.alt}
            style={{ width: 64, height: 64, marginBottom: 2 }}
          />
        </button>
      ))}
    </div>
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
      <Card
        title="おかえりなさい"
        style={{ margin: "42px 0 0 0" }}
        bottomBar={bottomBar}
      >
        {/* 画像＆名前ラベルを下に寄せる */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "40px 0 16px 0", // ← ここだけ40→28に修正
            position: "relative",
          }}
        >
          {/* 斜めネームラベル */}
          {user && (
            <div
              style={{
                position: "absolute",
                left: "18px",
                top: "-10px", // ← 画像とのバランスで微調整
                background: "#f4bc21",
                color: "#fff",
                borderRadius: "22px 18px 22px 14px",
                padding: "4px 13px 3px 11px",
                fontWeight: 700,
                fontSize: "1.02rem",
                letterSpacing: "0.09em",
                fontFamily: "'Kosugi Maru','M PLUS Rounded 1c',sans-serif",
                border: "2.3px solid #fff6c5",
                minWidth: 0,
                textAlign: "center",
                transform: "rotate(-23deg)",
                zIndex: 2,
                boxShadow: "0 5px 12px #ffe39d66",
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              {user.name + "さん"}
            </div>
          )}
          <div
            style={{
              width: 170,
              height: 170,
              background: "#fff",
              border: "2.5px solid #bfe3c9",
              borderRadius: "48px",
              boxShadow: "0 2px 12px #cce7d277",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              padding: 0,
            }}
          >
            {loading ? (
              <span style={{ fontSize: "1.3em", color: "#aaa" }}>...</span>
            ) : (
              <img
                src={user ? getIconSrc(user.icon_image) : "/icons/neko.png"}
                alt="icon"
                style={{
                  width: "96%",
                  height: "96%",
                  borderRadius: "44px",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MyPage;

