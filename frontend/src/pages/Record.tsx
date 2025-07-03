import { BackToMyPage, Card, Layout } from "../components";
import { mockScoreAdviceData } from "../mocks/evaluation";
import { useNavigate } from "react-router-dom";

const Record = () => {
  const sortedData = [...mockScoreAdviceData].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });

  const width = 300;
  const height = 150;
  const padding = 20;
  const maxScore = Math.max(...sortedData.map((d) => d.score));
  const minScore = Math.min(...sortedData.map((d) => d.score));
  const yRange = maxScore - minScore || 1;
  const xStep = (width - 2 * padding) / (sortedData.length - 1);
  const navigate = useNavigate();

  // 折れ線パス生成
  const points = sortedData
    .map((d, i) => {
      const x = padding + i * xStep;
      const y =
        height -
        padding -
        ((d.score - minScore) / yRange) * (height - 2 * padding);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <Layout>
      <Card>
        <div className="flex flex-col items-center space-y-6 py-6 px-4">
          {/* 上部ボタン */}
          <div className="flex justify-between w-full max-w-md">
            <BackToMyPage />
            <div className="bg-black text-white rounded px-4 py-2 text-sm">
              Aくん
            </div>
          </div>

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
            {sortedData.map((entry) => (
              <div
                key={entry.id}
                className="border border-black rounded text-center py-3 bg-white hover:bg-gray-100 cursor-pointer"
                onClick={() =>
                  navigate(`/evaluation/${entry.date}T${entry.time}`)
                }
              >
                {new Date(entry.date).toLocaleDateString("ja-JP", {
                  month: "numeric",
                  day: "numeric",
                })}
                の記録
              </div>
            ))}
          </div>
        </div>
      </Card>
    </Layout>
  );
};

export default Record;
