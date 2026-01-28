"use client";

import { useState, useCallback } from "react";
import Masonry from "react-masonry-css";
import { SmartImage } from "@/once-ui/components";
import styles from "./Gallery.module.scss";
import { gallery } from "@/app/resources/content";
import Lightbox from "./Lightbox";

export default function MasonryGrid() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(gallery.images.length - 1, prev + 1));
  }, []);

  const breakpointColumnsObj = {
    default: 4,
    1440: 3,
    1024: 2,
    560: 1,
  };

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.masonryGrid}
        columnClassName={styles.masonryGridColumn}
      >
        {gallery.images.map((image, index) => (
          <div
            key={index}
            onClick={() => openLightbox(index)}
            className={styles.imageWrapper}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && openLightbox(index)}
            aria-label={`View ${image.alt} in fullscreen`}
          >
            <SmartImage
              priority={index < 10}
              sizes="(max-width: 560px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 33vw, 25vw"
              radius="m"
              aspectRatio={image.orientation === "horizontal" ? "16 / 9" : "9 / 16"}
              src={image.src}
              alt={image.alt}
              className={styles.gridItem}
            />
          </div>
        ))}
      </Masonry>
      <Lightbox
        images={gallery.images}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onPrev={goToPrev}
        onNext={goToNext}
      />
    </>
  );
}
