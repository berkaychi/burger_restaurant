"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function BurgerSlider() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const burgers = [
    { name: "3 Peynirli Burger", img: "/assets/images/bbq-burger.jpg" },
    { name: "Atölye Burger", img: "/assets/images/bbq-burger.jpg" },
    { name: "BBQ Burger", img: "/assets/images/bbq-burger.jpg" },
    { name: "Black Star Burger", img: "/assets/images/bbq-burger.jpg" },
  ];

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
    return null; // Render nothing on the server
  }

  return (
    <div className="w-full bg-gray-300">
      <h1 className="text-center text-3xl font-semibold mb-8 p-12 ">
        Burgerlerimiz
      </h1>
      <Slider {...settings}>
        {burgers.map((burger, idx) => (
          <div key={idx} className="flex justify-center mx-auto">
            <div className="w-full px-4">
              <Image
                src={burger.img}
                alt={burger.name}
                className="rounded-lg"
                width={600}
                height={500}
              />
              <h3 className="text-center mt-4 text-lg font-semibold">
                {burger.name}
              </h3>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
