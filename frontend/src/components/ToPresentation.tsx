import { useNavigate } from "react-router-dom";
const ToPresentation = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/presentation");
  };
  return (
    <div>
      <button onClick={onClick}>プレゼン練習をする</button>
    </div>
  );
};

export default ToPresentation;
