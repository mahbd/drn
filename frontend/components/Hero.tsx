interface Props {
  bgImage: string;
  title: string;
  description: string;
}

const Hero = ({ bgImage, description, title }: Props) => {
  return (
    <div
      className="hero min-h-96 rounded-xl"
      style={{
        backgroundImage: `url(${bgImage})`,
        objectFit: "contain",
      }}
    >
      {/*<div className="hero-overlay bg-opacity-60 rounded-xl bg-base-300"></div>*/}
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          {/*<h1 className="mb-5 text-5xl font-bold z-10">{title}</h1>*/}
          {/*<p className="mb-5 z-10">{description}</p>*/}
          {/*<button className="btn btn-primary">Get Started</button>*/}
        </div>
      </div>
    </div>
  );
};

export default Hero;
