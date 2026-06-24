import axios from "axios";

const API_URL =
  "http://localhost:5000/api/activities";

export const getActivities = async () => {
  const response =
    await axios.get(API_URL);

  return response.data;
};

export const createActivity = async (
  activityData: any
) => {
  const response =
    await axios.post(
      API_URL,
      activityData
    );

  return response.data;
};