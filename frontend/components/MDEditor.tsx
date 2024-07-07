"use client";
import { Options } from "easymde";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Skeleton } from "@/components";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => <Skeleton height={320} />,
});

interface Props {
  name: string;
  onChange: (value: string) => void;
  placeholder?: string;
  value?: string;
  error?: string;
}

const MDEditor = ({ name, error, onChange, placeholder, value }: Props) => {
  const customToolbar = useMemo(() => {
    return {
      toolbar: [
        "bold",
        "italic",
        "code",
        {
          name: "headers",
          className: "fa fa-header",
          title: "Headers",
          children: [
            "heading-1",
            "heading-2",
            "heading-3",
            "heading-bigger",
            "heading-smaller",
          ],
        },
        "link",
        "image",
        "redo",
        "undo",
        {
          name: "super-script",
          action: function (editor: any) {
            var cm = editor.codemirror;
            cm.replaceSelection("<sup>" + cm.getSelection() + "</sup>");
            cm.focus();
          },
          className: "fa fa-superscript",
          title: "Superscript",
        },
        {
          name: "sub-script",
          action: function (editor: any) {
            var cm = editor.codemirror;
            cm.replaceSelection("<sub>" + cm.getSelection() + "</sub>");
            cm.focus();
          },
          className: "fa fa-subscript",
          title: "Subscript",
        },
        {
          name: "others",
          className: "fa fa-ellipsis-h",
          title: "Other Buttons",
          children: [
            "table",
            "unordered-list",
            "ordered-list",
            "horizontal-rule",
            "quote",
            "guide",
            "strikethrough",
          ],
        },
        "preview",
        "side-by-side",
      ],
    } as Options;
  }, []);
  return (
    <div className={`w-full h-auto`}>
      <SimpleMDE
        id={`simple-mde-${name}`}
        value={value}
        placeholder={placeholder}
        className="h-auto"
        onChange={onChange}
        options={customToolbar}
      />
      {error && <div className="alert-error">{error}</div>}
    </div>
  );
};

export default MDEditor;
