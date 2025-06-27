import { ToLogin, ToNewAccount, Layout } from "../components";

const Home = () => {
  return (
    <Layout>
      <h1 className=" text-7xl text-center ">ホームページ</h1>
      <ToLogin />
      <ToNewAccount />
    </Layout>
  );
};

export default Home;
