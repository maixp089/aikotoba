import { useNavigate } from "react-router-dom";
const ToEvaluation = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/evaluation");
  };
  return (
    <div>
      <button onClick={onClick}>各評価ページへ</button>{" "}
    </div>
  );
};

export default ToEvaluation;
