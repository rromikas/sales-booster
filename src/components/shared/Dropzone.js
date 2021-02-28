import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ReactComponent as ImportIcon } from "icons/import.svg";

const MyDropzone = ({ text, onFiles, files, accept = "", onClick = () => {} }) => {
  const onDrop = useCallback((acceptedFiles) => {
    onFiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept });

  return (
    <div
      onClick={onClick}
      {...getRootProps()}
      className="flex items-center justify-center focus:outline-none bg-blue-100 p-9 rounded-xl cursor-pointer hover:bg-blue-101 transition"
    >
      <input {...getInputProps()} />
      <div>
        <div className="mb-4">
          <ImportIcon className="mx-auto text-blue-400"></ImportIcon>
        </div>
        <div className="text-blue-400 mb-3">{text}</div>
        <div>
          {files.map((f, i) => (
            <div key={`file-${i}`}>{f.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyDropzone;
