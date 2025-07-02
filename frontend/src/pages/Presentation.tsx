import { BackToMyPage, ToEvaluation, Layout } from "../components";
import "../App.css";
import { useState, useEffect } from "react";

const images = ["/images/robo1.jpg", "/images/robo2.jpg"];
const durations = [3000, 370]; // 1枚目：3秒、2枚目：0.37秒（ミリ秒）

const Presentation = () => {
  const [index, setIndex] = useState(0);

  if (window.location.pathname === "/presentation") {
    setTimeout(() => {
      window.location.href = "/evaluation";
    }, 10 * 1000); //10秒で画面遷移
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, durations[index]);

    return () => clearTimeout(timer); // クリーンアップ
  }, [index]); // index が変わるたびに再実行

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

        <BackToMyPage />
        <ToEvaluation />
      </div>
    </Layout>
  );
};

export default Presentation;
