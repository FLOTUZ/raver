export type SiteConfig = typeof siteConfig;

import { FaUserCircle } from "react-icons/fa";

export const siteConfig = {
  name: "Raver",
  description: "Ticketing app para eventos",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Blog",
      href: "/blog",
    },

    {
      label: "Sobre raver",
      href: "/about",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
  ],

  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Sobre nosotros",
      href: "/about",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  drawerItems: [
    {
      label: "Mi cuenta",
      href: "/my-account",
      icon: FaUserCircle,
    },
  ],
};
