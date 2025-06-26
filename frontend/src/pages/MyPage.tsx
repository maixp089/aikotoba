import { BackToHome, ToPresentation, ToRanking, ToRecord } from "../components";

const UserHome = () => {
  return (
    <div>
      <h1>ユーザホーム画面ページ</h1>
      <BackToHome />
      <ToPresentation />
      <ToRecord />
      <ToRanking />
    </div>
  );
};

export default UserHome;
