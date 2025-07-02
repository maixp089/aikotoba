import { BackToMyPage, ToEvaluation, Layout } from "../components";
import "../App.css";
import { useState, useEffect } from "react";

const images = ["/images/robo1.png", "/images/robo2.png"];

const Presentation = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);
  return (
    <Layout>
      <div className="space-y-10">
        <BackToMyPage />
        <h1 className=" text-5xl text-center ">プレゼンページ</h1>
        <div className="relative w-full max-w-3xl mx-auto h-96 overflow-hidden rounded-xl shadow-lg">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              className={`absolute top-0 left-0 w-full object-cover transition-opacity duration-1000 ${
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
