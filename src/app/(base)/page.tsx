"use client"
import Form from "@/components/Form";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import store, { Persistor } from "../../../redux/store";
import { PersistGate } from "redux-persist/integration/react"; 

export default function Home() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={Persistor}>
          <NextUIProvider>
            <Form />
          </NextUIProvider>{" "}
        </PersistGate>
      </Provider>
      {/* <Uploader/> */}
    </>
  );
}
