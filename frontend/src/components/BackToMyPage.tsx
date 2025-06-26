import { Link } from "react-router-dom";
const BackToMyPage = () => {
  return (
    <div>
      <Link to={"/userhome"}>マイページへ戻る</Link>
    </div>
  );
};

export default BackToMyPage;
