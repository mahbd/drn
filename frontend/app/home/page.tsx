import { Metadata } from "next";
import Marquee from "react-fast-marquee";

import Carousel from "./Carousel";
import Features from "./Features";
import TestimonialCards from "./TestimonialCards";

const HomePage = async () => {
  // ToDo: Make marquee dynamic
  return (
    <div className={""}>
      <Marquee className={"mt-3 mb-2 bg-red-100 rounded-lg"}>
        **ATTENTION ALL RESIDENTS IN [Affected Areas]:** A **[Cyclone
        Strength]** cyclone named **[Cyclone Name]** is **[approaching/expected
        to make landfall/currently impacting]** the area. This is a **[severity
        level - e.g., serious, dangerous]** storm that could bring **[list
        potential impacts - e.g., damaging winds, storm surge, heavy rainfall,
        flooding]**.
      </Marquee>
      <Carousel className={"mt-5"} />
      <p className={"mt-5 text-justify"}>
        Welcome to Disaster Response Network, your go-to platform for
        comprehensive disaster management and relief. Our website connects
        disaster-affected individuals with compassionate volunteers, facilitates
        secure donations, and ensures prompt assistance through a user-friendly
        interface. With real-time alerts, AI-powered resource allocation, and a
        dedicated mobile app, we strive to provide immediate and effective
        support during crises. Join us in building a resilient community where
        help is always at hand, making a meaningful difference in the lives of
        those in need. Together, we can turn the tide in times of disaster.
      </p>
      <h2 className={"section-title"}>Key Features</h2>
      <Features />
      <div className={"grid grid-cols-1 lg:grid-cols-3 mb-10 mt-10"}>
        <button className={"btn btn-lg text-2xl m-2 btn-primary"}>
          Make Donation
        </button>
        <button className={"btn btn-lg text-2xl m-2 btn-primary"}>
          Be a Volunteer
        </button>
        <button className={"btn btn-lg text-2xl m-2 btn-primary"}>
          Know More
        </button>
      </div>
      <h2 className={"section-title"}>Public Cheers for Us!</h2>
      <p className={"mb-10"}>
        <TestimonialCards />
      </p>
    </div>
  );
};

export default HomePage;

export const metadata: Metadata = {
  title: "DRN | Home",
  description: "Home page for the Disaster Response Network",
};
