import { useNavigate } from "react-router-dom";

const ToLogin = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/login");
  };

  return (
    <div>
      <button onClick={onClick}>ログイン</button>
    </div>
  );
};

export default ToLogin;
