import TranslateForm from "@/app/(others)/translate/TranslateForm";

const Page = () => {
  return <TranslateForm apiKey={process.env.TRANSLATE_API_KEY} />;
};

export default Page;
