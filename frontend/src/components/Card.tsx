import React from "react";

type Props = {
  children: React.ReactNode;
  title?: React.ReactNode; //エラー解決のため追加★
  bottomBar?: React.ReactNode;
  style?: React.CSSProperties;
};

const CARD_BAR_COLOR = "#4bb3a7";

const Card = ({ children, title, bottomBar, style }: Props) => (
  <div
    style={{
      background: "#fff8e7",
      borderRadius: 24,
      boxShadow: "0 6px 28px #b7d7bb66, 0 1.5px 0 #fffbe9 inset",
      width: 320,
      height: 520,
      textAlign: "center",
      position: "relative",
      border: "3px solid #b7d7bb",
      boxSizing: "border-box",
      margin: "0 auto",
      padding: 0,
      display: "flex",
      flexDirection: "column",
      ...style,
    }}
  >
    {/* 上部バー（ヘッダー） */}
    {title && (
      <div
        style={{
          background: CARD_BAR_COLOR,
          color: "#fff",
          fontWeight: "bold",
          fontSize: "1.7rem",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          padding: "24px 0 18px 0",
          letterSpacing: "0.08em",
          width: "100%",
          minHeight: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "0 0 auto",
        }}
      >
         {title ? title : ""}   {/* titleがあれば表示、なければ空追加★ */}

      </div>
    )}
    {/* メイン（中央だけスクロール領域！） */}
    <div
      style={{
        flex: "1 1 0",
        // overflowY: "auto",
        minHeight: 0, // ←スクロールバグ防止(Safari対応)
        padding: "30px 18px 24px 18px",
      }}
    >
      {children}
    </div>
    {/* 下部バー（フッター） */}
    {bottomBar && (
      <div
        style={{
          background: CARD_BAR_COLOR,
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          minHeight: 80,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 24,
          padding: "0 18px",
          flex: "0 0 auto",
        }}
      >
        {bottomBar}
      </div>
    )}
  </div>
);

export default Card;
