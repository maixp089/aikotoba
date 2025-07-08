// components/BackIconButton.tsx

import React from "react";

type Props = {
  onClick: () => void;
  iconSrc?: string;
  alt?: string;
  label?: string; // ラベルも表示したい場合
  size?: number; // アイコンサイズ
  style?: React.CSSProperties;
};

const BackIconButton = ({
  onClick,
  iconSrc = "/icons/back.png",
  alt = "もどる",
  label,
  size = 64,
  style = {},
}: Props) => (
  <button
    onClick={onClick}
    style={{
      background: "none",
      border: "none",
      outline: "none",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      minWidth: 44,
      padding: 0,
      ...style,
    }}
    aria-label={alt}
  >
    <img
      src={iconSrc}
      alt={alt}
      style={{ width: size, height: size, marginBottom: 2 }}
    />
    {label && (
      <span
        style={{
          fontSize: "0.9rem",
          color: "#47704c",
          fontWeight: 500,
          marginTop: 2,
        }}
      >
        {label}
      </span>
    )}
  </button>
);

export default BackIconButton;
