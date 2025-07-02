import { useParams } from "react-router-dom";
import {
  Layout,
  BackToMyPage,
  ToRecord,
  GoodDetail,
  ChallengeDetail,
} from "../components";
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
      <div className="flex flex-col items-center space-y-5 py-10">
        {/* 振り返りボタン */}

        <h1 className="text-2xl font-semibold">{record.date} の点数は</h1>

        {/* 得点 */}
        <div className="text-8xl font-bold text-orange-600">{record.score}</div>
        <p className="text-5xl"> 点でした</p>

        {/* アドバイス枠 */}
        <div className="bg-gray-100 rounded-lg p-6 w-4/5 text-center shadow">
          <h2 className="text-lg font-semibold mb-2">AIアドバイス</h2>
          <div className="flex justify-center gap-15">
            <GoodDetail />
            <ChallengeDetail />
          </div>
        </div>
        <div className="flex justify-center gap-15">
          {/* 振り返りボタン */}
          <ToRecord />
          {/* ホームへボタン */}
          <BackToMyPage />
        </div>
      </div>
    </Layout>
  );
};

export default EvaluationDetail;
