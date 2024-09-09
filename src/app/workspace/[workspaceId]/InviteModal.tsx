import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import useNewJoinCode from "@/features/workspaces/api/use-new-join-code";
import UseConfirm from "@/hooks/use-confirm";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { CopyIcon, RefreshCcw } from "lucide-react";
import { toast } from "sonner";
  
interface InviteModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    name: string;
    joincode: string;
}

const InviteModal = ({
    open,
    setOpen,
    name,
    joincode
}: InviteModalProps) => {
    const workspaceId = useWorkspaceId();

    const [ConfirmDialog, confirm ] = UseConfirm(
        "Are you Sure?",
        "This will deactivate the current Invite code and use a new One"
    );

    const {mutate, isPending} = useNewJoinCode();

    const handleNewCode = async () => {
        const ok = await confirm();

        if(!ok){
            return;
        }

        mutate({workspaceId: workspaceId}, {
            onSuccess: () => {
                toast.success("Invite Code Regenrated")
            },
            onError: () => {
                toast.error("Failed to regenerate Invite Code")
            }
        })
    }

    // Copy code/link
    const handleCopy = () => {
        const inviteLink = `${window.location.origin}/join/${workspaceId}`;

        // native windows thing to copy to clipboard
        navigator.clipboard.writeText(inviteLink)
            .then(() => toast.success("Invite link copied to the clipboard!"))
    }


  return (
    <>
    <ConfirmDialog />
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Invite People to {name}
                </DialogTitle>
                <DialogDescription>
                    Use the code below to invite people to your workspace.
                </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-y-4 items-center justify-cebter py-10">
                <p className="text-4xl font-bold tracking-widest uppercase">
                    {joincode}
                </p>
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                    Copy Link
                    <CopyIcon className="size-4 ml-2"/>
                </Button>
            </div>
            <div className="flex items-center justify-between w-full">
                <Button disabled={isPending} onClick={handleNewCode} variant={"outline"}>
                    New Code
                    <RefreshCcw className="size-4 ml-2" />
                </Button>
                <DialogClose asChild>
                    <Button onClick={() => setOpen(false)}>
                        Close
                    </Button>
                </DialogClose>
            </div>
        </DialogContent>

    </Dialog>
    </>
  )
}

export default InviteModal