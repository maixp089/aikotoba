import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Layout,
  BackToMyPage,
  ToRecord,
  Card,
} from "../components";

// 型定義（APIのレスポンスに合わせる！）
type Feedback = {
  id: number;
  user_id: string;
  presentation_id: number;
  total_score: number;
  well_done: string;
  next_challenge: string;
  created_at: string; // ISO文字列
};

const EvaluationDetail = () => {
  // パラメータでfeedback_idを取得（ルーティング例：/evaluation/:feedback_id）
  const { feedback_id } = useParams<{ feedback_id: string }>();
  const { userId } = useParams();
  // データ取得用state
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // データ取得処理
  useEffect(() => {
    if (!feedback_id) return;
    setLoading(true);
    setError(null);
    fetch(`/api/audio-feedback/${feedback_id}`)
      .then((res) => {
        if (!res.ok) throw new Error("記録が見つかりませんでした");
        return res.json();
      })
      .then((data: Feedback) => setFeedback(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [feedback_id]);

  if (loading) {
    return (
      <Layout>
        <div className="p-6 text-center">読み込み中...</div>
      </Layout>
    );
  }
  if (error) {
    return (
      <Layout>
        <div className="p-6 text-center text-red-500">{error}</div>
      </Layout>
    );
  }
  if (!feedback) {
    return (
      <Layout>
        <div className="p-6 text-center text-red-500">データなし</div>
      </Layout>
    );
  }

  // 日時表示をちょっと加工
  const date = new Date(feedback.created_at);
  const displayDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${
    date.getHours()
  }時${date.getMinutes()}分`;

  return (
    <Layout>
      <Card>
        <div className="flex flex-col items-center space-y-5 py-10">
          <h1 className="text-2xl font-semibold">{displayDate} の点数は</h1>
          <div className="flex items-center gap-2">
            <div className="text-8xl font-bold text-orange-600">
              {feedback.total_score}
            </div>
            <p className="text-5xl">点</p>
          </div>
          <p className="text-3xl">でした</p>
          <div className="space-y-4 justify-center gap-15 px-6">
            {/* 良かったポイント */}
            <div>
              <div className="font-bold text-lg mb-1">よかったところ</div>
              <div>{feedback.well_done}</div>
            </div>
            {/* 次回のチャレンジ */}
            <div>
              <div className="font-bold text-lg mb-1">次回のチャレンジ</div>
              <div>{feedback.next_challenge}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-15">
          <ToRecord userId={userId!} />
          <BackToMyPage userId={userId!} />
        </div>
      </Card>
    </Layout>
  );
};

export default EvaluationDetail;
