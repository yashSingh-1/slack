"use client"

import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";

export default function Home() {
  const {signOut} = useAuthActions();
  return (
    <div className="w-full h-screen bg-red-400">
      <div className="flex h-full justify-center items-center">
      Home Page
      <Button onClick={() => signOut()} >Sign Out</Button>
      </div>
    </div>
  );
}
