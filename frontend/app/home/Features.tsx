import Feature from "@/components/Feature";

const Features = () => {
  return (
    <div className={"grid grid-cols-3"}>
      <Feature
        image={"/images/donate.jpeg"}
        title={"Donation"}
        description={"We accept donations to help the needed people."}
      />

      <Feature
        image={"/images/donate.jpeg"}
        title={"Donation"}
        description={"We accept donations to help the needed people."}
      />

      <Feature
        image={"/images/donate.jpeg"}
        title={"Donation"}
        description={"We accept donations to help the needed people."}
      />
    </div>
  );
};

export default Features;
