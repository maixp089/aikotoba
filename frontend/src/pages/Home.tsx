import { ToLogin, ToNewAccount, Layout, Card } from "../components";
import Title from "../assets/images/Title.png";

const Home = () => {
  return (
    <Layout>
      <Card>
        <div className="space-y-10">
          <img src={Title} />
          <div className="flex justify-center gap-15">
            <ToLogin />
            <ToNewAccount />
          </div>
        </div>
      </Card>
    </Layout>
  );
};

export default Home;
