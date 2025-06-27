// src/components/Layout.tsx
// 中央ぞろえのコンポーネント
import React from "react";
import "../App.css"; // または index.css

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="page-center">{children}</div>;
}
