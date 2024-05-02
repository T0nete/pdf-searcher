type Props = {};

const Hero = (props: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold bg-gradient-to-r from-brand-orange via-[#f27354] to-brand-orange bg-clip-text text-7xl text-transparent ">
        PDF Searcher
      </h1>
      <h3 className="text-2xl">Turn your PDFs into conversations</h3>
    </div>
  );
};

export default Hero;
