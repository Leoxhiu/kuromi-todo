"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapBubbleMenu from "./BubbleMenu/TiptapBubbleMenu";
import { Box } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";

interface TiptapEditorProps {
    content?: string;
    handleContentChange: (content: string) => void;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const TiptapEditor = ({
    content,
    handleContentChange,
    setIsEditing,
}: TiptapEditorProps) => {
    const ref = useClickOutside(() => setIsEditing(false));

    const editor = useEditor({
        extensions: [StarterKit],
        content: content || "Type something...",
        autofocus: true,
        // Don't render immediately on the server to avoid SSR issues
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            handleContentChange(editor.getHTML() || "");
        },
    });

    return (
        <Box mt="xs" ref={ref}>
            <TiptapBubbleMenu editor={editor} />
            <EditorContent editor={editor} />
        </Box>
    );
};

export default TiptapEditor;
