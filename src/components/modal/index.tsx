import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiUpload } from "react-icons/fi";
import { InputForm } from "../Uploader";


export function DialogDemo() {

// handleOnSubmit

async function handleOnSubmit(e: React.SyntheticEvent){
    e.preventDefault();
}

  return (
    <form  onSubmit={handleOnSubmit}>
        <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="flex gap-3"><FiUpload/> Upload Image</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Upload Profile Picture</DialogTitle>

        </DialogHeader>
          <div className="">
            <InputForm/>
          </div>

      </DialogContent>
    </Dialog>    
    </form>

  );
}
