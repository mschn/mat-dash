import { Box, Flex } from "@chakra-ui/react";
import type React from "react";
import { Card } from "../Card";
import { ExternalLink } from "../ExternalIcon";

export function Calendar(): React.ReactNode {
  return (
    <Card>
      <Flex flexDirection="column" gap={4}>
        <Box overflow="hidden" borderRadius="2xl">
          <iframe
            src="https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Europe%2FParis&showPrint=0&showTitle=0&showNav=0&showDate=0&showTabs=0&showTz=0&mode=AGENDA&src=bWF0aGlldS5zY2hub29yQGdtYWlsLmNvbQ&src=ZmFtaWx5MTUwNzcwOTMxODQ2Njk2MjE2NDhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=ZW4uZnJlbmNoI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=c3NzaGFyb24uY3VpQGdtYWlsLmNvbQ&color=%233f51b5&color=%237986cb&color=%234285f4&color=%238e24aa"
            height="450"
          ></iframe>
        </Box>
        <Box textAlign="right">
          <ExternalLink
            href="calendar.google.com"
            name="Google Calendar"
            fontSize="sm"
          />
        </Box>
      </Flex>
    </Card>
  );
}
