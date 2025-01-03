import H2 from "@/components/ui/typography/h2";
import H3 from "@/components/ui/typography/h3";
import H4 from "@/components/ui/typography/h4";
import Image from "next/image";

const DetailsSection = () => {
  const RoleCard = ({
    title,
    subtitle,
    desc,
    imageUrl,
    altText,
  }: {
    title: string;
    subtitle: string;
    desc: string;
    imageUrl: string;
    altText: string;
  }) => {
    return (
      <div className="flex items-center justify-center flex-col w-full gap-2">
        <div className="flex items-center justify-center w-52 h-52 lg:w-96 lg:h-96">
          <Image
            src={`${imageUrl}?height=300&width=400`}
            width={500}
            height={500}
            alt={altText}
            className="transition-transform"
          />
        </div>
        <div className="flex flex-col items-center justify-center space-y-1">
          <H3 className="text-center">{title}</H3>
          <H4 className="text-center text-accent-foreground/50">{subtitle}</H4>
        </div>
        <p className="text-center max-w-lg">{desc}</p>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center justify-center px-10 py-16 lg:px-20 lg:py-32 lg:space-y-20">
      <H2 className="text-center flex flex-col items-center justify-center">
        <span>Find projects to work on.</span>
        <span>Find collaborators to work with.</span>
      </H2>
      <div className="w-full flex flex-col lg:flex-row items-center justify-center lg:justify-center px-4 py-10 space-y-4 lg:space-x-10">
        <RoleCard
          title="For creators"
          subtitle="Bring Ideas to Life with the Perfect Team"
          desc="Have a vision for your next big project? CollabHive lets you open the doors to a vibrant community of developers, designers, and product managers ready to collaborate. Find the right talent, build your dream team, and watch your ideas come to life faster than ever."
          imageUrl="/illustrations/code-snippets-cuate.svg"
          altText="Code snippets illustration"
        />
        <RoleCard
          title="For collaborators"
          subtitle="Discover, Learn, and Build Together"
          desc="Looking to grow your skills or be part of something meaningful? CollabHive connects you with innovative projects where your talents can shine. Join passionate creators, collaborate across disciplines, and leave your mark on the next big thing."
          imageUrl="/illustrations/people-creating-robot-cuate.svg"
          altText="People creating robot illustration"
        />
      </div>
    </div>
  );
};

export default DetailsSection;
