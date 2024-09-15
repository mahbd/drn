export interface ITeamMemberCard {
  image: string;
  name: string;
  position: string;
  bio: string;
}

const TeamMemberCard = ({ image, name, position, bio }: ITeamMemberCard) => {
  return (
    <div className={"card p-"}>
      <div className={"flex justify-center"}>
        <div className="avatar">
          <div className="w-32 rounded-full">
            <img src={image} />
          </div>
        </div>
      </div>
      <h3 className={"h3 font-bold text-2xl text-center"}>{name}</h3>
      <h3 className={"h3 font-bold text-lg text-center"}>{position}</h3>
      <p className={"text-center"}>{bio}</p>
    </div>
  );
};
export default TeamMemberCard;
