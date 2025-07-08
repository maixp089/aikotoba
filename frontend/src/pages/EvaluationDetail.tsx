import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout, Card } from "../components";
import BackgroundWrapper from "../components/Background";
import BackIconButton from "../components/IconButton";  // ← こちらをインポート

// API のレスポンスに合わせた型定義
type Feedback = {
  id: number;
  user_id: string;
  presentation_id: number;
  total_score: number;
  well_done: string;
  next_challenge: string;
  created_at: string; // ISO 文字列
};

const EvaluationDetail: React.FC = () => {
  const { feedback_id, userId } = useParams<{ feedback_id: string; userId: string }>();
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!feedback_id) return;
    setLoading(true);
    fetch(`/api/audio-feedback/${feedback_id}`)
      .then((res) => {
        if (!res.ok) throw new Error("記録が見つかりませんでした");
        return res.json();
      })
      .then((data: Feedback) => setFeedback(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [feedback_id]);

  if (loading) {
    return (
      <Layout>
        <div className="p-6 text-center">読み込み中...</div>
      </Layout>
    );
  }
  if (error) {
    return (
      <Layout>
        <div className="p-6 text-center text-red-500">{error}</div>
      </Layout>
    );
  }
  if (!feedback) {
    return (
      <Layout>
        <div className="p-6 text-center text-red-500">データなし</div>
      </Layout>
    );
  }

  // 日付フォーマット
  const date = new Date(feedback.created_at);
  const displayDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}時${date.getMinutes()}分`;

  // フッターバー：もどるボタンのみ
  const footerBar = (
    <div
      style={{
        display: "flex",
        justifyContent: "center",  // 中央寄せ
        padding: "12px 0",
      }}
    >
      <BackIconButton
        onClick={() => navigate(`/users/${userId}/mypage`)}
        size={60}
      />
    </div>
  );

  return (
    <BackgroundWrapper>
      <Layout>
        <Card 
         title={"\u200B"}    // ゼロ幅スペースを渡して“空文字”の見た目に
         bottomBar={footerBar}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "40px 30px",
              gap: "30px",
            }}
          >
            {/* 得点表示 */}
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
                  marginTop: "10px",
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
                    marginLeft: "8px",
                  }}
                >
                  点
                </span>
              </div>
            </div>

            {/* フィードバック詳細 */}
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "16px",
                border: "1px solid #e0e0e0",
                width: "100%",
                maxWidth: "320px",
              }}
            >
              {/* タグラベル */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#4ecdc4",
                    color: "white",
                    padding: "4px 12px",
                    borderRadius: "12px",
                    fontSize: "0.8rem",
                  }}
                >
                  スピーチ
                </div>
              </div>
              {/* 評価日 */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#8bc34a",
                    color: "white",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "0.8rem",
                    marginRight: "12px",
                    minWidth: "80px",
                  }}
                >
                  📅 評価日
                </div>
                <span style={{ fontSize: "0.9rem", color: "#333" }}>
                  {displayDate}
                </span>
              </div>
              {/* コメント */}
              <div
                style={{
                  fontSize: "0.85rem",
                  color: "#555",
                  lineHeight: 1.5,
                  backgroundColor: "#f9f9f9",
                  padding: "12px",
                  borderRadius: "8px",
                }}
              >
                <p style={{ marginBottom: "8px" }}>{feedback.well_done}</p>
                <p style={{ margin: 0 }}>{feedback.next_challenge}</p>
              </div>
            </div>
          </div>
        </Card>
      </Layout>
    </BackgroundWrapper>
  );
};

export default EvaluationDetail;
