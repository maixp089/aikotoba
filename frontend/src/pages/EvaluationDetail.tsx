import { useParams } from "react-router-dom";
import { Layout, BackToMyPage, ToRecord } from "../components";
import { mockScoreAdviceData } from "../mocks/evaluation";


const EvaluationDetail = () => {
  const { datetime } = useParams(); // 例: "2025-06-30T09:15"

  const record = mockScoreAdviceData.find(
    (entry) => `${entry.date}T${entry.time}` === datetime
  );

  if (!record) {
    return (
      <Layout>
        <div className="p-6 text-center text-red-500">
          該当する記録が見つかりませんでした。
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col items-center space-y-10 py-10">
        <h1 className="text-2xl font-semibold">{record.date} の得点</h1>

        {/* 得点 */}
        <div className="text-6xl font-bold">{record.score}点</div>

        {/* 振り返りボタン */}
        <ToRecord />

        {/* アドバイス枠 */}
        <div className="bg-gray-100 rounded-lg p-6 w-4/5 text-center shadow">
          <h2 className="text-lg font-semibold mb-2">AIアドバイス</h2>
          <p className="text-gray-700">{record.advice}</p>
        </div>

        <BackToMyPage />
      </div>
    </Layout>
  );
};

export default EvaluationDetail;
