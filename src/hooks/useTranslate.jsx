import { useEffect, useState } from "react";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const api=process.env.NEXT_PUBLIC_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(api);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const useTranslate = (sourceText, selectedLanguage) => {
  const [targetText, setTargetText] = useState("");

  useEffect(() => {
    const handleTranslate = async () => {
      try {
        if (!sourceText.trim()) return;
        console.log(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
        

        const prompt = `
          You will be provided with a sentence. This sentence: 
          "${sourceText}". Your tasks are to:
          - Detect what language the sentence is in
          - Translate the sentence into ${selectedLanguage}
          Do not return anything other than the translated sentence.
        `;

        const result = await model.generateContent(prompt);
        const translatedText = result.response.text();

        setTargetText(translatedText);
      } catch (error) {
        console.error("Error translating text:", error);
      }
    };

    const timeoutId = setTimeout(() => {
      handleTranslate();
    }, 500); // Adjust the delay as needed

    return () => clearTimeout(timeoutId);
  }, [sourceText, selectedLanguage]);

  return targetText;
};

export default useTranslate;
