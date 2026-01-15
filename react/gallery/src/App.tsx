import { useState } from "react"
import { images } from "./data/images"
import ImageCard from "./components/ImageCard"
import Filters from "./components/Filters"
import SearchBar from "./components/SearchBar"
import type { ImageCategory } from "./types/image"

type FilterValue = ImageCategory | "all"

function App() {
  const [selectedFilter, setSelectedFilter] = useState<FilterValue>("all")
  const [searchTerm, setSearchTerm] = useState("");

  const filteredImages = images
    .filter((img) =>
      selectedFilter === "all" ? true : img.category === selectedFilter
    )
    .filter((img) =>
      img.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Galerie d’images</h1>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <Filters selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} />
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>

      {filteredImages.length === 0 && (
        <p className="text-sm opacity-60">Aucune image trouvée.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredImages.map((img) => (
          <ImageCard key={img.id} image={img} />
        ))}
      </div>
    </div>
  );
}

export default App
