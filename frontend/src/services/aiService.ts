import api from "./api";

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