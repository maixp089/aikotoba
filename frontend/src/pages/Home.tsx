import { ToLogin, ToNewAccount, Layout, Card } from "../components";
import Title from "../assets/images/Title.png";

const Home = () => {
  return (
    <Layout>
      <Card>
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center space-y-10">
            <img src={Title} className="w-auto md-w-100" />
            <div className="flex justify-center gap-12">
              <ToLogin />
              <ToNewAccount />
            </div>
          </div>
        </div>
      </Card>
    </Layout>
  );
};

export default Home;
