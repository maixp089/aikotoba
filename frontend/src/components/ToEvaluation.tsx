import { useNavigate } from "react-router-dom";
const ToEvaluation = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/evaluation");
  };
  return (
    <div>
      <button
        onClick={onClick}
        className="flex h-9 items-center justify-center rounded-full bg-gradient-to-b from-blue-400 from-50% to-blue-500 to-50% px-3 text-blue-50 hover:from-blue-500 hover:to-blue-600 active:from-blue-600 active:to-blue-700"
      >
      
      </button>{" "}
    </div>
  );
};

export default ToEvaluation;
