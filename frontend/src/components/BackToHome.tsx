import { Link } from "react-router-dom";

const BackToHome = () => (
  <div style={{ marginTop: "32px" }}>
    <Link
      to="/"
      style={{
        display: "inline-block",
        padding: "12px 0",
        width: "100%",
        background: "#e3eded",
        borderRadius: "8px",
        fontSize: "1.1rem",
        fontWeight: "bold",
        color: "#222",
        textDecoration: "none",
        textAlign: "center",
        boxShadow: "0 2px 8px #eee",
        border: "none",
      }}
    >
      ホームへ戻る
    </Link>
  </div>
);

export default BackToHome;
