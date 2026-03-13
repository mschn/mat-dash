import type { EventHoveringArg } from "@fullcalendar/core";
import { useState } from "react";

export type CalendarTooltipInfo = {
  title: string;
  start: Date | null;
  end: Date | null;
  description?: string;
  x: number;
  y: number;
};

export function useCalendarTooltip() {
  const [tooltip, setTooltip] = useState<CalendarTooltipInfo | null>(null);

  function onMouseEnter(info: EventHoveringArg) {
    const rect = info.el.getBoundingClientRect();
    setTooltip({
      title: info.event.title,
      start: info.event.start,
      end: info.event.end,
      description: info.event.extendedProps.description as string | undefined,
      x: rect.left,
      y: rect.bottom + 4,
    });
  }

  function onMouseLeave() {
    setTooltip(null);
  }

  return { tooltip, onMouseEnter, onMouseLeave };
}
