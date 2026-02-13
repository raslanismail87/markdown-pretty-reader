import Papa from "papaparse";
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
}

const CsvPreview = ({ content, separator }: CsvPreviewProps) => {
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

  return (
    <div className="px-8 py-6">
      <div className="overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              {headers.map((header) => (
                <TableHead
                  key={header}
                  className="px-4 py-2.5 font-semibold text-foreground"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {result.data.map((row, i) => (
              <TableRow key={i}>
                {headers.map((header) => (
                  <TableCell
                    key={header}
                    className="px-4 py-2.5 text-foreground"
                  >
                    {row[header]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CsvPreview;
