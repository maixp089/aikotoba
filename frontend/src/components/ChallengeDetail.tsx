import { mockScoreAdviceData } from "../mocks/evaluation";
import { Layout } from "../components";
import { useParams } from "react-router-dom";

const ChallengeDetail = () => {
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
    <div
      className="
    text-2xl
    text-indigo-400 
    rounded-b-sm 
    text-center 
    shadow 
    shadow-blue-200"
    >
      もっとチャレンジ！
      <p className="text-gray-700 text-xs">{record.advice}</p>
    </div>
  );
};

export default ChallengeDetail;
