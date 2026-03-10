import { useQuery } from "@tanstack/react-query";

export interface WeatherData {
  current: {
    temperature_2m: number;
    wind_speed_10m: number;
    relative_humidity_2m: number;
    weather_code: number;
    precipitation: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    wind_speed_10m_max: number[];
    precipitation_probability_max: number[];
    relative_humidity_2m_mean: number[];
  };
}

async function fetchGeolocation(): Promise<GeolocationCoordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos.coords),
      reject,
    );
  });
}

async function fetchWeather(): Promise<WeatherData> {
  const coords = await fetchGeolocation();
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(coords.latitude));
  url.searchParams.set("longitude", String(coords.longitude));
  url.searchParams.set(
    "current",
    "temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code,precipitation",
  );
  url.searchParams.set(
    "daily",
    [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "wind_speed_10m_max",
      "precipitation_probability_max",
      "relative_humidity_2m_mean",
    ].join(","),
  );
  url.searchParams.set("wind_speed_unit", "kmh");
  url.searchParams.set("temperature_unit", "celsius");

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch weather");
  const json = await res.json();
  return json as WeatherData;
}

export function useWeather() {
  return useQuery({
    queryKey: ["weather"],
    queryFn: fetchWeather,
    staleTime: 1000 * 60 * 10,
    retry: false,
  });
}
