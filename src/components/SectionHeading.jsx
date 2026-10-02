import Reveal from './Reveal.jsx';
import styles from './SectionHeading.module.css';

/** Shared panel header: title, short accent rule, optional lead paragraph. */
export default function SectionHeading({ title, subtitle, id }) {
  return (
    <Reveal className={styles.heading} amount={0.3}>
      <h2 className={styles.title} id={id}>
        {title}
      </h2>

      <div className={styles.rule} aria-hidden="true" />

      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </Reveal>
  );
}
