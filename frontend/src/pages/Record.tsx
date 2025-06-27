import { BackToMyPage, ToEvaluation, Layout } from "../components";

const Record = () => {
  return (
    <Layout>
      <h1 className=" text-5xl text-center ">記録ページ</h1>
      <BackToMyPage />
      <ToEvaluation />
    </Layout>
  );
};

export default Record;
