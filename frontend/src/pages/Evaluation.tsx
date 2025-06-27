import { BackToMyPage, ToRecord, Layout } from "../components";

const Evaluation = () => {
  return (
    <Layout>
      <div className="space-y-10">
        <h1 className=" text-5xl text-center ">講評ページ</h1>
        <BackToMyPage />
        <ToRecord />
      </div>
    </Layout>
  );
};

export default Evaluation;
