const categories = ["All", "Rooms", "Food", "Facilities", "Events"];

const GalleryFilter = ({ selected, setSelected }) => {
  return (
    <div className="flex justify-center flex-wrap !gap-4 !my-10">
      {categories.map((item) => (
        <button
          key={item}
          onClick={() => setSelected(item)}
          className={`!px-6 !py-2 rounded-full transition ${
            selected === item
              ? "bg-[#D4AF37] text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default GalleryFilter;
