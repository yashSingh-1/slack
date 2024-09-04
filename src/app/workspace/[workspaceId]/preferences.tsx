import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import useUpdateWorkspace from "@/features/workspaces/api/use-update-workspace";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
  

interface PreferencesProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    initailValue: string;
}

const Preferences = ({
    open,
    setOpen,
    initailValue
}: PreferencesProps) => {
    const [value, setValue] = useState(initailValue)

    const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } = useUpdateWorkspace();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 bg-gray-50 overflow-hidden">
            <DialogHeader className="p-4 border-b bg-white">
                <DialogTitle>
                    {value}
                </DialogTitle>
            </DialogHeader>
            <div className="px-4 pb-4 flex flex-col gap-y-2">
                <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">
                            Workspace name 
                        </p>
                        <p className="text-sm text-[#1263a3] hover:underline font-semibold">
                            Edit 
                        </p>

                    </div>
                    <p className="text-sm">
                        {value}
                    </p>

                </div>
                <button disabled={false} onClick={() => {}}
                    className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border
                    cursor-pointer hover:bg-gray-50 text-rose-600 "
                >
                    <TrashIcon className="size-4"/>
                    <p className="text-s font-semibold">
                        Delete Workspace
                    </p>
                </button>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default Preferences