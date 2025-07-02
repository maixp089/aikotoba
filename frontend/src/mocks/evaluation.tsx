export type ScoreAdvice = {
  id: string;
  date: string; // "YYYY-MM-DD"
  time: string; // "HH:mm"
  score: number;
  advice: string;
};

export const mockScoreAdviceData: ScoreAdvice[] = [
  {
    id: "adv-001",
    date: "2025-06-30",
    time: "09:15",
    score: 85,
    advice:
      "テンポよく相手に質問ができていました。次は相手の感情に寄り添う返答も意識してみましょう。",
  },
  {
    id: "adv-002",
    date: "2025-06-29",
    time: "14:30",
    score: 73,
    advice:
      "沈黙が多く見られましたが、聞き返しが丁寧で良かったです。もう少し声に抑揚をつけると印象アップ！",
  },
  {
    id: "adv-003",
    date: "2025-06-28",
    time: "10:05",
    score: 92,
    advice:
      "素晴らしい対応力です。自然な相づちやアイコンタクトがさらに会話を豊かにします。",
  },
  {
    id: "adv-004",
    date: "2025-06-27",
    time: "16:45",
    score: 66,
    advice:
      "話し方に一貫性が欠けていました。事前にポイントを整理しておくとスムーズに話せます。",
  },
  {
    id: "adv-005",
    date: "2025-06-26",
    time: "11:20",
    score: 78,
    advice:
      "相手の話に対する反応が自然でした。改善点として、話の締め方を意識するとより良いです。",
  },
];
