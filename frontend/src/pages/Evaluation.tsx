import { BackToMyPage, ToRecord, Layout, Good, Challenge } from "../components";
import { mockScoreAdviceData } from "../mocks/evaluation";

const Evaluation = () => {
  // 日付 + 時間で降順ソート → 最新1件取得
  const latest = [...mockScoreAdviceData].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateB.getTime() - dateA.getTime();
  })[0];

  return (
    <Layout>
      <div className="flex flex-col items-center space-y-10 py-10">
        <h1 className="text-2xl font-semibold">今日の得点</h1>

        {/* 得点 */}
        <div className="text-6xl font-bold">{latest.score}点</div>

        {/* 振り返りボタン */}
        <ToRecord />

        {/* アドバイス枠 */}
        <div className="bg-gray-100 rounded-lg p-6 w-4/5 text-center shadow">
          <h2 className="text-lg font-semibold mb-2">AIアドバイス</h2>
          <Good />
          <Challenge />
        </div>

        {/* ホームへボタン */}
        <BackToMyPage />
      </div>
    </Layout>
  );
};

export default Evaluation;
