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
      }}
    >
      テーマと
      <ruby>
        時間<rt style={{ fontSize: "0.6em" }}>じかん</rt>
      </ruby>
      をえらぼう
    </div>
  );

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
      <IconButton
        onClick={() => navigate(-1)}
        iconSrc="/icons/back.png"
        alt="もどる"
        size={55}
      />
      <IconButton
        onClick={() => navigate(`/users/${userId}/mypage`)}
        iconSrc="/icons/home.png"
        alt="ホーム"
        size={66}
      />
    </div>
  );

  return (
    <BackgroundWrapper>
      <Layout>
        <Card title={headerTitle} bottomBar={footerBar}>
          <div style={{ padding: "24px" }}>
            <h2>時間をえらぼう！</h2>
            <div>
              {times.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setSelectedTime(t.value)}
                  style={{
                    border:
                      selectedTime === t.value
                        ? "2px solid #4bb3a7"
                        : "1px solid #ccc",
                    background: selectedTime === t.value ? "#d4efd7" : "#fff",
                    borderRadius: 16,
                    padding: "10px 24px",
                    margin: "4px",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <h2>テーマをえらぼう！</h2>
            <div>
              {themes.map((theme) => (
                <button
                  key={theme}
                  onClick={() => setSelectedTheme(theme)}
                  style={{
                    border:
                      selectedTheme === theme
                        ? "2px solid #4bb3a7"
                        : "1px solid #ccc",
                    background: selectedTheme === theme ? "#d4efd7" : "#fff",
                    borderRadius: 16,
                    padding: "10px",
                    margin: "4px",
                  }}
                >
                  {theme}
                </button>
              ))}
            </div>

            <button
              onClick={handleStart}
              style={{
                width: "210px",
                background: "#f2687b",
                color: "#fff",
                borderRadius: "34px",
                fontSize: "1.1rem",
                fontWeight: "bold",
                boxShadow: "0 5px #c35665",
                letterSpacing: "1.4px",
                fontFamily: "'M PLUS Rounded 1c', 'Kosugi Maru', sans-serif",
                border: "none",
                textAlign: "center",
                outline: "none",
                padding: "13px 0",
                margin: "32px auto 0 auto",
                cursor: "pointer",
                transition: "background 0.1s",
                display: "block",
              }}
            >
              <span>
                <ruby>
                  条件<rt style={{ fontSize: "0.5em" }}>じょうけん</rt>
                </ruby>
                <span style={{ marginLeft: 9 }}>でスタートする</span>
              </span>
            </button>
          </div>
        </Card>
      </Layout>
    </BackgroundWrapper>
  );
}
