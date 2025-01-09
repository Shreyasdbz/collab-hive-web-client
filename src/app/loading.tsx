import PageWrapper from "@/components/layout/page-wrapper";

export default function Loading() {
  return (
    <PageWrapper title="Loading...">
      <div className="w-full h-full flex items-center justify-center py-20 flex-col">
        <h1 className="text-4xl font-bold">Hang on a sec</h1>
        <p className="text-lg text-secondary-foreground/80">
          {`We're fetching the page for you.`}
        </p>
      </div>
    </PageWrapper>
  );
}
