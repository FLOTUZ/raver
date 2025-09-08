// hooks/useScrollDirection.ts
import { useEffect, useState } from "react";

/**
 * Hook para detectar la dirección del scroll.
 * @returns {boolean} `true` si el usuario se desplaza hacia abajo, `false` si se desplaza hacia arriba.
 */
export const useScrollDirection = () => {
  const [scrollingDown, setScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Solo consideramos el cambio si se ha desplazado más de 100px para evitar tirones.
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollingDown(true); // Desplazamiento hacia abajo
      } else {
        setScrollingDown(false); // Desplazamiento hacia arriba
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return scrollingDown;
};
