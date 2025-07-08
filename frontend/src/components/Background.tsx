import React from "react";
import backgroundImage from "../assets/images/back2.png";

type Props = {
  children: React.ReactNode;
};

const BackgroundWrapper = ({ children }: Props) => {
  return (
    <div style={{ position: "relative", zIndex: 0 }}>
      {/* 背景画像を最背面に */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
          zIndex: -1, // ← 背面に配置！
          opacity: 0.5
        }}
      />
      {/* 子要素（カードなど） */}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
};

export default BackgroundWrapper;
