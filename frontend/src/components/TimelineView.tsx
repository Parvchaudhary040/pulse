import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Search,
  PlusCircle,
  Edit,
  Trash2,
  ArrowRightLeft,
} from "lucide-react";

import * as activityService from "../services/activityService";

interface ActivityItem {
  id: number;
  user_name: string;
  action: string;
  target_type: string;
  target_name: string;
  details: string;
  created_at: string;
}

export default function TimelineView() {

  const [activities, setActivities] =
    useState<ActivityItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    loadActivities();

  }, []);

  const loadActivities = async () => {

    try {

      const response =
        await activityService.getActivities();

      setActivities(response.activities);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const filteredActivities = useMemo(() => {

    return activities.filter((activity) =>

      activity.target_name
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      activity.action
        .toLowerCase()
        .includes(search.toLowerCase())

    );

  }, [activities, search]);

  const getIcon = (action: string) => {

    const value = action.toLowerCase();

    if (value.includes("created"))
      return <PlusCircle size={18} className="text-green-400" />;

    if (value.includes("updated"))
      return <Edit size={18} className="text-blue-400" />;

    if (value.includes("deleted"))
      return <Trash2 size={18} className="text-red-400" />;

    if (value.includes("status"))
      return <ArrowRightLeft size={18} className="text-orange-400" />;

    return <Activity size={18} className="text-indigo-400" />;

  };
    return (
    <div className="bg-app min-h-screen p-6 text-primary">

      {/* Header */}

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-4xl font-black">
            TIMELINE & ACTIVITY
          </h1>

          <p className="text-secondary mt-2">
            Complete history of all workspace activities.
          </p>

        </div>

      </div>

      {/* Search */}

      <div className="relative mb-8">

        <Search
          size={18}
          className="absolute left-4 top-4 text-gray-500"
        />

        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search activity..."
          className="w-full rounded-xl border border-default bg-surface py-3 pl-11 pr-4 outline-none focus:border-indigo-500"
        />

      </div>

      {/* Loading */}

      {loading && (

        <div className="text-center py-24 text-gray-500">

          Loading activities...

        </div>

      )}

      {/* Empty */}

      {!loading && filteredActivities.length === 0 && (

        <div className="rounded-xl border border-dashed border-default py-20 text-center text-gray-500">

          No activities found.

        </div>

      )}

      {/* Timeline */}

      <div className="space-y-4">

        {filteredActivities.map((activity) => (

          <div
            key={activity.id}
            className="rounded-xl border border-default bg-surface p-5 hover:border-indigo-500 transition"
          >

            <div className="flex items-start gap-4">

              <div className="mt-1">

                {getIcon(activity.action)}

              </div>

              <div className="flex-1">

                <div className="flex justify-between items-center">

                  <h3 className="font-semibold text-primary">

                    {activity.action}

                  </h3>

                  <span className="text-xs text-gray-500">

                    {new Date(
                      activity.created_at
                    ).toLocaleString()}

                  </span>

                </div>

                <p className="text-indigo-400 mt-1">

                  {activity.target_name}

                </p>

                <p className="text-secondary mt-2">

                  {activity.details}

                </p>

                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">

                  <span>

                    👤 {activity.user_name}

                  </span>

                  <span>•</span>

                  <span>

                    {activity.target_type}

                  </span>

                </div>

              </div>

            </div>

          </div>

        ))}
      </div>

    </div>
  );
}