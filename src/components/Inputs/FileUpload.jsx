import React from "react";
import { IconPaperclip } from "@tabler/icons-react";

const FileUpload = ({ handleFileUpload }) => {
  return (
    <label htmlFor="file-upload" className=" cursor-pointer">
      <IconPaperclip size={21} />
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </label>
  );
};

export default FileUpload;
