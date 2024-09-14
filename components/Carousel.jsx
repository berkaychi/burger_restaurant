import React from "react";
import Image from "next/image";

const Carousel = () => {
  return (
    <div className="relative sm:h-[calc(100vh-88px)] w-full h-[50vh]">
      <Image
        src="/assets/images/deneme3.jpeg"
        alt="Carousel Image"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        priority
      />

      <div className="relative container  md:max-w-3xl md:mx-20 max-w-80 mx-5 top-40">
        <h1 className="title">Fast Food Restaurant</h1>
        <p className="text-white lg:text-2xl sm:text-xl black-text-shadow">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis earum
          vero repellendus, fugiat ab quod, facilis nesciunt sint libero
          accusantium nihil unde dolorem eum debitis sapiente nostrum! Fugiat,
          quae cumque.
        </p>
      </div>
    </div>
  );
};

export default Carousel;
