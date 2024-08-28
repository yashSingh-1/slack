"use client"

import UserButton from "@/features/auth/components/user-button";

export default function Home() {
  return (
    <div className="w-full h-screen">
      <div className="flex h-full space-x-4 justify-center items-center">
      <UserButton />
      </div>
    </div>
  );
}
