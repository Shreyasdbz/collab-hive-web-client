"use client";

import PageWrapper from "@/components/layout/page-wrapper";
import AuthModal from "@/components/pages/page-auth/auth-modal.client";
import useUser from "@/providers/UserProvider";
import { redirect } from "next/navigation";

const SignIn = () => {
  const { user } = useUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <PageWrapper>
      <AuthModal redirectHref="dashboard" />
    </PageWrapper>
  );
};

export default SignIn;
