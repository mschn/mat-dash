import { Box, Flex, HStack, Separator, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import { Card } from "../Card";
import { useWeather } from "./useWeather";
import { WeatherCurrent } from "./WeatherCurrent";
import { WeatherNextDay } from "./WeatherNextDay";
import { ExternalLink } from "../ExternalIcon";

export function Weather(): React.ReactNode {
  const { data, isPending, isError } = useWeather();

  return (
    <Card>
      <Flex flexDirection="column" gap={3}>
        {isPending && <Spinner size="sm" />}
        {isError && (
          <Text fontSize="sm" color="red.400">
            Unable to load weather
          </Text>
        )}
        {data?.current && (
          <HStack gap={6} align="center">
            <WeatherCurrent
              code={data.current.weather_code}
              temp={data.current.temperature_2m}
              wind={data.current.wind_speed_10m}
              precipitation={data.current.precipitation * 100}
              humidity={data.current.relative_humidity_2m}
            ></WeatherCurrent>

            {data.daily.time.slice(0, 4).map((time, i) => (
              <>
                <WeatherNextDay
                  day={new Date(time)}
                  code={data.daily.weather_code[i]}
                  tempMax={data.daily.temperature_2m_max[i]}
                  tempMin={data.daily.temperature_2m_min[i]}
                  wind={data.daily.wind_speed_10m_max[i]}
                  precipitation={data.daily.precipitation_probability_max[i]}
                  humidity={data.daily.relative_humidity_2m_mean[i]}
                ></WeatherNextDay>
                {i < 3 && <Separator orientation="vertical" height={32} />}
              </>
            ))}
          </HStack>
        )}
        <Box textAlign="right">
          <ExternalLink
            name="Meteo Nice"
            href="https://www.meteo-nice.org/"
            fontSize="sm"
          />
        </Box>
      </Flex>
    </Card>
  );
}
