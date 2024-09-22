import Quill, { QuillOptions } from "quill"
import "quill/dist/quill.snow.css";
import { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { PiIcon } from "lucide-react";

const editor = () => {
    const constainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!constainerRef.current) return;

        const container = constainerRef.current;
        const editorContainer = container.appendChild(
            container.ownerDocument.createElement("div")
        );

        const options: QuillOptions = {
            theme: "snow"
        }

         new Quill(editorContainer, options)

        return () => {
            if(container) {
                container.innerHTML = ""
            }
        }
    }, [])

  return (
    <div className="flex flex-col">
<div className="flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white">
        <div ref={constainerRef} className="h-full ql-custom"/>
        <div className="flex px-2 pb-2 z-[5]">
            <Button>
                <PiIcon />
            </Button>
        </div>
    </div>
    </div>

  )
}

export default editor