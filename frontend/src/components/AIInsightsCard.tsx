import {
  Sparkles,
  ShieldCheck,
  TriangleAlert,
  Lightbulb,
  TrendingUp,
  RefreshCcw,
  CheckCircle2,
} from "lucide-react";

import { AIWorkspaceInsight } from "../types";

interface Props {
  insight: AIWorkspaceInsight | null;
  loading: boolean;
}

export default function AIInsightsCard({
  insight,
  loading,
}: Props) {

  const getHealthColor = (health: number) => {
    if (health >= 90) return "text-green-500";
    if (health >= 70) return "text-orange-500";
    return "text-red-500";
  };

  const getHealthBadge = (health: number) => {
    if (health >= 90)
      return "bg-green-500/10 text-green-500";

    if (health >= 70)
      return "bg-orange-500/10 text-orange-500";

    return "bg-red-500/10 text-red-500";
  };

  const getHealthLabel = (health: number) => {
    if (health >= 90) return "Excellent";
    if (health >= 70) return "Good";
    return "Needs Attention";
  };

  const getProductivityColor = (
    productivity: string
  ) => {

    switch (productivity) {

      case "Excellent":
        return "text-green-500";

      case "Good":
        return "text-indigo-500";

      case "Average":
        return "text-orange-500";

      default:
        return "text-red-500";

    }

  };

  return (

    <div className="rounded-2xl border border-default bg-surface p-6">

      {/* Header */}

      <div className="mb-6 flex items-center gap-3">

        <Sparkles
          size={22}
          className="text-indigo-500"
        />

        <div>

          <h2 className="text-xl font-bold text-primary">

            AI Workspace Insights

          </h2>

          <p className="text-xs text-secondary">

            Powered by Pulse AI

          </p>

        </div>

      </div>

      {/* Loading */}

      {loading ? (

        <div className="flex items-center gap-3 rounded-xl bg-surface-2 p-5">

          <RefreshCcw
            size={18}
            className="animate-spin text-indigo-500"
          />

          <span className="text-secondary">

            Analyzing your workspace...

          </span>

        </div>

      ) : !insight ? (

        <div className="rounded-xl bg-surface-2 p-6 text-center">

          <Sparkles
            size={28}
            className="mx-auto mb-3 text-indigo-500"
          />

          <p className="text-secondary">

            No AI analysis available.

          </p>

        </div>

      ) : (

        <div className="space-y-6">

          {/* Workspace Health */}

          <div className="rounded-xl bg-indigo-500/10 p-5">

            <div className="mb-3 flex items-center gap-2">

              <ShieldCheck
                size={18}
                className="text-green-500"
              />

              <span className="font-semibold">

                Workspace Analysis

              </span>

            </div>

            <h2
              className={`text-5xl font-black ${getHealthColor(
                insight.health
              )}`}
            >

              {insight.health}%

            </h2>

            <span
              className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getHealthBadge(
                insight.health
              )}`}
            >

              {getHealthLabel(insight.health)}

            </span>

            <p className="mt-3 text-sm text-secondary">

              Workspace Health Score

            </p>

          </div>

          {/* Summary */}

          <div className="rounded-xl bg-surface-2 p-5">

            <h3 className="mb-2 font-semibold">

              Summary

            </h3>

            <p className="leading-7 text-secondary">

              {insight.summary}

            </p>

          </div>

          {/* Recommendation */}

          <div className="rounded-xl bg-emerald-500/10 p-5">

            <div className="mb-2 flex items-center gap-2">

              <Lightbulb
                size={18}
                className="text-yellow-400"
              />

              <h3 className="font-semibold">

                Recommendation

              </h3>

            </div>

            <p className="leading-7">

              {insight.recommendation}

            </p>

          </div>

          {/* Risks */}

          <div className="rounded-xl bg-orange-500/10 p-5">

            <div className="mb-3 flex items-center gap-2">

              <TriangleAlert
                size={18}
                className="text-orange-500"
              />

              <h3 className="font-semibold">

                Risks

              </h3>

            </div>

            {insight.risks.length === 0 ? (

              <div className="flex items-center gap-2 text-green-500">

                <CheckCircle2 size={18} />

                <span>

                  No significant risks detected.

                </span>

              </div>

            ) : (

              <ul className="list-disc space-y-2 pl-5">

                {insight.risks.map((risk, index) => (

                  <li key={index}>

                    {risk}

                  </li>

                ))}

              </ul>

            )}

          </div>

          {/* Productivity */}

          <div className="rounded-xl bg-surface-2 p-5">

            <div className="mb-2 flex items-center gap-2">

              <TrendingUp
                size={18}
                className="text-indigo-500"
              />

              <strong>

                Productivity

              </strong>

            </div>

            <p
              className={`text-lg font-semibold ${getProductivityColor(
                insight.productivity
              )}`}
            >

              {insight.productivity}

            </p>

          </div>

          <div className="text-right text-xs text-secondary">

            Updated automatically

          </div>

        </div>

      )}

    </div>

  );

}