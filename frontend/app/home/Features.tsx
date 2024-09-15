import Feature from "@/components/Feature";

const Features = () => {
  return (
    <div className={"grid grid-cols-1 md:grid-cols-3 gap-1"}>
      <Feature
        image={"/images/donate.jpeg"}
        title={"Donation"}
        description={
          "We gladly accept donations to provide essential support and assistance to those in need worldwide."
        }
      />

      <Feature
        image={"/images/chatbot_medical.jpg"}
        title={"AI Chatbot Assistance"}
        description={
          "Chatbot provides critical information like first aid, shelter guidance, and emergency contacts."
        }
      />

      <Feature
        image={"/images/evacuation-route.jpg"}
        title={"Evacuation Guidance"}
        description={
          "Maps showing safe evacuation routes and shelters during disasters, guiding citizens to safety."
        }
      />
    </div>
  );
};

export default Features;
