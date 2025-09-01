// components/BottomNavBar.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaQrcode } from "react-icons/fa";

export const BottomNavBarComponent = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 m-4 rounded-3xl mb-16">
      <div className="flex justify-around h-16 items-center max-w-lg mx-auto px-4">
        {/* Enlaces de la izquierda */}
        <div className="flex flex-1 justify-around">
          <Link
            href="/admin"
            replace
            className={`flex flex-col items-center text-center py-2 ${pathname === "/admin" ? "text-blue-600 font-bold" : "text-gray-500"}`}
          >
            {/* Aquí puedes añadir un icono para "Inicio" */}
            <span>Dashboard</span>
          </Link>
        </div>
        <Link href="/scanner" replace>
          <button className="relative flex flex-col items-center justify-center -mt-16 mx-4 w-20 h-20 bg-blue-600 text-white rounded-full shadow-lg ring-4 ring-black transform transition-transform duration-200 hover:scale-110 active:scale-105">
            {/* Contenido del botón */}
            <span className="text-xl">
              <FaQrcode size={32} />
            </span>
            <span className="text-xs mt-1">Escanear</span>
          </button>
        </Link>

        {/* Enlaces de la derecha */}
        <div className="flex flex-1 justify-around">
          <Link
            href="/registered"
            replace
            className={`flex flex-col items-center text-center py-2 ${pathname === "/admin/settings" ? "text-blue-600 font-bold" : "text-gray-500"}`}
          >
            {/* Aquí puedes añadir un icono para "Configuración" */}
            <span>Pre-registro</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
