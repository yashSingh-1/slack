import { LucideIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { IconType } from "react-icons/lib"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { cn } from "@/lib/utils"


const SidebarItemVariants = cva(
    "flex item-center gap-1.5 py-2 justify-start font-normal h-7 px-[18px] text-sm overflow-hidden",
    {
        variants: {
            variant: {
                default: "text-[#f9edffcc]",
                active: "text-[#481349] bg-white/90 hover:bg-white/90"
                
            }
        },
        defaultVariants: {
            variant: "default"
        }
    }
)

interface Props {
    label: string,
    id: string,
    icons: LucideIcon | IconType,
    variant?: VariantProps<typeof SidebarItemVariants>["variant"]
}

const SidebarItem = ({
    label,
    icons: Icon,
    id,
    variant
}: Props) => {

    const workspaceId = useWorkspaceId();

  return (
    <Button
    asChild
    variant={"transparent"} 
    size="sm"
    className={cn(SidebarItemVariants({variant: variant}))}>
        <Link href={`/workspace/${workspaceId}/channel/${id}`}>
        <Icon className="size-3.5 shrink-0"/>
        <span className="ml-1 text-sm truncate">
            {label}
        </span>
        </Link>
    </Button>
  )
}

export default SidebarItem