export type ImageCategory = "Nature" | "Architecture";

export interface GalleryImage {
  id: number;
  title: string;
  category: ImageCategory;
  src: string;
}
