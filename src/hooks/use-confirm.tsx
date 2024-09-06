import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const UseConfirm = (title: string, message: string): [any, any] => {
    const [promise, setPromise] = useState<{resolve: (value: boolean) => void} | null >(null)

    const confirm = () => new Promise((resolve, reject) => {
        setPromise({ resolve })
    })

    const handleClose = () => {
        setPromise(null)
    }

    const handleCancel = () => {
      promise?.resolve(false)
        handleClose();
    }


    const handleConfirm = () => {
      promise?.resolve(true)
        handleClose();
    }


  return ["", ""];
};

export default UseConfirm;
