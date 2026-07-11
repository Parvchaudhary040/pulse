import React, { useState } from "react";
import { X, Sparkles } from "lucide-react";
import { askAI } from "../../services/aiService";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  workspaceContext: any;
}

export default function AIChatPanel({
  isOpen,
  onClose,
  workspaceContext,
}: Props) {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleAskAI = async () => {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      console.log("Workspace Context:", workspaceContext);
      const result = await askAI(prompt, workspaceContext);

      setReply(
        result.reply || "No response."
      );
    } catch (error) {
      console.error(error);
      setReply("Something went wrong.");
    }

    setLoading(false);
  };

  const handleSuggestion = (text: string) => {
    setPrompt(text);
  };

  return (
    <div className="fixed right-0 top-0 z-50 h-screen w-[400px] border-l border-default bg-surface shadow-2xl flex flex-col">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-default p-5">

        <div className="flex items-center gap-2">

          <Sparkles className="text-indigo-500" size={22} />

          <div>
            <h2 className="font-bold text-lg text-primary">
              Pulse AI
            </h2>

            <p className="text-xs text-secondary">
              Your Workspace Assistant
            </p>
          </div>

        </div>

        <button
          onClick={onClose}
          className="rounded-lg p-2 hover:bg-surface-2"
        >
          <X />
        </button>

      </div>

      {/* Body */}

      <div className="flex-1 overflow-y-auto p-6">

        <h3 className="text-xl font-bold text-primary mb-2">
          Hello 👋
        </h3>

        <p className="text-secondary mb-6">
          Ask anything about your projects, tasks or productivity.
        </p>

        {/* Suggestions */}

        <div className="space-y-2">

          <button
            onClick={() =>
              handleSuggestion("Summarize my workspace")
            }
            className="w-full rounded-lg border border-default p-3 text-left hover:bg-surface-2 transition"
          >
            📊 Summarize my workspace
          </button>

          <button
            onClick={() =>
              handleSuggestion("What should I work on today?")
            }
            className="w-full rounded-lg border border-default p-3 text-left hover:bg-surface-2 transition"
          >
            🔥 What should I work on today?
          </button>

          <button
            onClick={() =>
              handleSuggestion("Show my overdue tasks")
            }
            className="w-full rounded-lg border border-default p-3 text-left hover:bg-surface-2 transition"
          >
            ⚠️ Show overdue tasks
          </button>

          <button
            onClick={() =>
              handleSuggestion("Plan my week")
            }
            className="w-full rounded-lg border border-default p-3 text-left hover:bg-surface-2 transition"
          >
            📅 Plan my week
          </button>

        </div>

        {/* AI Response */}

        {reply && (

          <div className="mt-8 rounded-xl border border-default bg-surface-2 p-4">

            <div className="mb-3 flex items-center gap-2">

              <Sparkles
                size={16}
                className="text-indigo-500"
              />

              <h4 className="font-semibold text-primary">
                Pulse AI
              </h4>

            </div>

            <p className="whitespace-pre-wrap text-sm leading-6 text-secondary">
              {reply}
            </p>

          </div>

        )}

      </div>

      {/* Footer */}

      <div className="border-t border-default p-4">

        <textarea
          rows={3}
          value={prompt}
          onChange={(e) =>
            setPrompt(e.target.value)
          }
          placeholder="Ask Pulse anything..."
          className="w-full resize-none rounded-xl border border-default bg-app px-4 py-3 text-primary outline-none focus:border-indigo-500"
        />

        <button
          onClick={handleAskAI}
          disabled={loading}
          className="mt-3 w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Thinking..." : "✨ Ask Pulse"}
        </button>

      </div>

    </div>
  );
}