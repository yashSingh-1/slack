"use client"

import CreateChannelModal from "@/features/channels/components/create-channel-modal"
import CreateWorkspaceModal from "@/features/workspaces/components/create-workspace-modal"
import { useEffect, useState } from "react"

const Modals = () => {
    // Preventing a potential hydration error from happening!
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true);
    }, [])

    if(!mounted) return null;

  return (
    <div>
      <CreateWorkspaceModal />
      <CreateChannelModal />
    </div>
  )
}

export default Modals
