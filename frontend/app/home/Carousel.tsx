"use client";

import { Carousel as BC } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Hero } from "@/components";

const Carousel = ({ className }: { className: string }) => {
  return (
    <BC
      className={className}
      showArrows
      interval={2000}
      autoPlay={true}
      swipeable={true}
      infiniteLoop={true}
      showThumbs={false}
    >
      <div>
        <Hero
          bgImage={"/images/donate.jpeg"}
          title={"Your Donation Matters"}
          description={"Help the needed people"}
        />
      </div>
      <div>
        <Hero
          bgImage={"/images/volunteer.jpeg"}
          title={"Volunteer"}
          description={"Help the needed people"}
        />
      </div>
      <div>
        <Hero
          bgImage={"/images/together.jpg"}
          title={"Together, We Are Stronger"}
          description={
            "Join our community in building resilience against future disasters."
          }
        />
      </div>
    </BC>
  );
};

export default Carousel;
