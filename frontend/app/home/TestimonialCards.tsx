import { ITestimonial, TestimonialCard } from "@/components/TestimonialCard";

const TestimonialCards = () => {
  const testimonials: ITestimonial[] = [
    {
      image:
        "https://qph.cf2.quoracdn.net/main-qimg-e5e8d42044c758576f8030be27eeca0b",
      name: "Ahmed Rahman",
      comment:
        "The real-time alerts helped us evacuate safely. This platform is a game-changer for disaster response",
    },
    {
      image:
        "https://qph.cf2.quoracdn.net/main-qimg-8b355b7b4694996d47fbb007c0c6870a-lq",
      name: "Aisha Sultana",
      comment:
        "The AI chatbot provided crucial information during the cyclone. It made a huge difference for our family",
    },
    {
      image:
        "https://qph.cf2.quoracdn.net/main-qimg-e95cba5868752f2fa9edde17bc6e2187-lq",
      name: "Shakib Hasan",
      comment:
        "Seeing real-time maps and resource tracking made volunteer coordination much easier. Great tool for efficient disaster management.",
    },
    {
      image:
        "https://qph.cf2.quoracdn.net/main-qimg-654b0db7b4f0f69231e1d1480444e089-lq",
      name: "Shahnaz Begum",
      comment:
        "The language translation feature made it easier to communicate with international aid workers. A vital addition for global cooperation.",
    },
  ];
  return (
    <div className={"grid grid-cols-1 lg:grid-cols-2 gap-5"}>
      {testimonials.map((testimonial, index) => (
        <TestimonialCard key={index} {...testimonial} />
      ))}
    </div>
  );
};

export default TestimonialCards;
