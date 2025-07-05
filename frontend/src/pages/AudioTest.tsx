// frontend/src/pages/AudioTest.tsx（ダミーテスト用のページ）
import React from 'react';
import AudioRecorder from '../components/AudioRecorderTest';

const AudioTest: React.FC = () => {
  return (
    <div>
      <h1>音声録音＆送信テスト</h1>
      <AudioRecorder />
    </div>
  );
};

export default AudioTest;
