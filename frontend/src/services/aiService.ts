import api from "./api";

// CHAT
export const askAI = async (
  prompt: string,
  workspace: any
) => {

  const response =
    await api.post("/ai/chat", {

      prompt,

      workspace,

    });

  return response.data;

};

// WORKSPACE INSIGHTS
export const getWorkspaceInsight =
  async (workspace: any) => {

    const response =
      await api.post("/ai/workspace", {

        workspace,

      });

    return response.data;

};