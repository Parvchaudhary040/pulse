import {
  Sparkles,
  ShieldCheck,
  TriangleAlert,
  Lightbulb,
  TrendingUp,
  RefreshCcw,
} from "lucide-react";

interface Props {
  insight: string;
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

            <p className="whitespace-pre-wrap text-sm leading-7 text-secondary">
              {insight}
            </p>

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