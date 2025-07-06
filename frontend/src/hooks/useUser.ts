import { useEffect, useState } from "react";

// ユーザー型（必要なフィールドだけ書き換えてOK）
type User = {
  id: string;           // UUID
  name: string;
  age?: number;
  icon_image?: string;
  // 必要なら追加
};

export function useUser(userId: string | undefined) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    // エンドポイント/users/{user_id}（userIdはuuid文字列）
    fetch(`/users/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("ユーザーが見つかりません");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [userId]);

  return { user, loading, error };
}
