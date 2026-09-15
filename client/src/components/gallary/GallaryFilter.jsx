const categories = ["All", "Rooms", "Food", "Facilities", "Events"];

const GalleryFilter = ({ selected, setSelected }) => {
  return (
    <div className="!my-10 !flex !flex-wrap !justify-center !gap-3">
      {categories.map((item) => {
        const isActive = selected === item;

        return (
          <button
            key={item}
            type="button"
            onClick={() => setSelected(item)}
            className={`!relative !overflow-hidden !rounded-full !border !px-6 !py-2.5 !text-sm !font-semibold !transition-all !duration-300 ${
              isActive
                ? "!border-[var(--color-primary)] !bg-[var(--color-primary)] !text-[#17130A] !shadow-[0_8px_25px_rgba(212,175,55,0.18)]"
                : "!border-[var(--color-border)] !bg-[var(--color-surface)] !text-[var(--color-text-secondary)] hover:!border-[var(--color-primary)]/50 hover:!text-[var(--color-text-primary)] hover:!shadow-[var(--shadow-card)]"
            }`}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
};

export default GalleryFilter;
