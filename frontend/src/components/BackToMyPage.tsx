import { Link } from "react-router-dom";
const BackToUserHome = () => {
  return (
    <div>
      <Link to={"/userhome"}>マイページへ戻る</Link>
    </div>
  );
};

export default BackToUserHome;
