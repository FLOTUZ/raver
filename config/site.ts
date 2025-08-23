export type SiteConfig = typeof siteConfig;

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
  links: {
    github: "https://github.com/heroui-inc/heroui",
  },
};
