import GalleryCard from "./GallaryCard";

const GalleryGrid = ({ data, onImageClick }) => {
  return (
    <div className="max-w-7xl !mx-auto !px-6 grid md:grid-cols-3 !gap-6 !pb-20">
      {data.map((item) => (
        <GalleryCard key={item.id} item={item} onClick={onImageClick} />
      ))}
    </div>
  );
};

export default GalleryGrid;
