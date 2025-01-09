"use client";

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
import { FaApple, FaGithub, FaGoogle } from "react-icons/fa6";

const AuthModal = ({ redirectHref }: { redirectHref?: string }) => {
  const supabase = createLocalClient();

  function getRedirectUrl() {
    // Check if environment is production
    if (process.env.NODE_ENV === "production") {
      // Check if redirectHref is defined
      if (redirectHref) {
        return `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback?next=${redirectHref}`;
      } else {
        return `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`;
      }
    } else {
      // Check if redirectHref is defined
      if (redirectHref) {
        return `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback?next=${redirectHref}`;
      } else {
        return `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`;
      }
    }
  }

  async function signInWithGithub() {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: getRedirectUrl(),
      },
    });
  }

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: getRedirectUrl(),
      },
    });
  }

  async function signInWithApple() {
    await supabase.auth.signInWithOAuth({
      provider: "apple",
      options: {
        redirectTo: getRedirectUrl(),
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
              <FaGithub className="text-foreground" />
              <span>Sign in with Github</span>
            </Button>
            <Button
              variant={"outline"}
              className="h-12"
              onClick={() => {
                signInWithGoogle();
              }}
            >
              <FaGoogle className="text-foreground" />
              <span>Sign in with Google</span>
            </Button>
            <Button
              variant={"outline"}
              className="h-12"
              onClick={() => {
                signInWithApple();
              }}
            >
              <FaApple className="text-foreground" />
              <span>Sign in with Apple</span>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="text-sm">
          <span>
            By signing in, you agree to our{" "}
            <Link href="/about/terms">
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
