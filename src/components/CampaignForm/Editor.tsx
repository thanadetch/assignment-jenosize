"use client"
import {RichTextEditor, RichTextEditorRef} from "mui-tiptap";
import {useRef, useEffect} from "react";
import EditorMenuControls from "@/components/CampaignForm/EditorMenuControls";
import useExtensions from "@/hooks/UseExtensionsOptions";

interface EditorProps {
    content?: string;
    onChange?: (content: string) => void;
    placeholder?: string;
}

export const Editor = ({
    content = "",
    onChange,
    placeholder = "Add your email content here..."
}: EditorProps) => {
    const extensions = useExtensions({
        placeholder,
    });

    const rteRef = useRef<RichTextEditorRef>(null);

    // Update editor content when content prop changes
    useEffect(() => {
        if (rteRef.current && rteRef.current.editor) {
            rteRef.current.editor.commands.setContent(content);
        }
    }, [content]);

    return (
        <RichTextEditor
            ref={rteRef}
            extensions={extensions}
            content={content}
            onUpdate={({editor}) => {
                const html = editor.getHTML();
                onChange?.(html);
            }}
            renderControls={() => <EditorMenuControls/>}

            editorProps={{
                attributes: {
                    style: 'min-height: 200px;'
                }
            }}
        />
    );
};