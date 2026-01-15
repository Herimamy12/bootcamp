import type { ImageCategory } from "../types/image";

type FilterValue = ImageCategory | "all";

interface FiltersProps {
  selectedFilter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
}

export default function Filters({ selectedFilter, onFilterChange }: FiltersProps) {
  const filters: FilterValue[] = ["all", "Nature", "Architecture"];

  return (
    <div className="flex gap-2 flex-wrap">
        {filters.map((filter) => (
            <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`btn btn-sm ${
                selectedFilter === filter ? "btn-primary" : "btn-outline"
            }`}
            >

            {filter === "all" ? "Tous" : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
        ))}
    </div>
  );
}
