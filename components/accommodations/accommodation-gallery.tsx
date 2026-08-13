"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function AccommodationGallery({
  images,
  alt,
}: {
  images: { src: string; alt: string }[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);
  const active = images[index];

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-none bg-muted lg:rounded-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={active.src}
              alt={active.alt || alt}
              fill
              quality={90}
              className="object-cover"
              sizes="(min-width: 1024px) 60vw, 100vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex gap-3">
        {images.map((item, i) => (
          <motion.button
            key={item.src}
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: i === index ? 1 : 0.55, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ opacity: 1 }}
            onClick={() => setIndex(i)}
            aria-label={`${alt} ${i + 1}`}
            className={cn(
              "relative h-16 w-20 shrink-0 overflow-hidden rounded-xl ring-2 ring-transparent transition-shadow duration-300",
              i === index && "ring-primary"
            )}
          >
            <Image src={item.src} alt="" fill className="object-cover" sizes="80px" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
