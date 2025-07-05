import {
  BackToMyPage,
  ToRecord,
  Layout,
  Good,
  Challenge,
  Card,
} from "../components";
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
      <Card>
        <div className="flex flex-col items-center  py-10">
          <h1 className="text-3xl font-semibold">今のおはなし…</h1>

          {/* 得点 */}
          <div className="flex items-center">
            <div className="text-9xl font-bold text-orange-600">
              {latest.score}
            </div>
            <p className="text-5xl"> 点</p>
          </div>

          {/* アドバイス枠 */}
          <div className=" space-y-4 px-6 pt-10 justify-center gap-15 ">
            <Good />
            <Challenge />
          </div>
        </div>
        <div className="flex justify-center gap-15">
          {/* 振り返りボタン */}
          <ToRecord />
          {/* ホームへボタン */}
          <BackToMyPage />
        </div>
      </Card>
    </Layout>
  );
};

export default Evaluation;
