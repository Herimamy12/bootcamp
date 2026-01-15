import { useState } from "react";
import { images } from "../../data/images";
import ImageCard from "../ImageCard";
import Filters from "../Filters";
import SearchBar from "../SearchBar";
import Pagination from "../Pagination";
import type { ImageCategory } from "../../types/image";

type FilterValue = ImageCategory | "all";

const ITEMS_PER_PAGE = 6;

export default function Gallery() {
  const [selectedFilter, setSelectedFilter] = useState<FilterValue>("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredImages = images
    .filter((img) =>
      selectedFilter === "all" ? true : img.category === selectedFilter
    )
    .filter((img) =>
      img.title.toLowerCase().includes(search.toLowerCase())
    );

  const totalPages = Math.ceil(filteredImages.length / ITEMS_PER_PAGE);

  const paginatedImages = filteredImages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilterChange = (filter: FilterValue) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  return (
    <section className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <Filters
          selectedFilter={selectedFilter}
          onFilterChange={handleFilterChange}
        />
        <SearchBar value={search} onChange={handleSearchChange} />
      </div>

      {/* Empty state */}
      {filteredImages.length === 0 && (
        <p className="text-sm opacity-60">Aucune image trouvée.</p>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paginatedImages.map((img) => (
          <ImageCard key={img.id} image={img} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}
