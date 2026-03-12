import { Box } from "@chakra-ui/react";
import { buildWavePath, getGradientColors, Y_POSITIONS } from "./utils";

export function Background(): React.ReactNode {
  const gradientColors = getGradientColors();

  return (
    <Box
      w="100vw"
      h="full"
      position="absolute"
      top={0}
      left={0}
      zIndex={0}
      overflow="hidden"
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="bgGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={gradientColors.top} />
            <stop offset="100%" stopColor={gradientColors.bottom} />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="100" height="100" fill="url(#bgGradient)" />
        {Y_POSITIONS.map((yPosition) => (
          <path
            key={yPosition}
            d={buildWavePath(yPosition)}
            fill="rgba(255, 255, 255, 0.3)"
          />
        ))}
      </svg>
    </Box>
  );
}
