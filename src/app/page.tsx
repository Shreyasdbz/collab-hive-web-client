import PageWrapper from "@/components/layout/page-wrapper";
import DetailsSection from "@/components/pages/page-home/details-section";
import HeroSection from "@/components/pages/page-home/hero-section";

const Home = () => {
  return (
    <PageWrapper removePaddingX={true} removePaddingY={true}>
      <HeroSection />
      <DetailsSection />
    </PageWrapper>
  );
};

export default Home;
