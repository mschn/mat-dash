import type React from "react";
import { Card } from "../Card";
import { Box } from "@chakra-ui/react";

export function Calendar(): React.ReactNode {
  return (
    <Card>
      <Box overflow="hidden" borderRadius="2xl">
        <iframe
          src="https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Europe%2FParis&showPrint=0&mode=AGENDA&showTabs=0&showCalendars=0&showTz=0&showTitle=0&showNav=0&showDate=0&src=bWF0aGlldS5zY2hub29yQGdtYWlsLmNvbQ&color=%233f51b5"
          height="600"
        ></iframe>
      </Box>
    </Card>
  );
}
