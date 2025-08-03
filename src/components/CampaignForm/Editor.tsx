"use client"
import {RichTextEditor, RichTextEditorRef} from "mui-tiptap";
import EditorMenuControls from "@/components/CampaignForm/EditorMenuControls";
import useExtensions from "@/hooks/UseExtensionsOptions";
import {forwardRef} from "react";

interface EditorProps {
    content?: string;
    onChange?: (content: string) => void;
    placeholder?: string;
}

export const Editor = forwardRef<RichTextEditorRef, EditorProps>(({
    content = "",
    onChange,
    placeholder = "Add your email content here...",
}, ref) => {
    const extensions = useExtensions({
        placeholder,
    });

    return (
        <RichTextEditor
            ref={ref}
            content={content}
            editable
            extensions={extensions}
            onUpdate={({editor}) => {
                const html = editor.getHTML();
                onChange?.(html);
            }}
            renderControls={() => <EditorMenuControls/>}
            editorProps={{
                attributes: {
                    style: 'min-height: 300px;'
                }
            }}
        />
    );
});

Editor.displayName = "Editor";