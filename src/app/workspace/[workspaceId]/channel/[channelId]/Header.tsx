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

interface Props {
  channelName: string | undefined;
}

const Header = ({ channelName }: Props) => {
  const [editOpen, setEditOpen] = useState(false);
  const [value, setValue] = useState(channelName);
    function handleNameChange(event: FormEvent<HTMLFormElement>): void {
        throw new Error("Function not implemented.");
    }

  return (
    <div className="bg-white border-b h-[49px] flex items-center px-4 overflow-hidden">
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
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger className="" asChild>
                <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold flex justify-start">Channel Name</p>
                    <p className="text-sm text-[#1264a3] hover:underline font-semibold">
                      Edit
                    </p>
                  </div>
                  <p className="text-sm"># {channelName}</p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Rename the channel
                    </DialogTitle>
                </DialogHeader>
                    <form onSubmit={handleNameChange} className="space-y-4">
                  <Input placeholder="e.g. plan-budget"
                    value={value}
                    disabled={false}
                    required
                    minLength={3}
                    maxLength={50}
                    
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={"outline"} disabled={false} >
                            Cancel
                        </Button>

                    </DialogClose>
                    <Button disabled={false}>
                        Save
                    </Button>
                  </DialogFooter>

                    </form>


              </DialogContent>
            </Dialog>
            <button className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg cursor-pointer border hover:bg-gray-50 text-rose-600">
              <TrashIcon className="size-4" />
              <p className="text-sm font-semibold">Delete channel</p>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
