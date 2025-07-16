import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // クエリパラメータからuserId取得
  const params = new URLSearchParams(location.search);
  const userId = params.get("userId");

  useEffect(() => {
    // paidフラグを更新するAPIを叩く
    if (userId) {
      fetch(`http://localhost:8000/users/${userId}/paid`, {
        method: "POST",
      });
    }

    // 2.5秒後に自動でマイページへ遷移
    const timer = setTimeout(() => {
      if (userId) {
        navigate(`/users/${userId}/mypage`);
      } else {
        navigate("/");
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate, userId]);

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h1>おめでとうございます！</h1>
      <p>アプリが使えるようになりました🎉</p>
      <button
        style={{ marginTop: 20, fontSize: "1.1em", padding: "8px 24px", borderRadius: 16 }}
        onClick={() => {
          if (userId) {
            navigate(`/users/${userId}/mypage`);
          } else {
            navigate("/");
          }
        }}
      >
        マイページに戻る
      </button>
      <div style={{ marginTop: 20, fontSize: "0.97em", color: "#888" }}>
        数秒後に自動でマイページへ戻ります…
      </div>
    </div>
  );
};

export default Success;
