import { useNavigate } from "react-router-dom";
const ToPresentation = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/presentation");
  };
  return (
    <div>
      <button
        onClick={onClick}
        className="inline-block hover:brightness-95 transition duration-200 "
        style={{
          display: "inline-block",
          padding: "6px 20px",
          background: "linear-gradient(90deg,#fcfff5 60%, #d4efd7 100%)",
          color: "#47704c",
          borderRadius: "14px",
          fontSize: "1.1rem",
          fontWeight: "bold",
          textDecoration: "none",
          boxShadow: "0 2px 8px #b7d7bb44",
          border: "2px solid #aad5bb",
          letterSpacing: "0.02em",
          fontFamily: "inherit",
          boxSizing: "border-box",
        }}
      >
        プ
      </button>
    </div>
  );
};

export default ToPresentation;
