import Image from "next/image";
import { Button } from "@/components/ui/button";
import H1 from "@/components/ui/typography/h1";
import { LeadText } from "@/components/ui/typography/lead-text";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-primary w-full px-4 lg:px-10 pt-20">
      {/* Animated gradient background */}
      <div className="absolute inset-10 overflow-hidden rounded-full blur-3xl">
        <div className="animate-gradient-x absolute -inset-[10px] opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-orange-500 to-yellow-500 mix-blend-multiply"></div>
        </div>
      </div>
      <div className="absolute top-10 right-10 inset-10 overflow-hidden rounded-full blur-3xl rotate-90">
        <div className="animate-gradient-y absolute -inset-[10px] opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-cyan-500 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-teal-500 to-amber-500 mix-blend-multiply"></div>
        </div>
      </div>

      <div className="container relative z-10 mx-auto flex flex-col items-center justify-center px-4 py-16 sm:px-6 sm:py-24 lg:flex-row lg:px-8">
        {/* Left side: Text and CTAs */}
        <div className="max-w-xl text-center lg:text-left lg:w-1/2">
          <H1 className="text-primary-foreground">Welcome to the Hive</H1>
          <LeadText className="text-secondary">
            Where project dreams become reality
          </LeadText>
          <div className="mt-5 flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link href={"/projects"}>
              <Button variant="default" className="w-full lg:w-fit">
                View projects
              </Button>
            </Link>
            <Link href={"/sign-in"}>
              <Button variant={"outline"} className="w-full lg:w-fit">
                Start collaborating
              </Button>
            </Link>
          </div>
        </div>

        {/* Right side: Staggered images */}
        <div className="mt-12 lg:mt-0 lg:w-1/2">
          <div className="relative h-[300px] w-[200px] lg:h-[500px] lg:w-[400px] xl:h-[600px] xl:w-[500px]">
            <Image
              src="/misc-assets/screenshot_figma.png?height=300&width=400"
              alt="Project image 1"
              width={400}
              height={300}
              className="absolute -left-4 top-0 lg:-left-4 lg:top-0 rounded-lg"
              priority
            />
            <Image
              src="/misc-assets/screenshot_github.png?height=300&width=400"
              alt="Project image 2"
              width={400}
              height={300}
              className="absolute left-12 top-8 lg:left-28 lg:top-16 rounded-lg"
            />
            <Image
              src="/misc-assets/screenshot_vscode.png?height=300&width=400"
              alt="Project image 3"
              width={400}
              height={300}
              className="absolute left-4 top-20 lg:top-44 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
