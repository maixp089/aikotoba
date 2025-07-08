import { Card, Layout } from "../components";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import IconButton from "../components/IconButton";
import BackgroundWrapper from "../components/Background"; // 追加！

type User = {
  id: string;
  name: string;
};

type Score = {
  feedback_id: string;
  presentation_id: string;
  presentation_created_at: string;
  total_score: number;
  well_done: string;
  next_challenge: string;
};

const Record = () => {
  const { userId } = useParams<{ userId: string }>();
  const [scores, setScores] = useState<Score[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [scoreLoading, setScoreLoading] = useState(true);
  const loading = userLoading || scoreLoading;

  const navigate = useNavigate();

  // ユーザー情報のfetch
  useEffect(() => {
    if (!userId) return;
    setUserLoading(true);
    fetch(`http://localhost:8000/users/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("ユーザー情報取得失敗");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setUserLoading(false));
  }, [userId]);

  // スコア情報のfetch
  useEffect(() => {
    setScoreLoading(true);
    fetch(`http://localhost:8000/users/${userId}/scores`)
      .then((res) => {
        if (!res.ok) throw new Error("スコア取得失敗");
        return res.json();
      })
      .then((data) => setScores(data))
      .catch(() => setScores([]))
      .finally(() => setScoreLoading(false));
  }, [userId]);

  // "Z"がなければZを足してDateを返す関数
  const parseDate = (dateStr?: string | null) => {
    if (!dateStr) return new Date("");
    if (typeof dateStr !== "string") return new Date("");
    if (dateStr.endsWith("Z")) return new Date(dateStr);
    return new Date(dateStr + "Z");
  };

  // 並べ替え
  const sortedData = [...scores].sort(
    (a, b) =>
      parseDate(b.presentation_created_at).getTime() -
      parseDate(a.presentation_created_at).getTime()
  );
  // 直近3件に絞る
  const recent3 = sortedData.slice(0, 3);

  const headerTitle = user ? `${user.name} さんのきろく` : "きろく";
  const footerBar = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        width: "100%",
        padding: "0 18px",
        background: "#4bb3a7",
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        minHeight: 80,
      }}
    >
      <IconButton
        onClick={() => navigate(`/users/${userId}/mypage`)}
        label=""
        iconSrc="/icons/home.png"
      />
      <IconButton
        onClick={() => alert("このページはまだ準備中です！")}
        label=""
        iconSrc="/icons/watch.png"
      />
    </div>
  );

  // スコアごとの色マッピング関数
  const getScoreColor = (score: number) => {
    if (score >= 90) return "#e53935";
    if (score >= 80) return "#ff8fab";
    if (score >= 70) return "#fb8c00";
    if (score >= 60) return "#43a047";
    if (score >= 50) return "#1e88e5";
    return "#47704c";
  };

  return (
    <BackgroundWrapper>
      <Layout>
        <Card title={headerTitle} bottomBar={footerBar}>
          <div>
            {/* ここから表示を条件分岐 */}
            {loading ? (
              <div>読み込み中...</div>
            ) : !user ? (
              <div>ユーザー情報が見つかりません</div>
            ) : sortedData.length === 0 ? (
              <div>まだ記録がありません</div>
            ) : (
              <>
                {/* 案内ラベル */}
                <div
                  style={{
                    color: "#4bb3a7",
                    fontSize: "1rem",
                    textAlign: "center",
                    marginTop: "8px",
                    marginBottom: "30px",
                    fontWeight: "bold",
                    letterSpacing: "0.04em",
                  }}
                >
                  ここには新しい3つだけ出てるよ
                  <br />
                  <span style={{ fontWeight: "normal", fontSize: "0.97em" }}>
                    ぜんぶは下のボタンで見られるよ
                  </span>
                </div>
                {/* 記録一覧 */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  {recent3.map((entry) => {
                    const date = parseDate(entry.presentation_created_at);
                    const month = date.getMonth() + 1;
                    const day = date.getDate();
                    const hour = date.getHours();
                    const min = date.getMinutes().toString().padStart(2, "0");
                    const color = getScoreColor(entry.total_score);
                    return (
                      <button
                        key={entry.presentation_id}
                        onClick={() =>
                          navigate(
                            `/users/${userId}/evaluation/${entry.feedback_id}`
                          )
                        }
                        style={{
                          display: "block",
                          width: "100%",
                          padding: "12px 0",
                          background:
                            "linear-gradient(90deg,#fcfff5 60%, #d4efd7 100%)",
                          color,
                          borderRadius: "14px",
                          fontSize: "1.1rem",
                          fontWeight: "bold",
                          boxShadow: "0 2px 8px #b7d7bb44",
                          border: "2px solid #aad5bb",
                          letterSpacing: "0.02em",
                          fontFamily: "inherit",
                          cursor: "pointer",
                          margin: "0 auto",
                          transition: "filter .2s",
                        }}
                        className="hover:brightness-95"
                      >
                        {month}月{day}日 {hour}時{min}分 のきろく
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </Card>
      </Layout>
    </BackgroundWrapper>
  );
};

export default Record;
