import Sidebar from "./Sidebar"
import Toolbar from "./toolbar"

interface WorkspaceIdLayoutProps {
    children: React.ReactNode
}

const layout = ({children}: WorkspaceIdLayoutProps) => {
  return (
    <div className="h-full">
        <Toolbar />
        <div className="flex h-[calc(100vh-40px)]">
          <Sidebar />
        {children}
        </div>
    </div>

  )
}

export default layout