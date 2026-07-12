import { Request, Response } from "express";
import * as aiService from "../services/aiService";

export const chat = async (
  req: Request,
  res: Response
) => {

  try {

    const { prompt, workspace } = req.body;

    const reply =
      await aiService.askAI(
        prompt,
        workspace
      );

    res.json({

      success: true,

      reply,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message: "AI request failed",

    });

  }

};

export const analyzeWorkspace = async (
  req: Request,
  res: Response
) => {

  try {

    const { workspace } = req.body;

    const insight =
      await aiService.analyzeWorkspace(workspace);

    res.json({
      success: true,
      insight,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "AI analysis failed",
    });

  }

};