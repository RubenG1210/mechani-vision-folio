const SYSTEM_PROMPT =
  "You are a mechatronics engineer formatting technical portfolio logs. Write cleanly and authentically without hype or AI buzzwords. Output Markdown with spec tables, bullet points, and code blocks.";

export const DEFAULT_MODEL = "grok-2-1212";

export async function listGrokModels(apiKey: string): Promise<string[]> {
  const res = await fetch("https://api.x.ai/v1/models", {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Model list failed (${res.status}). ${detail.slice(0, 200)}`);
  }
  const data = (await res.json()) as { data?: { id?: string }[] };
  return (data.data ?? []).map((m) => m.id).filter((id): id is string => Boolean(id));
}

export async function callGrok(
  apiKey: string,
  userContent: string,
  model: string = DEFAULT_MODEL
): Promise<string> {
  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userContent },
      ],
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Grok request failed (${res.status}). ${detail.slice(0, 200)}`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("Grok returned an empty response.");
  return content.trim();
}


export function formatPrompt(raw: string) {
  return `Format these raw build notes into a portfolio blog post in Markdown:\n\n${raw}`;
}

export function refinePrompt(markdown: string, instruction: string) {
  return `Here is the current Markdown post:\n\n${markdown}\n\nRevise it with this instruction: ${instruction}\n\nReturn only the full revised Markdown.`;
}
