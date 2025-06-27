import { useNavigate } from "react-router-dom";
const BackToMyPage = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/mypage");
  };
  return (
    <div>
      <button onClick={onClick}>マイページ</button>
    </div>
  );
};

export default BackToMyPage;
