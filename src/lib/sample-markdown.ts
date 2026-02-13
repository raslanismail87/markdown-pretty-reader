export const sampleMarkdown = `# Welcome to Markdown Prettier

A clean way to read and preview your markdown content.

## Features

- **Bold text** and *italic text*
- [Links](https://example.com) that stand out
- Images, tables, and more

### Code Blocks

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet("World");
\`\`\`

Inline code works too: \`const x = 42;\`

### Blockquotes

> "The best way to predict the future is to invent it."
> — Alan Kay

### Lists

1. First ordered item
2. Second ordered item
3. Third ordered item

- Unordered item
- Another item
  - Nested item

### Tables

| Feature | Status |
|---------|--------|
| Headings | ✅ |
| Bold & Italic | ✅ |
| Code Blocks | ✅ |
| Tables | ✅ |
| Blockquotes | ✅ |
| Mermaid Diagrams | ✅ |

### Diagrams

Mermaid diagrams are rendered automatically from fenced code blocks:

\`\`\`mermaid
flowchart LR
    A[Write Markdown] --> B[Preview]
    B --> C{Looks good?}
    C -->|Yes| D[Copy HTML]
    C -->|No| A
\`\`\`

\`\`\`mermaid
sequenceDiagram
    participant User
    participant App
    User->>App: Paste markdown
    App->>App: Parse & render
    App-->>User: Live preview
    User->>App: Copy HTML
    App-->>User: Clipboard updated
\`\`\`

---

*Start pasting your markdown on the left to see it rendered here.*
`;
