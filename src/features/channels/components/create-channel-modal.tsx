import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { useCreateChannelModal } from "../store/use-create-channel-model"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import useCreateChannel from "../api/use-create-channel";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
 
 const CreateChannelModal = () => {
    const [open, setOpen] = useCreateChannelModal();
    const [name, setName] = useState("")
    const workspaceId = useWorkspaceId();
    const router = useRouter();

    const {mutate, isPending} = useCreateChannel()

    const handleClose = () => {
        setName("");
        setOpen(false);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
        setName(value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        mutate({
            name: name, 
            workspaceId: workspaceId
        }, {
            onSuccess: (id) => {
                router.push(`/workspace/${workspaceId}/channel/${id}`)
                handleClose();
                toast.success("Channel Created!")
            },
            onError: () => {
                toast.error("Failed to create a channel")
            }
        })
    }

   return (
     <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Add a Channel
                </DialogTitle>
            </DialogHeader>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <Input 
                value={name}
                disabled={isPending}
                onChange={handleChange}
                required
                autoFocus
                minLength={3}
                maxLength={80}
                placeholder="e.g. plan-budget"
                />
                <div className="flex justify-end">
                    <Button disabled={isPending}>
                        Create
                    </Button>
                </div>
            </form>
        </DialogContent>
     </Dialog>
   )
 }
 
 export default CreateChannelModal  