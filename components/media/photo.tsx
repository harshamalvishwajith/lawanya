import Image, { type ImageProps } from "next/image";

import { images, type ImageAsset, type ImageKey } from "@/lib/images";

type PhotoProps = Omit<ImageProps, "src" | "alt"> & {
  image: ImageKey;
  /** Purely atmospheric use (e.g. a backdrop): hide from assistive tech. */
  decorative?: boolean;
};

/**
 * `next/image` wired to the photo registry: alt text, blur-up placeholder and
 * focal point come from lib/images.ts, so swapping a photo is a one-file change.
 */
export function Photo({ image, decorative = false, placeholder = "blur", style, ...props }: PhotoProps) {
  const asset: ImageAsset = images[image];
  return (
    <Image
      src={asset.src}
      alt={decorative ? "" : asset.alt}
      placeholder={placeholder}
      style={{ objectPosition: asset.focus, ...style }}
      {...props}
    />
  );
}
