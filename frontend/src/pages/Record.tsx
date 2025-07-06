import { BackToMyPage, Card, Layout } from "../components";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
};

type Score = {
  presentation_id: string;
  presentation_created_at: string;
  total_score: number;
  well_done: string;
  next_challenge: string;
};

const Record = () => {
  // 以下モックデータをコメントアウト
  // const sortedData = [...mockScoreAdviceData].sort((a, b) => {
  // const dateA = new Date(`${a.date}T${a.time}`);
  // const dateB = new Date(`${b.date}T${b.time}`);
  // return dateA.getTime() - dateB.getTime();
  // });
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
    setUserLoading(true); // ←複数回アクセスでも毎回リセット！
    fetch(`http://localhost:8000/users/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("ユーザー情報取得失敗");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null)) // エラー時もnullで明示
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
      .catch(() => setScores([])) // 失敗時は空配列クリアもあり
      .finally(() => setScoreLoading(false));
  }, [userId]);

  // "Z"がなければZを足してDateを返す関数
  const parseDate = (dateStr?: string | null) => {
    if (!dateStr) return new Date(""); // 空DateはInvalid Date
    if (typeof dateStr !== "string") return new Date(""); // 万が一
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

  // グラフ用計算
  const width = 300;
  const height = 150;
  const padding = 20;
  const maxScore = Math.max(...sortedData.map((d) => d.total_score), 0);
  const minScore = Math.min(...sortedData.map((d) => d.total_score), 0);
  const yRange = maxScore - minScore || 1;
  const xStep = (width - 2 * padding) / Math.max(sortedData.length - 1, 1);

  // 折れ線パス生成
  const points = sortedData
    .map((d, i) => {
      const x = padding + i * xStep;
      const y =
        height -
        padding -
        ((d.total_score - minScore) / yRange) * (height - 2 * padding);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <Layout>
      <Card>
        <div className="flex flex-col items-center space-y-6 py-6 px-4">
          {/* 上部ボタン */}
          <div className="flex justify-between w-full max-w-md">
            <BackToMyPage userId={userId!} />{" "}
            {/*「!」追加：絶対userIdがundefinedじゃないことを宣言*/}
            <div className="bg-black text-white rounded px-4 py-2 text-sm">
              {user ? `${user.name} さん` : "ユーザー名取得中..."}
            </div>
          </div>
          {/* ここから表示を条件分岐 */}
          {loading ? (
            <div>読み込み中...</div>
          ) : !user ? (
            <div>ユーザー情報が見つかりません</div>
          ) : sortedData.length === 0 ? (
            <div>まだ記録がありません</div>
          ) : (
            <>
              {/* 折れ線グラフ（SVG） */}
              <div className="w-full max-w-md bg-blue-50 p-4 rounded shadow flex justify-center">
                <svg width={width} height={height}>
                  {/* 背景 */}
                  <rect width={width} height={height} fill="#f0f9ff" rx={10} />
                  {/* 折れ線 */}
                  <polyline
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2"
                    points={points}
                  />
                  {/* 各点 */}
                  {points.split(" ").map((p, idx) => {
                    const [x, y] = p.split(",");
                    return (
                      <circle
                        key={idx}
                        cx={x}
                        cy={y}
                        r="3"
                        fill="#ef4444"
                        stroke="white"
                        strokeWidth="1"
                      />
                    );
                  })}
                </svg>
              </div>
              {/* 記録一覧 */}
              <div className="w-full max-w-md space-y-2">
                {recent3.map((entry) => {
                  const date = parseDate(entry.presentation_created_at);
                  // 月・日・時刻を整形
                  const month = date.getMonth() + 1;
                  const day = date.getDate();
                  const hour = date.getHours();
                  const min = date.getMinutes().toString().padStart(2, "0");
                  return (
                    <div
                      key={entry.presentation_id}
                      className="border border-black rounded text-center py-3 bg-white hover:bg-gray-100 cursor-pointer"
                      style={{
                        width: "100%",
                        padding: "10px ",
                        marginBottom: "10px",
                        borderRadius: "16px",
                        border: "2px solid #aad5bb",
                        fontSize: "1.13em",
                        background: "#f6ffef",
                        fontFamily: "inherit",
                        boxShadow: "0 2px 10px #cce7d266",
                        outline: "none",
                        transition: "border 0.2s",
                        boxSizing: "border-box",
                      }}
                      onClick={() =>
                        navigate(`/evaluation/${entry.presentation_id}`)
                      }
                    >
                      {month}月{day}日 {hour}時{min}分 のきろく
                    </div>
                  );
                })}
              </div>
              {/* 全部見るボタンの配置 */}
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => alert("全記録画面へ（本番はnavigateでOK）")}
                  className="inline-block hover:brightness-95 transition duration-200"
                  style={{
                    display: "inline-block",
                    padding: "6px 20px",
                    background:
                      "linear-gradient(90deg,#fcfff5 60%, #d4efd7 100%)",
                    color: "#47704c",
                    borderRadius: "14px",
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    textDecoration: "none",
                    boxShadow: "0 2px 8px #b7d7bb44",
                    border: "2px solid #aad5bb",
                    letterSpacing: "0.02em",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                  }}
                >
                  ぜんぶ見る
                </button>
              </div>
            </>
          )}
        </div>
      </Card>
    </Layout>
  );
};

export default Record;
