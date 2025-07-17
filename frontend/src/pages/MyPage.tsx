import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import BackgroundWrapper from "../components/Background";

type User = {
  id: string;
  name: string;
  age: number;
  icon_image: string;
  paid: boolean; // 有償フラグ追加
};

type Score = {
  feedback_id: string;
  presentation_id: string;
  presentation_created_at: string;
  total_score: number;
  well_done: string;
  next_challenge: string;
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
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);
  const [scoresLoading, setScoresLoading] = useState(true);
  const navigate = useNavigate();

  const getIconSrc = (icon_image: string) => {
    return icon_image ? `/icons/${icon_image}` : "/icons/neko.png";
  };

  // ユーザー情報取得
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

  // スコア情報取得
  useEffect(() => {
    if (!userId) return;
    setScoresLoading(true);
    fetch(`http://localhost:8000/users/${userId}/scores`)
      .then((res) => {
        if (!res.ok) throw new Error("スコア取得失敗");
        return res.json();
      })
      .then((data) => {
        setScores(data);
        setScoresLoading(false);
      })
      .catch(() => {
        setScores([]);
        setScoresLoading(false);
      });
  }, [userId]);

  // ハイスコア計算
  const getHighScore = () => {
    if (scores.length === 0) return 0;
    const sortedData = [...scores].sort(
      (a, b) =>
        new Date(b.presentation_created_at).getTime() -
        new Date(a.presentation_created_at).getTime()
    );
    const displayScores = sortedData.slice(0, 3);
    if (displayScores.length === 0) return 0;
    return Math.max(...displayScores.map((score) => score.total_score));
  };

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
            if ((btn.key === "practice") && !userId) {
              alert("ユーザー情報が取得できていません");
              return;
            }
            // 「練習する」ボタンだけ有償判定
            if (btn.key === "practice") {
              if (!user?.paid) {
                // 未課金なら/payへ
                navigate(`/users/${userId}/pay`)
                return;
              }
              // 有償会員なら本来のページへ
              navigate(btn.to(userId!)); // ここで userId! （「絶対ある」と保証）
              return;
            }
            // 他ボタンはそのまま
            if ((btn.key === "record") && !userId) {
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
            src={btn.img || "/placeholder.svg"}
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
        <Card title="おかえりなさい" style={{ margin: "0px 0 0 0" }} bottomBar={bottomBar}>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "30px 0 16px 0",
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
            {/* キャラクター吹き出し（猫の画像の下） */}
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                alignItems: "flex-end",
                gap: "8px",
              }}
            >
              {/* キャラクター（scorekun.png使用） */}
              <img
                src="/icons/scorekun.png"
                alt="スコアくん"
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "contain",
                }}
              />
              {/* 吹き出し */}
              <div
                style={{
                  position: "relative",
                  background: "linear-gradient(135deg, #87CEEB 0%, #B0E0E6 100%)",
                  borderRadius: "16px",
                  padding: "10px 14px",
                  maxWidth: "160px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  border: "2px solid #fff",
                }}
              >
                {/* 吹き出しの尻尾 */}
                <div
                  style={{
                    position: "absolute",
                    left: "-6px",
                    bottom: "12px",
                    width: "0",
                    height: "0",
                    borderTop: "6px solid transparent",
                    borderBottom: "6px solid transparent",
                    borderRight: "10px solid #87CEEB",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: "-4px",
                    bottom: "12px",
                    width: "0",
                    height: "0",
                    borderTop: "6px solid transparent",
                    borderBottom: "6px solid transparent",
                    borderRight: "10px solid #fff",
                  }}
                />
                {/* ハイスコア表示 */}
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "13px",
                    padding: "8px 12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    boxShadow: "0 8px 10px rgba(0,0,0,0.1)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      color: "#f4bc21",
                      fontFamily: "'Kosugi Maru','M PLUS Rounded 1c',sans-serif",
                    }}
                  >
                    ハイスコア
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "2px",
                    }}
                  >
                    {scoresLoading ? (
                      <span style={{ fontSize: "0.9rem", color: "#aaa" }}>...</span>
                    ) : (
                      <>
                        <span
                          style={{
                            fontSize: "1.4rem",
                            fontWeight: 900,
                            color: "#4a4a4a",
                            fontFamily: "'Kosugi Maru','M PLUS Rounded 1c',sans-serif",
                          }}
                        >
                          {getHighScore()}
                        </span>
                        <span
                          style={{
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            color: "#888",
                            fontFamily: "'Kosugi Maru','M PLUS Rounded 1c',sans-serif",
                          }}
                        >
                          点
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </BackgroundWrapper>
  );
};

export default MyPage;
