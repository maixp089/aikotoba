import { mockScoreAdviceData } from "../mocks/evaluation";

const Challenge = () => {
  // 日付 + 時間で降順ソート → 最新1件取得
  const latest = [...mockScoreAdviceData].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateB.getTime() - dateA.getTime();
  })[0];
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
      つぎはここをがんばろう！
      <p className="text-gray-700 text-xs">{latest.advice}</p>
    </div>
  );
};

export default Challenge;
