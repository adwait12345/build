import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FiUpload } from "react-icons/fi";
import { InputForm } from "../Uploader";

export function Dialog2() {
  // handleOnSubmit

  async function handleOnSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" className="flex gap-3">
            Update 
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>Upload Profile Picture</DialogTitle>
          </DialogHeader>
          <div className="">
            <InputForm />
          </div>
        </DialogContent>
      </Dialog>
    </form>
  );
}
