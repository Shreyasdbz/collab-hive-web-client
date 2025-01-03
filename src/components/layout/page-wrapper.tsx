import { cn } from "@/lib/utils";
import NavBar from "./nav-bar";
import PageTitle from "./page-title";
import Footer from "./footer";

const PageWrapper = ({
  children,
  title,
  useFullWidth,
  removePaddingX,
  removePaddingY,
  className,
}: {
  children: React.ReactNode;
  title?: string;
  useFullWidth?: boolean;
  removePaddingX?: boolean;
  removePaddingY?: boolean;
  className?: string;
}) => {
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-start relative">
      <NavBar />
      <main
        className={cn(
          "flex flex-col items-center justify-start w-full h-full",
          useFullWidth ? "w-full" : "w-full",
          removePaddingX ? "px-0" : "px-4 lg:px-10",
          removePaddingY ? "py-0" : "pt-20",
          className ? className : ""
        )}
      >
        {title && <PageTitle title={title} />}
        <div className="flex flex-col items-center justify-start pt-5 w-full h-full gap-2">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PageWrapper;
