import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout, Card } from "../components";
import BackgroundWrapper from "../components/Background";
import IconButton from "../components/IconButton";

const themes = ["すきなスポーツ", "さいきんうれしかったこと", "すきなたべもの"];

export default function PresentationSetting() {
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  const [selectedTime, setSelectedTime] = useState(30);
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();

  const times = [
    { label: "30秒", value: 30 },
    { label: "1分", value: 60 },
    { label: "3分", value: 180 },
  ];

  const handleStart = () => {
    navigate(`/users/${userId}/presentation`, {
      state: { time: selectedTime, theme: selectedTheme },
    });
  };

  const headerTitle = (
    <div
      style={{
        width: "100%",
        textAlign: "center",
        fontSize: 22, // ← ここを22→28などにUP！
        fontWeight: 800, // ← 700より900で超太字
        lineHeight: 1.25, // ← 縦幅確保しつつ詰めすぎない
        letterSpacing: "0.03em",
        color: "#fff",
        fontFamily: "'M PLUS Rounded 1c', 'Kosugi Maru', sans-serif", // 太字系が使えるフォント
        margin: 0,
        padding: 0,
        minHeight: 0,
      }}
    >
      テーマと
      <ruby>
        時間<rt style={{ fontSize: "0.6em" }}>じかん</rt>
      </ruby>
      の
      <ruby>
        設定<rt style={{ fontSize: "0.6em" }}>せってい</rt>
      </ruby>
    </div>
  );

  const footerBar = (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0", // ← 余白をなくす
        height: "100%", // ← 高さはCard側で80固定なので全部使う
      }}
    >
      <div
        style={{
          background: "#4bb3a7",
          borderRadius: "50%",
          padding: "0", // ここも余白なし
          margin: "0",
          height: 0, // ← アイコン高さに合わせて小さく
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
    fontSize: 15,
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
    fontSize: 14,
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
        <Card title={headerTitle} bottomBar={footerBar}>
          <div
            style={{
              padding: 0,
              paddingBottom: 0, // ← 明示！
              height: "286px", // ← 高さはお好みで調整OK
              // overflowY: "auto", // ← いったん外す！
              margin: 0,
              position: "relative", // ← 下端に絶対配置用
            }}
          >
            {/* 時間セクション */}
            <div style={{ marginBottom: 24 }}>
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
            <div style={{ marginBottom: 10, marginTop: 0 }}>
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
                fontSize: "1rem",
                fontWeight: "bold",
                boxShadow: "0 3px #c35665",
                letterSpacing: "1.2px",
                fontFamily: "'M PLUS Rounded 1c', 'Kosugi Maru', sans-serif",
                border: "none",
                textAlign: "center",
                outline: "none",
                padding: "10px 0",
                // margin: "20px auto -24px auto", ← marginは外す！
                cursor: "pointer",
                transition: "background 0.1s",
                display: "block",
                position: "absolute", // ← 追加
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
