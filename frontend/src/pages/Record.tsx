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
  const recent5 = sortedData.slice(0, 5);

  // ここでheaderTitle/footerBarを定義する！
  const headerTitle = user ? `${user.name} さんのきろく` : "きろく";
  const footerBar = (
    <BackToMyPage userId={userId!} />
  );

  return (
  <Layout>
    <Card title={headerTitle} bottomBar={footerBar}>
      <div>
        {/* 上部ボタン */}
        <div>
          <BackToMyPage userId={userId!} />
          <div>
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
            {/* 記録一覧 */}
            <div>
              {recent5.map((entry) => {
                const date = parseDate(entry.presentation_created_at);
                const month = date.getMonth() + 1;
                const day = date.getDate();
                const hour = date.getHours();
                const min = date.getMinutes().toString().padStart(2, "0");
                return (
                  <div
                    key={entry.presentation_id}
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
            <div>
              <button
                onClick={() => alert("全記録画面へ（本番はnavigateでOK）")}
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