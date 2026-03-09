import { Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import type React from "react";

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export function Header(): React.ReactNode {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Text
      fontSize="4xl"
      fontWeight="bold"
      color="gray.50"
      textShadow="2px 2px 4px rgba(0,0,0,0.6)"
      mb={4}
    >
      {formatDate(now)} - {formatTime(now)}
    </Text>
  );
}
