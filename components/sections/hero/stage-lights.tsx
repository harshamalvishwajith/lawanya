import styles from "./hero.module.css";

type BeamStyle = React.CSSProperties & Record<`--${string}`, string | number>;

// Moving-head fixtures on an overhead rig, deliberately out of sync.
const beams: BeamStyle[] = [
  { "--x": "10%", "--beam-color": "rgb(185 168 234 / 0.5)", "--beam-angle": "11deg", "--beam-duration": "11s", "--cone": "9deg", "--spread": "38vw", "--beam-opacity": 0.55, animationDelay: "-3s" },
  { "--x": "38%", "--beam-color": "rgb(147 220 176 / 0.55)", "--beam-angle": "15deg", "--beam-duration": "8.5s", "--cone": "8deg", "--beam-opacity": 0.5, animationDelay: "-6s" },
  { "--x": "66%", "--beam-color": "rgb(160 138 217 / 0.5)", "--beam-angle": "13deg", "--beam-duration": "12.5s", "--cone": "10deg", "--spread": "46vw", "--beam-opacity": 0.6, animationDelay: "-1s" },
  { "--x": "92%", "--beam-color": "rgb(147 220 176 / 0.6)", "--beam-angle": "9deg", "--beam-duration": "9.5s", "--cone": "12deg", "--beam-opacity": 0.65, animationDelay: "-4.5s" },
];

export function StageLights() {
  return (
    <div className={styles.lights}>
      {beams.map((style, i) => (
        <span key={i} className={styles.beam} style={style} />
      ))}
      {beams.map((style, i) => (
        <span key={`lamp-${i}`} className={styles.lamp} style={{ "--x": style["--x"] } as BeamStyle} />
      ))}
      <div className={styles.haze} />
    </div>
  );
}
