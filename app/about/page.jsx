import React from "react";

const About = () => {
  return (
    <section className="bg-gray-100 text-center py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-6">Hakkımızda</h1>
        <p className="text-lg text-gray-700 mb-4">
          Bizler, burger tutkusuyla yola çıkmış bir ekibiz! Restoranımızda en
          kaliteli ve doğal malzemeleri kullanarak %100 dana etinden
          hazırladığımız burgerlerimizi, günlük olarak kendi fırınımızda
          ürettiğimiz taze ekmeklerle sunuyoruz. Misyonumuz, her müşterimize
          eşsiz bir lezzet deneyimi yaşatmak.
        </p>
        <p className="text-lg text-gray-700">
          Siz de bu lezzet yolculuğuna katılmak için bizi ziyaret edin!
        </p>
      </div>
    </section>
  );
};

export default About;
