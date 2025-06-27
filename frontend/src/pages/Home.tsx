import { ToLogin, ToNewAccount } from "../components";

const Home = () => {
  return (
    <div>
      <h1>ホームページ</h1>
      <ToLogin />
      <ToNewAccount />
    </div>
  );
};

export default Home;
