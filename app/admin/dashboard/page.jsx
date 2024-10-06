"use client";

import { SessionProvider } from "next-auth/react";
import DashboardContent from "@/components/DashboardContent";

export default function DashboardPage() {
  return (
    <SessionProvider>
      <DashboardContent />
    </SessionProvider>
  );
}
