import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

// Stripeの公開鍵（.envで管理）
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Pay = () => {
  // URLのパラメータからuserIdを取得
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  // 「購入する」ボタン押下で決済開始
  const handlePay = async () => {
    if (!userId) {
      alert("ユーザー情報が取得できません。ログインし直してください。");
      navigate("/login");
      return;
    }
    // Stripe決済セッションをバックエンドへリクエスト
    const res = await fetch("http://localhost:4242/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ userId }), // ← userIdをbodyで送信
    });
    if (!res.ok) {
      alert("決済ページの生成に失敗しました。");
      return;
    }
    const data = await res.json();
    const stripe = await stripePromise;
    await stripe?.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h1>有償会員決済</h1>
      <button style={{ fontSize: 20, padding: "14px 40px" }} onClick={handlePay}>
        購入する
      </button>
    </div>
  );
};

export default Pay;
