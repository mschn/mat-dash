import { Flex, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Card } from "../Card";
import { getWeatherEmoji } from "./constants";
import { useWeather } from "./useWeather";

export function Weather(): React.ReactNode {
  const { data, isPending, isError } = useWeather();

  return (
    <Card>
      {isPending && <Spinner size="sm" />}
      {isError && (
        <Text fontSize="sm" color="red.400">
          Unable to load weather
        </Text>
      )}
      {data && (
        <HStack gap={4} align="center">
          <Text fontSize="5xl" lineHeight={1}>
            {getWeatherEmoji(data.weather_code)}
          </Text>
          <VStack align="start" gap={1}>
            <Flex gap={2}>
              <Text fontWeight="semibold" fontSize="xl" lineHeight={1}>
                {Math.round(data.temperature_2m)}°C
              </Text>
            </Flex>
            <Flex gap={2}>
              <Text fontSize="sm">💨</Text>
              <Text fontSize="sm" color="fg.muted">
                {Math.round(data.wind_speed_10m)}km/h
              </Text>
            </Flex>
            <Flex gap={2}>
              <Text fontSize="sm">💧</Text>
              <Text fontSize="sm" color="fg.muted">
                {Math.round(data.relative_humidity_2m)}%
              </Text>
            </Flex>
          </VStack>
        </HStack>
      )}
    </Card>
  );
}
