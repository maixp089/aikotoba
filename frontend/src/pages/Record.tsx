import { BackToMyPage, ToEvaluation, Layout } from "../components";

const Record = () => {
  return (
    <Layout>
      <div className="space-y-10">
        <h1 className=" text-5xl text-center ">記録ページ</h1>
        <BackToMyPage />
        <ToEvaluation />
      </div>
    </Layout>
  );
};

export default Record;
