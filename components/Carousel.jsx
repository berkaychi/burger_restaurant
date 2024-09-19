import React from "react";
import Image from "next/image";

const Carousel = () => {
  return (
    <div className="relative sm:h-[calc(100vh-64px)] w-full h-[50vh]">
      <Image
        src="/assets/images/deneme3.jpeg"
        alt="Carousel Image"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        priority
      />

      <div className="relative container  md:max-w-3xl md:mx-20 max-w-80 mx-5 sm:top-32 top-20">
        <h1 className="title">%100 Dana Eti ve Taze Fırınlanmış Ekmekler</h1>
        <p className="text-white lg:text-2xl sm:text-xl black-text-shadow">
          BAB&#39;s Burger olarak, burgerlerimizde sadece %100 dana eti
          kullanıyoruz ve her gün kendi fırınımızda taze ekmek pişiriyoruz.
          Misafirlerimize en iyi lezzeti sunmak için özenle hazırladığımız bu
          burgerler, doğal ve kaliteli malzemelerle zenginleştirilir. Gerçek
          burger deneyimini keşfetmek için sizi bekliyoruz!
        </p>
      </div>
    </div>
  );
};

export default Carousel;
