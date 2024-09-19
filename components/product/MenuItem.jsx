import React from "react";
import Image from "next/image";
const MenuItem = () => {
  return (
    <div className="bg-secondary text-white">
      <div className="w-full bg-gray-300 grid place-content-center h-52">
        <div className="relative w-40 h-36">
          <Image src="/assets/images/unnamed.jpg" alt="" layout="fill" />
        </div>
      </div>

      <div>
        <h4>Delicious Pizza</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          aliquid atque quod sed aliquam maiores quidem!
        </p>
        <div className="flex justify-between p-6">
          <span>20$</span>
          <button className="black_btn"></button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
