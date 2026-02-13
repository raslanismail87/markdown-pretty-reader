interface HtmlPreviewProps {
  content: string;
}

const HtmlPreview = ({ content }: HtmlPreviewProps) => {
  if (!content.trim()) {
    return (
      <div className="px-8 py-6 text-muted-foreground text-sm">
        No HTML to display. Paste or type HTML content in the editor.
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <iframe
        srcDoc={content}
        sandbox="allow-scripts"
        className="w-full h-full border-0"
        title="HTML Preview"
      />
    </div>
  );
};

export default HtmlPreview;
