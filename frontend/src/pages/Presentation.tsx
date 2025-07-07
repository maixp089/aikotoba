import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BackToMyPage, Layout, Card } from "../components";
import "../App.css";
import robo1 from "../assets/images/robo1.jpg";
import robo2 from "../assets/images/robo2.jpg";
import Rec from "../components/Rec"; // ★修正ポイント：Recコンポーネントをimport追加

const images = [robo1, robo2];
const durations = [3000, 370];

const RECORDING_TIME_SEC = 10; // 録音時間10秒

const Presentation = () => {
  const { userId } = useParams<{ userId: string }>();
  const [index, setIndex] = useState(0);
  const [audioState, setAudioState] = useState<"ready" | "recording" | "done">("ready");
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState<number>(RECORDING_TIME_SEC); // ★修正ポイント：タイマー状態を追加

  const audioRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const stopTimerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // ★修正ポイント：カウントダウン用intervalを追加

  const navigate = useNavigate();

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

    // ★修正ポイント：録音開始時にタイマー初期化と1秒ごとのカウントダウン開始を追加
    mediaRecorder.onstart = () => {
      setAudioState("recording");
      setTimer(RECORDING_TIME_SEC); // タイマー初期化
      intervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            if (audioRef.current && audioRef.current.state === "recording") {
              audioRef.current.stop();
            }
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // 以前の自動停止タイマーも維持
      stopTimerRef.current = setTimeout(() => {
        if (audioRef.current && audioRef.current.state === "recording") {
          audioRef.current.stop();
        }
      }, RECORDING_TIME_SEC * 1000);
    };

    // ★修正ポイント：録音停止時にintervalとタイマークリアを追加
    mediaRecorder.onstop = async () => {
      setAudioState("done");
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (stopTimerRef.current) {
        clearTimeout(stopTimerRef.current);
        stopTimerRef.current = null;
      }
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      await sendAudioToAPI(blob);
    };
  };

  const handleStart = () => {
    if (audioRef.current && audioState === "ready") {
      audioRef.current.start();
    }
  };

  // ★修正ポイント：録音停止時にintervalもクリアする処理を追加
  const handleStop = () => {
    if (audioRef.current && audioState === "recording") {
      audioRef.current.stop();
      if (stopTimerRef.current) {
        clearTimeout(stopTimerRef.current);
        stopTimerRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
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

  return (
    <Layout>
      <Card>
        <div className="space-y-4">
          <div className="flex justify-between w-full max-w-md">
            <BackToMyPage userId={userId!} />
          </div>
          <h1 className="text-green-500 text-3xl text-center">ろぼにはなしてね🎙️</h1>

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

          {/* ★修正ポイント：録音中のタイマー表示とRecコンポーネント表示に変更 */}
          {audioState === "recording" && (
            <>
              <p className="text-center text-xl text-red-600 font-bold mt-2">
                残り時間: {timer}秒
              </p>
              <Rec />
            </>
          )}

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


// // 0707/1430現在developの内容
// import { BackToMyPage, Layout, Card } from "../components";
// import "../App.css";
// import { useState, useEffect, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import robo1 from "../assets/images/robo1.jpg";
// import robo2 from "../assets/images/robo2.jpg";

// const images = [robo1, robo2];
// const durations = [3000, 370];

// const Presentation = () => {
//   const { userId } = useParams<{ userId: string }>(); //追加：BackToMyPageを適用するため
//   const [index, setIndex] = useState(0);
//   const [audioState, setAudioState] = useState<"ready" | "recording" | "done">("ready");
//   const [isLoading, setIsLoading] = useState(false);

//   const audioRef = useRef<MediaRecorder | null>(null);
//   const chunksRef = useRef<Blob[]>([]);
//   const stopTimerRef = useRef<NodeJS.Timeout | null>(null);

//   const navigate = useNavigate();

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
//         alert("マイクがつかえません。許可してね。");
//         console.error(err);
//       });
//   }, []);

//   const handleSuccess = (stream: MediaStream) => {
//     const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
//     audioRef.current = mediaRecorder;
//     chunksRef.current = [];

//     mediaRecorder.ondataavailable = (e) => {
//       if (e.data.size > 0) {
//         chunksRef.current.push(e.data);
//       }
//     };

//     mediaRecorder.onstart = () => {
//       setAudioState("recording");
//       stopTimerRef.current = setTimeout(() => {
//         mediaRecorder.stop();
//       }, 10 * 1000); // 自動停止10秒
//     };

//     mediaRecorder.onstop = async () => {
//       setAudioState("done");
//       const blob = new Blob(chunksRef.current, { type: "audio/webm" });
//       await sendAudioToAPI(blob);
//     };
//   };

//   const handleStart = () => {
//     if (audioRef.current && audioState === "ready") {
//       audioRef.current.start();
//     }
//   };

//   const handleStop = () => {
//     if (audioRef.current && audioState === "recording") {
//       audioRef.current.stop();
//       if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
//     }
//   };

//   // 録音データをAPIに送信し、レスポンス受信後に評価ページへ遷移
//   const sendAudioToAPI = async (blob: Blob) => {
//     // ここにユーザーIDをセット（仮に固定値）
//     // const userId = "a787f6df-1ebb-41fb-ae56-78c8159378aa";
//     if (!userId) {
//     alert("ユーザー情報が取得できませんでした");
//     return;
//   }

//     setIsLoading(true);
//     const formData = new FormData();
//     formData.append("file", blob, "recording.webm");
//     formData.append("user_id", userId);

//     try {
//       const res = await fetch("http://localhost:8000/api/audio-feedback", {
//         method: "POST",
//         body: formData,
//       });
//       if (!res.ok) throw new Error("送信失敗");

//       const data = await res.json();
//       console.log("APIレスポンス", data);

//       // フィードバックをstateで渡して評価ページへ遷移
//       navigate(`/users/${userId}/evaluation`, { state: { feedback: data } });
//     } catch (error) {
//       alert("音声送信に失敗しました");
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Layout>
//       <Card>
//         <div className="space-y-4">
//           <div className="flex justify-between w-full max-w-md">
//             <BackToMyPage userId={userId!} />{" "}
//           </div>
//           <h1 className="text-green-500 text-3xl text-center">ろぼにはなしてね🎙️</h1>

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
//               onClick={audioState === "recording" ? handleStop : handleStart}
//               disabled={isLoading}
//               className="text-xl bg-red-500 text-white px-10 py-4 rounded hover:bg-green-600"
//             >
//               {audioState === "recording" ? "録音停止" : "れんしゅうをはじめる"}
//             </button>

//             {isLoading && (
//               <p className="text-xl text-red-600 mt-2">
//                 まるつけするね！<br />
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


