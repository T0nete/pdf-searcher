type Props = {};

const Hero = (props: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold bg-gradient-to-r from-brand-orange via-brand-orange-hover to-brand-orange bg-clip-text text-7xl text-transparent ">
        Unlock Knowledge Within Your PDFs Instantly
      </h1>
      <p>
        Say goodbye to endless scrolling and searching. With <span className="text-brand-orange">PDF Searcher AI</span>, simply upload your PDF, ask any question, and get precise answers from your documents in seconds. Enhance your productivity and dive straight into the information you need effortlessly.
      </p>

      {/* <h1 className="font-bold bg-gradient-to-r from-brand-orange via-brand-orange-hover to-brand-orange bg-clip-text text-7xl text-transparent ">
        PDF Searcher
      </h1> */}
      {/* <h3 className="text-2xl">Turn your PDFs into conversations</h3> */}
    </div>
  );
};

export default Hero;
