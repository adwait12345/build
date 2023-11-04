"use client"
import Form from "@/components/Form";
import { NextUIProvider } from "@nextui-org/react";


export default function Home() {
  return (
    <>
      <NextUIProvider>
   <Form />
      </NextUIProvider>
   
      {/* <Uploader/> */}
    </>
  );
}
