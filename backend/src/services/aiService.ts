import Groq from "groq-sdk";

function getGroqClient() {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GROQ_API_KEY is missing. Check your backend/.env file."
    );
  }

  return new Groq({
    apiKey,
  });
}

// =============================
// CHAT
// =============================
export const askAI = async (
  prompt: string,
  workspace: any
) => {

  const groq = getGroqClient();

  const completion =
    await groq.chat.completions.create({

      model: "llama-3.3-70b-versatile",

      messages: [

        {
          role: "system",
          content: `
You are Pulse AI.

You are an expert AI Project Manager.

Answer naturally.

Be concise.

Give practical advice.
`,
        },

        {
          role: "user",
          content: `
Workspace:

${JSON.stringify(workspace, null, 2)}

Question:

${prompt}
`,
        },

      ],

      temperature: 0.5,

    });

  return completion.choices[0].message.content ?? "";

};

// =============================
// WORKSPACE ANALYSIS
// =============================
export const analyzeWorkspace = async (
  workspace: any
) => {

  const groq = getGroqClient();

  const completion =
    await groq.chat.completions.create({

      model: "llama-3.3-70b-versatile",

      messages: [

        {
          role: "system",
          content: `
You are Pulse AI.

Analyze this workspace.

Return ONLY valid JSON.

{
  "health": 0,
  "productivity": "",
  "summary": "",
  "recommendation": "",
  "risks": []
}

Rules:
- health must be between 0 and 100
- productivity must be one of:
  "Excellent"
  "Good"
  "Average"
  "Poor"
- risks must always be an array
- Do not use markdown
- Do not explain anything
- Return JSON only
`,
        },

        {
          role: "user",
          content: JSON.stringify(workspace),
        },

      ],

      temperature: 0.3,

    });

  const content =
    completion.choices[0].message.content ?? "{}";

  try {
    return JSON.parse(content);
  } catch {

    console.error("Invalid JSON from Groq:");
    console.error(content);

    return {
      health: 0,
      productivity: "Average",
      summary: "Unable to analyze workspace.",
      recommendation: "Try again later.",
      risks: [],
    };
  }

};