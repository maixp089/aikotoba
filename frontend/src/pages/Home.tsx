import { ToLogin, ToNewAccount, Layout } from "../components";
import Title from "../assets/images/Title.png";

const Home = () => {
  return (
    <Layout>
      <div
        className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.png')" }}
      >
        {/* オーバーレイ */}
        <div className="absolute inset-0 bg-white opacity-30 z-0" />

        {/* コンテンツ */}
        <div className="relative z-10 flex flex-col items-center space-y-10">
          <img src={Title} className="w-auto md:w-[400px]" />
          <div className="flex justify-center gap-12">
            <ToLogin />
            <ToNewAccount />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
