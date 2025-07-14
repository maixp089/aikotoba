import { Card, Layout } from "../components"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import IconButton from "../components/IconButton"
import BackgroundWrapper from "../components/Background"

type User = {
  id: string
  name: string
  icon_image?: string
}

type Score = {
  feedback_id: string
  presentation_id: string
  presentation_created_at: string
  total_score: number
  well_done: string
  next_challenge: string
}

const Record = () => {
  const { userId } = useParams<{ userId: string }>()
  const [scores, setScores] = useState<Score[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [userLoading, setUserLoading] = useState(true)
  const [scoreLoading, setScoreLoading] = useState(true)
  const loading = userLoading || scoreLoading
  const navigate = useNavigate()

  // ユーザー情報fetch
  useEffect(() => {
    if (!userId) return
    setUserLoading(true)
    fetch(`http://localhost:8000/users/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("ユーザー情報取得失敗")
        return res.json()
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setUserLoading(false))
  }, [userId])

  // スコア情報fetch
  useEffect(() => {
    setScoreLoading(true)
    fetch(`http://localhost:8000/users/${userId}/scores`)
      .then((res) => {
        if (!res.ok) throw new Error("スコア取得失敗")
        return res.json()
      })
      .then((data) => setScores(data))
      .catch(() => setScores([]))
      .finally(() => setScoreLoading(false))
  }, [userId])

  // 日付フォーマット（月日のみ）
  const formatDate = (isoStr?: string) => {
    if (!isoStr) return ""
    const d = new Date(isoStr.endsWith("Z") ? isoStr : isoStr + "Z")
    return `${d.getMonth() + 1}月${d.getDate()}日`
  }

  // 時間フォーマット（コロン区切り、例: 16:56 のきろく）
  const formatTime = (isoStr?: string) => {
    if (!isoStr) return ""
    const d = new Date(isoStr.endsWith("Z") ? isoStr : isoStr + "Z")
    return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")} のきろく`
  }

  // スコア新しい順
  const sortedData = [...scores].sort(
    (a, b) => new Date(b.presentation_created_at).getTime() - new Date(a.presentation_created_at).getTime(),
  )

  // 最新3件
  const displayScores = sortedData.slice(0, 3)

  // ===== ヘッダー部分：アイコン＋名前＋「さんの」＋「記録」（記録だけふりがな）【横一列アイコンさらに左寄せ】 =====
  const header = (
    <div
      style={{
        position: "relative",
        background: "#4bb3a7",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        minHeight: 62,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start", // 左寄せ！
        padding: "0 65px 0 25px",    // 左paddingを大きく
        gap: 7,
      }}
    >
      {/* ユーザーアイコン */}
      {user && (
        <img
          src={user.icon_image ? `/icons/${user.icon_image}` : "/icons/neko.png"}
          alt="ユーザーアイコン"
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            border: "2px solid #fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.13)",
            background: "#fff",
          }}
        />
      )}
      {/* 名前＋「さんの」 */}
      {user && (
        <span
          style={{
            color: "#fff",
            fontFamily: "'Kosugi Maru','M PLUS Rounded 1c',sans-serif",
            fontWeight: 1000,
            fontSize: "1.2rem",
            letterSpacing: "0.02em",
            marginRight: 4,
            textShadow: "0 2px 4px #1d8070a8",
            whiteSpace: "nowrap",
          }}
        >
          {user.name}さんの
        </span>
      )}
      {/* 記録＋ふりがな */}
      <span style={{ display: "inline-block", position: "relative", lineHeight: 1 }}>
        {/* ふりがな「きろく」 */}
        <span
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            top: "-1.05em",
            color: "#d7f6ff",
            fontSize: "1rem",
            fontWeight: 600,
            fontFamily: "'Kosugi Maru','M PLUS Rounded 1c',sans-serif",
            letterSpacing: "0.08em",
            opacity: 0.93,
            textShadow: "0 1px 3px #00000030",
            pointerEvents: "none",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          きろく
        </span>
        {/* 記録 */}
        <span
          style={{
            color: "#fff",
            fontFamily: "'Kosugi Maru','M PLUS Rounded 1c',sans-serif",
            fontWeight: 900,
            fontSize: "1.14rem",
            letterSpacing: "0.02em",
            textShadow: "0 1px px #1d8070a8",
            userSelect: "none",
          }}
        >
          記録
        </span>
      </span>
    </div>
  )

  // ===== フッター（おうちボタン） =====
  const footerBar = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        width: "100%",
        padding: "0 18px",
        background: "#4bb3a7",
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        minHeight: 80,
      }}
    >
      <IconButton onClick={() => navigate(`/users/${userId}/mypage`)} label="" iconSrc="/icons/home.png" />
    </div>
  )

  return (
    <BackgroundWrapper>
      <Layout>
        <Card title={header} bottomBar={footerBar}>
          <div style={{ padding: "16px" }}>
            {loading ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px 0",
                  color: "#999",
                  fontSize: "1rem",
                  fontFamily: "'Kosugi Maru','M PLUS Rounded 1c',sans-serif",
                  fontWeight: "500",
                }}
              >
                よみこみちゅう...
              </div>
            ) : sortedData.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px 0",
                  color: "#999",
                  fontSize: "1rem",
                  fontFamily: "'Kosugi Maru','M PLUS Rounded 1c',sans-serif",
                  fontWeight: "500",
                }}
              >
                まだきろくがありません
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {displayScores.map((entry) => (
                  <button
                    key={entry.presentation_id}
                    onClick={() => navigate(`/users/${userId}/evaluation/${entry.feedback_id}`)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      padding: "18px",
                      background: "#fff",
                      border: "3px solid #f0e6d6",
                      borderRadius: "20px",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      textAlign: "left",
                      boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#fefcf8"
                      e.currentTarget.style.transform = "translateY(-2px)"
                      e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.12)"
                      e.currentTarget.style.borderColor = "#e8dcc0"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#fff"
                      e.currentTarget.style.transform = "translateY(0)"
                      e.currentTarget.style.boxShadow = "0 3px 12px rgba(0,0,0,0.08)"
                      e.currentTarget.style.borderColor = "#f0e6d6"
                    }}
                  >
                    {/* スコア表示部分 */}
                    <div
                      style={{
                        width: "70px",
                        height: "70px",
                        background: "#fff",
                        borderRadius: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: "20px",
                        border: "3px solid #f8f4e8",
                        fontSize: "40px",
                        fontWeight: 900,
                        color: "#f4bc21",
                        flexShrink: 0,
                        boxShadow: "0 3px 8px rgba(244, 188, 33, 0.15)",
                        fontFamily: "'Kosugi Maru','M PLUS Rounded 1c',sans-serif",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {entry.total_score}
                    </div>

                    {/* 日付・時間部分（時間はピンク！） */}
                    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                      <div
                        style={{
                          fontSize: "1.4rem",
                          fontWeight: "900",
                          color: "#4a4a4a",
                          marginBottom: "7px",
                          fontFamily: "'Kosugi Maru','M PLUS Rounded 1c',sans-serif",
                          letterSpacing: "0.0em",
                          lineHeight: 1.3,
                        }}
                      >
                        {formatDate(entry.presentation_created_at)}
                      </div>
                      <div
                        style={{
                          fontSize: "0.8rem",
                          fontFamily: "'Kosugi Maru','M PLUS Rounded 1c',sans-serif",
                          fontWeight: "700",
                          letterSpacing: "0.03em",
                          lineHeight: 1.4,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <span style={{ color: "#ff7eae", fontWeight: 700 }}>
                          {formatTime(entry.presentation_created_at)}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </Card>
      </Layout>
    </BackgroundWrapper>
  )
}

export default Record
