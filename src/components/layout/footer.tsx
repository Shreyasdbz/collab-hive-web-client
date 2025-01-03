import { ThemeSwitcher } from "../theme-switcher.client";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16 mt-20">
      {/* Policy/terms links */}
      <div className="w-full flex flex-row items-center justify-center gap-4 px-4 lg:px-10">
        {/* Privcy Policy */}
        <span>Privacy Policy</span>
        {/* Terms of use */}
        <span>Terms of use</span>
      </div>
      {/* About me links */}
      {/* Theme switcher */}
      <ThemeSwitcher />
    </footer>
  );
};

export default Footer;
