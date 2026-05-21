'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Youtube from '@tiptap/extension-youtube';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading1, Heading2, Heading3, List, ListOrdered,
  Quote, Code, Minus, ImageIcon, Video,
  Table as TableIcon, AlignLeft, AlignCenter, AlignRight,
  Highlighter, Link as LinkIcon, Undo, Redo
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string, text: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Image,
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: 'noopener noreferrer' } }),
      Placeholder.configure({ placeholder: 'Start writing your article here... Use / for commands' }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight.configure({ multicolor: true }),
      Youtube.configure({ width: 640, height: 360 }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML(), editor.getText());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none',
      },
    },
  });

  if (!editor) return null;

  const ToolButton = ({ onClick, isActive, icon: Icon, title }: { onClick: () => void; isActive?: boolean; icon: React.ComponentType<{ className?: string }>; title: string }) => (
    <button
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded-lg transition-all ${isActive ? 'bg-cyan-500/20 text-cyan-400' : 'hover:bg-white/10'}`}
      style={!isActive ? { color: 'var(--admin-text-muted)' } : undefined}
    >
      <Icon className="w-4 h-4" />
    </button>
  );

  const addImage = () => {
    const url = prompt('Enter image URL:');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const addYoutube = () => {
    const url = prompt('Enter YouTube URL:');
    if (url) editor.commands.setYoutubeVideo({ src: url });
  };

  const addLink = () => {
    const url = prompt('Enter link URL:');
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  const addTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  return (
    <div className="tiptap-editor">
      {/* Toolbar */}
      <div
        className="sticky top-0 z-10 flex flex-wrap items-center gap-0.5 p-2 backdrop-blur-xl rounded-t-xl"
        style={{ background: 'var(--admin-card-bg)', borderBottom: '1px solid var(--admin-border)' }}
      >
        <ToolButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} icon={Heading1} title="Heading 1" />
        <ToolButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} icon={Heading2} title="Heading 2" />
        <ToolButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })} icon={Heading3} title="Heading 3" />

        <div className="w-px h-5 mx-1" style={{ background: 'var(--admin-border)' }} />

        <ToolButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} icon={Bold} title="Bold" />
        <ToolButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} icon={Italic} title="Italic" />
        <ToolButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} icon={UnderlineIcon} title="Underline" />
        <ToolButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} icon={Strikethrough} title="Strikethrough" />
        <ToolButton onClick={() => editor.chain().focus().toggleHighlight().run()} isActive={editor.isActive('highlight')} icon={Highlighter} title="Highlight" />

        <div className="w-px h-5 mx-1" style={{ background: 'var(--admin-border)' }} />

        <ToolButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} icon={List} title="Bullet List" />
        <ToolButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} icon={ListOrdered} title="Ordered List" />
        <ToolButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} icon={Quote} title="Blockquote" />
        <ToolButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive('codeBlock')} icon={Code} title="Code Block" />
        <ToolButton onClick={() => editor.chain().focus().setHorizontalRule().run()} icon={Minus} title="Horizontal Rule" />

        <div className="w-px h-5 mx-1" style={{ background: 'var(--admin-border)' }} />

        <ToolButton onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })} icon={AlignLeft} title="Align Left" />
        <ToolButton onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })} icon={AlignCenter} title="Align Center" />
        <ToolButton onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })} icon={AlignRight} title="Align Right" />

        <div className="w-px h-5 mx-1" style={{ background: 'var(--admin-border)' }} />

        <ToolButton onClick={addLink} isActive={editor.isActive('link')} icon={LinkIcon} title="Add Link" />
        <ToolButton onClick={addImage} icon={ImageIcon} title="Add Image" />
        <ToolButton onClick={addYoutube} icon={Video} title="Add YouTube Video" />
        <ToolButton onClick={addTable} icon={TableIcon} title="Insert Table" />

        <div className="flex-1" />

        <ToolButton onClick={() => editor.chain().focus().undo().run()} icon={Undo} title="Undo" />
        <ToolButton onClick={() => editor.chain().focus().redo().run()} icon={Redo} title="Redo" />
      </div>

      {/* Editor Content */}
      <div className="min-h-[500px] rounded-b-xl" style={{ background: 'var(--admin-card-bg)' }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
