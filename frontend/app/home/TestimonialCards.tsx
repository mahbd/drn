import { ITestimonial, TestimonialCard } from "@/components/TestimonialCard";

const TestimonialCards = () => {
  const testimonials: ITestimonial[] = [
    {
      image:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
      name: "Robert Newbold",
      comment:
        "This website is very helpful. We are very happy to be helped by this website.",
    },
    {
      image:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
      name: "Robert Newbold",
      comment:
        "This website is very helpful. We are very happy to be helped by this website.",
    },
    {
      image:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
      name: "Robert Newbold",
      comment:
        "This website is very helpful. We are very happy to be helped by this website.",
    },
    {
      image:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
      name: "Robert Newbold",
      comment:
        "This website is very helpful. We are very happy to be helped by this website.",
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
