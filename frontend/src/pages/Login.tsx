import { useEffect, useState } from "react";
// Reactの本体読み込む

import { BackToHome, BackToMyPage } from "../components";
// 画面下部の「ホームへ戻る」「マイページへ戻る」


type User = {
  user_id: string;
  user_name: string;
  age: number;
};


const Login = () => {
  // ユーザー一覧を入れる箱
  const [users, setUsers] = useState<User[]>([]);
  // データ読み込み中
  const [loading, setLoading] = useState(true);
  // エラー内容
  const [error, setError] = useState<string | null>(null);


  // 最初の1回だけ取得
  useEffect(() => {
    fetch("http://localhost:8000/users")
      // データの取得成功
      .then(res => {
        if (!res.ok) throw new Error("ユーザー取得失敗");
        return res.json();
      })
      .then(data => {
        setUsers(data);        // ユーザー一覧を状態にセット
        setLoading(false);     // ローディング終了
      })
      // 取得に失敗した場合
      .catch(() => {
        setError("ユーザー取得に失敗しました"); // エラー内容をセット
        setLoading(false);                     // ローディング終了
      });
  }, []);
  // []は「マウント時1回だけ実行」の意味

  
  // ユーザー選択ボタンを押したときに呼ばれる
  const handleLogin = (user: User) => {
    alert(`${user.user_name}でログイン！（実際の遷移や状態管理はこれから追加！）`);
    // 今はアラート表示だけ（本物のログインはこれから作る）
  };

  // ここから画面に描画する内容（JSX）
  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f5f5",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      {/* 画面中央の白いカード */}
      <div style={{
        background: "white",
        borderRadius: "24px",
        boxShadow: "0 4px 32px #aaa4",
        padding: "48px 36px",
        width: "350px",
        textAlign: "center"
      }}>
        <h1 style={{ marginBottom: "32px", fontSize: "2rem" }}>ログインページ</h1>
        {/* 状態によって表示内容を切り替え */}
        {loading ? (
          // まだデータ取得中
          <div>読み込み中...</div>
        ) : error ? (
          // エラー時
          <div style={{ color: "red" }}>{error}</div>
        ) : users.length === 0 ? (
          // ユーザーがいない場合
          <div>ユーザーがいません</div>
        ) : (
          // ユーザーがいる場合はボタンをズラッと表示
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginBottom: "32px"
          }}>
            {users.map(user => (
              <button
                key={user.user_id}
                onClick={() => handleLogin(user)}
                style={{
                  width: "100%",
                  padding: "14px",
                  background: "#333",
                  color: "#fff",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  letterSpacing: "2px"
                }}
              >
                {user.user_name}
                {/* ユーザー名をボタンに表示 */}
              </button>
            ))}
          </div>
        )}
        {/* 画面下のナビゲーションボタン */}
        <BackToHome />
        <BackToMyPage />
      </div>
    </div>
  );
};

export default Login;
// このコンポーネント（ログインページ）を他で使えるようにする
