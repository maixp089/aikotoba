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
      <div className="flex flex-col items-center  py-10">
        <h1 className="text-3xl font-semibold">今日は</h1>

        {/* 得点 */}
        <div className="text-8xl font-bold text-orange-600">{latest.score}</div>
        <p className="text-5xl"> 点</p>

        {/* アドバイス枠 */}
        <div className="bg-gray-100 rounded-lg p-6 w-4/5 text-center shadow">
          <h2 className="text-lg font-semibold mb-2">AIアドバイス</h2>
          <Good />
          <Challenge />
        </div>

        {/* 振り返りボタン */}
        <ToRecord />
        {/* ホームへボタン */}
        <BackToMyPage />
      </div>
    </Layout>
  );
};

export default Evaluation;
