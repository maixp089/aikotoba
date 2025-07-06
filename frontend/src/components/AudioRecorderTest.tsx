// frontend/src/pages/AudioRecorderTest.tsx（ダミーテスト用のページ）

import React, { useState, useRef } from 'react';

const AudioRecorder: React.FC = () => {
  // 録音中かどうかを管理
  const [recording, setRecording] = useState(false);

  // 文字起こし結果
  const [transcript, setTranscript] = useState<string | null>(null);

  // フィードバック（スコア・コメントのみ）
  const [feedback, setFeedback] = useState<{
    total_score: number;
    well_done: string;
    next_challenge: string;
  } | null>(null);

  // MediaRecorderのインスタンスを保持
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  // 録音データ（Blobの配列）
  const chunksRef = useRef<Blob[]>([]);

  // 録音開始
  const startRecording = async () => {
    // マイク音声取得
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    chunksRef.current = [];

    // 録音データを貯める
    mediaRecorderRef.current.ondataavailable = (e) => {
      chunksRef.current.push(e.data);
    };

    // 録音停止時にAPI送信
    mediaRecorderRef.current.onstop = async () => {
      // Blob生成
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
      const formData = new FormData();
      formData.append('file', blob, 'recording.webm');

      try {
        // API送信
        const res = await fetch('http://localhost:8000/api/audio-feedback', {
          method: 'POST',
          body: formData,
        });
        if (!res.ok) throw new Error('送信失敗');

        // JSON取得
        const data = await res.json();

        // デバッグ用
        console.log('APIレスポンス', data);

        // 文字起こしをセット
        setTranscript(data.transcript);

        // フィードバック（必要な3つのみ）をセット
        setFeedback({
          total_score: data.total_score,
          well_done: data.well_done,
          next_challenge: data.next_challenge,
        });
      } catch (error) {
        if (error instanceof Error) {
          setTranscript(null);
          setFeedback(null);
          alert('エラー: ' + error.message);
        } else {
          alert('エラー: ' + String(error));
        }
      }
    };

    // 録音開始
    mediaRecorderRef.current.start();
    setRecording(true);
  };

  // 録音停止
  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <div>
      {/* 録音ボタン */}
      <button onClick={recording ? stopRecording : startRecording}>
        {recording ? '録音停止' : '録音開始'}
      </button>

      {/* 文字起こし結果表示 */}
      {transcript && (
        <div>
          <h3>文字起こし結果:</h3>
          <pre>{transcript}</pre>
        </div>
      )}

      {/* フィードバック表示 */}
      {feedback && (
        <div>
          <h3>フィードバック結果:</h3>
          <p><strong>総合スコア:</strong> {feedback.total_score}</p>
          <p><strong>はなまる:</strong> {feedback.well_done}</p>
          <p><strong>もっとチャレンジ:</strong> {feedback.next_challenge}</p>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
