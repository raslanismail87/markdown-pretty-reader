

# Remove "Copy HTML" Button

Remove the "Copy HTML" button and all associated logic from the header toolbar.

## Changes

### `src/pages/Index.tsx`
- Remove the `copied` state variable
- Remove the `handleCopyHTML` function
- Remove the `previewRef` ref (only used for copying HTML)
- Remove the `ref={previewRef}` attributes from the preview divs
- Remove the "Copy HTML" `<Button>` from the header
- Remove unused imports: `Copy`, `Check`, and `useRef`

