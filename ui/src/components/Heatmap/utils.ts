import type { SummaryActivity } from "server";
import { MIN_COLS_BETWEEN_LABELS, MONTH_ABBR } from "./constants";
import type {
  ActivitiesByDay,
  HeatmapColumn,
  MonthLabel,
} from "./types";

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getUTCFullYear() === b.getUTCFullYear() &&
    a.getUTCMonth() === b.getUTCMonth() &&
    a.getUTCDate() === b.getUTCDate()
  );
}

export function groupActivitiesByDay(
  activities: SummaryActivity[],
): ActivitiesByDay {
  const map: ActivitiesByDay = {};

  for (const activity of activities) {
    const d = new Date(activity.start_date_local);
    const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(
      2,
      "0",
    )}-${String(d.getUTCDate()).padStart(2, "0")}`;

    if (!map[key]) {
      map[key] = {
        activities: [],
        runEffort: 0,
        rideEffort: 0,
        count: 0,
      };
    }

    map[key].activities.push(activity);
    map[key].count += 1;

    if (activity.type === "Run") {
      map[key].runEffort += computeEffort(activity);
    } else if (activity.type === "Ride") {
      map[key].rideEffort += computeEffort(activity);
    }
  }
  return map;
}

export function buildColumns(weeks: number): HeatmapColumn[] {
  const today = new Date();
  const todayUTC = new Date(
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()),
  );

  // Monday of the current week
  const dayOfWeek = todayUTC.getUTCDay(); // 0=Sun…6=Sat
  const offsetToMonday = (dayOfWeek + 6) % 7;
  const thisMonday = new Date(todayUTC);
  thisMonday.setUTCDate(thisMonday.getUTCDate() - offsetToMonday);

  // Start monday of the range (weeks-1 weeks back)
  const currentDate = new Date(thisMonday);
  currentDate.setUTCDate(currentDate.getUTCDate() - (weeks - 1) * 7);

  const columns: HeatmapColumn[] = [];

  for (let w = 0; w < weeks; w++) {
    const column: HeatmapColumn = [];
    for (let d = 0; d < 7; d++) {
      column.push({
        date: new Date(currentDate),
        isToday: isSameDay(currentDate, todayUTC),
        isFuture: currentDate > todayUTC,
      });
      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }
    columns.push(column);
  }

  return columns;
}


/**
 * Returns a label for each column where the month changes.
 * We place the label at the first column that contains the 1st of a new month.
 */
export function buildMonthLabels(columns: HeatmapColumn[]): MonthLabel[] {
  const labels: MonthLabel[] = [];
  let lastMonth = -1;

  columns.forEach((column, colIndex) => {
    // Does this column contain the 1st of a month?
    const firstOfMonth = column.find((cell) => cell.date.getUTCDate() === 1);
    const monthIdx = firstOfMonth
      ? firstOfMonth.date.getUTCMonth()
      : column[0].date.getUTCMonth();

    if (firstOfMonth && monthIdx !== lastMonth) {
      labels.push({ colIndex, label: MONTH_ABBR[monthIdx] });
      lastMonth = monthIdx;
    } else if (colIndex === 0 && lastMonth === -1) {
      // Always label the very first column
      const m = column[0].date.getUTCMonth();
      labels.push({ colIndex: 0, label: MONTH_ABBR[m] });
      lastMonth = m;
    }
  });

  // Remove any label that is too close to the next one
  return labels.filter((label, i) => {
    const next = labels[i + 1];
    if (!next) return true;
    return next.colIndex - label.colIndex >= MIN_COLS_BETWEEN_LABELS;
  });
}

export function computeWeeklyRunKm(
  column: HeatmapColumn,
  activitiesByDay: ActivitiesByDay,
): number {
  let totalMeters = 0;
  for (const cell of column) {
    if (cell.isFuture) continue;
    const key = cell.date.toISOString().slice(0, 10);
    const day = activitiesByDay[key];
    if (!day) continue;
    for (const activity of day.activities) {
      if (activity.sport_type === "Run") {
        totalMeters += activity.distance ?? 0;
      }
    }
  }
  return totalMeters / 1000;
}

export function computeEffort(activity: SummaryActivity): number {
  const moving_time = activity.moving_time ?? 0;

  // Runs: Garmin estimates running power → weighted_average_watts is reliable
  // Rides: no power meter → fall back to Strava's average_watts estimate
  const watts = activity.device_watts
    ? (activity.weighted_average_watts ?? activity.average_watts ?? 0)
    : (activity.average_watts ?? 0);

  return watts * moving_time;
}

export function getEffortRange(activitiesByDay: ActivitiesByDay): {
  run: { min: number; max: number };
  ride: { min: number; max: number };
} {
  const runEfforts = Object.values(activitiesByDay)
    .map((d) => d.runEffort)
    .filter((e) => e > 0);
  const rideEfforts = Object.values(activitiesByDay)
    .map((d) => d.rideEffort)
    .filter((e) => e > 0);

  const runLogValues = runEfforts.map(Math.log);
  const rideLogValues = rideEfforts.map(Math.log);

  return {
    run: {
      min: runLogValues.length > 0 ? Math.min(...runLogValues) : 0,
      max: runLogValues.length > 0 ? Math.max(...runLogValues) : 0,
    },
    ride: {
      min: rideLogValues.length > 0 ? Math.min(...rideLogValues) : 0,
      max: rideLogValues.length > 0 ? Math.max(...rideLogValues) : 0,
    },
  };
}

export function getEffortIntensity(
  totalEffort: number,
  min: number,
  max: number,
): number {
  if (totalEffort === 0) return 0;
  if (max === min) return 1;
  const logEffort = Math.log(totalEffort);
  return (logEffort - min) / (max - min);
}

export function hasRun(activities: SummaryActivity[]): boolean {
  return activities?.some((activity) => activity.sport_type === "Run");
}

export function hasRide(activities: SummaryActivity[]): boolean {
  return activities?.some((activity) => activity.sport_type === "Ride");
}

export function hasWeights(activities: SummaryActivity[]): boolean {
  return activities?.some(
    (activity) => activity.sport_type === "WeightTraining",
  );
}
