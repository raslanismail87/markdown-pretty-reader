

# Fix: Sample Markdown Not Showing in Editor

## Problem
The editor textarea starts empty while the preview shows the sample markdown. This happens because `markdown` state is initialized as an empty string `""`, but the preview uses a fallback: `const displayContent = markdown || sampleMarkdown`. So the preview gets the sample content, but the textarea only shows the empty `markdown` state.

## Solution
Initialize the `markdown` state with `sampleMarkdown` instead of an empty string. This way both the editor and preview show the same content on load.

## Technical Details

### `src/pages/Index.tsx`
- Change `useState("")` to `useState(sampleMarkdown)` on the markdown state initialization
- Remove the `displayContent` fallback variable since it's no longer needed -- just pass `markdown` directly to the preview
- The "Load Sample" button will still work (it sets `markdown` to `sampleMarkdown`)
- The "Clear" button will still work (it sets `markdown` to `""`)

