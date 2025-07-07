import { useNavigate } from "react-router-dom";

type BackToMyPageProps = {
  userId: string;
  color?: string;   // ★ 追加
};

const BackToMyPage = ({ userId, color }: BackToMyPageProps) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/users/${userId}/mypage`);
   };
  
  return (
    <div>
      <button
        onClick={onClick}
        className="inline-block hover:brightness-95 transition duration-200"
        style={{
          display: "inline-block",
          padding: "6px 20px",
          background: "linear-gradient(90deg,#fcfff5 60%, #d4efd7 100%)",
          color: color ?? "#47704c",     // ★ ここだけprops適用
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
        もどる
      </button>
    </div>
  );
};

export default BackToMyPage;
