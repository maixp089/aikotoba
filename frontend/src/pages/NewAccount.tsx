import { BackToHome, Layout } from "../components";
import { useNavigate } from "react-router-dom";
const NewAccount = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/login");
  };
  return (
    <Layout>
      <div className="">
        <BackToHome />
        <div className="space-y-10">
          <h1 className=" text-5xl text-center "> 新規登録ページ</h1>
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
          <div className="relative mx-auto w-full max-w-xs">
            <label className="absolute bg-white px-1 text-sm block text-gray-800 bottom-7 left-2">
              学年
            </label>
            <div className="mt-1">
              <input
                type="Number"
                placeholder="数字だけ入力しましょう    例：４"
                className="border border-gray-300 focus:outline-blue-400 rounded w-full h-10 p-3 pt-5 text-sm"
              ></input>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xs">
            <label className="absolute bg-white px-1 text-sm block text-gray-800 bottom-7 left-2">
              画像登録
            </label>
            <div className="mt-1">
              <input
                type="text"
                placeholder="アイコン画像登録"
                className="border border-gray-300 focus:outline-blue-400 rounded w-full h-10 p-3 pt-5 text-sm"
              ></input>
            </div>
          </div>
          <button
            className="p-2 rounded bg-green-500 hover:bg-green-600 text-white border-gray-700 mx-1"
            onClick={onClick}
          >
            登録する このボタン押したらログインページ飛ぶ
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default NewAccount;
