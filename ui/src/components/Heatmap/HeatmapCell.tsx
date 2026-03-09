import { chakra } from "@chakra-ui/react";
import React from "react";
import {
  CELL,
  WEIGHT_ICON_PATH,
  WEIGHT_ICON_SIZE,
  WEIGHT_ICON_Y_OFFSET,
} from "./constants";
import type { DayData, EffortRange } from "./types";
import { getEffortIntensity, hasRide, hasRun, hasWeights } from "./utils";

export interface HoverInfo {
  x: number;
  y: number;
  dateKey: string;
  dayData?: DayData;
}

interface HeatmapCellProps {
  x: number;
  y: number;
  date: Date;
  isToday: boolean;
  dayData?: DayData;
  effortRange: EffortRange;
  onHover: (info: HoverInfo | null) => void;
}

export function HeatmapCell({
  x,
  y,
  date,
  dayData,
  effortRange,
  onHover,
}: HeatmapCellProps) {
  const dateKey = date.toISOString().slice(0, 10);
  const dailyActivities = dayData?.activities ?? [];
  const isRun = hasRun(dailyActivities);
  const isRide = hasRide(dailyActivities);

  let intensity = 0;
  if (dayData) {
    if (isRun) {
      intensity = getEffortIntensity(
        dayData.runEffort,
        effortRange.run.min,
        effortRange.run.max,
      );
    } else if (isRide) {
      intensity = getEffortIntensity(
        dayData.rideEffort,
        effortRange.ride.min,
        effortRange.ride.max,
      );
    }
  }

  const rectClass = [
    "hm-cell",
    isRun && "hm-cell-run",
    isRide && "hm-cell-ride",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <g
      onMouseEnter={() => onHover({ x, y, dateKey, dayData })}
      onMouseLeave={() => onHover(null)}
    >
      <chakra.rect
        x={x}
        y={y}
        width={CELL}
        height={CELL}
        rx={3}
        className={rectClass}
        style={{ "--intensity": intensity } as React.CSSProperties}
      />

      {hasWeights(dailyActivities) && (
        <chakra.g opacity={0.6} pointerEvents="none">
          <path
            transform={`translate(${x}, ${
              y + WEIGHT_ICON_Y_OFFSET
            }) scale(${CELL / WEIGHT_ICON_SIZE})`}
            d={WEIGHT_ICON_PATH}
          />
        </chakra.g>
      )}
    </g>
  );
}
