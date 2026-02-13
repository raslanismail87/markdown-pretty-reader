export const sampleHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      max-width: 720px;
      margin: 2rem auto;
      padding: 0 1rem;
      color: #1a1a2e;
      background: #fafafa;
    }
    h1 {
      color: #16213e;
      border-bottom: 3px solid #0f3460;
      padding-bottom: 0.4rem;
    }
    h2 { color: #0f3460; }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1rem 0;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 0.6rem 0.8rem;
      text-align: left;
    }
    th {
      background: #0f3460;
      color: #fff;
    }
    tr:nth-child(even) { background: #f0f0f5; }
    ul { padding-left: 1.4rem; }
    li { margin-bottom: 0.3rem; }
    .badge {
      display: inline-block;
      padding: 0.15rem 0.5rem;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 600;
    }
    .badge-green  { background: #d4edda; color: #155724; }
    .badge-yellow { background: #fff3cd; color: #856404; }
    .badge-blue   { background: #cce5ff; color: #004085; }
  </style>
</head>
<body>
  <h1>HTML Preview Demo</h1>
  <p>This is a <strong>sample HTML document</strong> rendered inside a sandboxed iframe. Styles here do not affect the parent app.</p>

  <h2>Feature Comparison</h2>
  <table>
    <thead>
      <tr>
        <th>Feature</th>
        <th>Status</th>
        <th>Priority</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Markdown Preview</td>
        <td><span class="badge badge-green">Complete</span></td>
        <td>High</td>
      </tr>
      <tr>
        <td>CSV Preview</td>
        <td><span class="badge badge-green">Complete</span></td>
        <td>High</td>
      </tr>
      <tr>
        <td>HTML Preview</td>
        <td><span class="badge badge-yellow">In Progress</span></td>
        <td>Medium</td>
      </tr>
      <tr>
        <td>PDF Export</td>
        <td><span class="badge badge-blue">Planned</span></td>
        <td>Low</td>
      </tr>
    </tbody>
  </table>

  <h2>Key Highlights</h2>
  <ul>
    <li>Sandboxed rendering — scripts run inside the iframe only</li>
    <li>Inline <code>&lt;style&gt;</code> blocks are fully supported</li>
    <li>Paste any HTML snippet to see a live preview</li>
    <li>Switch between Markdown, CSV, and HTML modes</li>
  </ul>
</body>
</html>`;
