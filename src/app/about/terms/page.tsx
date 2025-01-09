import PageWrapper from "@/components/layout/page-wrapper";

const Terms = () => {
  return (
    <PageWrapper title="Terms and Conditions">
      <div className="p-6 font-sans leading-relaxed">
        <p className="mb-6">
          <strong>Effective Date:</strong> January 1, 2025
        </p>
        <p>
          Welcome to <strong>CollabHive</strong>! By accessing or using our
          platform, you agree to these Terms and Conditions. Please read them
          carefully.
        </p>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Use of the Platform</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Users must be 18 years or older to register.</li>
            <li>
              You are responsible for maintaining the confidentiality of your
              account credentials.
            </li>
            <li>
              Do not use the platform for unlawful activities or to post content
              that infringes on the rights of others.
            </li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">
            Content and Intellectual Property
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Users retain ownership of the content they upload but grant
              CollabHive a non-exclusive license to display and share it as
              necessary for platform operations.
            </li>
            <li>
              Unauthorized use or reproduction of any content on the platform is
              prohibited.
            </li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">
            Limitations of Liability
          </h2>
          <p>
            CollabHive is not liable for any damages or disputes arising from
            interactions or collaborations between users.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Termination</h2>
          <p>
            We reserve the right to suspend or terminate accounts that violate
            these Terms.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
          <p>
            We may modify these Terms at any time. Continued use of the platform
            constitutes acceptance of the updated Terms.
          </p>
        </section>

        <section className="mt-8">
          <p>
            Contact us at{" "}
            <strong>
              <a href="mailto:shreyassane@outlook.com">
                shreyassane@outlook.com
              </a>
            </strong>{" "}
            for questions about these Terms.
          </p>
        </section>
      </div>
    </PageWrapper>
  );
};

export default Terms;
