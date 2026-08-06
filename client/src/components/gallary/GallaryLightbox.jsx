import { X, ChevronLeft, ChevronRight } from "lucide-react";

const GalleryLightbox = ({ selectedImage, setSelectedImage, images }) => {
  if (!selectedImage) return null;

  const currentIndex = images.findIndex((img) => img.id === selectedImage.id);

  const prevImage = () => {
    const index = currentIndex === 0 ? images.length - 1 : currentIndex - 1;

    setSelectedImage(images[index]);
  };

  const nextImage = () => {
    const index = currentIndex === images.length - 1 ? 0 : currentIndex + 1;

    setSelectedImage(images[index]);
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      {/* Close */}
      <button
        onClick={() => setSelectedImage(null)}
        className="absolute top-6 right-6 text-white"
      >
        <X size={35} />
      </button>

      {/* Previous */}
      <button onClick={prevImage} className="absolute !left-6 text-white">
        <ChevronLeft size={45} />
      </button>

      {/* Image */}
      <img
        src={selectedImage.image}
        alt={selectedImage.title}
        className="max-h-[85vh] max-w-[90vw] rounded-xl"
      />

      {/* Next */}
      <button onClick={nextImage} className="absolute right-6 text-white">
        <ChevronRight size={45} />
      </button>

      {/* Title */}
      <h2 className="absolute bottom-8 text-white text-2xl font-semibold">
        {selectedImage.title}
      </h2>
    </div>
  );
};

export default GalleryLightbox;
