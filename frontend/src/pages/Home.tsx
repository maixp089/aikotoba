import { ToLogin, ToNewAccount, Layout } from "../components";
import Title from "../assets/images/Title.png";

const Home = () => {
  return (
    <Layout>
      <div className="space-y-10">
        <img src={Title} />
        <ToLogin />
        <ToNewAccount />
      </div>
    </Layout>
  );
};

export default Home;
