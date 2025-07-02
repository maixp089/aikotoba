import { BackToMyPage, ToEvaluation, Layout } from "../components";
import "../App.css";
import { useState, useEffect, useRef } from "react";

const images = ["/images/robo1.jpg", "/images/robo2.jpg"];
const durations = [3000, 370]; // 1枚目：3秒、2枚目：0.37秒（ミリ秒）

const Presentation = () => {
  const [index, setIndex] = useState(0);
  const [audioState, setAudioState] = useState<"ready" | "recording" | "done">(
    "ready"
  );
  const [setFile] = useState<Blob | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<MediaRecorder | null>(null);
  const stopTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, durations[index]);

    return () => clearTimeout(timer);
  }, [index]);

  // 初期マイク取得
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(handleSuccess)
      .catch((err) => {
        alert("マイクの使用が許可されていません");
        console.error(err);
      });
  }, []);

  // 録音成功後のMediaRecorder設定
  const handleSuccess = (stream: MediaStream) => {
    const mediaRecorder = new MediaRecorder(stream);
    audioRef.current = mediaRecorder;

    const chunks: Blob[] = [];

    mediaRecorder.addEventListener("dataavailable", (e) => {
      if (e.data.size > 0) {
        chunks.push(e.data);
      }
    });

    mediaRecorder.addEventListener("start", () => {
      setAudioState("recording");

      // 1分後に自動停止
      stopTimerRef.current = setTimeout(() => {
        mediaRecorder.stop();
      }, 30 * 1000);
    });

    mediaRecorder.addEventListener("stop", () => {
      setAudioState("done");

      const blob = new Blob(chunks, { type: "audio/m4a" }); // 実体はwebm
      setFile(blob);

      // 自動API送信
      sendAudioToAPI(blob);
    });
  };

  // 録音開始
  const handleStart = () => {
    if (audioRef.current && audioState === "ready") {
      audioRef.current.start();
    }
  };

  // API送信 → 成功したら画面遷移
  const sendAudioToAPI = async (blob: Blob) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", blob, "recording.m4a");

    try {
      // ★★★APIpath要確認☆☆☆
      const res = await fetch("https://your-api-endpoint/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("アップロード失敗");

      const result = await res.json();
      console.log("API応答:", result);

      // 遷移処理（API応答後）
      window.location.href = "/evaluation";
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

        {/* 録音UI */}
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
            <p className="text-3xl text-red-600 mt-2">まるつけ中...</p>
          )}
        </div>

        <ToEvaluation />
      </div>
    </Layout>
  );
};

export default Presentation;
