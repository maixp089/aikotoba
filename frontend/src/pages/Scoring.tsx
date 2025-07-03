import { useEffect } from "react";
import { Card, Layout } from "../components";

const Scoring = () => {
  useEffect(() => {
    // モックAPI：2秒後に評価完了として/evaluationに遷移
    const timer = setTimeout(() => {
      console.log("モックAPI応答: OK");
      window.location.href = "/evaluation";
    }, 2000);

    return () => clearTimeout(timer); // クリーンアップ
  }, []);

  return (
    <Layout>
      <Card>
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
          <h1 className="text-3xl font-bold">まるつけちゅう...</h1>
          <div className="animate-spin rounded-full h-24 w-24 border-b-4 border-red-500"></div>
        </div>
      </Card>
    </Layout>
  );
};

export default Scoring;
