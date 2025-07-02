import { BackToMyPage, Layout } from "../components";
import "../App.css";
import { useState, useEffect, useRef } from "react";
import robo1 from "../assets/images/robo1.jpg";
import robo2 from "../assets/images/robo2.jpg";

const images = [robo1, robo2];
const durations = [3000, 370];

const Presentation = () => {
  const [index, setIndex] = useState(0);
  const [audioState, setAudioState] = useState<"ready" | "recording" | "done">(
    "ready"
  );
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<MediaRecorder | null>(null);
  const stopTimerRef = useRef<NodeJS.Timeout | null>(null);

  // スライド画像切り替え処理
  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, durations[index]);
    return () => clearTimeout(timer);
  }, [index]);

  // マイクアクセス許可とMediaRecorderの設定
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(handleSuccess)
      .catch((err) => {
        alert("マイクの使用が許可されていません");
        console.error(err);
      });
  }, []);

  const handleSuccess = (stream: MediaStream) => {
    const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
    audioRef.current = mediaRecorder;

    const chunks: Blob[] = [];

    mediaRecorder.addEventListener("dataavailable", (e) => {
      if (e.data.size > 0) {
        chunks.push(e.data);
      }
    });

    mediaRecorder.addEventListener("start", () => {
      setAudioState("recording");
      stopTimerRef.current = setTimeout(() => {
        mediaRecorder.stop();
      }, 15 * 1000); // 自動停止60秒
    });

    mediaRecorder.addEventListener("stop", () => {
      setAudioState("done");
      const blob = new Blob(chunks, { type: "audio/webm" });
      sendAudioToAPI(blob); // ←録音後にAPIへ送信
    });
  };

  // 録音開始
  const handleStart = () => {
    if (audioRef.current && audioState === "ready") {
      audioRef.current.start();
    }
  };

  // API送信 → 成功したら/scoringに遷移（今はモック）
  const sendAudioToAPI = async (blob: Blob) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", blob, "recording.webm");

    try {
      // モックAPI：2秒後に成功したことにする
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("モックAPI送信完了");
      window.location.href = "/scoring"; // 遷移テスト
    } catch (err) {
      alert("音声の送信に失敗しました");
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-10">
        <BackToMyPage />
        <h1 className="text-5xl text-center">プレゼンページ</h1>

        {/* スライド */}
        <div className="relative w-full max-w-3xl mx-auto h-96 overflow-hidden rounded-xl shadow-lg">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
              alt={`slide-${i}`}
            />
          ))}
        </div>

        {/* 録音ボタン */}
        <div className="flex flex-col items-center space-y-2 mt-5">
          <button
            onClick={handleStart}
            disabled={audioState !== "ready" || isLoading}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {audioState === "recording"
              ? "おはなしきいてるよ！"
              : "れんしゅうをはじめる"}
          </button>

          {isLoading && (
            <p className="text-3xl text-red-600 mt-2">
              まるつけするね！ちょっとまっててね...
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Presentation;
