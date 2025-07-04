import Back from "../assets/images/back.png"; // ビーチ画像をimport
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";

const Home = () => {
  const navigate = useNavigate();

  const handleStart = async () => {
    console.log("押した！");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebase_uid = result.user.uid;
      navigate("/new-account", { state: { firebase_uid } });
    } catch (e) {
      console.error(e);
      alert("Googleログインに失敗しました");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(120deg, #e3f9f5 0%, #f5ffe6 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundImage: `url(${Back})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: 32,
          boxShadow: "0 6px 28px #b7d7bb66, 0 1.5px 0 #fffbe9 inset",
          border: "3px solid #e8debe",
          width: "100%",
          maxWidth: 430,
          minHeight: 700,
          padding: "38px 16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* タイトル画像なし */}

        {/* はじめるボタン */}
        <button
          onClick={handleStart}
          style={{
            background: "linear-gradient(90deg, #49c5b6 0%, #7dbaea 80%)",
            color: "#fff",
            border: "none",
            borderRadius: 44,
            fontWeight: "bold",
            fontSize: "2.0rem",
            padding: "18px 32px",
            letterSpacing: "1.8px",
            boxShadow: "0 6px 22px #78dbe499, 0 1.5px 0 #fffbe9 inset",
            cursor: "pointer",
            margin: "0 auto",
            marginTop: 200,
            marginBottom: 40,
          }}
        >
          タップしてはじめる
        </button>
      </div>
    </div>
  );
};

export default Home;
