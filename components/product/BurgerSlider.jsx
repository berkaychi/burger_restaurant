"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import burgers from "@/components/product/Burgers";
const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function BurgerSlider() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1324,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="w-full bg-gray-300">
      <h1 className="text-center text-3xl font-semibold mb-4 p-8">
        Burgerlerimiz
      </h1>
      <Slider {...settings}>
        {burgers.map((burger, idx) => (
          <div key={idx} className="flex justify-center mx-auto">
            <div className="w-full px-3">
              <Image
                src={burger.img}
                alt={burger.name}
                className="rounded-lg cursor-pointer"
                width={600}
                height={500}
              />
              <h3 className="text-center mt-3 text-lg py-1 font-semibold">
                {burger.name}
              </h3>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
