import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { CopyIcon } from "lucide-react";
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

    // Copy code/link
    const handleCopy = () => {
        const inviteLink = `${window.location.origin}/join/${workspaceId}`;

        // native windows thing to copy to clipboard
        navigator.clipboard.writeText(inviteLink)
            .then(() => toast.success("Invite link copied to the clipboard!"))
    }

  return (
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
        </DialogContent>

    </Dialog>
  )
}

export default InviteModal