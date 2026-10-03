import { Photo } from "@/components/media/photo";
import type { ImageKey } from "@/lib/images";

import styles from "./hero.module.css";

interface ReelStripProps {
  frames: readonly ImageKey[];
  firstFrame: number;
  /** Position class from hero.module.css (stripA / stripB). */
  className: string;
}

function ReelStrip({ frames, firstFrame, className }: ReelStripProps) {
  // Two copies side by side; the track slides by exactly one copy for a seamless loop.
  const loop = [...frames, ...frames];

  return (
    <div className={`${styles.strip} ${className}`}>
      <div className={styles.track}>
        {loop.map((key, i) => (
          <figure key={`${key}-${i}`} className={styles.frame}>
            <Photo image={key} decorative placeholder="empty" fill sizes="240px" className="object-cover" />
            <figcaption className={styles.frameNumber}>
              {String(firstFrame + (i % frames.length)).padStart(3, "0")}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

interface FilmReelsProps {
  frames: readonly ImageKey[];
}

/** Two strips of the studio's footage rolling through 3D space. */
export function FilmReels({ frames }: FilmReelsProps) {
  const half = Math.ceil(frames.length / 2);

  return (
    <div className={styles.reels}>
      <ReelStrip frames={frames.slice(0, half)} firstFrame={1} className={styles.stripA} />
      <ReelStrip frames={frames.slice(half)} firstFrame={half + 1} className={styles.stripB} />
    </div>
  );
}
