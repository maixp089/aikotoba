import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ToRecord from "../components/ToRecord";
import BackIconButton from "../components/IconButton";
import { Layout, Card } from "../components";
import BackgroundWrapper from "../components/Background";

type Feedback = {
  total_score: number;
  well_done: string;
  next_challenge: string;
};
type User = {
  id: string;
  name: string;
  age: number;
  icon_image: string;
};

interface LocationState {
  feedback?: Feedback;
}

const Evaluation: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const location = useLocation<LocationState>();
  const feedback = location.state?.feedback;
  const navigate = useNavigate();

  // ユーザー情報を取得
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:8000/users/${userId}`)
      .then(res => res.ok ? res.json() : Promise.reject())
      .then((u: User) => setUser(u))
      .catch(() => {});
  }, [userId]);

  const getIconSrc = (icon: string) =>
    icon ? `/icons/${icon}` : "/icons/neko.png";

  if (!feedback) {
    return (
      <BackgroundWrapper>
        <Layout>
          <div className="p-6 text-center text-red-500">
            フィードバック情報がありません。
          </div>
        </Layout>
      </BackgroundWrapper>
    );
  }

  // カスタムヘッダー
  const header = (
    <div
      style={{
        position: "relative",
        background: "#4bb3a7",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        height: 72, // 少し高さup
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
      }}
    >
      {/* ユーザーアイコン */}
      {user && (
        <img
          src={getIconSrc(user.icon_image)}
          alt="ユーザーアイコン"
          style={{
          width: 62, // ←大きめ
          height: 62,
          borderRadius: "50%",
          border: "2.5px solid #fff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.13)",
          marginLeft: -10,// ←左端
          marginRight: 16, // 名前帯と離す
          objectFit: "cover",
          background: "#fff",
          }}
        />
      )}
      {/* 名前帯UI（大きく） */}
    {user && (
      <div
        style={{
          background: "#f4bc21",
            color: "#fff",
            borderRadius: "26px",
            padding: "8px 26px 7px 24px",
            fontWeight: 900,
            fontSize: "1.42rem",
            letterSpacing: "0.08em",
            fontFamily: "'Kosugi Maru','M PLUS Rounded 1c',sans-serif",
            border: "2.8px solid #fff6c5",
            textAlign: "center",
            boxShadow: "0 5px 16px #ffe39d77",
            userSelect: "none",
            pointerEvents: "none",
            marginLeft: 0,
            lineHeight: 1.18,
            minWidth: 128,
        }}
        >
          {user.name + "さん"}
        </div>
      )}
    </div>
  );

  // 下部フッター
  const footerBar = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 18px",
        background: "#4bb3a7",
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        height: 80,
        width: "100%",
      }}
    >
      <BackIconButton
        onClick={() => navigate(-1)}
        iconSrc="/icons/back.png"
        alt="もどる"
        size={64}
      />
      <ToRecord
        onClick={() => navigate(`/users/${userId}/record`)}
        size={64}
      />
    </div>
  );

  return (
    <BackgroundWrapper>
      <Layout>
        <Card title={header} bottomBar={footerBar}>
          {/* 本文の score & feedback */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "40px 30px",
              gap: "30px",
            }}
          >
            {/* 得点 */}
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: 20,
                padding: 30,
                textAlign: "center",
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                border: "1px solid #e8e8e8",
                width: "100%",
                maxWidth: 280,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -12,
                  left: 20,
                  backgroundColor: "#ffa726",
                  color: "#fff",
                  padding: "6px 16px",
                  borderRadius: 12,
                  fontSize: "0.9rem",
                  fontWeight: 500,
                }}
              >
                スコア
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <div
                  style={{
                    fontSize: "4rem",
                    fontWeight: 600,
                    color: "#333",
                    lineHeight: 1,
                  }}
                >
                  {feedback.total_score}
                </div>
                <span
                  style={{
                    fontSize: "1.8rem",
                    color: "#666",
                    marginLeft: 8,
                  }}
                >
                  点
                </span>
              </div>
            </div>

            {/* フィードバック */}
            <div
              style={{
                width: "100%",
                maxWidth: 300,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 15,
                  padding: 20,
                  border: "2px solid #ffcdd2",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -12,
                    left: 20,
                    backgroundColor: "#e91e63",
                    color: "#fff",
                    padding: "6px 12px",
                    borderRadius: 12,
                    fontSize: "0.9rem",
                    fontWeight: 500,
                  }}
                >
                  はなまる💮
                </div>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#333",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {feedback.well_done}
                </p>
              </div>

              <div
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 15,
                  padding: 20,
                  border: "2px solid #bbdefb",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -12,
                    left: 20,
                    backgroundColor: "#2196f3",
                    color: "#fff",
                    padding: "6px 12px",
                    borderRadius: 12,
                    fontSize: "0.9rem",
                    fontWeight: 500,
                  }}
                >
                  もっとチャレンジ！
                </div>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#333",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {feedback.next_challenge}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </Layout>
    </BackgroundWrapper>
  );
};

export default Evaluation;
