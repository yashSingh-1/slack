interface Props {
    children: React.ReactNode,
    label: string,
    hint: string,
    onNew?: () => void;
}

const WorkspaceSection = ({
    children,
    label,
    hint,
    onNew
}: Props) => {
  return (
    <div>
        {children}
    </div>
  )
}

export default WorkspaceSection