import { Box } from "@chakra-ui/react";
import type React from "react";
import type { CalendarTooltipInfo } from "./useCalendarTooltip";

type Props = {
  tooltip: CalendarTooltipInfo;
};

export function CalendarTooltip({ tooltip }: Props): React.ReactNode {
  return (
    <Box
      position="fixed"
      left={tooltip.x}
      top={tooltip.y}
      bg="white"
      color="black"
      shadow="md"
      p={3}
      borderRadius="md"
      zIndex={9999}
      pointerEvents="none"
      maxW="260px"
      fontSize="sm"
    >
      <Box fontWeight="bold">{tooltip.title}</Box>
      {tooltip.start && (
        <Box mt={1}>
          {tooltip.start.toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
          })}
          {tooltip.end && (
            <>
              {" — "}
              {tooltip.end.toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </>
          )}
        </Box>
      )}
      {tooltip.description && (
        <Box mt={1} color="gray.600">
          {tooltip.description.length > 120
            ? tooltip.description.slice(0, 120) + "…"
            : tooltip.description}
        </Box>
      )}
    </Box>
  );
}
