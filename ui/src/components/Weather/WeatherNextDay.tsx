import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { getWeatherEmoji } from "./constants";

interface WeatherDayProps {
  day: Date;
  code: number;
  tempMax: number;
  tempMin: number;
  wind: number;
  precipitation: number;
  humidity: number;
}

export function WeatherNextDay({
  day,
  code,
  tempMax,
  tempMin,
  wind,
  precipitation,
  humidity,
}: WeatherDayProps): React.ReactNode {
  return (
    <VStack align="start" gap={1}>
      <Box w="full">{formatDay(day)}</Box>
      <Flex gap={2}>
        <Text fontSize="3xl" lineHeight={1}>
          {getWeatherEmoji(code)}
        </Text>
        <Flex fontSize="lg" gap={2}>
          <Text fontWeight="semibold">{Math.round(tempMax)}° </Text>
          <Text color="gray.400">{Math.round(tempMin)}°</Text>
        </Flex>
      </Flex>
      <Flex gap={2}>
        <Text fontSize="xs" color="fg.muted" whiteSpace="nowrap">
          Wind: {Math.round(wind)}km/h
        </Text>
      </Flex>
      <Flex gap={2}>
        <Text fontSize="xs" color="fg.muted" whiteSpace="nowrap">
          Humidity: {Math.round(humidity)}%
        </Text>
      </Flex>
      <Flex gap={2}>
        <Text fontSize="xs" color="fg.muted" whiteSpace="nowrap">
          Precipitation: {Math.round(precipitation)}%
        </Text>
      </Flex>
    </VStack>
  );
}

function formatDay(day: Date): string {
  return day.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
  });
}
