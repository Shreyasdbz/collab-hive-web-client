import PageWrapper from "@/components/layout/page-wrapper";

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
