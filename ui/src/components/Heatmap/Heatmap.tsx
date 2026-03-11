import { Alert, Box, chakra, Flex, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useRef, useState } from "react";
import { Card } from "../Card";
import "./Heatmap.css";
import type { HoverInfo } from "./HeatmapCell";
import { HeatmapCell } from "./HeatmapCell";
import { HeatmapTooltip } from "./HeatmapTooltip";
import { CELL, DAY_LABELS, GAP, HEADER_H, LABEL_W } from "./constants";
import {
  buildColumns,
  buildMonthLabels,
  getEffortRange,
  groupActivitiesByDay,
} from "./utils";
import { orpcUtils } from "../../lib/orpc";
import { ExternalLink } from "../ExternalIcon";

export function Heatmap(): React.ReactNode {
  const { data, error, isPending } = useQuery(
    orpcUtils.activities.queryOptions(),
  );

  const weeks = 32;
  const svgRef = useRef<SVGSVGElement>(null);
  const [hover, setHover] = useState<HoverInfo | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{
    px: number;
    py: number;
  } | null>(null);

  const columns = useMemo(() => buildColumns(weeks), [weeks]);
  const monthLabels = useMemo(() => buildMonthLabels(columns), [columns]);
  const activitiesByDay = useMemo(
    () => groupActivitiesByDay(data ?? []),
    [data],
  );
  const effortRange = useMemo(
    () => getEffortRange(activitiesByDay),
    [activitiesByDay],
  );

  const W = LABEL_W + GAP + weeks * CELL + (weeks - 1) * GAP + 1;
  const H = HEADER_H + GAP + 7 * CELL + 6 * GAP + 1;

  const handleHover = (info: HoverInfo | null) => {
    setHover(info);
    if (!info) {
      setTooltipPos(null);
      return;
    }
    const el = svgRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    setTooltipPos({
      px: ((info.x + CELL / 2) / W) * width,
      py: (info.y / H) * height,
    });
  };

  if (isPending)
    return (
      <Card>
        <Flex align="center" justify="center">
          <Spinner size="xl" />
        </Flex>
      </Card>
    );

  if (error)
    return (
      <Card>
        <Box p={8}>
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Title>{error.message}</Alert.Title>
          </Alert.Root>
        </Box>
      </Card>
    );

  return (
    <Card>
      <Flex flexDirection="column" gap={3}>
        <Box position="relative" display="inline-block">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${W} ${H}`}
            width={W}
            aria-label={`Activity heatmap for the last ${weeks} weeks`}
          >
            {/* Month labels along the top */}
            {monthLabels.map(({ colIndex, label }) => {
              const x = LABEL_W + GAP + colIndex * (CELL + GAP);
              return (
                <chakra.text
                  key={`month-${colIndex}`}
                  x={x}
                  y={HEADER_H / 2}
                  dominantBaseline="central"
                  fill="gray.900"
                  fontSize="sm"
                  fontWeight="500"
                >
                  {label}
                </chakra.text>
              );
            })}

            {/* Day-of-week labels on the left */}
            {DAY_LABELS.map((label, row) => {
              const cy = HEADER_H + GAP + row * (CELL + GAP) + CELL / 2;
              return (
                <chakra.text
                  key={`day-${row}`}
                  x={LABEL_W - 2}
                  y={cy}
                  textAnchor="end"
                  dominantBaseline="central"
                  fontSize="sm"
                  fill="gray.900"
                  fontWeight="500"
                >
                  {label}
                </chakra.text>
              );
            })}

            {/* Cells: columns = weeks, rows = day of week */}
            {columns.map((column, colIndex) =>
              column
                .filter((cell) => !cell.isFuture)
                .map((cell, row) => {
                  const key = cell.date.toISOString().slice(0, 10);
                  return (
                    <HeatmapCell
                      key={key}
                      x={LABEL_W + GAP + colIndex * (CELL + GAP)}
                      y={HEADER_H + GAP + row * (CELL + GAP)}
                      date={cell.date}
                      isToday={cell.isToday}
                      dayData={activitiesByDay[key]}
                      effortRange={effortRange}
                      onHover={handleHover}
                    />
                  );
                }),
            )}
          </svg>

          {hover && tooltipPos && (
            <HeatmapTooltip
              px={tooltipPos.px}
              py={tooltipPos.py}
              dateKey={hover.dateKey}
              activities={activitiesByDay[hover.dateKey]?.activities ?? []}
            />
          )}
        </Box>
        <Box textAlign="right">
          <ExternalLink name="Strava" href="http://strava.com" fontSize="sm" />
        </Box>
      </Flex>
    </Card>
  );
}
