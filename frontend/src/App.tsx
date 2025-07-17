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
import AudioRecorderTest from "./components/AudioRecorderTest";
import Pay from "./pages/Pay"; // ★pay決済ページ
import Success from "./pages/Success"; // ★決済成功
import Cancel from "./pages/Cancel"; // ★決済キャンセル

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
      {/* テーマと時間選択画面 */}
      <Route path="/users/:userId/presentationSetting" element={<PresentationSetting />} />
      {/* 発表・評価・記録画面 */}
      <Route path="/users/:userId/presentation" element={<Presentation />} />
      <Route path="/users/:userId/record" element={<Record />} />
      <Route path="/users/:userId/scoring" element={<Scoring />} />
      <Route path="/users/:userId/evaluation" element={<Evaluation />} />
      {/* 評価詳細 */}
      <Route path="/users/:userId/evaluation/:feedback_id" element={<EvaluationDetail />} />
      {/* 音声テスト用 */}
      <Route path="/audio-test" element={<AudioRecorderTest />} />
      {/* Pay決済ページ */}
      <Route path="/users/:userId/pay" element={<Pay />} />
      {/* Pay決済完了ページ */}
      <Route path="/success" element={<Success />} /> 
      {/* Pay決済キャンセルページ */}
       <Route path="/cancel" element={<Cancel />} /> 
    </Routes>
  );
}

export default App;
