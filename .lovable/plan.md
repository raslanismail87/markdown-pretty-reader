

# Add Mermaid.js Diagram Rendering

Render mermaid code blocks as visual diagrams instead of raw text.

## Approach

Install the `mermaid` library and create a Mermaid renderer component. Then update the `MarkdownPreview` component to detect code blocks with language "mermaid" and render them as diagrams.

## Changes

### 1. Install dependency
- `mermaid` -- the official Mermaid.js library for rendering diagrams

### 2. Create `src/components/MermaidDiagram.tsx`
- A component that accepts a `chart` string prop
- Uses `useEffect` to call `mermaid.render()` with the chart definition
- Displays the resulting SVG via `dangerouslySetInnerHTML`
- Generates a unique ID per instance to avoid conflicts
- Handles render errors gracefully (falls back to showing raw text in a code block)
- Configures mermaid with `theme: 'default'` (light mode) and `startOnLoad: false`

### 3. Update `src/components/MarkdownPreview.tsx`
- In the `code` component override, add a check: if the language is `mermaid`, render `<MermaidDiagram chart={children} />` instead of `SyntaxHighlighter`
- All other code blocks remain unchanged

## Technical Details

- Mermaid is initialized once with `mermaid.initialize({ startOnLoad: false, theme: 'default' })`
- Each diagram gets a unique ID using a counter or `crypto.randomUUID()` to support multiple diagrams on the same page
- The component re-renders the diagram when the chart content changes
- Error state shows the raw mermaid text with an error message so users can debug their syntax

