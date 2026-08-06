const GalleryCard = ({ item, onClick }) => {
  return (
    <div
      onClick={() => onClick(item)}
      className="overflow-hidden rounded-xl cursor-pointer group"
    >
      <img
        src={item.image}
        alt={item.title}
        className="!w-full !h-72 object-cover group-hover:scale-110 transition duration-500"
      />
    </div>
  );
};

export default GalleryCard;
