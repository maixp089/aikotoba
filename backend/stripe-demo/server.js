// .envから環境変数を読み込む
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // .envのキーを使う

const app = express();

// CORS設定：フロントからのリクエストを許可
app.use(cors({
  origin: 'http://localhost:5173', // Vite/ReactのURL
  credentials: true,               // fetchのcredentials: "include"対応
}));

app.use(express.json());

// 決済セッションを作成するAPI
app.post('/create-checkout-session', async (req, res) => {
  try {
    // フロントから送られてきたuserIdを受け取る
    const { userId } = req.body;

    // Stripe決済セッション作成
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'jpy',
            product_data: { name: 'テスト商品' }, // 商品名
            unit_amount: 800, // 例: 800円
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // 成功時: userIdをクエリでsuccessページに渡す
      success_url: `http://localhost:5173/success?userId=${userId}`,
      cancel_url: 'http://localhost:5173/cancel',
    });

    // セッションIDをフロントに返す
    res.json({ id: session.id });
  } catch (err) {
    console.error('Stripeセッション作成エラー:', err);
    res.status(500).json({ error: '決済セッション作成に失敗しました' });
  }
});

// サーバー起動
app.listen(4242, () => console.log('サーバー起動 4242'));
