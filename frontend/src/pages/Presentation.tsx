import { BackToMyPage, Layout, Card } from "../components";
import "../App.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import robo1 from "../assets/images/robo1.jpg";
import robo2 from "../assets/images/robo2.jpg";

const images = [robo1, robo2];
const durations = [3000, 370];

const Presentation = () => {
  const [index, setIndex] = useState(0);
  const [audioState, setAudioState] = useState<"ready" | "recording" | "done">("ready");
  const [isLoading, setIsLoading] = useState(false);

  const audioRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const stopTimerRef = useRef<NodeJS.Timeout | null>(null);

  const navigate = useNavigate();

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
      stopTimerRef.current = setTimeout(() => {
        mediaRecorder.stop();
      }, 10 * 1000); // 自動停止10秒
    };

    mediaRecorder.onstop = async () => {
      setAudioState("done");
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
      if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
    }
  };

  // 録音データをAPIに送信し、レスポンス受信後に評価ページへ遷移
  const sendAudioToAPI = async (blob: Blob) => {
    // ここにユーザーIDをセット（仮に固定値）
    const userId = "94c729a8-491c-4ea4-b47c-d96258e4414e";

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

      // フィードバックをstateで渡して評価ページへ遷移
      navigate("/evaluation", { state: { feedback: data } });
    } catch (error) {
      alert("音声送信に失敗しました");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Card>
        <div className="space-y-4">
          <div className="flex justify-between w-full max-w-md">
            <BackToMyPage />
          </div>
          <h1 className="text-green-500 text-3xl text-center">ろぼにはなしてね🎙️</h1>

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
              onClick={audioState === "recording" ? handleStop : handleStart}
              disabled={isLoading}
              className="text-xl bg-red-500 text-white px-10 py-4 rounded hover:bg-green-600"
            >
              {audioState === "recording" ? "録音停止" : "れんしゅうをはじめる"}
            </button>

            {isLoading && (
              <p className="text-xl text-red-600 mt-2">
                まるつけするね！<br />
                ちょっとまっててね...
              </p>
            )}
          </div>
        </div>
      </Card>
    </Layout>
  );
};

export default Presentation;




// // // 修正前のコード（developの内容保存）
// import { BackToMyPage, Layout, Card } from "../components";
// import "../App.css";
// import { useState, useEffect, useRef } from "react";
// import robo1 from "../assets/images/robo1.jpg";
// import robo2 from "../assets/images/robo2.jpg";

// const images = [robo1, robo2];
// const durations = [3000, 370];

// const Presentation = () => {
//   const [index, setIndex] = useState(0);
//   const [audioState, setAudioState] = useState<"ready" | "recording" | "done">(
//     "ready"
//   );
//   const [isLoading, setIsLoading] = useState(false);
//   const audioRef = useRef<MediaRecorder | null>(null);
//   const stopTimerRef = useRef<NodeJS.Timeout | null>(null);

//   // スライド画像切り替え処理
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIndex((prev) => (prev + 1) % images.length);
//     }, durations[index]);
//     return () => clearTimeout(timer);
//   }, [index]);

//   // マイクアクセス許可とMediaRecorderの設定
//   useEffect(() => {
//     navigator.mediaDevices
//       .getUserMedia({ audio: true })
//       .then(handleSuccess)
//       .catch((err) => {
//         alert("マイクがつかえません。許可（きょか）してね。");
//         console.error(err);
//       });
//   }, []);

//   const handleSuccess = (stream: MediaStream) => {
//     const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
//     audioRef.current = mediaRecorder;

//     const chunks: Blob[] = [];

//     mediaRecorder.addEventListener("dataavailable", (e) => {
//       if (e.data.size > 0) {
//         chunks.push(e.data);
//       }
//     });

//     mediaRecorder.addEventListener("start", () => {
//       setAudioState("recording");
//       stopTimerRef.current = setTimeout(() => {
//         mediaRecorder.stop();
//       }, 10 * 1000); // 自動停止60秒
//     });

//     mediaRecorder.addEventListener("stop", () => {
//       setAudioState("done");
//       const blob = new Blob(chunks, { type: "audio/webm" });
//       sendAudioToAPI(blob); // ←録音後にAPIへ送信
//     });
//   };

//   // 録音開始
//   const handleStart = () => {
//     if (audioRef.current && audioState === "ready") {
//       audioRef.current.start();
//     }
//   };

//   // API送信 → 成功したら/scoringに遷移（今はモック）
//   const sendAudioToAPI = async (blob: Blob) => {
//     setIsLoading(true);

//     const formData = new FormData();
//     formData.append("file", blob, "recording.webm");

//     try {
//       // モックAPI：2秒後に成功したことにする
//       await new Promise((resolve) => setTimeout(resolve, 2000));

//       console.log("モックAPI送信完了");
//       window.location.href = "/scoring"; // 遷移テスト
//     } catch (err) {
//       alert("音声の送信に失敗しました");
//       console.error(err);
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Layout>
//       <Card>
//         <div className="space-y-4">
//           <div className="flex justify-between w-full max-w-md">
//             {" "}
//             <BackToMyPage />
//           </div>
//           <h1 className="text-green-500 text-3xl text-center">
//             ろぼにはなしてね🎙️
//           </h1>

//           {/* スライド */}
//           <div className="relative w-full max-w-3xl mx-auto h-96 overflow-hidden rounded-xl shadow-lg">
//             {images.map((src, i) => (
//               <img
//                 key={i}
//                 src={src}
//                 className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
//                   i === index ? "opacity-100" : "opacity-0"
//                 }`}
//                 alt={`slide-${i}`}
//               />
//             ))}
//           </div>

//           {/* 録音ボタン */}
//           <div className="flex flex-col items-center space-y-2 mt-5">
//             <button
//               onClick={handleStart}
//               disabled={audioState !== "ready" || isLoading}
//               className="text-xl bg-red-500 text-white px-10 py-4 rounded hover:bg-green-600"
//             >
//               {audioState === "recording"
//                 ? "おはなしきいてるよ！"
//                 : "れんしゅうをはじめる"}
//             </button>

//             {isLoading && (
//               <p className="text-xl text-red-600 mt-2">
//                 まるつけするね！
//                 <br />
//                 ちょっとまっててね...
//               </p>
//             )}
//           </div>
//         </div>
//       </Card>
//     </Layout>
//   );
// };

// export default Presentation;
