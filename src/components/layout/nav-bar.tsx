import Link from "next/link";
import { NavItems } from "@/models/Navigation";
import { Button } from "../ui/button";
import NavbarClient from "./nav-bar.client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Menu } from "lucide-react";
import SiteLogo from "../common/site-logo";
import UserButton from "./user-button.client";

const NavBar = () => {
  return (
    <nav className="fixed top-0 w-full border-b bg-background z-50 flex items-center justify-center">
      <div className="flex h-16 items-center px-4 lg:px-10 justify-between w-full">
        <div className="flex items-center justify-start w-full">
          <Link href="/" className="mr-4 flex items-center justify-center">
            <SiteLogo />
          </Link>
          <div className="hidden lg:flex lg:space-x-2 items-center justify-center">
            {NavItems.map((item) => {
              if (item.showInMenu) {
                return (
                  <Button key={item.title} variant="ghost" asChild>
                    <Link href={item.href}>{item.title}</Link>
                  </Button>
                );
              }
            })}
          </div>
        </div>
        <UserButton />
        <div className="flex flex-1 items-center justify-end lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pr-0">
              <SheetTitle>
                <Link href={"/"}>
                  <SiteLogo />
                </Link>
              </SheetTitle>
              <SheetDescription className="pr-1">
                Discover hobby projects and collaborators
              </SheetDescription>
              <NavbarClient navItems={NavItems} isMobile={true} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
