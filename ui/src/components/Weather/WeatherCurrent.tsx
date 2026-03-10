import { Flex, Text, VStack } from "@chakra-ui/react";
import { getWeatherEmoji } from "./constants";

interface WeatherDayProps {
  code: number;
  temp: number;
  wind: number;
  precipitation: number;
  humidity: number;
}

export function WeatherCurrent({
  code,
  temp,
  wind,
  precipitation,
  humidity,
}: WeatherDayProps): React.ReactNode {
  return (
    <VStack align="start" gap={1}>
      <Flex gap={2}>
        <Text fontSize="6xl" lineHeight={1}>
          {getWeatherEmoji(code)}
        </Text>
        <Flex fontSize="4xl" gap={2}>
          <Text fontWeight="semibold">{Math.round(temp)}°</Text>
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
