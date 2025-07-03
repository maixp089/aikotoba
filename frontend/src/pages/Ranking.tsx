import React from "react";
import { BackToMyPage, Card, Layout } from "../components";
import { mockRankingData } from "../mocks/ranking";

const crownColors = ["text-yellow-400", "text-gray-400", "text-red-400"];

const Ranking = () => {
  return (
    <Layout>
      <Card>
        <BackToMyPage />

        <div className="space-y-10 py-10 flex flex-col items-center ">
          <h1 className="text-[30px] text-center text-amber-300">
            これまでのランキング
          </h1>

          <div className="flex flex-col gap-6 w-full max-w-md pt-3 py-3 bg-white rounded-b-md shadow-md">
            {mockRankingData.slice(0, 3).map((user, index) => (
              <div
                key={user.name}
                className="flex items-center justify-between px-4"
              >
                {/* 王冠と順位 */}
                <div className={`text-[25px] font-bold ${crownColors[index]}`}>
                  👑 {index + 1} 位
                </div>

                {/* ユーザー名と点数 */}
                <div className="bg-amber-300 text-brack rounded-full px-6 py-2 text-xl font-medium">
                  {user.name} {user.score}点
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white pt-2 py-3 px-3 rounded-b-md shadow-md">
            <p className="text-center text-lg mb-1 ">今あなたはランキング</p>
            <div className="flex items-end justify-center gap-1">
              <p className="text-[70px] leading-none text-pink-500 font-bold">
                5
              </p>
              <p className="text-[24px] text-gray-700 font-semibold">位です</p>
            </div>
          </div>
        </div>
      </Card>
    </Layout>
  );
};

export default Ranking;
