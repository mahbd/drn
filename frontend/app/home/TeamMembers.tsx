import TeamMemberCard, { ITeamMemberCard } from "@/components/TeamMemberCard";

const TeamMembers = () => {
  const testimonials: ITeamMemberCard[] = [
    {
      image: "https://avatars.githubusercontent.com/u/53579616?v=4",
      name: "Mahmudul Alam",
      position: "Project Director",
      bio: "Mahmudul Alam is an expert in disaster management with over 15 years of experience. His leadership ensures that the Disaster Response Network operates efficiently and effectively, bringing innovative solutions to the forefront of disaster response.\n",
    },
    {
      image:
        "https://qph.cf2.quoracdn.net/main-qimg-8b355b7b4694996d47fbb007c0c6870a-lq",
      name: "Sara Ahmed",
      position: "Lead Software Engineer",
      bio: "Sara Ahmed specializes in developing robust and scalable software solutions. Her expertise in Next.js and Spring Boot drives the technical backbone of our platform, ensuring seamless functionality and user experience",
    },
    {
      image: "https://avatars.githubusercontent.com/u/110289715?v=4",
      name: "Md. Nazmul Hasan Anik",
      position: "Data Scientist",
      bio: "Md. Nazmul Hasan Anik leverages machine learning and AI to analyze disaster data and optimize resource allocation. His work enhances the accuracy and effectiveness of our response strategies.",
    },
    {
      image:
        "https://qph.cf2.quoracdn.net/main-qimg-654b0db7b4f0f69231e1d1480444e089-lq",
      name: "Fatima Akter",
      position: "Marketing and Communications Manager",
      bio: "Fatima Akter handles our public relations and communication strategies. She is responsible for raising awareness about the Disaster Response Network and ensuring clear and effective communication with all stakeholders.\n",
    },
  ];
  return (
    <div className={"grid grid-cols-1 lg:grid-cols-2 gap-5"}>
      {testimonials.map((testimonial, index) => (
        <TeamMemberCard key={index} {...testimonial} />
      ))}
    </div>
  );
};

export default TeamMembers;
