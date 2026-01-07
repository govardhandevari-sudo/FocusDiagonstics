import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/date-range-picker";

const branches = [
  { value: "all", label: "All Branches" },
  { value: "punjagutta", label: "Punjagutta" },
  { value: "kompally", label: "Kompally" },
  { value: "kphb", label: "KPHB" },
  { value: "mbnr", label: "MBNR" },
  { value: "nalgonda", label: "Nalgonda" },
  { value: "nizamabad", label: "Nizamabad" },
  { value: "medak", label: "Medak" },
  { value: "sangareddy", label: "Sangareddy" },
];

const states = [
  { value: "all", label: "All States" },
  { value: "TS", label: "Telangana" },
  { value: "AP", label: "Andhra Pradesh" },
  { value: "KA", label: "Karnataka" },
];

export function ReportFilters({
  showBranch = false,
  showState = false,
  showDateRange = false,
  filters = {},
  onFilterChange,
}) {
  const handleFilterChange = (key, value) => {
    onFilterChange?.({ ...filters, [key]: value });
  };

  const handleDateApply = (range) => {
    onFilterChange?.({
      ...filters,
      dateFrom: range?.from || null,
      dateTo: range?.to || null,
    });
  };

  const clearFilters = () => {
    onFilterChange?.({});
  };

  const hasActiveFilters = Object.values(filters).some(
    (v) => v && v !== "all"
  );

  return (
    <div className="flex flex-wrap gap-2 md:gap-3 items-center p-3 md:p-4 bg-card rounded-lg border shadow-sm">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Filter className="h-4 w-4" />
        <span className="hidden sm:inline font-medium">Filters:</span>
      </div>

      {showState && (
        <Select
          value={filters.state || "all"}
          onValueChange={(v) => handleFilterChange("state", v)}
        >
          <SelectTrigger className="w-[140px] h-9 text-sm">
            <SelectValue placeholder="State" />
          </SelectTrigger>
          <SelectContent>
            {states.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {showBranch && (
        <Select
          value={filters.branch || "all"}
          onValueChange={(v) => handleFilterChange("branch", v)}
        >
          <SelectTrigger className="w-[160px] h-9 text-sm">
            <SelectValue placeholder="Branch" />
          </SelectTrigger>
          <SelectContent>
            {branches.map((b) => (
              <SelectItem key={b.value} value={b.value}>
                {b.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {showDateRange && (
        <DateRangePicker
          value={{
            from: filters.dateFrom || undefined,
            to: filters.dateTo || undefined,
          }}
          onApply={handleDateApply}
        />
      )}

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="h-9 px-2 text-muted-foreground"
        >
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      )}
    </div>
  );
}
