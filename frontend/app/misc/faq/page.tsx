interface IFAQ {
  id: number;
  question: string;
  answer: string;
}

const faqs: IFAQ[] = [
  {
    id: 1,
    question: "What is the Disaster Response Network (DRN)?",
    answer:
      "The DRN is a comprehensive platform designed to enhance disaster preparedness, response, and recovery. It provides real-time alerts, AI-powered assistance, resource optimization, and coordination among citizens, volunteers, and authorities",
  },
  {
    id: 2,
    question: "How do I receive disaster alerts?",
    answer:
      "You can receive disaster alerts through our Android app or website. The app delivers notifications based on your location, while the website provides general updates accessible from any device.",
  },
  {
    id: 3,
    question: "How can I get involved as a volunteer?",
    answer:
      "To become a volunteer, you can register through our website or app. You'll need to provide your skills and availability, and then you’ll receive assignments and updates on tasks.",
  },
  {
    id: 4,
    question: "How can I report an incident?",
    answer:
      "Incidents can be reported via the incident reporting feature on our app or website. You’ll need to provide details such as location, nature of the incident, and any potential casualties.",
  },
  {
    id: 5,
    question: "How does the AI-powered image analysis work?",
    answer:
      "Users can upload images of disaster-affected areas, and our AI analyzes these images to identify the type of disaster and its severity. This helps in assessing damage and planning response efforts.",
  },
  {
    id: 6,
    question: "Can I donate to support disaster relief efforts?",
    answer:
      "Yes, you can make donations through our secure platform. You can contribute financially or provide essential resources like food and medicine. All donations are tracked for transparency and efficiency.",
  },
  {
    id: 7,
    question: "How does the language translation feature work?",
    answer:
      "Our platform includes a language translation feature that facilitates communication between local communities and international aid organizations. It translates messages in real-time to bridge language barriers.",
  },
  {
    id: 8,
    question: "What measures are in place to ensure the security of my data?",
    answer:
      "We implement robust security measures, including data encryption, user authentication, and access control, to protect your information and ensure the integrity of our platform.",
  },
  {
    id: 9,
    question: "How can I access training and simulation modules?",
    answer:
      "Training and simulation modules are available through the app and website. You can access these resources to learn about safety procedures, emergency response, and evacuation strategies.",
  },
];

const FAQ = () => {
  return (
    <div>
      <h1 className={"section-title text-center"}>
        Frequently Asked Questions
      </h1>

      {faqs.map((faq) => (
        <div key={faq.id} className={"mt-3"}>
          <p className={"font-bold"}>Q: {faq.question}</p>
          <p>
            <span className={"font-bold"}>A: </span>
            {faq.answer}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
