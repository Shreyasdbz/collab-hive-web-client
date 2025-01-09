import PageWrapper from "@/components/layout/page-wrapper";
import { FaGithub, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa6";

const About = () => {
  const AttributionsSection = () => (
    <section className="mb-8">
      <h2 className="text-3xl font-semibold mb-4">Attributions</h2>
      <p>
        <span className="font-bold">Illustrations: </span>
        <a
          href="https://storyset.com/medical"
          target="_blank"
          rel="noopener noreferrer"
        >
          Medical illustrations by Storyset
        </a>
      </p>
      <p>
        <span className="font-bold">Icons: </span>
        <a
          href="https://react-icons.github.io/react-icons"
          target="_blank"
          rel="noopener noreferrer"
        >
          React Icons by react-icons
        </a>
      </p>
    </section>
  );

  return (
    <PageWrapper title="About">
      <div className="p-6 font-sans leading-relaxed">
        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">
            Why CollabHive Was Born
          </h2>
          <p>
            Hi, I’m <strong>Shreyas Sane</strong>, the creator of CollabHive. As
            a developer and designer, I’m constantly driven to create solutions
            that solve real-world problems in the most user-friendly way
            possible. However, I’ve often faced two challenges:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2">
            <li>
              <strong>Scaling Solo Projects:</strong> Some ideas are too big to
              build alone. I’ve frequently found myself looking for skilled
              collaborators—developers, designers, product managers—who share my
              vision and can help bring these ideas to life.
            </li>
            <li>
              <strong>
                Finding the Right Projects to Learn and Contribute:
              </strong>{" "}
              On the flip side, when I want to learn a new technology or refine
              my skills in a real-world setting, I often struggle to discover
              projects where I can make meaningful contributions. Scouring
              GitHub for hobby projects isn’t always effective or motivating.
            </li>
          </ul>
          <p className="mt-4">
            These challenges sparked the idea for CollabHive—a platform where
            creators can easily find collaborators to realize their vision, and
            where collaborators can discover projects that match their skills
            and aspirations.
          </p>
        </section>

        <AttributionsSection />

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">
            Contribute to CollabHive
          </h2>
          <p>
            {`Are you passionate about the idea of CollabHive? You can help make
            it even better! We're always looking for contributions to our
            platform. Whether it’s improving the codebase, adding new features,
            or refining designs, your contributions are welcome.`}
          </p>
          <p className="mt-4">Here’s where you can get started:</p>
          <ul className="list-disc list-inside mt-4 space-y-2">
            <li>
              <span className="font-medium">Project Management:</span> Check out
              the roadmap and issues on GitHub:{" "}
              <a
                href="https://github.com/users/Shreyasdbz/projects/6"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                CollabHive Project
              </a>
            </li>
            <li>
              <span className="font-medium">API Development:</span> Contribute
              to our API:{" "}
              <a
                href="https://github.com/Shreyasdbz/collab-hive-api"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                CollabHive REST API Repo
              </a>
            </li>
            <li>
              <span className="font-medium">Next.js web client:</span> Help
              improve our user-facing platform:{" "}
              <a
                href="https://github.com/Shreyasdbz/collab-hive-web-client"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                CollabHive Web Client Repo
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Connect with Me</h2>
          <p>
            Follow me on my social channels to stay updated with my projects,
            designs, and thoughts:
          </p>
          <div className="flex space-x-6 mt-4">
            <a
              href="https://github.com/shreyasdbz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-black"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/shreyassane"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://instagram.com/itShreyas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:text-pink-800"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://www.youtube.com/shreyasdbz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-800"
            >
              <FaYoutube size={24} />
            </a>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
};

export default About;
