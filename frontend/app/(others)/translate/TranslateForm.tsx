"use client";

import React, { useState } from "react";
import Spinner from "@/components/Spinner";
import axios from "axios";

interface Props {
  apiKey: string | undefined;
}

const TranslationComponent = ({ apiKey }: Props) => {
  const [text, setText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("en");
  const [translations, setTranslations] = useState<
    { text: string; res: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const translateText = async () => {
    setIsLoading(true);
    if (!apiKey) {
      alert("Please set the TRANSLATE_API_KEY environment variable.");
      setIsLoading(false);
      return;
    }
    console.log("Translating key:", apiKey);

    try {
      const response = await axios.post(
        `https://translation.googleapis.com/language/translate/v2?key=${apiKey}&q=${encodeURI(text)}&target=${targetLanguage}`,
      );
      console.log(response.data);
      setTranslations([
        ...translations,
        { text, res: response.data.data.translations[0].translatedText },
      ]);
      setText("");
    } catch (error) {
      console.error("Error during translation:", error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      {translations.map((translation, index) => (
        <div key={index}>
          <p className={"font-bold"}>{translation.text}</p>
          <p>{translation.res}</p>
        </div>
      ))}
      <textarea
        className={"textarea w-full mt-3"}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate"
      />
      <div className={"flex justify-center"}>
        <button
          onClick={async () => await translateText()}
          className={"btn text-lg"}
          disabled={isLoading}
        >
          Translate to {isLoading && <Spinner />}
        </button>
        <select
          className={"select w-32 mx-3"}
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="bn">Bengali</option>
          <option value="gu">Gujarati</option>
          <option value="mr">Marathi</option>
          <option value="ta">Tamil</option>
          <option value="te">Telugu</option>
          <option value="ur">Urdu</option>
          <option value="kn">Kannada</option>
          <option value="ml">Malayalam</option>
          <option value="pa">Punjabi</option>
          <option value="si">Sinhala</option>
          <option value="ne">Nepali</option>
          <option value="am">Amharic</option>
        </select>
      </div>
    </div>
  );
};

export default TranslationComponent;
