import { Layout } from "../components";

const Scoring = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <h1 className="text-3xl font-bold">まるつけちゅう...</h1>

        <div className="animate-spin rounded-full h-50 w-50 border-b-4 border-red-500"></div>
      </div>
    </Layout>
  );
};

export default Scoring;
