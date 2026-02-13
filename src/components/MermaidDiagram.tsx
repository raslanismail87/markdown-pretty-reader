import { useCallback, useEffect, useId, useState } from "react";
import mermaid from "mermaid";
import { Maximize2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useDebouncedValue } from "@/hooks/use-debounced-value";

mermaid.initialize({ startOnLoad: false, theme: "default" });

interface MermaidDiagramProps {
  chart: string;
}

const MermaidDiagram = ({ chart }: MermaidDiagramProps) => {
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const id = useId().replace(/:/g, "_");

  const debouncedChart = useDebouncedValue(chart, 300);

  const cleanupOrphanElements = useCallback(() => {
    const orphan = document.getElementById(`dmermaid-${id}`);
    if (orphan) orphan.remove();
  }, [id]);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    const render = async () => {
      try {
        const { svg: renderedSvg } = await mermaid.render(
          `mermaid-${id}`,
          debouncedChart
        );
        if (!cancelled) {
          setSvg(renderedSvg);
          setError("");
          setIsLoading(false);
        }
      } catch (e) {
        cleanupOrphanElements();
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to render diagram");
          setSvg("");
          setIsLoading(false);
        }
      }
    };

    render();

    return () => {
      cancelled = true;
      cleanupOrphanElements();
    };
  }, [debouncedChart, id, cleanupOrphanElements]);

  if (error) {
    return (
      <div className="my-4 rounded-lg border border-destructive/50 bg-destructive/5 p-4">
        <p className="text-sm font-medium text-destructive mb-2">
          Diagram syntax error
        </p>
        <pre className="text-sm bg-muted rounded p-3 overflow-x-auto whitespace-pre-wrap">
          <code>{chart}</code>
        </pre>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="my-4 rounded-lg border border-border bg-muted/50 p-4">
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  return (
    <>
      <div className="group my-4 relative rounded-lg border border-border bg-muted/50 p-4">
        <button
          type="button"
          onClick={() => setDialogOpen(true)}
          className="absolute top-2 right-2 rounded-md p-1.5 text-muted-foreground opacity-0 transition-opacity hover:bg-accent hover:text-accent-foreground group-hover:opacity-100"
          aria-label="Expand diagram"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
        <div
          className="flex justify-center overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] w-fit overflow-auto">
          <DialogTitle className="sr-only">Diagram preview</DialogTitle>
          <DialogDescription className="sr-only">
            Expanded view of the mermaid diagram
          </DialogDescription>
          <div
            className="flex justify-center p-4"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MermaidDiagram;
