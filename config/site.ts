export type SiteConfig = typeof siteConfig;

import { FaUserCircle } from "react-icons/fa";

export const siteConfig = {
  name: "RAVR",
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
  ],
  drawerItems: [
    {
      label: "Admin",
      href: "/admin",
      icon: FaUserCircle,
    },
  ],
};
