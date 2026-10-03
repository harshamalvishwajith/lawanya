import styles from "./intro.module.css";

/** Script for <head>: decides before first paint whether the intro plays. */
export const introScript = `(function(){var d=document.documentElement;try{var skip=sessionStorage.getItem("lawanya-intro")||matchMedia("(prefers-reduced-motion: reduce)").matches||location.pathname!=="/";if(skip){d.setAttribute("data-intro","skip");return}sessionStorage.setItem("lawanya-intro","1");d.setAttribute("data-intro","play");setTimeout(function(){d.setAttribute("data-intro","lift")},1600);setTimeout(function(){d.setAttribute("data-intro","skip")},2700)}catch(e){d.setAttribute("data-intro","skip")}})()`;

/** Opening titles for the first visit of a session. Decorative, so hidden from assistive tech. */
export function Intro() {
  return (
    <div className={styles.intro} aria-hidden="true">
      <div className="film-grain" />
      <div className={styles.leader}>
        <span className={styles.ring} />
        <span className={`${styles.ring} ${styles.ringInner}`} />
        <span className={styles.cross} />
        <div className={styles.sweep}>
          <span className={`emblem-mask ${styles.emblem}`} />
        </div>
        <span className={styles.hand} />
      </div>
      <p className={styles.title}>
        Lawanya<span>Events &amp; Digital</span>
      </p>
    </div>
  );
}
