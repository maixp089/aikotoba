import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout, Card } from "../components";
import "../App.css";
import robotYellow from "../assets/images/robot_yellow.png";
import Rec from "../components/Rec";
import IconButton from "../components/IconButton";
import BackgroundWrapper from "../components/Background";
import { useLocation } from "react-router-dom"; // 時間とテーマを取得するため
import log from "loglevel";

const images = [robotYellow];
const durations = [3000, 370];

const Presentation = () => {
  const location = useLocation();
  const { time, theme } = location.state || {}; // ← ★ここで前ページの時間とテーマを取得！timeを変更する場合は追加
  const RECORDING_TIME_SEC = time ?? 10; //★timeを設定するなら「time ?? 10」これにする
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
    log.info("マイク取得成功");
    const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
    audioRef.current = mediaRecorder;
    chunksRef.current = [];
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };

    mediaRecorder.onstart = () => {
      log.info("録音開始");
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
      log.info("録音終了");
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
    log.info("録音ボタン押下: state=", audioState);
    if (audioRef.current && audioState === "ready") {
      audioRef.current.start();
    }
  };

  const handleStop = () => {
    log.info("録音停止ボタン押下: state=", audioState);
    if (audioRef.current && audioState === "recording") {
      audioRef.current.stop();
      clearTimeout(stopTimerRef.current!);
      clearInterval(intervalRef.current!);
      stopTimerRef.current = null;
      intervalRef.current = null;
    }
  };

  const sendAudioToAPI = async (blob: Blob) => {
    log.info("音声データAPI送信開始", { userId, blob });
    if (!userId) {
      log.error("ユーザー情報が取得できませんでした");
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
      if (!res.ok) {
        log.error("音声フィードバックAPIエラー", res.status);
        alert("音声フィードバックAPIに失敗しました");
        return;
      }
      const data = await res.json();
      if (!data || !data.total_score) {
        log.error("APIレスポンスのバリデーション失敗", data);
        alert("APIレスポンスが不正です");
        return;
      }
      log.info("APIレスポンス受信", data);
      navigate(`/users/${userId}/evaluation`, { state: { feedback: data } });
    } catch (error) {
      log.error("音声送信に失敗", error);
      alert("音声送信に失敗しました");
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
      <span
        style={{
          marginLeft: 12,
          color: "#fff",
          fontSize: 20,
          // ↓折り返すために追加！↓
          whiteSpace: "normal", // ← 折り返し有効
          wordBreak: "break-word", // ← 単語途中でも折り返す
          display: "inline-block", // ← 高さ計算のため
          lineHeight: 1.35, // ← ちょっと詰めて可愛く
          maxWidth: "calc(100% - 72px)", // ← はみ出し防止
        }}
      >
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
                  marginBottom: "-20px", // ★ここでマイクの位置を微調整
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
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // ← 横方向中央
                justifyContent: "center", // ← 縦方向中央（今回はあまり効かないけど一応）
                marginTop: "32px",
              }}
            >
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


