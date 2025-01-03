export interface INavItem {
  title: string;
  href: string;
  showInMenu: boolean;
  showInMobileMenu: boolean;
  isProtected: boolean;
}

export const NavItems: INavItem[] = [
  // {
  //   title: "Home",
  //   href: "/",
  //   showInMenu: false,
  //   isProtected: false,
  //   showInMobileMenu: true,
  // },
  {
    title: "Dashboard",
    href: "/dashboard",
    showInMenu: true,
    isProtected: false,
    showInMobileMenu: true,
  },
  {
    title: "Projects",
    href: "/projects",
    showInMenu: true,
    isProtected: false,
    showInMobileMenu: true,
  },
  {
    title: "About",
    href: "/about",
    showInMenu: true,
    isProtected: false,
    showInMobileMenu: true,
  },
];
