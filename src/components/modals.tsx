"use client"

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
    </div>
  )
}

export default Modals
