import { useState, useRef, useEffect } from "react";
import Papa from "papaparse";
import { Plus } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

interface CsvPreviewProps {
  content: string;
  separator: string;
  onContentChange?: (newCsv: string) => void;
}

const CsvPreview = ({ content, separator, onContentChange }: CsvPreviewProps) => {
  const [editingCell, setEditingCell] = useState<{ row: number; col: string } | null>(null);
  const [editValue, setEditValue] = useState("");
  const [insertColAt, setInsertColAt] = useState<number | null>(null);
  const [newColumnName, setNewColumnName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const newColInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingCell && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingCell]);

  useEffect(() => {
    if (insertColAt !== null && newColInputRef.current) {
      newColInputRef.current.focus();
    }
  }, [insertColAt]);

  if (!content.trim()) {
    return (
      <div className="px-8 py-6 text-muted-foreground text-sm">
        No CSV data to display. Paste or type CSV content in the editor.
      </div>
    );
  }

  const result = Papa.parse<Record<string, string>>(content, {
    header: true,
    skipEmptyLines: true,
    delimiter: separator,
  });

  if (result.errors.length > 0 && result.data.length === 0) {
    return (
      <div className="px-8 py-6">
        <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-4">
          <p className="text-sm font-medium text-destructive mb-2">
            Failed to parse CSV
          </p>
          <pre className="text-sm bg-muted rounded p-3 overflow-x-auto whitespace-pre-wrap">
            {result.errors.map((e) => e.message).join("\n")}
          </pre>
        </div>
      </div>
    );
  }

  const headers = result.meta.fields ?? [];

  const handleDoubleClick = (row: number, col: string, value: string) => {
    setEditingCell({ row, col });
    setEditValue(value ?? "");
  };

  const commitEdit = () => {
    if (!editingCell || !onContentChange) {
      setEditingCell(null);
      return;
    }
    const updated = result.data.map((row, i) =>
      i === editingCell.row ? { ...row, [editingCell.col]: editValue } : row
    );
    const newCsv = Papa.unparse(updated, { delimiter: separator });
    onContentChange(newCsv);
    setEditingCell(null);
  };

  const cancelEdit = () => {
    setEditingCell(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      commitEdit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      cancelEdit();
    }
  };

  const addRow = () => {
    if (!onContentChange) return;
    const emptyRow: Record<string, string> = {};
    headers.forEach((h) => (emptyRow[h] = ""));
    const updated = [...result.data, emptyRow];
    const newCsv = Papa.unparse(updated, { delimiter: separator });
    onContentChange(newCsv);
  };

  const startAddColumn = (index: number) => {
    setInsertColAt(index);
    setNewColumnName("");
  };

  const commitAddColumn = () => {
    const name = newColumnName.trim();
    if (!name || !onContentChange || insertColAt === null) {
      cancelAddColumn();
      return;
    }
    if (headers.includes(name)) {
      cancelAddColumn();
      return;
    }
    const newHeaders = [...headers];
    newHeaders.splice(insertColAt, 0, name);
    const updated = result.data.map((row) => ({ ...row, [name]: "" }));
    const newCsv = Papa.unparse(updated, {
      columns: newHeaders,
      delimiter: separator,
    });
    onContentChange(newCsv);
    setInsertColAt(null);
    setNewColumnName("");
  };

  const cancelAddColumn = () => {
    setInsertColAt(null);
    setNewColumnName("");
  };

  return (
    <div className="px-8 py-6">
      <div className="overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader className="bg-muted/50 group/header">
            {onContentChange && (
              <TableRow className="border-b-0 hover:bg-transparent opacity-0 group-hover/header:opacity-100 transition-opacity">
                {headers.map((header, colIndex) => (
                  <TableHead key={colIndex} className="relative h-6 p-0 border-b-0">
                    {insertColAt === colIndex + 1 ? (
                      <div className="absolute -right-[75px] top-full z-20 mt-1">
                        <input
                          ref={newColInputRef}
                          value={newColumnName}
                          onChange={(e) => setNewColumnName(e.target.value)}
                          onBlur={commitAddColumn}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") { e.preventDefault(); commitAddColumn(); }
                            else if (e.key === "Escape") { e.preventDefault(); cancelAddColumn(); }
                          }}
                          placeholder="Column name"
                          className="w-[150px] rounded-md border border-border bg-background px-2 py-1 text-sm shadow-md outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    ) : (
                      <button
                        onClick={() => startAddColumn(colIndex + 1)}
                        className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-background border border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                        title={`Insert column after "${header}"`}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    )}
                  </TableHead>
                ))}
                <TableHead className="h-6 p-0 border-b-0" />
              </TableRow>
            )}
            <TableRow>
              {headers.map((header) => (
                <TableHead
                  key={header}
                  className="px-4 py-2.5 font-semibold text-foreground border-r border-border last:border-r-0"
                >
                  {header}
                </TableHead>
              ))}
              {onContentChange && <TableHead className="px-2 py-2.5 w-10" />}
            </TableRow>
          </TableHeader>
          <TableBody>
            {result.data.map((row, i) => (
              <TableRow key={i}>
                {headers.map((header) => {
                  const isEditing = editingCell?.row === i && editingCell?.col === header;
                  return (
                    <TableCell
                      key={header}
                      className={`px-4 py-2.5 text-foreground border-r border-border last:border-r-0 ${isEditing ? "ring-2 ring-primary rounded" : ""}`}
                      onDoubleClick={() => handleDoubleClick(i, header, row[header])}
                    >
                      {isEditing ? (
                        <input
                          ref={inputRef}
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={commitEdit}
                          onKeyDown={handleKeyDown}
                          className="w-full bg-transparent outline-none border-none p-0 m-0 font-inherit text-inherit text-sm"
                        />
                      ) : (
                        row[header]
                      )}
                    </TableCell>
                  );
                })}
                {onContentChange && <TableCell className="px-2 py-2.5" />}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {onContentChange && (
          <button
            onClick={addRow}
            className="flex items-center justify-center gap-1 w-full py-1.5 text-xs text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors border-t border-border"
            title="Add row"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CsvPreview;
