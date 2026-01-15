import type { GalleryImage } from "../types/image";

interface ImageCardProps {
  image: GalleryImage;
}

export default function ImageCard({ image }: ImageCardProps) {
  return (
    <div className="card bg-base-100 shadow-md overflow-hidden group cursor-pointer">
        <figure className="relative">
            <img
                src={image.src}
                alt={image.title}
                className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <h2 className="text-white text-sm font-semibold p-3">
                    {image.title}
                </h2>
            </div>
        </figure>
    </div>
  );
}