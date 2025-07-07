echo "---- よく使うコマンド メニュー ----"
echo "1)  docker compose up -d              # Dockerをバックグラウンド起動（コンテナ起動）"
echo "2)  docker compose down               # Dockerを停止＆片付け（コンテナ削除）"
echo "3)  docker compose restart            # Dockerを再起動（すべてのコンテナを再起動）"
echo "4)  docker compose logs -f backend    # backendのログをリアルタイムで見る"
echo "5)  git status                        # Gitの現在の状態を確認"
echo "6)  git commit -m 'コメント'           # 変更を記録（コミット）"
echo "------- branch(ブランチ)関連 -------"
echo "7)  git branch                        # ブランチ一覧を表示"
echo "8)  git checkout -b 新ブランチ名       # 新しいブランチを作って切り替え"
echo "9)  git checkout ブランチ名             # 既存ブランチに切り替え"
echo "10) git merge ブランチ名                # 他ブランチをマージ"
echo "11) git branch -d ブランチ名            # ブランチを削除"
echo "12) git log --oneline --graph          # 履歴を分かりやすく表示"
echo "13) git fetch                          # リモートの最新情報だけ取得"
echo "14) git pull origin develop            # developの内容を今のブランチに取り込む（マージ）"
echo "15) git rebase origin/develop          # developの内容を今のブランチに取り込む（履歴をきれいに並べる）"
echo "0)  終了"
echo "-------------------------------"

read -p "実行したい番号を入力してね: " num

case "$num" in
  1)
    docker compose up -d
    ;;
  2)
    docker compose down
    ;;
  3)
    docker compose restart
    ;;
  4)
    docker compose logs -f backend
    ;;
  5)
    git push
    ;;
  6)
    read -p "コミットメッセージを入力してね: " msg
    git add .
    git commit -m "$msg"
    ;;
  7)
    git branch
    ;;
  8)
    read -p "新しく作りたいブランチ名を入力してね: " bname
    git checkout -b "$bname"
    ;;
  9)
    read -p "切り替えたいブランチ名を入力してね: " bname
    git checkout "$bname"
    ;;
  10)
    read -p "マージしたい（取り込みたい）ブランチ名を入力してね: " bname
    git merge "$bname"
    ;;
  11)
    read -p "削除したいブランチ名を入力してね: " bname
    git branch -d "$bname"
    ;;
  12)
    git log --oneline --graph --all
    ;;
  13)
    git fetch
    echo "リモートの最新情報を取得しました！（マージや更新はしていません）"
    ;;
  14)
    echo "★今のブランチにorigin/developの内容をマージします"
    git pull origin develop
    ;;
  15)
    echo "★今のブランチにorigin/developをrebaseします（履歴がきれいに並びます）"
    git fetch
    git rebase origin/develop
    ;;
  16)
    echo "3001ポートでRails-localサーバーを立ち上げます "
    rails s -p 3001 
    ;;
  0)
    echo "またね！"
    exit 0
    ;;
  *)
    echo "無効な番号だよ！"
    ;;
esac