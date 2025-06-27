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
      <h1 className=" text-5xl text-center ">ユーザホーム画面ページ</h1>
      <BackToHome />
      <ToPresentation />
      <ToRecord />
      <ToRanking />
    </Layout>
  );
};

export default UserHome;
