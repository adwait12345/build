import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { FiUploadCloud } from "react-icons/fi";


export function MyDropzone() {

 const [file, setFile] = useState([]);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);


  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = new FileReader();

    file.onload = function () {
      setPreview(file.result);
    };

    file.readAsDataURL(acceptedFiles[0]);
  }, []);




  const { acceptedFiles,getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  
  console.log(acceptedFiles)


  return (
    <div
      {...getRootProps()}
      className=" w-full flex items-center justify-center border-dashed border-2 h-[150px]  rounded-2xl cursor-pointe mt-3"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <div className="w-full flex flex-col items-center justify-center bg-[#F8FAFC] h-full rounded-2xl">
          <button className=" p-3 rounded-md shadow-md mb-3 ">
            <FiUploadCloud />{" "}
          </button>
          <h2 className=" font-semibold text-[18px]">Drag an Image</h2>
          <p className=" font-medium text-[13px] text-[#b3b3b3]">
            click to upload (image should be 500x500 px & under 10 MB)
          </p>
        </div>
      ) : (
          
         

        <div className=" w-full flex flex-col items-center justify-center h-full rounded-2xl">
          <button className=" p-3 rounded-md shadow-md mb-3 ">
            <FiUploadCloud />{" "}
          </button>
          <h2 className=" font-semibold text-[18px]">Drag an Image</h2>
          <p className=" font-medium text-[13px] text-[#b3b3b3]">
            click to upload (image should be 500x500 px & under 10 MB)
          </p>
        </div>
      )}
      {preview && (
        <p className="mb-5">
          <img src={preview as string} alt="Upload preview" />
        </p>
      )}
    </div>
  );
}
