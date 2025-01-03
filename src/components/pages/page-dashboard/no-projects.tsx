const NoProjects = ({ text }: { text: string }) => {
  return (
    <div className="w-full flex justify-center items-center h-32">
      <p className="text-lg text-center text-accent-foreground/50">{text}</p>
    </div>
  );
};

export default NoProjects;
