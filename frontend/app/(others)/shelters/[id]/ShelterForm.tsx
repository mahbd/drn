"use client";

import useFormComponents from "@/components/useFormComponents";
import { ShelterFormData, shelterSchema } from "./shelterSchema";
import { Shelter } from "@/store/models";
import { API } from "@/store/config";
import http from "@/store/http";
import { toast } from "@/components/ui/use-toast";

interface Props {
  shelter?: Shelter;
}

const ShelterForm = ({ shelter }: Props) => {
  const { Input, handleSubmit, setIsSubmitting, SubmitBtn } =
    useFormComponents<ShelterFormData>(shelterSchema, {
      name: shelter?.name,
      address: shelter?.address,
      latitude: shelter?.latitude,
      longitude: shelter?.longitude,
      phone: shelter?.phone,
    });

  const doSubmit = async (data: ShelterFormData) => {
    setIsSubmitting(true);
    const res = await http.post<Shelter>(API.shelters, data);
    if (res.status === 201) {
      toast({
        variant: "success",
        title: "Success!",
        description: "Shelter created successfully!",
      });
      window.location.href = "/shelters";
    } else {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Something went wrong!",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div>
      <form
        className="horizontal-center lg:max-w-2xl w-full mx-5 md:mx-10 lg:mx-auto p-2"
        onSubmit={handleSubmit(doSubmit)}
      >
        <Input name={"name"} />
        <Input name={"phone"} />
        <Input name={"address"} />
        <Input name={"latitude"} />
        <Input name={"longitude"} />
        <SubmitBtn label={`${shelter ? "Update" : "Report"} Shelter`} />
      </form>
    </div>
  );
};

export default ShelterForm;
