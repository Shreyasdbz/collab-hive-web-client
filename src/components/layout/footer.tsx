import Link from "next/link";
import { ThemeSwitcher } from "../theme-switcher.client";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16 mt-20">
      {/* Policy/terms links */}
      <div className="w-full flex flex-row items-center justify-center gap-4 px-4 lg:px-10">
        {/* Privcy Policy */}
        <Link href={"/about/privacy-policy"}>
          <span>Privacy Policy</span>
        </Link>
        {/* Terms of use */}
        <Link href={"/about/terms"}>
          <span>Terms of use</span>
        </Link>
      </div>
      {/* About me links */}
      {/* Theme switcher */}
      <ThemeSwitcher />
    </footer>
  );
};

export default Footer;
