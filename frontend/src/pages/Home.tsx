import Back from "../assets/images/main.png"; // ビーチ画像をimport
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase"; // ←firebase設定ファイル

const Home = () => {
  const navigate = useNavigate();

  // 「はじめる」ボタン押下時
  const handleStart = async () => {
    console.log("押した！"); // ← ここで押されたタイミングを出力

    try {
      // 1. Google認証（ポップアップでアカウント選択）
      const result = await signInWithPopup(auth, googleProvider);
      const firebase_uid = result.user.uid; 


      // 2. APIでユーザー存在チェック
       const res = await fetch(
        `http://localhost:8000/users/search?firebase_uid=${firebase_uid}`
      );
      const data = await res.json();
      console.log("サーバーからの返却値:", data); // ← 追加：何が返ってきているか出力

      if (data) {
        // 登録済み→マイページ遷移
        navigate(`/users/${data.id}/mypage`);
      } else {

        // 未登録→新規登録画面へ
        navigate("/new-account", { state: { firebase_uid } });
      } 
    
    } catch (e) {
      console.error(e); // ← エラー内容も出力
      alert("Googleログインに失敗しました");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: `url(${Back})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#fff8e7cc", // ちょっと透過で中身を見やすくする
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
        }}
      >
        {/* ここにタイトル画像など入れてもOK */}
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
            marginTop: 12,
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