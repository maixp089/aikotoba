import { ToLogin, ToNewAccount, Layout } from "../components";

const Home = () => {
  return (
    <Layout>
      <div className="space-y-10">
        <h1 className=" text-5xl text-center ">ホームページ</h1>
        <ToLogin />
        <ToNewAccount />
      </div>
    </Layout>
  );
};

export default Home;
