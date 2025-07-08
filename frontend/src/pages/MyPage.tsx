import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import BackgroundWrapper from "../components/Background"; // ← 追加

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
    to: () => "/",
  },
  {
    key: "practice",
    img: "/icons/practice.png",
    alt: "練習する",
    to: (userId?: string) => `/users/${userId}/presentationSetting`,
  },
  {
    key: "record",
    img: "/icons/record.png",
    alt: "きろく",
    to: (userId: string) => `/users/${userId}/record`,
  },
];

const MyPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getIconSrc = (icon_image: string) => {
    return icon_image ? `/icons/${icon_image}` : "/icons/neko.png";
  };

  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:8000/users/${userId}`)
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
  }, [userId]);

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
          onClick={() => {
            if ((btn.key === "practice" || btn.key === "record") && !userId) {
              alert("ユーザー情報が取得できていません");
              return;
            }
            navigate(btn.to(userId!));
          }}
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
    <BackgroundWrapper>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "'M PLUS Rounded 1c', 'Kosugi Maru', 'sans-serif'",
        }}
      >
        <Card title="おかえりなさい" style={{ margin: "42px 0 0 0" }} bottomBar={bottomBar}>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "40px 0 16px 0",
              position: "relative",
            }}
          >
            {user && (
              <div
                style={{
                  position: "absolute",
                  left: "18px",
                  top: "-10px",
                  background: "#f4bc21",
                  color: "#fff",
                  borderRadius: "22px 18px 22px 14px",
                  padding: "4px 13px 3px 11px",
                  fontWeight: 700,
                  fontSize: "1.02rem",
                  letterSpacing: "0.09em",
                  fontFamily: "'Kosugi Maru','M PLUS Rounded 1c',sans-serif",
                  border: "2.3px solid #fff6c5",
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
              }}
            >
              {loading ? (
                <span style={{ fontSize: "1.3em", color: "#aaa" }}>...</span>
              ) : (
                <img
                  src={getIconSrc(user?.icon_image || "")}
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
    </BackgroundWrapper>
  );
};

export default MyPage;

