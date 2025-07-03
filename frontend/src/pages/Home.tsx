import { ToLogin, ToNewAccount, Layout } from "../components";

const Home = () => {
  return (
    <Layout>
      <div className="space-y-10">
        {/* public/images/Title.png をURLで指定 */}
        <img src="/images/Title.png" alt="タイトル画像" />
        <ToLogin />
        <ToNewAccount />
      </div>
    </Layout>
  );
};

export default Home;
