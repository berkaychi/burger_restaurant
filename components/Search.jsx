"use client";

import React, { useState, useEffect } from "react";
import { MdOutlineCancel } from "react-icons/md";
import Image from "next/image";
import OutsideClickHandler from "react-outside-click-handler";

const Search = ({ setIsSearchClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`)
          .then((res) => res.json())
          .then((data) => {
            setResults(data);
          })
          .catch((error) => {
            console.error("Arama hatası:", error);
          });
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen
     after:bg-white after:absolute after:top-0 after:left-0 after:opacity-60 grid place-content-center"
    >
      <OutsideClickHandler onOutsideClick={() => setIsSearchClick(false)}>
        <div className="relative z-50 w-[600px] bg-secondary border-2 p-5 rounded-lg">
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setIsSearchClick(false)}
          >
            <MdOutlineCancel size={24} />
          </button>
          <h1 className="text-center text-2xl font-bold mb-4 text-white">
            Arama
          </h1>
          <input
            type="text"
            placeholder="Ürün adı girin"
            className="border w-full bg-secondary border-primary rounded-full text-center text-white py-2 px-4 mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="max-h-64 overflow-y-auto">
            {results.map((product) => (
              <div
                key={product._id}
                className="flex items-center mb-2 p-2 hover:bg-gray-700 rounded"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 mr-4 object-cover"
                />
                <span className="text-white">{product.name}</span>
              </div>
            ))}
            {searchTerm.trim() !== "" && results.length === 0 && (
              <p className="text-white text-center">Sonuç bulunamadı.</p>
            )}
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default Search;
