"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function DashboardContent() {
  const [burgers, setBurgers] = useState([]);
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      fetchBurgers();
    }
  }, [session]);

  const fetchBurgers = async () => {
    try {
      const res = await fetch("/api/burgers");
      if (!res.ok) {
        throw new Error("Burger verileri alınamadı.");
      }
      const data = await res.json();
      setBurgers(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleAddBurger = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Lütfen bir resim seçin.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", imageFile);

    try {
      const res = await fetch("/api/burgers", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Burger eklenirken bir hata oluştu.");
      }

      setName("");
      setImageFile(null);
      fetchBurgers();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleDeleteBurger = async (id) => {
    try {
      const res = await fetch(`/api/burgers/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Burger silinirken bir hata oluştu.");
      }

      fetchBurgers();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  if (!session) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Admin Girişi Gerekli</h1>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Burger Yönetimi</h1>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-4 py-2"
        >
          Oturumu Kapat
        </button>
      </div>

      <form onSubmit={handleAddBurger} className="mb-8">
        <div className="flex flex-col mb-4">
          <label className="mb-2">Burger Adı</label>
          <input
            type="text"
            className="p-2 border"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col mb-4">
          <label className="mb-2">Resim Seç</label>
          <input
            type="file"
            className="p-2 border"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Ekle
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Mevcut Burgerler</h2>
      <ul>
        {burgers.map((burger) => (
          <li key={burger._id} className="flex items-center mb-4">
            <Image
              src={burger.image}
              alt={burger.name}
              className="w-16 h-16 mr-4"
              width={200}
              height={200}
            />
            <span className="flex-1">{burger.name}</span>
            <button
              onClick={() => handleDeleteBurger(burger._id)}
              className="bg-red-500 text-white px-4 py-2"
            >
              Sil
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
