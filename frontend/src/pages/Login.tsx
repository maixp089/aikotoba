import { BackToHome, BackToMyPage, Layout } from "../components";
const Login = () => {
  return (
    <Layout>
      <h1 className=" text-5xl text-center ">ログインページ</h1>
      <BackToHome />
      <BackToMyPage />
    </Layout>
  );
};

export default Login;
