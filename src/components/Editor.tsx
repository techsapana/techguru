"use client";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView, lightDefaultTheme } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

interface EditorProps {
  value?: string;
  onChange?: (value: string) => void;
}

const EditorContent = dynamic(() => Promise.resolve(EditorContentComponent), {
  ssr: false,
});

function EditorContentComponent({
  value = "",
  onChange,
}: {
  value?: string;
  onChange?: (value: string) => void;
}) {
  const editor = useCreateBlockNote();
  const lastSyncedValueRef = useRef("");
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Sync external value changes (like selecting an item to edit) into the editor.
  useEffect(() => {
    const incomingValue = value ?? "";
    if (incomingValue === lastSyncedValueRef.current) return;

    if (!incomingValue) {
      editor.replaceBlocks(editor.document, [
        { type: "paragraph", content: "" },
      ]);
      lastSyncedValueRef.current = "";
      return;
    }

    try {
      const blocks = JSON.parse(incomingValue);
      editor.replaceBlocks(editor.document, blocks);
    } catch {
      // Backward compatibility for records saved as plain text.
      editor.replaceBlocks(editor.document, [
        { type: "paragraph", content: incomingValue },
      ]);
    }

    lastSyncedValueRef.current = incomingValue;
  }, [editor, value]);

  useEffect(() => {
    editor.onEditorContentChange(() => {
      const content = JSON.stringify(editor.document);
      lastSyncedValueRef.current = content;
      onChangeRef.current?.(content);
    });
  }, [editor]);

  return (
    <div className="w-full min-h-96 border-2 border-gray-300 rounded-lg overflow-hidden">
      <BlockNoteView editor={editor} theme={lightDefaultTheme} />
    </div>
  );
}

export default function Editor(props: EditorProps) {
  return <EditorContent {...props} />;
}
