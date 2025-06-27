import { useNavigate } from "react-router-dom";

const BackToHome = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/");
  };

  return (
    <div>
      <button onClick={onClick}>ホームへ</button>
    </div>
  );
};

export default BackToHome;
