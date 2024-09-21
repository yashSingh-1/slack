import Quill from "quill"
import "quill/dist/quill.core.css";

const editor = () => {
  return (
    <div className="flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white">
        <div>
            Editor
        </div>
    </div>

  )
}

export default editor