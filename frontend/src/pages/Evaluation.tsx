import { BackToMyPage, ToRecord, Layout, Card } from "../components";
import { useParams, useLocation } from "react-router-dom";
import BackgroundWrapper from "../components/Background";

const Evaluation = () => {
  const { userId } = useParams();
  const location = useLocation();
  const feedback = location.state?.feedback;

  if (!feedback) {
    return (
      <BackgroundWrapper>
        <Layout>
          <div className="p-6 text-center text-red-500">
            フィードバック情報がありません。
          </div>
        </Layout>
      </BackgroundWrapper>
    );
  }

  const footerBar = <BackToMyPage userId={userId!} />;

  return (
    <BackgroundWrapper>
      <Layout>
        <Card
          title={
            <span
              style={{
                fontFamily: "'M PLUS Rounded 1c', 'Kosugi Maru', sans-serif",
                fontWeight: 900,
                fontSize: "1.6rem",
                color: "#fff",
                letterSpacing: "0.08em",
                textShadow: "0 3px 8px #37a98d99, 0 2px 0 #fff, 0 6px 12px #72d2b4cc",
                borderRadius: "22px",
                background: "#43ba9d",
                padding: "10px 38px",
                boxShadow: "0 5px 14px #3dcebb44",
                display: "inline-block",
              }}
            >
              けっかはっぴょう
            </span>
          }
          bottomBar={footerBar}
        >
          <div className="flex flex-col items-center py-10">
            <h1 className="text-3xl font-semibold"
              style={{
                fontFamily: "'M PLUS Rounded 1c', 'Kosugi Maru', sans-serif",
                marginBottom: "14px"
              }}
            >
              今のおはなし…
            </h1>
            {/* 得点 */}
            <div className="flex items-center mb-4">
              <div className="text-9xl font-bold text-orange-600"
                style={{
                  fontFamily: "'Kosugi Maru', 'M PLUS Rounded 1c', sans-serif",
                  textShadow: "0 3px 12px #ffb99277"
                }}
              >
                {feedback.total_score}
              </div>
              <p className="text-5xl">点</p>
            </div>
            {/* アドバイス枠 */}
            <div className="space-y-4 px-6 pt-7 w-full max-w-xs">
              <div
                style={{
                  backgroundColor: "#f8d7da",
                  padding: "10px 12px",
                  borderRadius: "14px",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontWeight: "700",
                    fontSize: "1.2rem",
                    color: "#b45062",
                    marginBottom: "7px",
                    fontFamily: "'M PLUS Rounded 1c', 'Kosugi Maru', sans-serif",
                  }}
                >
                  はなまる💮！
                </p>
                <p
                  style={{
                    fontWeight: "normal",
                    fontSize: "0.98rem",
                    color: "#721c24",
                    margin: 0,
                  }}
                >
                  {feedback.well_done}
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "#d1ecf1",
                  padding: "10px 12px",
                  borderRadius: "14px",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontWeight: "700",
                    fontSize: "1.2rem",
                    color: "#227991",
                    marginBottom: "7px",
                    fontFamily: "'M PLUS Rounded 1c', 'Kosugi Maru', sans-serif",
                  }}
                >
                  もっとチャレンジ！
                </p>
                <p
                  style={{
                    fontWeight: "normal",
                    fontSize: "0.98rem",
                    color: "#0c5460",
                    margin: 0,
                  }}
                >
                  {feedback.next_challenge}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-3 mb-1">
            <ToRecord userId={userId!} />
            <BackToMyPage userId={userId!} />
          </div>
        </Card>
      </Layout>
    </BackgroundWrapper>
  );
};

export default Evaluation;
