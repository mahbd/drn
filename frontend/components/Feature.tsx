interface Props {
  image: string;
  title: string;
  description: string;
}

const Feature = ({ image, title, description }: Props) => {
  return (
    <div className="card bg-base-100 shadow-xl m-1">
      <figure className={"h-32"}>
        <img src={image} alt={title} height={100} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Feature;
