"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "../api/use-current-user";
import { Loader, LogOut } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

const UserButton = () => {
    const { signOut } = useAuthActions()
  const { data, isLoading } = useCurrentUser();

  if (isLoading) {
    return <Loader className="size-5 animate-spin text-muted-foreground" />;
  }

  if (!data) {
    return null;
  }

  const { image, name, email } = data;

  const fallback = name?.charAt(0).toUpperCase();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opacity-75 transition rounded-md">
          {image ? (
            <AvatarImage src={image} className="rounded-md"/>
          ) : (
            <AvatarFallback className="font-mono rounded-md text-xl">{fallback}</AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="right" className="w-60">
        <DropdownMenuItem onClick={() => signOut()} className="h-10">
            <LogOut className="size-5 mr-2"/>
            <span>
                Log Out
            </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
