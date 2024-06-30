import Image from "next/image";

interface Props {
  image: string;
  title: string;
  description: string;
}

const Feature = ({ image, title, description }: Props) => {
  return (
    <div className="card bg-base-100 w-60 shadow-xl">
      <figure className={"h-32"}>
        <Image
          src={image}
          alt={title}
          width={300}
          height={100}
          // objectFit={"cover"}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Feature;
