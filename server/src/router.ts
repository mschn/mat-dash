import { os } from "@orpc/server";
import { fetchActivities } from "./strava.js";

export const getActivities = os.handler(async () => {
  return fetchActivities();
});

export const router = {
  activities: getActivities,
};

export type AppRouter = typeof router;
