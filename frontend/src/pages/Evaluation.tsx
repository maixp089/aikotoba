import {
  BackToMyPage,
  ToRecord,
  Layout,
  Card,
} from "../components";
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Evaluation = () => {
  const { userId } = useParams();
  const location = useLocation();
  const feedback = location.state?.feedback;

  const [user, setUser] = useState(null);

  // ユーザー情報をfetch
  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:8000/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, [userId]);

  if (!feedback) {
    return (
      <Layout>
        <div className="p-6 text-center text-red-500">
          フィードバック情報がありません。
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Card>
        <div className="flex flex-col items-center py-10">
          <h1 className="text-3xl font-semibold">今のおはなし…</h1>

          {/* 得点 */}
          <div className="flex items-center">
            <div className="text-9xl font-bold text-orange-600">
              {feedback.total_score}
            </div>
            <p className="text-5xl"> 点</p>
          </div>

          {/* アドバイス枠（タイトル大きく＋内容は通常） */}
          <div className="space-y-4 px-6 pt-10 justify-center gap-15">
            <div
              style={{
                backgroundColor: "#f8d7da", // ピンク系背景
                padding: "10px",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontWeight: "700",
                  fontSize: "1.6rem",
                  color: "#721c24",
                  marginBottom: "8px",
                }}
              >
                はなまる💮！
              </p>
              <p
                style={{
                  fontWeight: "normal",
                  fontSize: "1rem",
                  color: "#721c24",
                  margin: 0,
                }}
              >
                {feedback.well_done}
              </p>
            </div>
            <div
              style={{
                backgroundColor: "#d1ecf1", // 水色系背景
                padding: "10px",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontWeight: "700",
                  fontSize: "1.6rem",
                  color: "#0c5460",
                  marginBottom: "8px",
                }}
              >
                もっとチャレンジ！
              </p>
              <p
                style={{
                  fontWeight: "normal",
                  fontSize: "1rem",
                  color: "#0c5460",
                  margin: 0,
                }}
              >
                {feedback.next_challenge}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-15">
          {/* 振り返りボタン */}
          <ToRecord />
          {/* ホームへボタン */}
          <BackToMyPage userId={userId!} />
        </div>
      </Card>
    </Layout>
  );
};

export default Evaluation;


// // // // 修正前のコード（developの内容保存）
// import {
//   BackToMyPage,
//   ToRecord,
//   Layout,
//   Good,
//   Challenge,
//   Card,
// } from "../components";
// import { mockScoreAdviceData } from "../mocks/evaluation";

// const Evaluation = () => {
//   // 日付 + 時間で降順ソート → 最新1件取得
//   const latest = [...mockScoreAdviceData].sort((a, b) => {
//     const dateA = new Date(`${a.date}T${a.time}`);
//     const dateB = new Date(`${b.date}T${b.time}`);
//     return dateB.getTime() - dateA.getTime();
//   })[0];

//   return (
//     <Layout>
//       <Card>
//         <div className="flex flex-col items-center  py-10">
//           <h1 className="text-3xl font-semibold">今のおはなし…</h1>

//           {/* 得点 */}
//           <div className="flex items-center">
//             <div className="text-9xl font-bold text-orange-600">
//               {latest.score}
//             </div>
//             <p className="text-5xl"> 点</p>
//           </div>

//           {/* アドバイス枠 */}
//           <div className=" space-y-4 px-6 pt-10 justify-center gap-15 ">
//             <Good />
//             <Challenge />
//           </div>
//         </div>
//         <div className="flex justify-center gap-15">
//           {/* 振り返りボタン */}
//           <ToRecord />
//           {/* ホームへボタン */}
//           <BackToMyPage />
//         </div>
//       </Card>
//     </Layout>
//   );
// };

// export default Evaluation;
