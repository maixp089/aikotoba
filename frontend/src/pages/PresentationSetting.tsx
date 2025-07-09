import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout, Card } from "../components";
import BackgroundWrapper from "../components/Background";
import IconButton from "../components/IconButton";

const themes = ["すきなスポーツ", "さいきんうれしかったこと", "すきなたべもの"];

type User = {
  id: string;
  name: string;
  icon_image?: string;
};

export default function PresentationSetting() {
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  const [selectedTime, setSelectedTime] = useState(30);
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const times = [
    { label: "30秒", value: 30 },
    { label: "1分", value: 60 },
    { label: "3分", value: 180 },
  ];

  // --- ユーザー情報のfetch ---
  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:8000/users/${userId}`)
      .then((res) => res.ok ? res.json() : Promise.reject())
      .then((data: User) => setUser(data))
      .catch(() => setUser(null));
  }, [userId]);

  const handleStart = () => {
    navigate(`/users/${userId}/presentation`, {
      state: { time: selectedTime, theme: selectedTheme },
    });
  };

  // --- ヘッダー（タイトル文字なし／アイコン＋名前帯だけ） ---
  const header = (
    <div
      style={{
        position: "relative",
        background: "#4bb3a7",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        height: 72,
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
      }}
    >
      {/* ユーザーアイコン */}
      {user && (
        <img
          src={user.icon_image ? `/icons/${user.icon_image}` : "/icons/neko.png"}
          alt="ユーザーアイコン"
          style={{
            width: 62,
            height: 62,
            borderRadius: "50%",
            border: "2.5px solid #fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.13)",
            marginLeft: -10,
            marginRight: 16,
            objectFit: "cover",
            background: "#fff",
          }}
        />
      )}
      {/* 名前帯UI（大きく） */}
      {user && (
        <div
          style={{
            background: "#f4bc21",
            color: "#fff",
            borderRadius: "26px",
            padding: "8px 26px 7px 24px",
            fontWeight: 900,
            fontSize: "1.42rem",
            letterSpacing: "0.08em",
            fontFamily: "'Kosugi Maru','M PLUS Rounded 1c',sans-serif",
            border: "2.8px solid #fff6c5",
            textAlign: "center",
            boxShadow: "0 5px 16px #ffe39d77",
            userSelect: "none",
            pointerEvents: "none",
            marginLeft: 0,
            lineHeight: 1.18,
            minWidth: 128,
          }}
        >
          {user.name + "さん"}
        </div>
      )}
      {/* タイトル文字は絶対に入れない */}
    </div>
  );

  // 下部フッター
  const footerBar = (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0",
        height: "100%",
      }}
    >
      <div
        style={{
          background: "#4bb3a7",
          borderRadius: "50%",
          padding: "0",
          margin: "0",
          height: 0,
          width: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton
          onClick={() => navigate(-1)}
          iconSrc="/icons/back.png"
          alt="もどる"
          size={50}
        />
      </div>
    </div>
  );

  const timeBtnStyle = (selected: boolean) => ({
    border: selected ? "2px solid #4bb3a7" : "1px solid #bbb",
    background: selected ? "#d4efd7" : "#fff",
    borderRadius: 18,
    padding: "7px 14px",
    margin: "0 6px",
    fontSize: 16,
    fontWeight: selected ? 700 : 400,
    boxShadow: selected ? "0 1px 4px #b7d7bb44" : undefined,
    cursor: "pointer",
    outline: "none",
    transition: "all 0.12s",
    minWidth: 55,
    height: 34,
    display: "inline-block",
  });

  const themeCardStyle = (selected: boolean) => ({
    border: selected ? "2px solid #fa83a5" : "1px solid #bbb",
    background: selected ? "#fae3ec" : "#fff",
    borderRadius: 14,
    padding: "7px 0",
    marginBottom: "6px",
    fontSize: 15,
    fontWeight: selected ? 700 : 400,
    boxShadow: selected ? "0 1.5px 6px #fa83a544" : undefined,
    cursor: "pointer",
    outline: "none",
    width: "92%",
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative" as const,
    transition: "all 0.12s",
    minHeight: 26,
    lineHeight: 1.15,
  });

  return (
    <BackgroundWrapper>
      <Layout>
        <Card title={header} bottomBar={footerBar}>
          <div
            style={{
              padding: 0,
              paddingBottom: 0,
              height: "286px",
              margin: 0,
              position: "relative",
            }}
          >
            {/* 時間セクション */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 16, fontWeight: 900, marginBottom: 4 }}>
                <span role="img" aria-label="clock">
                  ⏰
                </span>
                <span style={{ marginLeft: 2 }}>
                  <ruby>
                    時間<rt style={{ fontSize: "0.55em" }}>じかん</rt>
                  </ruby>
                  をえらぼう！
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {times.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setSelectedTime(t.value)}
                    style={timeBtnStyle(selectedTime === t.value)}
                    aria-pressed={selectedTime === t.value}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            {/* テーマセクション */}
            <div style={{ marginBottom: 12, marginTop: 0 }}>
              <div style={{ fontSize: 16, fontWeight: 900, marginBottom: 4 }}>
                <span role="img" aria-label="tag">
                  🏷️
                </span>
                <span style={{ marginLeft: 2 }}>テーマをえらぼう！</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {themes.map((theme) => (
                  <button
                    key={theme}
                    onClick={() => setSelectedTheme(theme)}
                    style={themeCardStyle(selectedTheme === theme)}
                    aria-pressed={selectedTheme === theme}
                  >
                    <span>{theme}</span>
                  </button>
                ))}
              </div>
            </div>
            {/* スタートボタン（絶対配置パターン） */}
            <button
              onClick={handleStart}
              style={{
                width: "70%",
                background: "#f2687b",
                color: "#fff",
                borderRadius: "24px",
                fontSize: "1.1rem",
                fontWeight: "bold",
                boxShadow: "0 3px #c35665",
                letterSpacing: "1.2px",
                fontFamily: "'M PLUS Rounded 1c', 'Kosugi Maru', sans-serif",
                border: "none",
                textAlign: "center",
                outline: "none",
                padding: "10px 0",
                cursor: "pointer",
                transition: "background 0.1s",
                display: "block",
                position: "absolute",
                left: "50%",
                bottom: 0,
                transform: "translateX(-50%)",
              }}
            >
              <span style={{ marginLeft: 5 }}>スタートする</span>
            </button>
          </div>
        </Card>
      </Layout>
    </BackgroundWrapper>
  );
}