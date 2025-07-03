// frontend/src/pages/AudioRecorderTest.tsx（ダミーテスト用のページ）

import React, { useState, useRef } from 'react';

const AudioRecorder: React.FC = () => {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    chunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (e) => {
      chunksRef.current.push(e.data);
    };

    mediaRecorderRef.current.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
      const formData = new FormData();
      formData.append('file', blob, 'recording.webm');

      try {
        // 変更点：統合エンドポイントを呼ぶ
        const res = await fetch('http://localhost:8000/api/audio-feedback', {
          method: 'POST',
          body: formData,
        });
        if (!res.ok) throw new Error('送信失敗');
        const data = await res.json();

        // 結果を分けてセット
        setTranscript(data.transcript);
        setFeedback(data.feedback);

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

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <div>
      <button onClick={recording ? stopRecording : startRecording}>
        {recording ? '録音停止' : '録音開始'}
      </button>

      {transcript && (
        <div>
          <h3>文字起こし結果:</h3>
          <pre>{transcript}</pre>
        </div>
      )}

      {feedback && (
        <div>
          <h3>フィードバック結果:</h3>
          <pre>{JSON.stringify(feedback, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
