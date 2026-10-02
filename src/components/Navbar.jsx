import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

import styles from './Navbar.module.css';

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

/** Highlights the nav link whose section currently sits under the nav pill. */
function useActiveSection() {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const sections = NAV_LINKS.map(({ id }) => document.getElementById(id)).filter(Boolean);
    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      // Shrink the viewport so a section counts as active only once it has
      // cleared the pill and occupies the upper half of the screen.
      { rootMargin: '-20% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return activeId;
}

export default function Navbar() {
  const activeId = useActiveSection();
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <nav className={styles.navbar} aria-label="Section navigation">
      <ul className={styles.list}>
        {NAV_LINKS.map(({ id, label }) => (
          <li className={styles.item} key={id}>
            <a
              href={`#${id}`}
              className={styles.link}
              aria-current={activeId === id ? 'true' : undefined}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <motion.div
        className={styles.progress}
        style={{ scaleX: progressScale }}
        aria-hidden="true"
      />
    </nav>
  );
}
