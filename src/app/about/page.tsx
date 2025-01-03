import PageWrapper from "@/components/layout/page-wrapper";
import H3 from "@/components/ui/typography/h3";

const About = () => {
  return (
    <PageWrapper title="About">
      <h1>About</h1>

      <div>
        <H3>Illustrations from:</H3>
        <a href="https://storyset.com/medical">
          Medical illustrations by Storyset
        </a>
      </div>
    </PageWrapper>
  );
};

export default About;
