"use client"
import { useParams, useNavigate } from "react-router-dom"
import { loadStripe } from "@stripe/stripe-js"
import Card from "../components/Card"
import BackgroundWrapper from "../components/Background"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

const Pay = () => {
  const { userId } = useParams<{ userId: string }>()
  const navigate = useNavigate()

  const handlePay = async () => {
    if (!userId) {
      alert("ユーザー情報が取得できません。ログインし直してください。")
      navigate("/login")
      return
    }

    const res = await fetch("http://localhost:4242/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ userId }),
    })

    if (!res.ok) {
      alert("決済ページの生成に失敗しました。")
      return
    }

    const data = await res.json()
    const stripe = await stripePromise
    await stripe?.redirectToCheckout({ sessionId: data.id })
  }

  return (
    <BackgroundWrapper>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          title="アプリを使う"
          bottomBar={
            <button
              onClick={() => navigate(-1)}
              style={{
                background: "none",
                border: "none",
                outline: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                minWidth: 44,
                padding: 0,
              }}
            >
              <img src="/icons/back.png" alt="もどる" style={{ width: 64, height: 64, marginBottom: 2 }} />
              <span
                style={{
                  color: "#fff",
                  fontSize: "1.04rem",
                  marginTop: 2,
                  fontWeight: 600,
                  fontFamily: "'Kosugi Maru','M PLUS Rounded 1c',sans-serif",
                  letterSpacing: "0.06em",
                  textShadow: "0 2px 5px #3da99b77",
                }}
              ></span>
            </button>
          }
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
              maxWidth: "320px",
            }}
          >
            {/* White bordered container for premium info and features */}
            <div
              style={{
                backgroundColor: "white",
                border: "2px solid #e5e5e5",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "24px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Premium Title with Price */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  marginBottom: "16px",
                  gap: "8px",
                }}
              >
                <h2
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#333",
                    margin: 0,
                    fontFamily: "'Kosugi Maru','M PLUS Rounded 1c',sans-serif",
                  }}
                >
                  月額
                </h2>
                <span
                  style={{
                    fontSize: "28px",
                    fontWeight: "bold",
                    color: "#666",
                    fontFamily: "'Kosugi Maru','M PLUS Rounded 1c',sans-serif",
                  }}
                >
                  ¥800
                </span>
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: "14px",
                  color: "#666",
                  textAlign: "left",
                  marginBottom: "24px",
                  lineHeight: "1.5",
                  fontFamily: "'Kosugi Maru','M PLUS Rounded 1c',sans-serif",
                }}
              >
                プレミアム会員特典
              </p>

              {/* Feature List */}
              <div style={{ width: "100%" }}>
                {/* 1 */}
                <div style={{ display: "flex", alignItems: "flex-start", marginBottom: "15px", gap: "12px" }}>
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: "#4bb3a7",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    <span style={{ color: "white", fontSize: "12px", fontWeight: "bold" }}>✓</span>
                  </div>
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#333",
                      lineHeight: "1.4",
                      fontFamily: "'Kosugi Maru','M PLUS Rounded 1c',sans-serif",
                    }}
                  >
                    テーマや時間を設定、お話しの練習が可能
                  </span>
                </div>

                {/* 2 */}
                <div style={{ display: "flex", alignItems: "flex-start", marginBottom: "12px", gap: "12px" }}>
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: "#4bb3a7",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    <span style={{ color: "white", fontSize: "12px", fontWeight: "bold" }}>✓</span>
                  </div>
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#333",
                      lineHeight: "1.4",
                      fontFamily: "'Kosugi Maru','M PLUS Rounded 1c',sans-serif",
                    }}
                  >
                    練習の点数とフィードバックをロボットが採点
                  </span>
                </div>

                {/* 3（修正版！） */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: "#4bb3a7",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    <span style={{ color: "white", fontSize: "12px", fontWeight: "bold" }}>✓</span>
                  </div>
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#333",
                      lineHeight: "1.4",
                      fontFamily: "'Kosugi Maru','M PLUS Rounded 1c',sans-serif",
                    }}
                  >
                    記録に残して振り返ろう
                  </span>
                </div>
              </div>
            </div>

            {/* Terms of Service Section */}
            <div
              style={{
                width: "100%",
                backgroundColor: "#f5f5f5",
                border: "1px solid #e9ecef",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "20px",
                fontSize: "12px",
                lineHeight: "1.4",
                color: "#666",
                fontFamily: "'Kosugi Maru','M PLUS Rounded 1c',sans-serif",
              }}
            >
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#333",
                  marginBottom: "12px",
                  textAlign: "center",
                  fontFamily: "'Kosugi Maru','M PLUS Rounded 1c',sans-serif",
                }}
              >
                利用規約
              </h4>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "16px",
                  listStyle: "disc",
                }}
              >
                <li style={{ marginBottom: "6px" }}>この定期購読は購読開始日より1ヶ月間有効です。</li>
                <li style={{ marginBottom: "6px" }}>購入後のお支払いはiTunesアカウントに請求されます。</li>
                <li style={{ marginBottom: "6px" }}>購読期間終了の24時間前までに自動月額料金が請求されます。</li>
                <li style={{ marginBottom: "6px" }}>
                  購読期間終了の24時間前までに解約しない限り自動的に更新されます。
                </li>
                <li style={{ marginBottom: "6px" }}>
                  購読期間終了の24時間前までであれば解約（自動購読機能を停止）できます。
                </li>
                <li style={{ marginBottom: "6px" }}>解約を行う場合はiTunesアカウントの設定から行ってください。</li>
                <li style={{ marginBottom: "6px" }}>アプリから解約を行うことはできません。</li>
                <li style={{ marginBottom: "0" }}>
                  アプリを削除するだけではサービスは解除されませんので、ご注意ください。
                </li>
              </ul>
            </div>

            {/* Purchase Button */}
            <button
              style={{
                width: "100%",
                fontSize: "16px",
                padding: "16px 24px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                fontFamily: "'Kosugi Maru','M PLUS Rounded 1c',sans-serif",
                boxShadow: "0 4px 12px rgba(255, 107, 53, 0.3)",
                transition: "all 0.2s ease",
              }}
              onClick={handlePay}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)"
                e.currentTarget.style.boxShadow = "0 6px 16px rgba(255, 107, 53, 0.4)"
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 107, 53, 0.3)"
              }}
            >
              購入してアプリを使う
            </button>
          </div>
        </Card>
      </div>
    </BackgroundWrapper>
  )
}

export default Pay