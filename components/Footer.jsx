"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    const getFooterData = async () => {
      try {
        const res = await fetch("/api/footer");
        const data = await res.json();
        setFooterData(data);
      } catch (err) {
        console.error("Footer verileri alınamadı:", err);
      }
    };
    getFooterData();
  }, []);

  return (
    <footer className="bg-secondary text-white py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start ">
        {/* İletişim Bölümü */}
        <div className="md:w-1/3 mb-6 md:mb-0">
          <h3 className="text-2xl font-bold mb-4">İletişim</h3>
          <ul className="space-y-2">
            <li>
              <a
                href={footerData?.location}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-primary"
              >
                <i className="fa fa-map-marker mr-2"></i>
                Konum
              </a>
            </li>
            <li>
              <a
                href={`tel:${footerData?.phoneNumber}`}
                className="flex items-center hover:text-primary"
              >
                <i className="fa fa-phone mr-2"></i>
                {footerData?.phoneNumber}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${footerData?.email}`}
                className="flex items-center hover:text-primary"
              >
                <i className="fa fa-envelope mr-2"></i>
                {footerData?.email}
              </a>
            </li>
          </ul>
        </div>

        {/* Hakkımızda Bölümü */}
        <div className="md:w-1/3 mb-6 md:mb-0 text-center items-center">
          <h3 className="text-3xl font-bold mb-4">
            <Image
              src="/assets/images/babs-logo.png"
              alt="Bab's logo"
              width={60}
              height={60}
              className="mx-auto"
            />
          </h3>

          <p className="mt-3">{footerData?.desc}</p>
          <div className="flex justify-center mt-5 gap-x-2">
            {footerData?.socialMedia?.map((item) => (
              <a
                href={item?.link}
                className="w-8 h-8 grid place-content-center bg-white text-secondary rounded-full hover:text-white hover:bg-primary transition-all"
                key={item.id}
                target="_blank"
                rel="noreferrer"
              >
                <i className={`${item.icon}`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Açılış Saatleri Bölümü */}
        <div className="md:w-1/3 mb-6 md:mb-0">
          <h3 className="text-2xl font-bold mb-4">Çalışma Saatleri</h3>
          <div className="flex flex-col gap-y-2 mt-3">
            {footerData?.openingHours?.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{item.day}</span>
                <span>{item.hour}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="text-center mt-10">
        © {new Date().getFullYear()} Tüm Hakları Saklıdır
      </p>
    </footer>
  );
}
