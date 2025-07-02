import { BackToMyPage, ToEvaluation, Layout } from "../components";
import "../App.css";

const images = ["/images/roco2.png", "/images/robo2.png"];

const Presentation = () => {
  return (
    <Layout>
      <div className="space-y-10">
        <BackToMyPage />
        <h1 className=" text-5xl text-center ">プレゼンページ</h1>

        <BackToMyPage />
        <ToEvaluation />
      </div>
    </Layout>
  );
};

export default Presentation;
