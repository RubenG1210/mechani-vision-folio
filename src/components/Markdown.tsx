type Props = { source: string };

function inline(text: string) {
  const html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-accent text-forest font-mono text-[0.85em]">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a class="link-forest underline" href="$2">$1</a>');
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export function Markdown({ source }: Props) {
  const lines = source.split("\n");
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim().startsWith("```")) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        code.push(lines[i]);
        i++;
      }
      i++;
      blocks.push(
        <pre
          key={key++}
          className="overflow-x-auto rounded-lg border border-forest/30 bg-black/40 p-4 text-sm font-mono text-foreground/90"
        >
          <code>{code.join("\n")}</code>
        </pre>,
      );
      continue;
    }

    if (/^\s*\|.*\|\s*$/.test(line)) {
      const rows: string[] = [];
      while (i < lines.length && /^\s*\|.*\|\s*$/.test(lines[i])) {
        rows.push(lines[i]);
        i++;
      }
      const cells = rows
        .filter((r) => !/^\s*\|[\s:|-]+\|\s*$/.test(r))
        .map((r) =>
          r
            .trim()
            .replace(/^\|/, "")
            .replace(/\|$/, "")
            .split("|")
            .map((c) => c.trim()),
        );
      const [head, ...body] = cells;
      blocks.push(
        <div key={key++} className="overflow-x-auto">
          <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
            {head && (
              <thead className="bg-accent/60">
                <tr>
                  {head.map((c, ci) => (
                    <th key={ci} className="px-3 py-2 text-left font-medium text-forest">
                      {inline(c)}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {body.map((row, ri) => (
                <tr key={ri} className="border-t border-border/60">
                  {row.map((c, ci) => (
                    <td key={ci} className="px-3 py-2 align-top">
                      {inline(c)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    if (/^\s*([-*]|\d+\.)\s+/.test(line)) {
      const items: string[] = [];
      const ordered = /^\s*\d+\.\s+/.test(line);
      while (i < lines.length && /^\s*([-*]|\d+\.)\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*([-*]|\d+\.)\s+/, ""));
        i++;
      }
      const ListTag = ordered ? "ol" : "ul";
      blocks.push(
        <ListTag
          key={key++}
          className={`ml-5 space-y-2 ${ordered ? "list-decimal" : "list-disc"} marker:text-forest`}
        >
          {items.map((it, ii) => (
            <li key={ii}>{inline(it)}</li>
          ))}
        </ListTag>,
      );
      continue;
    }

    const heading = /^(#{1,4})\s+(.*)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      const sizes = ["text-3xl", "text-2xl", "text-xl", "text-lg"];
      blocks.push(
        <p
          key={key++}
          className={`font-display font-semibold ${sizes[level - 1]} mt-2`}
          role="heading"
          aria-level={level}
        >
          {inline(heading[2])}
        </p>,
      );
      i++;
      continue;
    }

    if (!line.trim()) {
      i++;
      continue;
    }

    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(#{1,4}\s|```|\s*[-*]\s|\s*\d+\.\s|\s*\|)/.test(lines[i])) {
      para.push(lines[i]);
      i++;
    }
    blocks.push(
      <p key={key++} className="leading-relaxed">
        {inline(para.join(" "))}
      </p>,
    );
  }

  return <div className="space-y-5 text-foreground/90">{blocks}</div>;
}
