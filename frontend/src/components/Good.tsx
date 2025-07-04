import { mockScoreAdviceData } from "../mocks/evaluation";

const Good = () => {
  // 日付 + 時間で降順ソート → 最新1件取得
  const latest = [...mockScoreAdviceData].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateB.getTime() - dateA.getTime();
  })[0];
  return (
    <div
      className="
       w-75
    text-2xl
    text-pink-400 
    rounded-b-sm 
    text-center 
    shadow 
    shadow-pink-200
    bg-pink-100
    pt-2 px-5 py-2"
    >
      はなまる💮！
      <p className="text-gray-700 text-[14px]">{latest.advice}</p>
    </div>
  );
};

export default Good;
