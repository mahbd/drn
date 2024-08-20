export interface ITestimonial {
  image: string;
  name: string;
  comment: string;
}

export const TestimonialCard = ({ image, name, comment }: ITestimonial) => {
  return (
    <div className={"card bg-base-100 p-5 shadow-xl"}>
      <div className={"flex gap-2"}>
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src={image} />
          </div>
        </div>
        <h3 className={"h3 font-bold text-lg"}>{name}</h3>
      </div>
      <p>{comment}</p>
    </div>
  );
};
