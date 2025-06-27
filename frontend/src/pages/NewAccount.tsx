import { BackToHome, BackToMyPage, Layout } from "../components";
const NewAccount = () => {
  return (
    <Layout>
      <h1 className=" text-5xl text-center "> 新規登録ページ</h1>
      <BackToHome />
      <BackToMyPage />
    </Layout>
  );
};

export default NewAccount;
