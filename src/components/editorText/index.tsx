import React, { useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface EditorMessagesProps {
  value: string;
  onChange: (content: string) => void;
}

export const EditorMessages: React.FC<EditorMessagesProps> = ({
  value,
  onChange,
}) => {
  const quillRef = useRef<ReactQuill | null>(null);

  const handleChange = (content: string) => {
    onChange(content);
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: 1 }, { header: 2 }],
        [{ font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ align: [] }],

        ["link"],
        ["clean"],
      ],
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "list",
    "bullet",
    "indent",
    "direction",
    "align",
    "link",
    "image",
  ];

  return (
    <div className=" w-full h-96 overflow-auto bg-white  ">
      <ReactQuill
        ref={(ref) => (quillRef.current = ref)}
        theme="snow"
        className="h-full  border-none overflow-auto"
        value={value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};
