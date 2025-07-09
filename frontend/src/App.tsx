import { Routes, Route } from "react-router-dom";
import {
  Home,
  Evaluation,
  Login,
  NewAccount,
  Presentation,
  PresentationSetting,
  MyPage,
  Record,
  EvaluationDetail,
  Scoring,
} from "./pages";
import AudioRecorderTest from "./components/AudioRecorderTest"; // 追加

function App() {
  return (
    <Routes>
      {/* ホーム */}
      <Route path="/" element={<Home />} />
      {/* 新規登録・ログイン */}
      <Route path="/new-account" element={<NewAccount />} />
      <Route path="/login" element={<Login />} />
      {/* ユーザーのマイページ */}
      <Route path="/users/:userId/mypage" element={<MyPage />} />
      {/* テーマと時間選択画面（ユーザー紐づけルート） */}
      <Route path="/users/:userId/presentationSetting" element={<PresentationSetting />} />
      {/* 発表・評価・記録画面（ユーザー紐付けルート例） */}
      <Route path="/users/:userId/presentation" element={<Presentation />} />
      <Route path="/users/:userId/record" element={<Record />} />
      <Route path="/users/:userId/scoring" element={<Scoring />} />
      <Route path="/users/:userId/evaluation" element={<Evaluation />} />
      {/* 評価詳細（発表IDや日付で絞る場合） */}
      <Route path="/users/:userId/evaluation/:feedback_id" element={<EvaluationDetail />} />
      {/* 音声テスト用 */}
      <Route path="/audio-test" element={<AudioRecorderTest />} />
    </Routes>
  );
}

export default App;

// // frontend/src/main.tsx修正前のコード
// // ルーティング、画面構成

// import { Routes, Route } from "react-router-dom";
// import {
//   Home,
//   Evaluation,
//   Login,
//   NewAccount,
//   Presentation,
//   Ranking,
//   MyPage,
//   Record,
// } from "./pages";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/newaccount" element={<NewAccount />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/mypage" element={<MyPage />} />
//       <Route path="/presentation" element={<Presentation />} />
//       <Route path="/evaluation" element={<Evaluation />} />
//       <Route path="/ranking" element={<Ranking />} />
//       <Route path="/record" element={<Record />} />
//     </Routes>
//   );
// }

// export default App;
