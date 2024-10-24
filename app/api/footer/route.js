import { NextResponse } from "next/server";

export async function GET() {
  const footerData = {
    location: "https://www.google.com/maps/place/Your+Location",
    phoneNumber: "+90 123 456 78 90",
    email: "demo@gmail.com",
    desc: "En lezzetli burgerlerin adresi.",
    socialMedia: [
      {
        id: 1,
        icon: "fa-brands fa-facebook",
        link: "https://facebook.com/yourpage",
      },
      {
        id: 2,
        icon: "fa-brands fa-instagram",
        link: "https://instagram.com/yourpage",
      },
      {
        id: 3,
        icon: "fa-brands fa-x-twitter",
        link: "https://twitter.com/yourpage",
      },
    ],
    openingHours: [
      { day: "Pazartesi - Cuma", hour: "09:00 - 22:00" },
      { day: "Cumartesi - Pazar", hour: "10:00 - 23:00" },
    ],
  };

  return NextResponse.json(footerData);
}
