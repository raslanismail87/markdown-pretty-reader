

# Three View Modes: Preview, Split, and Edit

Add a view mode toggle to the header that lets users switch between three layouts:

1. **Edit** -- Shows only the markdown editor (full width)
2. **Split** -- Shows both editor and preview side by side (current default behavior)
3. **Preview** -- Shows only the rendered preview (full width)

## Changes

### `src/pages/Index.tsx`
- Add a `viewMode` state with values `"edit" | "split" | "preview"`, defaulting to `"split"`
- Add a toggle group in the header (using icons similar to the reference image) with three buttons:
  - Edit icon (lines/list icon) for edit-only mode
  - Split icon (columns icon) for split view
  - Preview icon (eye/document icon) for preview-only mode
- Conditionally render the editor pane (visible in "edit" and "split" modes)
- Conditionally render the preview pane (visible in "preview" and "split" modes)
- When in single-pane mode, the visible pane takes full width/height

### Icons
Use Lucide icons: `AlignLeft` (edit), `Columns2` (split), `Eye` (preview) -- or similar icons that match the reference image's minimal toolbar style.

### Styling
- The toggle group will use a compact, icon-only button group in the header, styled similarly to the reference screenshot (dark rounded pill with icon buttons)
- Active mode gets a highlighted/selected state

