import { chakra } from "@chakra-ui/react";
import { useMemo } from "react";
import {
  BAR_GAP,
  BAR_LABEL_H,
  BAR_MAX_H,
  CELL,
  GAP,
  HEADER_H,
  LABEL_W,
} from "./constants";
import type { ActivitiesByDay, HeatmapColumn } from "./types";
import { computeWeeklyRunKm } from "./utils";

interface HeatmapVolumeBarsProps {
  activitiesByDay: ActivitiesByDay;
  columns: HeatmapColumn[];
}

export function HeatmapVolumeBars({
  activitiesByDay,
  columns,
}: HeatmapVolumeBarsProps): React.ReactNode {
  const weeklyKm = useMemo(
    () => columns.map((col) => computeWeeklyRunKm(col, activitiesByDay)),
    [columns, activitiesByDay],
  );

  const maxWeeklyKm = useMemo(() => Math.max(1, ...weeklyKm), [weeklyKm]);

  const barBaseline =
    HEADER_H + GAP + 7 * CELL + 6 * GAP + BAR_GAP + BAR_LABEL_H + BAR_MAX_H;

  return (
    <>
      {weeklyKm.map((km, colIndex) => {
        const barH = (km / maxWeeklyKm) * BAR_MAX_H;
        const barX = LABEL_W + GAP + colIndex * (CELL + GAP);
        const barY = barBaseline - barH;
        const labelKm = Math.round(km * 10) / 10;

        return (
          <g key={`bar-${colIndex}`}>
            {barH > 0 && (
              <rect
                x={barX + CELL / 4}
                y={barY}
                width={CELL / 2}
                height={barH}
                rx={2}
                fill="#2ad468a5"
                opacity={0.85}
              />
            )}
            {km >= 0.1 && (
              <chakra.text
                x={barX + CELL / 2}
                y={barY - 2}
                textAnchor="middle"
                dominantBaseline="auto"
                fontSize="xs"
                fill="gray.500"
                fontWeight="500"
              >
                {Math.round(labelKm)}
              </chakra.text>
            )}
          </g>
        );
      })}
    </>
  );
}
