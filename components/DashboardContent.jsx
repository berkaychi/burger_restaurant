"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function DashboardContent() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [category, setCategory] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      fetchProducts();
    }
  }, [session]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) {
        throw new Error("Ürün verileri alınamadı.");
      }
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const groupedProducts = products.reduce((groups, product) => {
    const category = product.category || "Diğer";
    if (!groups[category]) groups[category] = [];
    groups[category].push(product);
    return groups;
  }, {});

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Lütfen bir resim seçin.");
      return;
    }

    if (!category) {
      alert("Lütfen bir kategori seçin.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", imageFile);
    formData.append("category", category);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Ürün eklenirken bir hata oluştu.");
      }

      setName("");
      setImageFile(null);
      setCategory("");
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Ürün silinirken bir hata oluştu.");
      }

      fetchProducts();
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
        <h1 className="text-2xl font-bold">Ürün Yönetimi</h1>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-4 py-2"
        >
          Oturumu Kapat
        </button>
      </div>

      <form onSubmit={handleAddProduct} className="mb-8">
        <div className="flex flex-col mb-4">
          <label className="mb-2">Kategori</label>
          <select
            className="p-2 border"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Kategori Seçin</option>
            <option value="burger">Burger</option>
            <option value="side">Yan Lezzet</option>
            <option value="drink">İçecek</option>
          </select>
        </div>

        <div className="flex flex-col mb-4">
          <label className="mb-2">Ürün Adı</label>
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

      <h2 className="text-xl font-bold mb-4">Mevcut Ürünler</h2>
      {Object.keys(groupedProducts).map((category) => (
        <div key={category}>
          <h3 className="text-lg font-semibold mb-2 capitalize">{category}</h3>
          <ul>
            {groupedProducts[category].map((product) => (
              <li key={product._id} className="flex items-center mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 mr-4"
                  width={200}
                  height={200}
                />
                <span className="flex-1">{product.name}</span>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="bg-red-500 text-white px-4 py-2"
                >
                  Sil
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
