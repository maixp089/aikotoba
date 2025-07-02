// ルーティング、画面構成

import { Routes, Route } from "react-router-dom";
import {
  Home,
  Evaluation,
  Login,
  NewAccount,
  Presentation,
  Ranking,
  MyPage,
  Record,
} from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/newaccount" element={<NewAccount />} />
      <Route path="/login" element={<Login />} />
            <Route path="/mypage/:user_id" element={<MyPage />} />
      <Route path="/presentation" element={<Presentation />} />
      <Route path="/evaluation" element={<Evaluation />} />
      <Route path="/ranking" element={<Ranking />} />
      <Route path="/record" element={<Record />} />
    </Routes>
  );
}

export default App;
