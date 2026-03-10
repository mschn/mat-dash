import { os } from "@orpc/server";
import { fetchActivities } from "./strava.js";
import { SummaryActivity } from "./types.js";

const CACHE_TTL_MS = 60 * 60 * 1000; // 1h minutes

let activitiesCache: {
  data: SummaryActivity[];
  expiresAt: number;
} | null = null;

export const getActivities = os.handler(async () => {
  const now = Date.now();
  if (activitiesCache && now < activitiesCache.expiresAt) {
    return activitiesCache.data;
  }
  const data = await fetchActivities();
  activitiesCache = { data, expiresAt: now + CACHE_TTL_MS };
  return data;
});

export const router = {
  activities: getActivities,
};

export type AppRouter = typeof router;
