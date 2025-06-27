import {
  BackToHome,
  ToPresentation,
  ToRanking,
  ToRecord,
  Layout,
} from "../components";

const UserHome = () => {
  return (
    <Layout>
      <div className="space-y-10">
        <div className="">
          <BackToHome />
        </div>
        <h1 className=" text-5xl text-center ">ユーザMyページ</h1>

        <div className="flex justify-center items-center gap-10 ">
          <ToPresentation />
          <ToRecord />
          <ToRanking />
        </div>
      </div>
    </Layout>
  );
};

export default UserHome;
