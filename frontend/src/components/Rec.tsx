// // 1番目のコード
// import React from "react";
// import recGif from "../assets/rec.gif"; // gifをsrc/assetsに置いた想定
// import "./Rec.css"; // CSSはコンポーネント専用ファイルで管理

// const Rec: React.FC = () => {
//   return (
//     <button
//       disabled
//       className="rec-button"
//       aria-label="録音中"
//       type="button"
//     >
//       <img src={recGif} alt="録音中" className="blinking" />
//     </button>
//   );
// };

// export default Rec;

// // ２番目のコード
import React from "react";
import recGif from "../assets/images/rec.png";

const Rec: React.FC = () => {
  return (
    <>
      <style>
        {`
          @keyframes blink {
            0%, 50%, 100% { opacity: 1; }
            25%, 75% { opacity: 0; }
          }
          .blinking {
            animation: blink 5s infinite;
          }
          .rec-button {
            background: none;
            border: none;
            padding: 0;
            cursor: not-allowed;
            margin-top: 1rem;
          }
        `}
      </style>

      <button disabled className="rec-button" aria-label="録音中" type="button">
        <img
          src={recGif}
          alt="録音中"
          className="blinking"
          style={{ width: 30 }} // ← ここを120から80に縮小
        />
      </button>
    </>
  );
};

export default Rec;

