import { Alert, Box, Flex, Spinner } from "@chakra-ui/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import iCalendarPlugin from "@fullcalendar/icalendar";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import type React from "react";
import { Card } from "../Card";
import { ExternalLink } from "../ExternalIcon";
import { useQuery } from "@tanstack/react-query";
import { orpcUtils } from "../../lib/orpc";

export function Calendar(): React.ReactNode {
  const { data, error, isPending } = useQuery(orpcUtils.config.queryOptions());

  return (
    <Card>
      <Flex flexDirection="column" gap={4}>
        {isPending && <Spinner size="xl" />}

        {error && (
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Title>{error.message}</Alert.Title>
          </Alert.Root>
        )}

        {data?.icsUrl && (
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              listPlugin,
              iCalendarPlugin,
            ]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            events={{
              url: data.icsUrl,
              format: "ics",
            }}
            height="auto"
            nowIndicator={true}
          />
        )}
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
