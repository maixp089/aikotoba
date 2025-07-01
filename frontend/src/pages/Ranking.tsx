import React from "react"
import { BackToMyPage, Layout } from "../components";
import { mockRankingData } from "../mocks/ranking";

const crownColors = ["text-yellow-400", "text-gray-400", "text-red-400"];

const Ranking = () => {
  return (
    <>
    
    <Layout>
      <BackToMyPage />

      <div className="space-y-10 py-10 flex flex-col items-center">
        <h1 className="text-5xl text-center">ランキングページ</h1>
     

        <div className="flex flex-col gap-6 w-full max-w-md">
          {mockRankingData.slice(0, 3).map((user, index) => (
            <div
              key={user.name}
              className="flex items-center justify-between px-4"
            >
              {/* 王冠と順位 */}
              <div className={`text-4xl font-bold ${crownColors[index]}`}>
                👑 {index + 1}
              </div>

              {/* ユーザー名と点数 */}
              <div className="bg-black text-white rounded-full px-6 py-2 text-sm font-medium">
                {user.name} {user.score}点
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
    </>
  );
};

export default Ranking;