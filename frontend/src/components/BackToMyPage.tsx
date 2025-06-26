import { Link } from "react-router-dom";
const BackToMyPage = () => {
  return (
    <div>
      <Link to={"/mypage"}>マイページへ戻る</Link>
    </div>
  );
};

export default BackToMyPage;
