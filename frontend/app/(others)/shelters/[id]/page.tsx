"use client";

import useModel from "@/store/useModel";
import { Shelter } from "@/store/models";
import { API } from "@/store/config";
import Spinner from "@/components/Spinner";
import ShelterForm from "@/app/(others)/shelters/[id]/ShelterForm";

interface Props {
  params: {
    id: string;
  };
}

const ShelterPage = ({ params }: Props) => {
  const { data: shelter, isLoading } = useModel<Shelter>(
    API.shelters,
    params.id,
  );
  if (isLoading && params.id !== "new") {
    return <Spinner />;
  }

  return (
    <div className={"horizontal-center max-w-lg lg:mt-24"}>
      <div className={"bg-base-100 rounded-3xl p-5 m-3"}>
        <h1 className={"h1 font-bold text-3xl text-center mt-5"}>
          Shelter Form
        </h1>
        <ShelterForm shelter={shelter} />
      </div>
    </div>
  );
};

export default ShelterPage;
