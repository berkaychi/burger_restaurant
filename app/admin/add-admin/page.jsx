"use client";
import { SessionProvider } from "next-auth/react";
import AddAdmin from "@/components/AddAdmin";

const page = () => {
  return (
    <SessionProvider>
      <AddAdmin />
    </SessionProvider>
  );
};

export default page;
