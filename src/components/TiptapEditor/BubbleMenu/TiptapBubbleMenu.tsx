"use client";

import { Editor, useEditorState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { ActionIcon, Box } from "@mantine/core";
import { RiBold, RiItalic, RiUnderline } from "@remixicon/react";

import classes from "./TiptapBubbleMenu.module.css";
import BubbleMenuControl from "../BubbleMenuControl/BubbleMenuControl";

interface TiptapBubbleMenuProps {
    editor: Editor | null;
}

const TiptapBubbleMenu = ({ editor }: TiptapBubbleMenuProps) => {
    const editorState = useEditorState({
        editor,
        selector: (ctx) => ({
            isBold: ctx.editor?.isActive("bold"),
            isItalic: ctx.editor?.isActive("italic"),
            isUnderline: ctx.editor?.isActive("underline"),
            // isStrikethrough: ctx.editor?.isActive("strike"),
        }),
    });

    const { isBold, isItalic, isUnderline } = editorState ?? {
        isBold: false,
        isItalic: false,
        isUnderline: false,
    };

    return (
        <Box>
            {editor && (
                <BubbleMenu editor={editor}>
                    <Box className={classes.bubbleMenu}>
                        <ActionIcon.Group>
                            <BubbleMenuControl
                                active={isBold}
                                onClick={() =>
                                    editor.chain().focus().toggleBold().run()
                                }
                            >
                                <RiBold size={20} />
                            </BubbleMenuControl>

                            <BubbleMenuControl
                                active={isItalic}
                                onClick={() =>
                                    editor.chain().focus().toggleItalic().run()
                                }
                            >
                                <RiItalic size={20} />
                            </BubbleMenuControl>

                            <BubbleMenuControl
                                active={isUnderline}
                                onClick={() =>
                                    editor
                                        .chain()
                                        .focus()
                                        .toggleUnderline()
                                        .run()
                                }
                            >
                                <RiUnderline size={20} />
                            </BubbleMenuControl>
                        </ActionIcon.Group>
                    </Box>
                </BubbleMenu>
            )}
        </Box>
    );
};

export default TiptapBubbleMenu;
