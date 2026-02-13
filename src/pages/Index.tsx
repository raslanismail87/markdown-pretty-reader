import { useState, useRef } from "react";
import { Copy, Trash2, FileText, FileSpreadsheet, Check, AlignLeft, Columns2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import MarkdownPreview from "@/components/MarkdownPreview";
import CsvPreview from "@/components/CsvPreview";
import { sampleMarkdown } from "@/lib/sample-markdown";
import { sampleCsv } from "@/lib/sample-csv";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

type ViewMode = "edit" | "split" | "preview";
type ContentMode = "markdown" | "csv";

const Index = () => {
  const [markdown, setMarkdown] = useState(sampleMarkdown);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [contentMode, setContentMode] = useState<ContentMode>("markdown");
  const [separator, setSeparator] = useState(";");
  const isMobile = useIsMobile();
  const previewRef = useRef<HTMLDivElement>(null);

  const handleCopyHTML = async () => {
    if (previewRef.current) {
      const html = previewRef.current.innerHTML;
      await navigator.clipboard.writeText(html);
      setCopied(true);
      toast.success("HTML copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setMarkdown("");
    toast("Editor cleared");
  };

  const handleLoadSample = () => {
    setMarkdown(contentMode === "markdown" ? sampleMarkdown : sampleCsv);
    toast.success(`Sample ${contentMode === "markdown" ? "markdown" : "CSV"} loaded`);
  };

  const hasContent = markdown.length > 0;

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-border bg-background">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-semibold tracking-tight text-foreground">
            Markdown Prettier
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Tabs value={contentMode} onValueChange={(v) => setContentMode(v as ContentMode)}>
            <TabsList className="h-9">
              <TabsTrigger value="markdown">
                <FileText className="h-4 w-4 mr-1" />
                Markdown
              </TabsTrigger>
              <TabsTrigger value="csv">
                <FileSpreadsheet className="h-4 w-4 mr-1" />
                CSV
              </TabsTrigger>
            </TabsList>
          </Tabs>
          {contentMode === "csv" && (
            <Select value={separator} onValueChange={setSeparator}>
              <SelectTrigger className="h-9 w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=";">Semicolon</SelectItem>
                <SelectItem value=",">Comma</SelectItem>
                <SelectItem value={"\t"}>Tab</SelectItem>
                <SelectItem value="|">Pipe</SelectItem>
              </SelectContent>
            </Select>
          )}
          <ToggleGroup
            type="single"
            value={viewMode}
            onValueChange={(v) => v && setViewMode(v as ViewMode)}
            className="bg-muted rounded-lg p-0.5 gap-0"
          >
            <ToggleGroupItem value="edit" aria-label="Edit only" size="sm" className="rounded-md px-2 data-[state=on]:bg-background data-[state=on]:shadow-sm">
              <AlignLeft className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="split" aria-label="Split view" size="sm" className="rounded-md px-2 data-[state=on]:bg-background data-[state=on]:shadow-sm">
              <Columns2 className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="preview" aria-label="Preview only" size="sm" className="rounded-md px-2 data-[state=on]:bg-background data-[state=on]:shadow-sm">
              <Eye className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          <Button variant="ghost" size="sm" onClick={handleLoadSample}>
            <FileText className="h-4 w-4 mr-1" />
            Sample
          </Button>
          <Button variant="ghost" size="sm" onClick={handleClear} disabled={!hasContent}>
            <Trash2 className="h-4 w-4 mr-1" />
            Clear
          </Button>
          <Button variant="outline" size="sm" onClick={handleCopyHTML}>
            {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
            {copied ? "Copied" : "Copy HTML"}
          </Button>
        </div>
      </header>

      {/* Split Pane */}
      <div className={`flex flex-1 min-h-0 ${isMobile ? "flex-col" : "flex-row"}`}>
        {/* Editor */}
        {(viewMode === "edit" || viewMode === "split") && (
          <div className={`${viewMode === "split" ? (isMobile ? "h-1/2" : "w-1/2") : "flex-1"} ${viewMode === "split" ? "border-r border-border" : ""} flex flex-col`}>
            <div className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider border-b border-border bg-muted/30">
              {contentMode === "markdown" ? "Markdown" : "CSV"}
            </div>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder={contentMode === "markdown" ? "Paste or type your markdown here..." : "Paste or type your CSV data here..."}
              className="flex-1 w-full resize-none bg-background p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              spellCheck={false}
            />
          </div>
        )}

        {/* Preview */}
        {(viewMode === "preview" || viewMode === "split") && (
          <div className={`${viewMode === "split" ? (isMobile ? "h-1/2" : "w-1/2") : "flex-1"} flex flex-col`}>
            <div className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider border-b border-border bg-muted/30">
              Preview
            </div>
            <ScrollArea className="flex-1">
              <div ref={previewRef}>
                {contentMode === "markdown" ? (
                  <MarkdownPreview content={markdown} />
                ) : (
                  <CsvPreview content={markdown} separator={separator} />
                )}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
