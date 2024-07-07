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
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <h3 className={"h3 font-bold text-lg"}>Robert Newbold</h3>
      </div>
      <p>
        This website is very helpful. We are very happy to be helped by this
        website.
      </p>
    </div>
  );
};
