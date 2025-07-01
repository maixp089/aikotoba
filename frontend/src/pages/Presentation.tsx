import { BackToMyPage, ToEvaluation, Layout } from "../components";
import "../App.css";

const Presentation = () => {
  return (
    <Layout>
      <div className="space-y-10">
        <h1 className=" text-5xl text-center ">プレゼンページ</h1>
        <BackToMyPage />
        <ToEvaluation />
      </div>
    </Layout>
  );
};

export default Presentation;
