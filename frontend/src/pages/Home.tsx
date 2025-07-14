import Back from "../assets/images/main.png";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";
import Card from "../components/Card";

const Home = () => {
  const navigate = useNavigate();

  const handleStart = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebase_uid = result.user.uid;
      const res = await fetch(
        `http://localhost:8000/users/search?firebase_uid=${firebase_uid}`
      );
      const data = await res.json();
      if (data) {
        navigate(`/users/${data.id}/mypage`);
      } else {
        navigate("/new-account", { state: { firebase_uid } });
      }
    } catch (e) {
  console.error(e); // ← 追加
  alert("Googleログインに失敗しました");
}
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(120deg,#d4efd7 0%, #f8f5e1 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card>
        {/* relativeで絶対配置用の基点をつくる */}
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          {/* ここが重要ポイント！paddingぶんマイナスして枠ぴったり */}
          <div
            style={{
              position: "absolute",
              top: -30,     // Card中央エリアのpadding-top
              left: -18,    // Card中央エリアのpadding-left
              right: -18,   // Card中央エリアのpadding-right
              bottom: -24,  // Card中央エリアのpadding-bottom
              width: "auto",
              height: "auto",
              borderRadius: 24,
              overflow: "hidden",
              zIndex: 1,
              boxSizing: "border-box",
            }}
          >
            {/* ビーチ画像100%ぴったり */}
            <img
              src={Back}
              alt="beach"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 24,
                display: "block",
                pointerEvents: "none",
                userSelect: "none",
              }}
            />

            {/* ボタンは画像の上に絶対配置 */}
            <button
              onClick={handleStart}
              style={{
                position: "absolute",
                left: "50%",
                top: "58%", // 中央ちょい下（微調整可）
                transform: "translate(-50%, 0)",
                zIndex: 2,
                background: "linear-gradient(90deg, #49c5b6 0%, #7dbaea 80%)",
                color: "#fff",
                border: "none",
                borderRadius: 24,
                fontWeight: "bold",
                fontSize: "1.2rem",
                padding: "8px 20px",
                letterSpacing: "1.1px",
                boxShadow: "0 3px 10px #78dbe499, 0 1px 0 #fffbe9 inset",
                cursor: "pointer",
                margin: 0,
                display: "block",
                whiteSpace: "nowrap",
                minWidth: "160px",
                minHeight: "50px",
              }}
            >
              タップしてはじめる
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Home;
