"use client";
import Image from "next/image";

import { useState, useEffect } from "react";

export default function Menu() {
  const [burgers, setBurgers] = useState([]);

  useEffect(() => {
    const fetchBurgers = async () => {
      const res = await fetch("/api/burgers");
      const data = await res.json();
      setBurgers(data);
    };

    fetchBurgers();
  }, []);

  return (
    <div className="flex h-full w-full bg-slate-200">
      <div className="container  mx-auto mb-20">
        <div className="flex flex-col items-center w-full">
          <h1 className="menu_title mt-2">MENÜ</h1>
          <div className="flex justify-between mt-5 gap-3">
            <button className="active_btn">Burgerler</button>
            <button className="menu_btn">Yan Lezzetler</button>
            <button className="menu_btn">İçecekler</button>
            <button className="menu_btn">Hepsi</button>
          </div>
          <div className=" p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-4">
            {burgers.map((burger, index) => (
              <div key={index} className="group relative">
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={burger.image}
                    alt={burger.name}
                    width={400}
                    height={160}
                    className="w-100 h-100 object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-center mt-4 text-lg font-semibold">
                  {burger.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
