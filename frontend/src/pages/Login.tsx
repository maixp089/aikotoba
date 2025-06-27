import { BackToHome, BackToMyPage, Layout } from "../components";
const Login = () => {
  return (
    <Layout>
      <div className="space-y-10">
        <BackToHome />
        <h1 className=" text-5xl text-center ">ログインページ</h1>
        <div className="relative mx-auto w-full max-w-xs">
          <label className="absolute bg-white px-1 text-sm block text-gray-800 bottom-7 left-2">
            なまえ
          </label>
          <div className="mt-1">
            <input
              type="text"
              placeholder="なまえを入力しましょう"
              className="border border-gray-300 focus:outline-blue-400 rounded w-full h-10 p-3 pt-5 text-sm"
            ></input>
          </div>
        </div>
        <a className="bg-red-600">ここのログイン方法について要相談</a>
        <BackToMyPage />
      </div>
    </Layout>
  );
};

export default Login;
