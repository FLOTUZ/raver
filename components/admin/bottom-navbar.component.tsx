// components/BottomNavBar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useScrollDirection } from "@/hooks/useScrollDirection";

export const BottomNavBarComponent = () => {
  const pathname = usePathname();
  const scrollingDown = useScrollDirection();

  return (
    <div
      className={`fixed bottom-0 inset-x-0 
        bg-white/20 backdrop-blur-md 
        border-t border-white/20 shadow-lg 
        z-50 rounded-3xl transition-transform duration-300 
        mx-8
        ${scrollingDown ? "transform translate-y-100" : "transform translate-y-0"} 
        ${scrollingDown ? "mb-0" : "mb-16"}`}
    >
      <div className="flex justify-between h-16 items-center max-w-lg mx-auto px-4">
        {/* Enlaces de la izquierda */}
        <div className="flex flex-1 justify-around">
          <Link
            replace
            className={`flex flex-col items-center text-center py-2 ${
              pathname === "/admin"
                ? "text-blue-600 font-bold"
                : "text-gray-200"
            }`}
            href="/admin"
          >
            <span>Dashboard</span>
          </Link>
        </div>

        {/* Enlaces de la derecha */}
        <div className="flex flex-1 justify-around">
          <Link
            replace
            className={`flex flex-col items-center text-center py-2 ${
              pathname === "/registered"
                ? "text-blue-600 font-bold"
                : "text-gray-200"
            }`}
            href="/registered"
          >
            <span>Pre-registro</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
