"use client";

import { useCallback, useEffect } from "react";
import { Flex, IconButton, SmartImage, Text } from "@/once-ui/components";
import styles from "./Lightbox.module.scss";

interface LightboxProps {
  images: { src: string; alt: string; orientation: string }[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          onPrev();
          break;
        case "ArrowRight":
          onNext();
          break;
      }
    },
    [isOpen, onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <Flex
          position="absolute"
          style={{ top: "1rem", right: "1rem", zIndex: 10 }}
        >
          <IconButton
            icon="close"
            variant="secondary"
            size="l"
            onClick={onClose}
            tooltip="Close (Esc)"
            aria-label="Close lightbox"
          />
        </Flex>

        <Flex
          position="absolute"
          style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
        >
          <IconButton
            icon="chevronLeft"
            variant="secondary"
            size="l"
            onClick={onPrev}
            tooltip="Previous (←)"
            aria-label="Previous image"
            disabled={currentIndex === 0}
          />
        </Flex>

        <Flex
          position="absolute"
          style={{ right: "1rem", top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
        >
          <IconButton
            icon="chevronRight"
            variant="secondary"
            size="l"
            onClick={onNext}
            tooltip="Next (→)"
            aria-label="Next image"
            disabled={currentIndex === images.length - 1}
          />
        </Flex>

        <div className={styles.imageContainer}>
          <SmartImage
            src={currentImage.src}
            alt={currentImage.alt}
            className={styles.image}
            sizes="100vw"
            priority
          />
        </div>

        <Flex
          position="absolute"
          style={{ bottom: "1rem", left: "50%", transform: "translateX(-50%)" }}
          gap="8"
          vertical="center"
          background="surface"
          padding="8"
          radius="m"
        >
          <Text variant="body-default-s" onBackground="neutral-weak">
            {currentIndex + 1} / {images.length}
          </Text>
        </Flex>
      </div>
    </div>
  );
}
