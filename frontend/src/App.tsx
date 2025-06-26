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
} from "./pages/indexPages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/newaccount" element={<NewAccount />} />
      <Route path="/login" element={<Login />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/presentation" element={<Presentation />} />
      <Route path="/evaluation" element={<Evaluation />} />
      <Route path="/ranking" element={<Ranking />} />
    </Routes>
  );
}

export default App;
