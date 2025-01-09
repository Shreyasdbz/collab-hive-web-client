import PageWrapper from "@/components/layout/page-wrapper";

const PrivacyPolicy = () => {
  return (
    <PageWrapper title="Privacy Policy">
      <div className="p-6 font-sans leading-relaxed">
        <p className="mb-6">
          <strong>Effective Date:</strong> January 1, 2025
        </p>
        <p>
          Welcome to <strong>CollabHive</strong>. Your privacy is critically
          important to us. This Privacy Policy explains how we collect, use, and
          share information about you when you use our platform. By using
          CollabHive, you agree to the collection and use of information in
          accordance with this policy.
        </p>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">
            Information We Collect
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Personal Information:</strong> When you create an account,
              we may collect information such as your name, email address, and
              profile details.
            </li>
            <li>
              <strong>Usage Data:</strong> We collect data on how you use our
              platform, including pages viewed, projects created or joined, and
              interaction data.
            </li>
            <li>
              <strong>Cookies and Tracking:</strong> We use cookies to improve
              your user experience, track usage, and ensure security.
            </li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">
            How We Use Your Information
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>To provide, operate, and maintain the platform.</li>
            <li>
              To communicate with you regarding updates, support, or promotional
              material.
            </li>
            <li>To analyze user behavior to improve our services.</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">
            Sharing Your Information
          </h2>
          <p>
            We do not share your personal information with third parties except
            as required by law or to provide our services (e.g., hosting,
            analytics).
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
          <p>
            We retain your information only as long as necessary for the
            purposes outlined in this policy.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Access, update, or delete your data via your account settings.
            </li>
            <li>Opt-out of promotional emails by unsubscribing.</li>
          </ul>
        </section>

        <section className="mt-8">
          <p>
            For questions or concerns about this policy, contact us at{" "}
            <strong>
              <a href="mailto:shreyassane@outlook.com">
                shreyassane@outlook.com
              </a>
            </strong>
            .
          </p>
        </section>
      </div>
    </PageWrapper>
  );
};

export default PrivacyPolicy;
