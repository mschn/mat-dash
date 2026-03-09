import { Box, Text } from "@chakra-ui/react";
import type { SummaryActivity } from "server";

interface HeatmapTooltipProps {
  px: number;
  py: number;
  dateKey: string;
  activities: SummaryActivity[];
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function formatDistance(meters: number): string {
  const km = meters / 1000;
  return `${km.toFixed(1)} km`;
}

function formatSpeed(metersPerSecond: number): string {
  const kmh = metersPerSecond * 3.6;
  return `${kmh.toFixed(1)} km/h`;
}

function formatPace(metersPerSecond: number): string {
  const secondsPerKm = 1000 / metersPerSecond;
  const m = Math.floor(secondsPerKm / 60);
  const s = Math.floor(secondsPerKm % 60);
  return `${m}:${s.toString().padStart(2, "0")} min/km`;
}

function ActivityLine({ activity }: { activity: SummaryActivity }) {
  const type = activity.sport_type ?? activity.type;

  if (type === "Run") {
    return (
      <Text>
        👟 {formatDistance(activity.distance)} ·{" "}
        {formatPace(activity.average_speed)} ·{" "}
        {formatDuration(activity.moving_time)}
      </Text>
    );
  }

  if (type === "Ride") {
    return (
      <Text>
        🚴
        {formatDistance(activity.distance)} ·{" "}
        {formatDuration(activity.moving_time)} ·{" "}
        {formatSpeed(activity.average_speed)}
      </Text>
    );
  }

  if (type === "WeightTraining") {
    return <Text>🏋️ {activity.name}</Text>;
  }

  return <Text>🏅 {activity.name}</Text>;
}

export function HeatmapTooltip({
  px,
  py,
  dateKey,
  activities,
}: HeatmapTooltipProps) {
  return (
    <Box
      position="absolute"
      style={{ left: `${px}px`, top: `${py}px` }}
      transform="translate(-50%, calc(-100% - 6px))"
      pointerEvents="none"
      bg="gray.800"
      color="white"
      fontSize="xs"
      fontWeight="medium"
      px={2}
      py={1}
      borderRadius="md"
      whiteSpace="nowrap"
      zIndex={10}
      boxShadow="sm"
    >
      <Text fontWeight="bold" mb={activities.length > 0 ? 1 : 0}>
        {dateKey}
      </Text>
      {activities.map((activity) => (
        <ActivityLine key={activity.id} activity={activity} />
      ))}
      {activities.length === 0 && <Text color="gray.400">No activities</Text>}
    </Box>
  );
}
