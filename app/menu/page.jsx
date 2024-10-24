"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Menu() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Hepsi");

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      if (!res.ok) {
        throw new Error("Ürünler alınamadı.");
      }
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts =
    selectedCategory === "Hepsi"
      ? products
      : products.filter((product) => {
          if (selectedCategory === "Burgerler")
            return product.category === "burger";
          if (selectedCategory === "Yan Lezzetler")
            return product.category === "side";
          if (selectedCategory === "İçecekler")
            return product.category === "drink";
        });

  return (
    <div className="flex h-full w-full bg-slate-200">
      <div className="container mx-auto mb-20">
        <div className="flex flex-col items-center w-full">
          <h1 className="menu_title mt-2">MENÜ</h1>
          <div className="flex justify-between mt-5 gap-3">
            <button
              className={`menu_btn ${
                selectedCategory === "Burgerler" ? "active_btn" : ""
              }`}
              onClick={() => handleCategoryChange("Burgerler")}
            >
              Burgerler
            </button>
            <button
              className={`menu_btn ${
                selectedCategory === "Yan Lezzetler" ? "active_btn" : ""
              }`}
              onClick={() => handleCategoryChange("Yan Lezzetler")}
            >
              Yan Lezzetler
            </button>
            <button
              className={`menu_btn ${
                selectedCategory === "İçecekler" ? "active_btn" : ""
              }`}
              onClick={() => handleCategoryChange("İçecekler")}
            >
              İçecekler
            </button>
            <button
              className={`menu_btn ${
                selectedCategory === "Hepsi" ? "active_btn" : ""
              }`}
              onClick={() => handleCategoryChange("Hepsi")}
            >
              Hepsi
            </button>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-4">
            {filteredProducts.map((product, index) => (
              <div key={index} className="group relative">
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={160}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-center mt-4 text-lg font-semibold">
                  {product.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
