// components/BottomNavBar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaQrcode } from "react-icons/fa";

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
      <div className="flex justify-around h-16 items-center max-w-lg mx-auto px-4">
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

        <Link replace href="/scanner">
          <button className="relative flex flex-col items-center justify-center -mt-16 mx-4 w-20 h-20 bg-blue-600 text-white rounded-full shadow-xl ring-4 ring-white/40 transform transition-transform duration-200 hover:scale-110 active:scale-105">
            <span className="text-xl">
              <FaQrcode size={32} />
            </span>
            <span className="text-xs mt-1">Escanear</span>
          </button>
        </Link>

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
