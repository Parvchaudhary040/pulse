import Groq from "groq-sdk";

export const askAI = async (
  prompt: string,
  workspace: any
) => {

  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });


  const systemPrompt = `
You are Pulse AI.

You are an expert AI Project Manager.

The user will provide:

- Dashboard
- Projects
- Tasks
- Activity

Analyze everything before answering.

Always give practical advice.

If there are overdue tasks,
mention them.

If there are high priority tasks,
recommend them first.

Keep responses concise.

`;

  const completion =
    await groq.chat.completions.create({

      model: "llama-3.3-70b-versatile",

      messages: [

        {
          role: "system",
          content: systemPrompt,
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

      max_completion_tokens: 700,

    });

  return completion.choices[0].message.content;
};