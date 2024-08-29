"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateWorkspaceModal } from "../store/use-create-workspace-model";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useCreateWorkSpace from "../api/use-create-workspace";
import { useRouter } from "next/navigation";

const CreateWorkspaceModal = () => {
  const router = useRouter();
  const [open, setOpen] = useCreateWorkspaceModal();

  const { mutate, data, error, isPending, isSuccess, isError, isSettled } =
    useCreateWorkSpace();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    mutate(
      {
        name: "Worksapace",
      },
      {
        onSuccess(data) {
          router.push(`/workspaces/${data}`);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a workspace</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <Input
            value=""
            disabled={false}
            required
            autoFocus
            minLength={3}
            placeholder="Workspace name e.g. 'Work', 'Personal', 'Home'"
          />
          <div className="flex justify-end">
            <Button disabled={false}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspaceModal;
