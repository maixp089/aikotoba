import { BackToMyPage, ToEvaluation, Layout } from "../components";

const Presentation = () => {
  return (
    <Layout>
      <h1 className=" text-5xl text-center ">プレゼンページ</h1>
      <BackToMyPage />
      <ToEvaluation />
    </Layout>
  );
};

export default Presentation;
