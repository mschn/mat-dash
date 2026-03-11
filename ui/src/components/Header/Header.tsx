import { HStack, Text } from "@chakra-ui/react";
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
    <HStack gap={4} mb={4}>
      <Text
        bgColor="gray.700"
        borderColor="black"
        borderWidth={2}
        shadow="md"
        color="white"
        fontWeight="bold"
        fontFamily="mono"
        fontSize="2xl"
        borderRadius="lg"
        px={4}
      >
        {formatTime(now)}
      </Text>
      <Text
        fontSize="4xl"
        fontWeight="bold"
        color="gray.50"
        textShadow="1px 1px 2px rgba(0,0,0,0.8)"
      >
        {formatDate(now)}
      </Text>
    </HStack>
  );
}
