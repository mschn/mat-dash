import type { SummaryActivity } from "server";

export type DayData = {
  activities: SummaryActivity[];
  runEffort: number;
  rideEffort: number;
  count: number;
};

export type ActivitiesByDay = Record<string, DayData>;

export interface HeatmapCell {
  date: Date;
  isToday: boolean;
  isFuture: boolean;
}

/** A column represents one week: index 0 = Monday, 6 = Sunday */
export type HeatmapColumn = HeatmapCell[];

export interface MonthLabel {
  colIndex: number;
  label: string;
}

/** Total effort (moving seconds) for a single day */
export type DayEffort = {
  totalEffort: number;
  count: number;
};

export type EffortRange = {
  run: { min: number; max: number };
  ride: { min: number; max: number };
};
