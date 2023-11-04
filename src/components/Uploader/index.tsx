"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FiUploadCloud } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import { MyDropzone } from "../DropZone";

import { useDropzone } from "react-dropzone";
import axios from "axios";
import Loader from "../loader";
import { DialogClose } from "@radix-ui/react-dialog";

export function InputForm() {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
   
  const [loading, setLoading]= useState<Boolean>(false)


  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = new FileReader();

    file.onload = function () {
      setPreview(file.result);
    };

    file.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({ onDrop });

  const [file, setFile] = useState<Boolean | undefined>();

  async function onSubmit(e: React.SyntheticEvent) {
    
    if (typeof acceptedFiles[0] === "undefined") return;

    const res = await axios.get("https://buidl--2020bec067.repl.co/user");

    const formData = new FormData();

    formData.append("image", acceptedFiles[0]);
    formData.append("name", "adwait");

    if (res.data[0]) {
      setLoading(true);
      const results = await fetch(
        `https://buidl--2020bec067.repl.co/user/${res.data[0]._id}`,
        {
          method: "PUT",
          body: formData,
        }
      ).then((r) => r.json());
      setLoading(false)
      console.log("results", results);

      return;
    } else if (res.data[0] == undefined) {
      setLoading(true);
      const results = await fetch("https://buidl--2020bec067.repl.co/user", {
        method: "POST",
        body: formData,
      }).then((r) => r.json());
      console.log("results", results);
      setLoading(false)

      return;
    }
  }

  console.log(loading)

  return (
    <form onSubmit={onSubmit} className=" space-y-6">
      {/* <Input type="file" placeholder="shadcn" onChange={handleOnChange} /> */}

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
                            <img
                              src={preview as string}
                              className=" w-16 h-16 rounded-md object-cover grayscale"
                              alt="Upload preview"
                            />
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

      <div className="w-full flex items-end justify-end gap-3">
     <DialogClose>   <Button variant="outline">
          {" "}
          Cancel
        </Button></DialogClose>
        <Button type="submit" disabled={acceptedFiles[0] == null}>
          Submit
        </Button>
      </div>
    </form>
  );
}
