import "dotenv/config";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { SummaryActivity } from "./types.js";

const STRAVA_TOKEN_URL = "https://www.strava.com/oauth/token";
const STRAVA_API_BASE = "https://www.strava.com/api/v3";
const ENV_PATH = resolve(process.cwd(), ".env");

let accessToken = process.env.ACCESS_TOKEN!;

function updateEnvFile(newAccessToken: string, newRefreshToken: string) {
  let env = readFileSync(ENV_PATH, "utf-8");

  env = env
    .replace(/^ACCESS_TOKEN=.*/m, `ACCESS_TOKEN=${newAccessToken}`)
    .replace(/^REFRESH_TOKEN=.*/m, `REFRESH_TOKEN=${newRefreshToken}`);

  writeFileSync(ENV_PATH, env, "utf-8");

  // Keep process.env in sync
  process.env.ACCESS_TOKEN = newAccessToken;
  process.env.REFRESH_TOKEN = newRefreshToken;
}

async function refreshAccessToken(): Promise<string> {
  const body = {
    client_id: process.env.STRAVA_CLIENT_ID,
    client_secret: process.env.STRAVA_CLIENT_SECRET,
    refresh_token: process.env.REFRESH_TOKEN,
    grant_type: "refresh_token",
  };

  const res = await fetch(STRAVA_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(
      `Token refresh failed: ${res.status} ${res.statusText} — ${errorBody}`,
    );
  }

  const { access_token, refresh_token } = await res.json();

  updateEnvFile(access_token, refresh_token);
  accessToken = access_token;

  return accessToken;
}

async function stravaFetch(path: string): Promise<Response> {
  let res = await fetch(`${STRAVA_API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (res.status === 401) {
    accessToken = await refreshAccessToken();
    res = await fetch(`${STRAVA_API_BASE}${path}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  if (!res.ok)
    throw new Error(`Strava API error: ${res.status} ${res.statusText}`);
  return res;
}

export async function fetchActivities(
  perPage = 60,
): Promise<SummaryActivity[]> {
  const res = await stravaFetch(`/athlete/activities?per_page=${perPage}`);
  return res.json();
}
