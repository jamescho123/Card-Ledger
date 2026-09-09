import { withSupabase } from "npm:@supabase/server";

type RequestBody = {
  description?: string;
  series?: string;
  playerSubject?: string;
  parallel?: string;
  finish?: string;
  cardTitle?: string;
  cardNumber?: string;
};

const text = (value: unknown, limit: number) =>
  String(value ?? "").trim().slice(0, limit);

const json = (body: unknown, status = 200) =>
  Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });

export default {
  fetch: withSupabase({ auth: "user" }, async (request, context) => {
    if (request.method !== "POST") {
      return json({ message: "Method not allowed." }, 405);
    }

    const apiKey = Deno.env.get("OPENAI_API_KEY")?.trim();
    if (!apiKey) {
      return json({ message: "AI image generation is not configured yet." }, 503);
    }

    let body: RequestBody;
    try {
      body = await request.json();
    } catch {
      return json({ message: "Request body must be valid JSON." }, 400);
    }

    const description = text(body.description, 1200);
    const playerSubject = text(body.playerSubject, 120);
    if (description.length < 40 || !playerSubject) {
      return json({ message: "Add a subject and a description of at least 40 characters." }, 422);
    }

    const series = text(body.series, 100) || "Card Ledger Originals";
    const parallel = text(body.parallel, 100) || "Base";
    const finish = text(body.finish, 100) || "Premium printed finish";
    const cardTitle = text(body.cardTitle, 120) || playerSubject;
    const cardNumber = text(body.cardNumber, 40) || "01";

    const prompt = [
      "Create the complete front of an original, unofficial collectible sports or trading card.",
      "Show the entire vertical card centered and nearly filling the canvas, straight-on, with clean edges. Do not show hands, a slab, a top loader, a table, or scenery outside the card.",
      `Subject: ${playerSubject}.`,
      `User art direction: ${description}`,
      `Original series: ${series}. Parallel: ${parallel}. Finish: ${finish}. Card title concept: ${cardTitle}. Card number concept: ${cardNumber}.`,
      "Use premium print design, intentional hierarchy, convincing foil and refractor effects, and enough negative space to remain readable at phone size.",
      "This must be a new fan-made design. Do not copy an existing released card layout. Do not include manufacturer, league, team, grading-company, or marketplace logos. Do not fabricate an autograph, certification label, serial stamp, or official endorsement.",
      "Avoid dense small text. A simple invented title or number may appear, but prioritize the artwork because exact typography will be added by the app.",
    ].join("\n");

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-image-2",
        prompt,
        n: 1,
        size: "1024x1536",
        quality: "medium",
        output_format: "jpeg",
        output_compression: 88,
        moderation: "auto",
        user: String(context.userClaims?.sub ?? "authenticated-user"),
      }),
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      const message = payload?.error?.code === "moderation_blocked"
        ? "This description could not be generated. Revise the wording and try again."
        : payload?.error?.message || `Image generation failed (${response.status}).`;
      return json({ message }, response.status);
    }

    const imageBase64 = payload?.data?.[0]?.b64_json;
    if (!imageBase64) {
      return json({ message: "The image service returned no image." }, 502);
    }

    return json({
      image_base64: imageBase64,
      mime_type: "image/jpeg",
      model: "gpt-image-2",
      prompt,
    });
  }),
};
