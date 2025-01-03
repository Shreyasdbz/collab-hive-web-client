"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createLocalClient } from "@/lib/supabase/supabase-local-client";
import Link from "next/link";

const AuthModal = ({ redirectHref }: { redirectHref?: string }) => {
  const supabase = createLocalClient();

  async function signInWithGithub() {
    const redirectUrl = redirectHref
      ? `http://localhost:3000$/api/auth/callback?next=${redirectHref}`
      : "http://localhost:3000/api/auth/callback";
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: redirectUrl,
      },
    });
  }

  async function signInWithGoogle() {
    const redirectUrl = redirectHref
      ? `http://localhost:3000$/api/auth/callback?next=${redirectHref}`
      : "http://localhost:3000/api/auth/callback";
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectUrl,
      },
    });
  }

  return (
    <div className="w-full items-center justify-center flex flex-col mt-20">
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            <span>Log in with your account to view this page</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-5">
          <div className="flex flex-col space-y-3">
            <Button
              variant={"outline"}
              className="h-12"
              onClick={() => {
                signInWithGithub();
              }}
            >
              <Image
                src="/logo-assets/github-logo.svg?height=14&width=14"
                alt="Github Logo"
                width={14}
                height={14}
                className="dark:hidden"
              />
              <Image
                src="/logo-assets/github-logo-white.png?height=14&width=14"
                alt="Github Logo"
                width={14}
                height={14}
                className="hidden dark:block"
              />
              <span>Sign in with Github</span>
            </Button>
            <Button
              variant={"outline"}
              className="h-12"
              onClick={() => {
                signInWithGoogle();
              }}
            >
              <Image
                src="/logo-assets/google-logo.png?height=14&width=14"
                alt="Google Logo"
                width={14}
                height={14}
                className=""
              />
              <span>Sign in with Google</span>
            </Button>
            <Button variant={"outline"} className="h-12">
              <Image
                src="/logo-assets/apple-logo-black.png?height=14&width=14"
                alt="Apple Logo"
                width={14}
                height={14}
                className=" dark:hidden"
              />
              <Image
                src="/logo-assets/apple-logo-white.png?height=14&width=14"
                alt="Apple Logo"
                width={14}
                height={14}
                className=" hidden dark:block"
              />
              <span>Sign in with Apple</span>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="text-sm">
          <span>
            By signing in, you agree to our{" "}
            <Link href="/about/terms-of-service">
              <span className="text-blue-600">Terms of Service</span>
            </Link>{" "}
            and{" "}
            <Link href="/about/privacy-policy">
              <span className="text-blue-600">Privacy Policy</span>
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthModal;
