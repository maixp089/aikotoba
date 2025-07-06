// frontend/src/App.tsxルーティング、画面構成

import { Routes, Route } from "react-router-dom";
import {
  Home,
  Evaluation,
  Login,
  NewAccount,
  Presentation,
  MyPage,
  Record,
  EvaluationDetail,
  Scoring,
} from "./pages";
import AudioRecorderTest from "./components/AudioRecorderTest";  // 追加

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new-account" element={<NewAccount />} />
      <Route path="/login" element={<Login />} />
            <Route path="/mypage/:user_id" element={<MyPage />} />
      <Route path="/presentation" element={<Presentation />} />
      <Route path="/evaluation" element={<Evaluation />} />
      <Route path="/record" element={<Record />} />
      <Route path="/audio-test" element={<AudioRecorderTest />} /> {/* 追加 */}
      <Route path="/scoring" element={<Scoring />} />
      <Route path="/evaluation/:datetime" element={<EvaluationDetail />} />
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
