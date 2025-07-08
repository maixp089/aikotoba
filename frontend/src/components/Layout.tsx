export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw", // 横幅いっぱい（必須ではないが推奨）
        display: "flex",
        justifyContent: "center",   // ★これで「上下」も中央に
        alignItems: "center",       // ★これで「左右」中央
      }}
    >
      {children}
    </div>
  );
}
