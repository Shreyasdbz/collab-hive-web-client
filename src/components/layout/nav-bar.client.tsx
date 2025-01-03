"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import { INavItem } from "@/models/Navigation";

const NavbarClient = ({
  navItems,
  isMobile,
}: {
  navItems: INavItem[];
  isMobile: boolean;
}) => {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState("");
  const [, setIsOpen] = useState(false);

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  const NavItem = ({ item }: { item: INavItem }) => {
    return (
      <Button
        key={item.title}
        variant={
          currentPath === item.title.toLocaleLowerCase() ? "outline" : "ghost"
        }
        className=""
        asChild
        onClick={() => setIsOpen(false)}
      >
        <Link href={item.href}>{item.title}</Link>
      </Button>
    );
  };

  return (
    <div className="flex flex-col space-y-2 py-4 items-start justify-center">
      {navItems.map((item) => {
        if (isMobile && !item.showInMobileMenu) return null;
        if (!isMobile && !item.showInMenu) return null;
        return <NavItem key={item.title} item={item} />;
      })}
    </div>
  );
};

export default NavbarClient;
