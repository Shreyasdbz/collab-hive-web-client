import H1 from "../ui/typography/h1";

const PageTitle = ({ title }: { title: string }) => {
  return (
    <div className="w-full flex items-center justify-start mt-2">
      <H1>{title}</H1>
    </div>
  );
};

export default PageTitle;
