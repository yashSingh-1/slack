import Quill, { QuillOptions } from "quill";
import "quill/dist/quill.snow.css";
import { MutableRefObject, use, useEffect, useLayoutEffect, useRef } from "react";
import { Button } from "./ui/button";
import { PiTextAa } from "react-icons/pi";
import { MdSend } from "react-icons/md";

import { ImageIcon, Smile } from "lucide-react";
import Hint from "./hint";
import { Delta, Op } from "quill/core";

type EDitorValue = {
    image: File | null;
    body: string;
}

interface EditorProps {
    variant: "create" | "update",
    onSubmit: ({ image, body }: EDitorValue) => void,
    onCancel?: () => void,
    placeholder?: string,
    defaultValue?: Delta | Op[],
    disabled?: boolean,
    innerRef?: MutableRefObject<Quill | null>
}

const editor = ({
    variant = "create",
    onCancel,
    onSubmit,
    placeholder = "Write Something... ",
    defaultValue = [],
    disabled=false,
    innerRef,
    }: EditorProps) => {
  const constainerRef = useRef<HTMLDivElement>(null);

  const submitref = useRef(onSubmit);
  const placeholderRef = useRef(placeholder);
  const quillRef = useRef<Quill | null>(null);
  const defaultValueref = useRef(defaultValue)
  const containerRef = useRef<HTMLDivElement>(null);
  const disabledRef = useRef(disabled)

  useLayoutEffect(() => {
    submitref.current = onSubmit;
    placeholderRef.current = placeholder;
    defaultValueref.current = defaultValue;
    disabledRef.current = disabled;
  })

  useEffect(() => {
    if (!constainerRef.current) return;

    const container = constainerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );

    const options: QuillOptions = {
      theme: "snow",
      placeholder: placeholderRef.current
    };

    new Quill(editorContainer, options);

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white">
        <div ref={constainerRef} className="h-full ql-custom" />
        <div className="flex px-2 pb-2 z-[5]">
          <Hint label="Hide Formatting">
            <Button
              disabled={false}
              size={"iconSm"}
              variant={"ghost"}
              onClick={() => {}}
            >
              <PiTextAa className="size-4" />
            </Button>
          </Hint>
          <Hint label="Emoji">
            <Button
              disabled={false}
              size={"iconSm"}
              variant={"ghost"}
              onClick={() => {}}
            >
              <Smile className="size-4" />
            </Button>
          </Hint>
          {
            variant === "create" && (
          <Hint label="Image">
            <Button
              disabled={false}
              size={"iconSm"}
              variant={"ghost"}
              onClick={() => {}}
            >
              <ImageIcon className="size-4" />
            </Button>
          </Hint>

            )
          }
          {
            variant === 'update' && (
                <div className="ml-auto flex items-center gap-x-2">
                    <Button
                        variant={"outline"}
                        size={"sm"}
                        onClick={() => {}}
                        disabled={false}
                    >
                        Cancel
                    </Button>
                    <Button
                        size={"sm"}
                        disabled={false}
                        onClick={() => {}}
                        className="bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"

                    >
                        Save
                    </Button>
                </div>
            )
          }
          {
            variant === "create" && (

          <Button
            className="ml-auto bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
            size={"iconSm"}
            disabled={false}
          >
            <MdSend className="size-4" />
          </Button>
            )
          }
        </div>
      </div>
      <div className="p-2 text-[10px] text-muted-foreground flex justify-end">
        <p>
            <strong>
                Shift + Return
            </strong>
            {" "}to add a new line
        </p>
      </div>
    </div>
  );
};

export default editor;
