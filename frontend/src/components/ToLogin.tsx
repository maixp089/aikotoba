import { useNavigate } from "react-router-dom";

const ToLogin = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/login");
  };

  return (
    <div>
      <button
        onClick={onClick}
        className="inline-block hover:brightness-95 transition duration-200 "
        style={{
          display: "inline-block",
          padding: "10px 30px",
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
        ログイン
      </button>
    </div>
  );
};

export default ToLogin;
