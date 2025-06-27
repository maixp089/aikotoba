import { useNavigate } from "react-router-dom";
const ToRanking = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/ranking");
  };
  return (
    <div>
      <button onClick={onClick}>ランキング</button>
    </div>
  );
};

export default ToRanking;
