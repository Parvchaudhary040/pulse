import {
  Sparkles,
  ShieldCheck,
  TriangleAlert,
  Lightbulb,
  TrendingUp,
  RefreshCcw,
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

  return (

    <div className="rounded-2xl border border-default bg-surface p-6">

      {/* Header */}

      <div className="mb-5 flex items-center gap-3">

        <Sparkles
          className="text-indigo-500"
          size={22}
        />

        <div>

          <h2 className="text-xl font-bold">
            AI Workspace Insights
          </h2>

          <p className="text-xs text-secondary">
            Powered by Pulse AI
          </p>

        </div>

      </div>

      {loading ? (

        <div className="flex items-center gap-3">

          <RefreshCcw
            size={18}
            className="animate-spin text-indigo-500"
          />

          <span className="text-secondary">
            Analyzing your workspace...
          </span>

        </div>

      ) : (

        <div className="space-y-4">

          <div className="rounded-xl bg-indigo-500/10 p-4">

            <div className="mb-2 flex items-center gap-2">

              <ShieldCheck
                size={18}
                className="text-green-500"
              />

              <span className="font-semibold">
                Workspace Analysis
              </span>

            </div>

            {insight && (

            <>

            <div className="text-4xl font-black text-indigo-500">

            {insight.health}%

            </div>

            <p className="text-secondary">

            Workspace Health

            </p>

            <hr className="my-5 border-default"/>

            <div>

            <h4 className="font-semibold">

            Summary

            </h4>

            <p className="text-secondary">

            {insight.summary}

            </p>

            </div>

            <div className="mt-5">

            <h4 className="font-semibold">

            Recommendation

            </h4>

            <p>

            {insight.recommendation}

            </p>

            </div>

            <div className="mt-5">

            <h4 className="font-semibold">

            Risks

            </h4>

            <ul className="list-disc pl-5">

            {insight.risks.map((risk,index)=>(

            <li key={index}>

            {risk}

            </li>

            ))}

            </ul>

            </div>

            <div className="mt-5 rounded-xl bg-surface-2 p-4">

            <strong>

            Productivity

            </strong>

            <p>

            {insight.productivity}

            </p>

            </div>

            </>

            )}

          </div>

          <div className="grid grid-cols-3 gap-4">

            <div className="rounded-xl bg-surface-2 p-4">

              <TriangleAlert
                size={18}
                className="mb-2 text-orange-500"
              />

              <p className="text-xs text-secondary">

                Risks

              </p>

              <p className="mt-1 text-sm">

                Auto detected

              </p>

            </div>

            <div className="rounded-xl bg-surface-2 p-4">

              <Lightbulb
                size={18}
                className="mb-2 text-yellow-400"
              />

              <p className="text-xs text-secondary">

                Suggestions

              </p>

              <p className="mt-1 text-sm">

                AI Generated

              </p>

            </div>

            <div className="rounded-xl bg-surface-2 p-4">

              <TrendingUp
                size={18}
                className="mb-2 text-indigo-500"
              />

              <p className="text-xs text-secondary">

                Productivity

              </p>

              <p className="mt-1 text-sm">

                Live Analysis

              </p>

            </div>

          </div>

          <div className="text-right text-xs text-secondary">

            Last analyzed just now

          </div>

        </div>

      )}

    </div>

  );

}