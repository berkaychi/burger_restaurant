import React from "react";
import MenuItem from "@/components/product/MenuItem";
const Menu = () => {
  return (
    <div className="container mx-auto mb-16">
      <div className="flex flex-col items-center  mt-12 w-full">
        <h1 className="title">Menü</h1>
        <div className="flex justify-between mt-12">
          <button className="black_btn">Hepsi</button>
          <button className="black_btn">Burger</button>
          <button className="black_btn">Yan Lezzetler</button>
          <button className="black_btn">İçecekler</button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-5">
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </div>
    </div>
  );
};

export default Menu;
