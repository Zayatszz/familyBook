// src/components/admin/AdminSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-84 bg-[#1f1f2e] p-6 flex flex-col justify-between rounded-r-2xl text-white">
      <div>
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-xl font-bold">Ураг удам</h1>
          <div className="w-10 h-10 rounded-full bg-pink-700"></div>
        </div>
        <nav className="space-y-2">
          <Link href="/admin" passHref>
            <div className={cn(
              "flex items-center gap-2 my-2 px-4 py-6 rounded-md hover:bg-pink-800",
              pathname === "/admin" ? "bg-pink-700 text-white" : "hover:bg-gray-700"
            )}>
              <Home size={24} />
              <span className="px-4">Dashboard</span>
            </div>
          </Link>

          <Link href="/admin/persons" passHref>
            <div className={cn(
              "flex items-center gap-2 my-2 px-4 py-6 rounded-md hover:bg-pink-800",
              pathname.startsWith("/admin/persons") ? "bg-pink-700 text-white" : "hover:bg-gray-700"
            )}>
              <Users size={24} />
              <span className="px-4">Хүмүүс</span>
            </div>
          </Link>

          <Link href="/admin/media" passHref>
            <div className={cn(
              "flex items-center gap-2 my-2 px-4 py-6 rounded-md hover:bg-pink-800",
              pathname.startsWith("/admin/media") ? "bg-pink-700 text-white" : "hover:bg-gray-700"
            )}>
              <ImageIcon size={24} />
              <span className="px-4">Зураг/Видео</span>
            </div>
          </Link>
        </nav>
      </div>
    </aside>
  );
}
