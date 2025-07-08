import { ToRecord, Layout, Card } from "../components";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import BackIconButton from "../components/IconButton";
import BackgroundWrapper from "../components/Background"; // ★追加

const Evaluation = () => {
  const { userId } = useParams();
  const location = useLocation();
  const feedback = location.state?.feedback;
  const navigate = useNavigate();

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

  const footerBar = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        padding: "0 18px",
        background: "#4bb3a7",
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        minHeight: 80,
      }}
    >
      <BackIconButton
        onClick={() => navigate(-1)}
        iconSrc="/icons/back.png"
        alt="もどる"
        size={64}
      />
    </div>
  );

  return (
    <BackgroundWrapper>
      <Layout>
        <Card title="けっかはっぴょう" bottomBar={footerBar}>
          <div className="flex flex-col items-center py-10">
            <h1 className="text-3xl font-semibold">今のおはなし…</h1>
            {/* 得点 */}
            <div className="flex items-center">
              <div className="text-9xl font-bold text-orange-600">
                {feedback.total_score}
              </div>
              <p className="text-5xl"> 点</p>
            </div>
            {/* アドバイス枠 */}
            <div className="space-y-4 px-6 pt-10 justify-center gap-15">
              <div
                style={{
                  backgroundColor: "#f8d7da",
                  padding: "10px",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontWeight: "700",
                    fontSize: "1.6rem",
                    color: "#721c24",
                    marginBottom: "8px",
                  }}
                >
                  はなまる💮！
                </p>
                <p
                  style={{
                    fontWeight: "normal",
                    fontSize: "1rem",
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
                  padding: "10px",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontWeight: "700",
                    fontSize: "1.6rem",
                    color: "#0c5460",
                    marginBottom: "8px",
                  }}
                >
                  もっとチャレンジ！
                </p>
                <p
                  style={{
                    fontWeight: "normal",
                    fontSize: "1rem",
                    color: "#0c5460",
                    margin: 0,
                  }}
                >
                  {feedback.next_challenge}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 py-5">
            <ToRecord userId={userId!} />
          </div>
        </Card>
      </Layout>
    </BackgroundWrapper>
  );
};

export default Evaluation;
