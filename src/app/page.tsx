"use client";
import "regenerator-runtime/runtime";
import TextArea from "@/components/Inputs/TextArea";
import FileUpload from "@/components/Inputs/FileUpload";
import React, { useState, ChangeEvent } from "react";
import SpeechRecognitionComponent from "@/components/SpeechRecognition/SpeechRecognition";
import { IconCactus, IconCopy, IconStar, IconThumbDown, IconThumbUp, IconVolume } from "@tabler/icons-react";
import { rtfToText } from "@/utils/rtfTotext";
import  useTranslate  from "@/hooks/useTranslate";
import LinkPast from "@/components/Inputs/LinkPaste";
import LanguageSelector from "@/components/Inputs/LanguageSelector";
import SvgDecorations from "@/components/SvgDecorations";
import CategoryLinks from "@/components/CategoryLinks";

export default function Home() {
  const [sourceText, setSourceText] = useState<string>("");

  const [copied, setCopied] = useState<boolean>(false);
  const [favourite, setFavourite] = useState<boolean>(false);
  const [languages] = useState<string[]>([
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
  ]);


  const [selectedLanguage, setSelectedLanguage] = useState<string>("Japanese");
  const targetText = useTranslate(sourceText, selectedLanguage);
  const handleAudioPlayback = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const rtfContent = reader.result as string;
        const text = rtfToText(rtfContent);
        setSourceText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleLinkPaste = async (e: ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    try {
      const response = await fetch(link);
      const data = await response.text();
      setSourceText(data);
    } catch (error) {
      console.error("Error fetching link content:", error);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(targetText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const handleFavorite = () => {
    setFavourite(!favourite);
   
  };

  return (
    <div>
  <div className="h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
    <div className="relative overflow-hidden h-screen">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 py-10 sm:py-24">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl text-neutral-300 font-bold">
            Gole <span className="text-[#f87315]">Speak</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-neutral-400">
            GOLE SPEAKS: Bridging Voice, Connecting World
          </p>
          <div className="mt-7 sm:mt-12 mx-auto max-w-3xl relative">
            <div className="grid gap-4 sm:gap-[390px] md:grid-cols-4 grid-cols-1">
              <div className="relative z-10 flex p-3 flex-col space-x-3 border rounded-lg shadow-lg bg-neutral-900 border-neutral-700 shadow-gray-900/20 w-auto sm:w-96">
                <TextArea
                  id="source-language"
                  value={sourceText}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setSourceText(e.target.value)
                  }
                  placeholder="Source Language"
                />
                <div className="flex flex-row justify-between w-full">
                  <span className="cursor-pointer flex space-x-2 flex-row">
                    <SpeechRecognitionComponent
                      setSourcetext={setSourceText}
                    />
                    <IconVolume
                      size={22}
                      onClick={() => handleAudioPlayback(sourceText)}
                    />
                    <FileUpload handleFileUpload={handleFileUpload} />
                    <LinkPast handleLinkPaste={handleLinkPaste} />
                  </span>
                  <span className="text-xs sm:text-sm pr-4">
                    {sourceText.length} / 2000
                  </span>
                </div>
              </div>

              <div className="relative z-10 flex p-3 flex-col space-x-3 border rounded-lg shadow-lg bg-neutral-900 border-neutral-700 shadow-gray-900/20 w-auto sm:w-96">
                <TextArea
                  id="target-language"
                  value={targetText}
                  onChange={() => {}}
                  placeholder="Target Language"
                />
                <div className="flex flex-row justify-between w-full">
                  <span className="cursor-pointer flex items-center space-x-2 flex-row">
                    <LanguageSelector
                      selectedLanguage={selectedLanguage}
                      setSelectedLanguage={setSelectedLanguage}
                      languages={languages}
                    />
                    <IconVolume
                      size={22}
                      onClick={() => handleAudioPlayback(targetText)}
                    />
                  </span>
                  <div className="flex flex-row items-center space-x-2 pr-4 cursor-pointer">
                    <IconCopy size={22} onClick={handleCopyToClipboard} />
                    {copied && (
                      <span className="text-xs text-green-500">Copied!</span>
                    )}
                    <IconThumbUp size={22} />
                    <IconThumbDown size={22} />
                    <IconStar
                      size={22}
                      onClick={handleFavorite}
                      className={favourite ? "text-yellow-500" : ""}
                    />
                  </div>
                </div>
              </div>
            </div>
            <SvgDecorations />
          </div>
          <CategoryLinks />
        </div>
      </div>
    </div>
  </div>
</div>

  );
}
