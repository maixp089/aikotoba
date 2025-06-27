import { useNavigate } from "react-router-dom";

const ToNewAccount = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/newaccount");
  };

  return (
    <div>
      <button onClick={onClick}>新規登録</button>
    </div>
  );
};

export default ToNewAccount;
