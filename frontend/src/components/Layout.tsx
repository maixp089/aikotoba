// src/components/Layout.tsx
import React from "react";
import "../App.css"; // または index.css

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="page-center">{children}</div>;
}
