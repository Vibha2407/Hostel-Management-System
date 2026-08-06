import { useState } from "react";

import GalleryHero from "../components/gallary/GallaryHero";
import GalleryFilter from "../components/gallary/GallaryFilter";
import GalleryGrid from "../components/gallary/GallaryGrid";
import GalleryLightbox from "../components/gallary/GallaryLightbox";

import { galleryData } from "../constants/galleryData";

const Gallary = () => {
  const [selected, setSelected] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const filtered =
    selected === "All"
      ? galleryData
      : galleryData.filter((item) => item.category === selected);

  return (
    <>
      <GalleryHero />

      <GalleryFilter selected={selected} setSelected={setSelected} />

      <GalleryGrid data={filtered} onImageClick={setSelectedImage} />

      <GalleryLightbox
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        images={filtered}
      />
    </>
  );
};

export default Gallary;
