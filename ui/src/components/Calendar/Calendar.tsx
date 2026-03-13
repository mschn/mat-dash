import { Alert, Box, Flex, Spinner } from "@chakra-ui/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import iCalendarPlugin from "@fullcalendar/icalendar";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import type React from "react";
import { useMemo } from "react";
import { Card } from "../Card";
import { ExternalLink } from "../ExternalIcon";
import { useQuery } from "@tanstack/react-query";
import { orpcUtils } from "../../lib/orpc";
import { CalendarTooltip } from "./CalendarTooltip";
import { useCalendarTooltip } from "./useCalendarTooltip";

export function Calendar(): React.ReactNode {
  const { data, error, isPending } = useQuery(orpcUtils.config.queryOptions());
  const { tooltip, onMouseEnter, onMouseLeave } = useCalendarTooltip();
  const icsUrl = data?.icsUrl;
  const calendarEvents = useMemo(
    () => icsUrl ? { url: icsUrl, format: "ics" as const } : undefined,
    [icsUrl]
  );

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

        {calendarEvents && (
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
            events={calendarEvents}
            height="auto"
            nowIndicator={true}
            eventMouseEnter={onMouseEnter}
            eventMouseLeave={onMouseLeave}
          />
        )}

        {tooltip && <CalendarTooltip tooltip={tooltip} />}

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
