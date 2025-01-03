"use client";

import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createLocalClient } from "@/lib/supabase/supabase-local-client";

const SignOutButton = () => {
  const signOut = async () => {
    const client = await createLocalClient();
    client.auth.signOut();
    redirect("/");
  };

  return (
    <Button
      variant={"outline"}
      onClick={() => {
        signOut();
      }}
    >
      Sign out
    </Button>
  );
};

export default SignOutButton;
