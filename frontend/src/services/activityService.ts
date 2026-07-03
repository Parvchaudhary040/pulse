import api from "./api";

export const getActivities = async () => {
  const response = await api.get("/activities");
  return response.data;
};

export const createActivity = async (
  activityData: any
) => {
  const response = await api.post(
    "/activities",
    activityData
  );
  return response.data;
};