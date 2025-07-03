import { useNavigate } from "react-router-dom";
const BackToMyPage = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/mypage");
  };
  return (
    <div>
      <button
        onClick={onClick}
        style={{
          display: "inline-block",
          padding: "3px 10px",
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
          transition: "background 0.2s",
          boxSizing: "border-box",
        }}
      >
        もどる
      </button>
    </div>
  );
};

export default BackToMyPage;
