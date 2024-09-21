import { Button } from "@/components/ui/button";
import { FaChevronDown } from "react-icons/fa";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TrashIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import useUpdateChannel from "@/features/channels/api/use-update-channel";
import { useChannelId } from "@/hooks/use-channel-id";
import { toast } from "sonner";
import useRemoveChannel from "@/features/channels/api/use-remove-channel";
import UseConfirm from "@/hooks/use-confirm";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useCurrentMember } from "@/features/members/api/use-current-member";

interface Props {
  channelName: string | undefined;
}

const Header = ({ channelName }: Props) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const channelID = useChannelId();
  const [editOpen, setEditOpen] = useState(false);
  const [value, setValue] = useState(channelName);
  const [ConfirmDialog, confirm] = UseConfirm(
    "Delete this channel?",
    "You are about to delete this channel, this action is Irrevesible!"
  );

  const { data: member } = useCurrentMember({ workspaceId });

  const handleOpen = (value: boolean) => {
    if (member?.role != "admin") return;

    setEditOpen(value);
  };

  const { mutate: updateChannel, isPending: updatingChannel } =
    useUpdateChannel();
  const { mutate: deleteChannel, isPending: isDeleting } = useRemoveChannel();

  const handleDelete = async () => {
    const ok = await confirm();
    if (!ok) {
      return;
    }
    deleteChannel(
      { id: channelID },
      {
        onSuccess: () => {
          toast.success("Channel deleted!");
          router.push(`/workspace/${workspaceId}`);
        },
        onError: () => {
          toast.error("Failed to delete channel");
        },
      }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
    setValue(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateChannel(
      { name: value!, id: channelID },
      {
        onSuccess: () => {
          toast.success("Channel Updated");
          setEditOpen(false);
        },
        onError: () => {
          toast.error("Failed to update channel");
        },
      }
    );
  };

  return (
    <div className="bg-white border-b h-[49px] flex items-center px-4 overflow-hidden">
      <ConfirmDialog />
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant={"ghost"}
            className="textlg font-semibold px-2 overflow-hidden w-auto"
            size={"sm"}
          >
            <span className="truncate">{channelName}</span>
            <FaChevronDown className="size-2.5 ml-2" />
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 bg-gray-50 overflow-hidden">
          <DialogHeader className="p-4 border-b bg-white">
            <DialogTitle>{channelName}</DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-4 flex flex-col gap-y-2">
            <Dialog open={editOpen} onOpenChange={handleOpen}>
              <DialogTrigger className="" asChild>
                <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold flex justify-start">
                      Channel Name
                    </p>
                    {member?.role == "admin" && (
                      <p className="text-sm text-[#1264a3] hover:underline font-semibold">
                        Edit
                      </p>
                    )}
                  </div>
                  <p className="text-sm"># {channelName}</p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rename the channel</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="e.g. plan-budget"
                    value={value}
                    disabled={updatingChannel}
                    required
                    onChange={handleChange}
                    minLength={3}
                    maxLength={50}
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant={"outline"} disabled={updatingChannel}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button disabled={updatingChannel}>Save</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            {member?.role == "admin" && (
              <button
                disabled={isDeleting}
                onClick={handleDelete}
                className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg cursor-pointer border hover:bg-gray-50 text-rose-600"
              >
                <TrashIcon className="size-4" />
                <p className="text-sm font-semibold">Delete channel</p>
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
