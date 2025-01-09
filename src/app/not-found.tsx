import PageWrapper from "@/components/layout/page-wrapper";

// FIXME: Next.js has a bug which does not resolve not-found.page.tsx correctly
// Instead, use `not-found.ts` as a workaround
// "ts" is required to resolve `not-found.ts`
// https://github.com/vercel/next.js/issues/65447
export const dynamic = "force-dynamic";

export default function Custom404() {
  return (
    <PageWrapper title="Oops!">
      <div className="w-full h-full flex items-center justify-center py-20 flex-col">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-lg text-secondary-foreground/80">
          The page you are looking for does not exist.
        </p>
      </div>
    </PageWrapper>
  );
}
