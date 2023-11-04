"use client";

import Image from "next/image";
import { RiDeleteBinLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { DialogDemo } from "../modal";
import { useEffect, useState } from "react";
import axios from "axios";

type Response = {
  avatar: string;
  cloudinary_id: string;
  name: string;
  __v: Number;
  _id: string;
};

export default function Form() {
  let [data, setData] = useState<Response>({
    avatar: "dummy.png",
    cloudinary_id: "",
    name: "",
    __v: 0,
    _id: "",
  });


  const fetcher = async () => {
    const res = await axios.get("https://buidl--2020bec067.repl.co/user");
    setData(res.data[0]);
  };

  const Delete = async () => {
    const res = await axios.delete(
      `https://buidl--2020bec067.repl.co/user/${data._id}`
    );
    console.log(res);
  };

  useEffect(() => {
    fetcher();
  }, []);


  return (
    <div className="">
      <div className=" w-full h-screen flex flex-col items-center justify-center">
        <div className="w-[550px] h-[300px] flex items-center justify-center border-[1px] border-[#d6d6d6] rounded-3xl">
          <div className="flex flex-col w-3/4 gap-5">
            <div className="flex items-start gap-3 ">
              <img
                className=" object-cover w-24 h-24 rounded-2xl border-[1px]"
                src={data?.avatar}
                alt=""
                width={100}
                height={100}
              />

              <div className="flex flex-col gap-[5px] ">
                <h1 className=" font-extrabold">Profile Picture</h1>
                <p className=" font-normal text-[13px] text-[#909090]">
                  We support PNGs, JPEGs under 10MB
                </p>
                <div className="flex gap-3">
                  <DialogDemo />
                  <Button variant="outline" className="px-3" onClick={Delete}>
                    <RiDeleteBinLine />
                  </Button>
                </div>
              </div>
            </div>
            <hr />

            <div className="w-full flex justify-end items-center gap-4">
              <Button className="px-8" variant="outline">
                Cancel
              </Button>
              <Button className="px-8" variant="default">
                Update
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
