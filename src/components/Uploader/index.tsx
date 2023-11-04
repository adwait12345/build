"use client";


import { FiUploadCloud } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";

import { Button } from "@/components/ui/button";

import { useCallback, useEffect, useState } from "react";

import { useDropzone } from "react-dropzone";
import axios from "axios";
import Loader from "../loader";
import { DialogClose } from "@radix-ui/react-dialog";

import { useDispatch, useSelector } from "react-redux";
import { setImage } from "../../../redux/actions/action";


export function InputForm() {


    
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<Boolean>(false);
  

    const removeFile = (file:any) => () => {
      console.log("removeFile...");
      acceptedFiles.splice(acceptedFiles.indexOf(file), 1);
      console.log(acceptedFiles);
    };


  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = new FileReader();

    file.onload = function () {
      setPreview(file.result);
    };

    file.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { fileRejections,acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({ onDrop });


  async function onSubmit(e: React.SyntheticEvent) {
    if (typeof acceptedFiles[0] === "undefined") return;
    
  

    const res = await axios.get("https://buidl--2020bec067.repl.co/user");

    const formData = new FormData();

    formData.append("image", acceptedFiles[0]);
    formData.append("name", "adwait");

    if (res.data[0]) {
      setLoading(true);

      const results = axios({
        method: "put",
        url: `https://b9uidl--2020bec067.repl.co/user/${res.data[0]._id}`,
        data: formData,
       
      })
        .then(function (response) {
          //handle success
          console.log(response);
          setLoading(false);

        })
        .catch(function (response) {
          //handle error
          console.log(response);
          //  setError(true);

        });
      console.log("results", results);

      return;
    } else if (res.data[0] == undefined) {
      setLoading(true);
      const results = axios({
        method: "post",
        url: `https://buidl--2020bec067.repl.co/user`,
        data: formData,
       
      })
        .then(function (response) {
          //handle success
          console.log(response);
          setLoading(false);
        })
        .catch(function (response) {
          //handle error
          // setError(true)
          console.log(response);
        });
      console.log("results", results);
      setLoading(false);

      return;
    }
  }


  return (
    <form onSubmit={onSubmit} className=" space-y-6">
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
          <div className="">
            {loading ? (
              <>
                <div className="flex flex-col items-center justify-center">
                  <div className="">
                    {" "}
                    <Loader />
                  </div>
                  <div className=" text-center">
                    <h2 className=" font-semibold text-[14px]">
                      Uploading Picture
                    </h2>
                    <p className=" font-normal text-[12px] text-[#b3b3b3]">
                      Do not refresh or perform any other action while the
                      picture is being upload
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                {acceptedFiles[0] == null ? (
                  <div className=" w-full flex flex-col items-center justify-center h-full rounded-2xl">
                    <button className=" p-3 rounded-md shadow-md mb-3 ">
                      <FiUploadCloud />{" "}
                    </button>
                    <h2 className=" font-semibold text-[18px]">
                      Drag an Image
                    </h2>
                    <p className=" font-medium text-[13px] text-[#b3b3b3]">
                      click to upload (image should be 500x500 px & under 10 MB)
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="">
                      {preview && (
                        <div className="flex flex-col items-center">
                          <div className="my-3">
                            {" "}
                            <div className="flex flex-col w-fit">
                              <div className="w-full flex items-end justify-end">
                                {" "}
                                <button className=" z-50 absolute -mb-2 -mr-2" onClick={removeFile}><IoIosCloseCircleOutline /></button>
                              </div>
                              <div className="">
                                <img
                                  src={preview as string}
                                  className=" w-16 h-16 rounded-md object-cover grayscale"
                                  alt="Upload preview"
                                />
                              </div>
                            </div>
                          </div>
                          <div className=" text-center">
                            <h2 className=" font-semibold text-[14px]">
                              Picture Uploaded
                            </h2>
                            <p className=" font-normal text-[12px] text-[#b3b3b3]">
                              Click to submit to update the picture
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>
      <div className="">
        {
          error &&
          <p>something went wrong</p>
        }
      </div>
      <div className="w-full flex items-end justify-end gap-3">
        <DialogClose>
          {" "}
          <Button variant="outline"> Cancel</Button>
        </DialogClose>
        <Button type="submit" disabled={acceptedFiles[0] == null}>
          Submit
        </Button>
      </div>
    </form>
  );
}
