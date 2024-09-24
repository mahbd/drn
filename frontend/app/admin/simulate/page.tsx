import Simulate from "@/app/admin/simulate/Simulate";

const Page = () => {
  const mapApiKey = process.env.MAP_API_KEY!;
  return (
    <div>
      <Simulate mapApiKey={mapApiKey} />
    </div>
  );
};

export default Page;
