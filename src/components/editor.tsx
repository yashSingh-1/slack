import Quill, { QuillOptions } from "quill";
import "quill/dist/quill.snow.css";
import {
  MutableRefObject,
  use,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Button } from "./ui/button";
import { PiTextAa } from "react-icons/pi";
import { MdSend } from "react-icons/md";

import { ImageIcon, Smile } from "lucide-react";
import Hint from "./hint";
import { Delta, Op } from "quill/core";
import { cn } from "@/lib/utils";
import Keyboard from "quill/modules/keyboard";

type EDitorValue = {
  image: File | null;
  body: string;
};

interface EditorProps {
  variant: "create" | "update";
  onSubmit: ({ image, body }: EDitorValue) => void;
  onCancel?: () => void;
  placeholder?: string;
  defaultValue?: Delta | Op[];
  disabled?: boolean;
  innerRef?: MutableRefObject<Quill | null>;
}

const editor = ({
  variant = "create",
  onCancel,
  onSubmit,
  placeholder = "Write Something... ",
  defaultValue = [],
  disabled = false,
  innerRef,
}: EditorProps) => {
  const [text, setText] = useState("");
  const constainerRef = useRef<HTMLDivElement>(null);
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);

  const submitref = useRef(onSubmit);
  const placeholderRef = useRef(placeholder);
  const quillRef = useRef<Quill | null>(null);
  const defaultValueref = useRef(defaultValue);
  const containerRef = useRef<HTMLDivElement>(null);
  const disabledRef = useRef(disabled);

  useLayoutEffect(() => {
    submitref.current = onSubmit;
    placeholderRef.current = placeholder;
    defaultValueref.current = defaultValue;
    disabledRef.current = disabled;
  });

  useEffect(() => {
    if (!constainerRef.current) return;

    const container = constainerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );

    const options: QuillOptions = {
      theme: "snow",
      placeholder: placeholderRef.current,
      modules: {
        toolbar: [
            ["bold", "italic", "strike"],
            ["link"],
            [{ list: "ordered"}, {list: "bullet"}]
        ],
        Keyboard: {
            bindings: {
                enter: {
                    key: "Enter",
                    handler: () => {
                        // TOdO: submit form
                        return;
                    }
                },
                shift_enter: {
                    key: "Enter",
                    shiftKey: true,
                    handler: () => {
                        quill.insertText(quill.getSelection()?.index || 0, "/n")
                    }
                }
            }
        }
      }
    };

    const quill = new Quill(editorContainer, options);
    quillRef.current = quill;
    quillRef.current.focus();

    if (innerRef) {
      innerRef.current = quill;
    }

    quill.setContents(defaultValueref.current )
    setText(quill.getText());

    quill.on(Quill.events.TEXT_CHANGE, () => {
        setText(quill.getText())
    })

    return () => {
        quill.off(Quill.events.TEXT_CHANGE);
      if (container) {
        container.innerHTML = "";
      }
      if(quillRef.current){
        quillRef.current = null;
      }
      if(innerRef) {
        innerRef.current = null;
      }
    };
  }, [innerRef]);

  const toggleToolbar = () => {
    setIsToolbarVisible((current) => !current);
    const toolbarElement = containerRef.current?.querySelector(".ql-toolbar");

    if(toolbarElement) {
        toolbarElement.classList.toggle("hidden");
    }
  }

  const isEmpty = text.replace(/<(.|\n)*?>/g, "").trim().length === 0;

  console.log("isEmpty", isEmpty, " : text: ", text)

  return (
    <div className="flex flex-col">
      <div className="flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white">
        <div ref={constainerRef} className="h-full ql-custom" />
        <div className="flex px-2 pb-2 z-[5]">
          <Hint label={isToolbarVisible ? "Hide Formatting" : "Show Formatting"}>
            <Button
              disabled={disabled}
              size={"iconSm"}
              variant={"ghost"}
              onClick={toggleToolbar}
            >
              <PiTextAa className="size-4" />
            </Button>
          </Hint>
          <Hint label="Emoji">
            <Button
              disabled={disabled}
              size={"iconSm"}
              variant={"ghost"}
              onClick={() => {}}
            >
              <Smile className="size-4" />
            </Button>
          </Hint>
          {variant === "create" && (
            <Hint label="Image">
              <Button
                disabled={disabled}
                size={"iconSm"}
                variant={"ghost"}
                onClick={() => {}}
              >
                <ImageIcon className="size-4" />
              </Button>
            </Hint>
          )}
          {variant === "update" && (
            <div className="ml-auto flex items-center gap-x-2">
              <Button
                variant={"outline"}
                size={"sm"}
                onClick={() => {}}
                disabled={disabled}
              >
                Cancel
              </Button>
              <Button
                size={"sm"}
                disabled={disabled || isEmpty}
                onClick={() => {}}
                className="bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
              >
                Save
              </Button>
            </div>
          )}
          {variant === "create" && (
            <Button
              className={
                cn("ml-auto", isEmpty 
                    ? "bg-white hover:bg-white text-muted-foreground"
                    : "bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
                )
            }
              size={"iconSm"}
              disabled={disabled || isEmpty}
            >
              <MdSend className="size-4" />
            </Button>
          )}
        </div>
      </div>
      <div className="p-2 text-[10px] text-muted-foreground flex justify-end">
        <p>
          <strong>Shift + Return</strong> to add a new line
        </p>
      </div>
    </div>
  );
};

export default editor;
