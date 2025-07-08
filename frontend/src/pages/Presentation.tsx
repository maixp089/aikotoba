import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout, Card } from "../components";
import "../App.css";
import robotYellow from "../assets/images/robot_yellow.png";
import Rec from "../components/Rec";
import IconButton from "../components/IconButton";
import BackgroundWrapper from "../components/Background";
import { useLocation } from "react-router-dom"; // 時間とテーマを取得するため

const images = [robotYellow];
const durations = [3000, 370];
const RECORDING_TIME_SEC = 10;

const Presentation = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();

  const [index, setIndex] = useState(0);
  const [audioState, setAudioState] = useState<"ready" | "recording" | "done">(
    "ready"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState<number>(RECORDING_TIME_SEC);

  const audioRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const stopTimerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const location = useLocation();
  const { theme } = location.state || {}; // ← ここで前ページの時間とテーマを取得！time,

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, durations[index]);
    return () => clearTimeout(timerId);
  }, [index]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(handleSuccess)
      .catch((err) => {
        alert("マイクがつかえません。許可してね。");
        console.error(err);
      });
  }, []);

  const handleSuccess = (stream: MediaStream) => {
    const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
    audioRef.current = mediaRecorder;
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };

    mediaRecorder.onstart = () => {
      setAudioState("recording");
      setTimer(RECORDING_TIME_SEC);
      intervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            if (audioRef.current && audioRef.current.state === "recording") {
              audioRef.current.stop();
            }
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      stopTimerRef.current = setTimeout(() => {
        if (audioRef.current && audioRef.current.state === "recording") {
          audioRef.current.stop();
        }
      }, RECORDING_TIME_SEC * 1000);
    };

    mediaRecorder.onstop = async () => {
      setAudioState("done");
      clearInterval(intervalRef.current!);
      intervalRef.current = null;
      clearTimeout(stopTimerRef.current!);
      stopTimerRef.current = null;

      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      await sendAudioToAPI(blob);
    };
  };

  const handleStart = () => {
    if (audioRef.current && audioState === "ready") {
      audioRef.current.start();
    }
  };

  const handleStop = () => {
    if (audioRef.current && audioState === "recording") {
      audioRef.current.stop();
      clearTimeout(stopTimerRef.current!);
      clearInterval(intervalRef.current!);
      stopTimerRef.current = null;
      intervalRef.current = null;
    }
  };

  const sendAudioToAPI = async (blob: Blob) => {
    if (!userId) {
      alert("ユーザー情報が取得できませんでした");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", blob, "recording.webm");
    formData.append("user_id", userId);

    try {
      const res = await fetch("http://localhost:8000/api/audio-feedback", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("送信失敗");

      const data = await res.json();
      console.log("APIレスポンス", data);

      navigate(`/users/${userId}/evaluation`, { state: { feedback: data } });
    } catch (error) {
      alert("音声送信に失敗しました");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const headerTitle = (
    <div
      style={{
        display: "flex",
        alignItems: "center", // ←中央揃え
        whiteSpace: "nowrap",
        justifyContent: "flex-start",
        width: "100%",
        padding: "0 18px",
        background: "#4bb3a7",
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        height: 60, // ←画像サイズに合わせて高さを抑える
        minHeight: undefined, // ←minHeight消す
      }}
    >
      <img
        src="/icons/theme.png"
        alt="テーマ"
        style={{
          width: 60, // ヘッダー内だとちょっと小さめ推奨
          height: 60,
          pointerEvents: "none",
          userSelect: "none",
          marginTop: 0,
          marginBottom: 0,
        }}
      />
      {/* ここを動的に！ */}
      <span style={{ marginLeft: 12, color: "#fff", fontSize: 20 }}>
        {theme}
      </span>
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
          <div className="space-y-4">
            {/* ちょっと待ってね メッセージ（ロボットの上） */}
            {isLoading && (
              <p
                className="text-center"
                style={{
                  color: "#f2687b",
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                  fontFamily: "'Kosugi Maru', 'M PLUS Rounded 1c', sans-serif",
                  marginTop: "8px", // ← ここを "-8px" から "8px" に変更
                  marginBottom: "-12px",
                }}
              >
                ちょっと待ってね
              </p>
            )}

            {/* マイク＆ロボット */}
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "center",
                height: 210,
                minHeight: 120,
                marginBottom: 12,
                marginTop: -30,
                gap: 0,
              }}
            >
              {/* マイク */}
              <div
                style={{
                  marginRight: "-50px",
                  marginBottom: "1px",
                  fontSize: "300px",
                  lineHeight: 1,
                }}
              >
                <Rec />
              </div>
              {/* ロボット */}
              <img
                src={images[index]}
                alt="robot"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "contain",
                  borderRadius: "32px",
                  boxShadow: "0 2px 12px #cce7d277",
                  background: "none",
                  marginLeft: "70px",
                }}
              />
            </div>

            {/* 残り時間 */}
            {audioState === "recording" && (
              <p
                className="text-center font-bold mt-2"
                style={{
                  fontSize: "1.3rem",
                  color: "#999999",
                  fontFamily: "'Kosugi Maru', 'M PLUS Rounded 1c', sans-serif",
                  letterSpacing: "1px",
                }}
              >
                あと {timer}秒
              </p>
            )}

            {/* 練習ボタン */}
            <div className="flex flex-col items-center space-y-2 mt-5">
              <button
                onClick={audioState === "recording" ? handleStop : handleStart}
                disabled={isLoading}
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
                  margin: 0,
                  cursor: "pointer",
                  transition: "background 0.1s",
                  display: "block",
                }}
              >
                {audioState === "recording" ? (
                  <span>
                    <ruby></ruby>
                    <span style={{ marginLeft: 9 }}>とめる</span>
                  </span>
                ) : (
                  <span>
                    <ruby>
                      練習<rt style={{ fontSize: "0.5em" }}>れんしゅう</rt>
                    </ruby>
                    <span style={{ marginLeft: 9 }}>する</span>
                  </span>
                )}
              </button>
            </div>
          </div>
        </Card>
      </Layout>
    </BackgroundWrapper>
  );
};

export default Presentation;
