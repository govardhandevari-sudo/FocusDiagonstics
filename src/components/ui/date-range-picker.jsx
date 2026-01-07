import { useState } from "react";
import { format } from "date-fns";
import {
  startOfToday,
  endOfToday,
  subDays,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const today = startOfToday();

const DATE_PRESETS = [
  {
    label: "Today",
    range: {
      from: today,
      to: endOfToday(),
    },
  },
  {
    label: "Last 7 Days",
    range: {
      from: subDays(today, 6),
      to: endOfToday(),
    },
  },
  {
    label: "Last 14 Days",
    range: {
      from: subDays(today, 13),
      to: endOfToday(),
    },
  },
  {
    label: "Last Month",
    range: (() => {
      const lastMonth = subDays(startOfMonth(today), 1);
      return {
        from: startOfMonth(lastMonth),
        to: endOfMonth(lastMonth),
      };
    })(),
  },
  {
    label: "Current Month",
    range: {
      from: startOfMonth(today),
      to: endOfToday(),
    },
  },
];

export function DateRangePicker({ value, onApply, className }) {
  const [open, setOpen] = useState(false);
  const [tempRange, setTempRange] = useState(value || {});

  const handleApply = () => {
    onApply?.(tempRange);
    setOpen(false);
  };

  const handleClear = () => {
    setTempRange({});
    onApply?.({ from: null, to: null });
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[220px] md:w-[300px] h-9 justify-start text-left text-sm font-normal",
            !value?.from && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value?.from ? (
            value?.to ? (
              <>
                {format(value.from, "dd MMM yyyy")} –{" "}
                {format(value.to, "dd MMM yyyy")}
              </>
            ) : (
              format(value.from, "dd MMM yyyy")
            )
          ) : (
            "Select date range"
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-auto p-0 bg-popover border-border z-[100]"
      >
        <div className="flex gap-3 p-3">
          {/* Presets */}
          <div className="flex flex-col gap-1 min-w-[150px] border-r pr-3">
            {DATE_PRESETS.map((p) => (
              <Button
                key={p.label}
                variant="ghost"
                size="sm"
                className="justify-start"
                onClick={() => setTempRange(p.range)}
              >
                {p.label}
              </Button>
            ))}
          </div>

          {/* Calendar */}
          <Calendar
            mode="range"
            numberOfMonths={2}
            selected={tempRange}
            onSelect={setTempRange}
            initialFocus
            className="p-3"
          />
        </div>

        {/* Footer actions */}
        <div className="flex justify-end gap-2 border-t p-3">
          <Button variant="ghost" size="sm" onClick={handleClear}>
            Clear
          </Button>
          <Button size="sm" onClick={handleApply}>
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
