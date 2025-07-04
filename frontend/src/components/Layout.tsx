import React from "react";
import "../App.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      {children}
    </div>
  );
}
