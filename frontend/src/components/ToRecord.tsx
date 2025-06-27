import { useNavigate } from "react-router-dom";
const ToRecord = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/record");
  };
  return (
    <div>
      <button onClick={onClick}>記録一覧</button>
    </div>
  );
};

export default ToRecord;
