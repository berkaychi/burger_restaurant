"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddAdmin() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/admin/addAdminUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage(data.message);
      router.push("/admin/login");
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div>
      <h1>Admin Kullanıcısı Ekle</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Kullanıcı Adı:
            <input name="username" type="text" required />
          </label>
        </div>
        <div>
          <label>
            Şifre:
            <input name="password" type="password" required />
          </label>
        </div>
        <button type="submit">Ekle</button>
      </form>
    </div>
  );
}
