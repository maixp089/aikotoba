import { ToLogin, ToNewAccount, Layout } from "../components";

const Home = () => {
  return (
    <Layout>
      <h1>ホームページ</h1>
      <ToLogin />
      <ToNewAccount />
    </Layout>
  );
};

export default Home;
