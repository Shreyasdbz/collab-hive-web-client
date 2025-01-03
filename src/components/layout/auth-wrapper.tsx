import { createServerClient } from "@/lib/supabase/supabase-server-client";
import PageWrapper from "@/components/layout/page-wrapper";
import AuthModal from "../pages/page-auth/auth-modal.client";

const AuthWrapper = async ({
  children,
  pageTitle,
  redirectHref,
  className,
}: {
  children: React.ReactNode;
  pageTitle?: string;
  redirectHref?: string;
  className?: string;
}) => {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <PageWrapper title={pageTitle} className={className}>
      {user ? children : <AuthModal redirectHref={redirectHref} />}
    </PageWrapper>
  );
};

export default AuthWrapper;
