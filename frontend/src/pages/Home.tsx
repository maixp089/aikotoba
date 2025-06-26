import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>ホームページ</h1>
      <Link to={"/login"}>ログイン</Link>
      <br />
      <br />
      <Link to={"/newaccount"}>新規登録</Link>
    </div>
  );
};

export default Home;
