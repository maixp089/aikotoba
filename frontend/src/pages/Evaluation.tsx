import React from "react";
import { Layout, Card } from "../components";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import BackIconButton from "../components/IconButton";
import BackgroundWrapper from "../components/Background";
import ToRecord from "../components/ToRecord";

type Feedback = {
  total_score: number;
  well_done: string;
  next_challenge: string;
};

interface LocationState {
  feedback?: Feedback;
}

const Evaluation: React.FC = () => {
  // URLパラメータ userId の型指定
  const { userId } = useParams<{ userId: string }>();
  // location.state の型指定
  const location = useLocation<LocationState>();
  const feedback = location.state?.feedback;
  const navigate = useNavigate();

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

  // 下部フッターバー（緑枠内）の定義
  const footerBar = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between", // 両端に配置
        width: "100%",
        padding: "0 18px",
        background: "#4bb3a7",
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        minHeight: 80,
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
        size={70}
      />
    </div>
  );

  return (
    <BackgroundWrapper>
      <Layout>
        <Card title="けっかはっぴょう" bottomBar={footerBar}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "40px 30px",
              gap: "30px",
            }}
          >
            {/* 得点表示 - 大きなカード風 */}
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "20px",
                padding: "30px",
                textAlign: "center",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
                border: "1px solid #e8e8e8",
                width: "100%",
                maxWidth: "280px",
                position: "relative",
              }}
            >
              {/* スコアラベル */}
              <div
                style={{
                  position: "absolute",
                  top: "-12px",
                  left: "20px",
                  backgroundColor: "#ffa726",
                  color: "white",
                  padding: "6px 16px",
                  borderRadius: "12px",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                }}
              >
                スコア
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <div
                  style={{
                    fontSize: "4rem",
                    fontWeight: "600",
                    color: "#333",
                    lineHeight: "1",
                  }}
                >
                  {feedback.total_score}
                </div>
                <span
                  style={{
                    fontSize: "1.8rem",
                    color: "#666",
                    marginLeft: "8px",
                  }}
                >
                  点
                </span>
              </div>
            </div>

            {/* フィードバックセクション */}
            <div
              style={{
                width: "100%",
                maxWidth: "300px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {/* はなまる枠 */}
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "15px",
                  padding: "20px",
                  border: "2px solid #ffcdd2",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-12px",
                    left: "20px",
                    backgroundColor: "#e91e63",
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: "12px",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                  }}
                >
                  はなまる💮
                </div>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#333",
                    lineHeight: "1.6",
                    margin: "10px 0 0 0",
                  }}
                >
                  {feedback.well_done}
                </p>
              </div>

              {/* もっとチャレンジ枠 */}
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "15px",
                  padding: "20px",
                  border: "2px solid #bbdefb",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-12px",
                    left: "20px",
                    backgroundColor: "#2196f3",
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: "12px",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                  }}
                >
                  もっとチャレンジ！
                </div>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#333",
                    lineHeight: "1.6",
                    margin: "10px 0 0 0",
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
  )
}

export default Evaluation
