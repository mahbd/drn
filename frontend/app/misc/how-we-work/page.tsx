import HowWork from "@/app/home/HowWork";

const HowWeWorkPage = () => {
  return (
    <div>
      <h1 className={"h1 text-4xl font-bold my-5 text-center"}>How we work</h1>
      <HowWork few={false} />
    </div>
  );
};

export default HowWeWorkPage;
