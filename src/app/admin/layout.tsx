// layout.tsx
import React from "react";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin Panel",
  description: "Ургийн номын админ хэсэг",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex min-h-screen bg-gray-100 text-white", inter.className)}>
      <AdminSidebar />
      <main className="flex-1 p-8 bg-white text-black overflow-y-auto">
        {children}
         <Toaster position="top-right" />
      </main>
    </div>
  );
}
