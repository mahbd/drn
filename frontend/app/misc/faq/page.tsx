interface IFAQ {
  id: number;
  question: string;
  answer: string;
}

const faqs: IFAQ[] = [
  {
    id: 1,
    question: "How this works?",
    answer: "This works ",
  },
  {
    id: 2,
    question: "How this works?",
    answer: "This works ",
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
