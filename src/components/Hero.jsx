import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiDownload } from 'react-icons/fi';

import useCvDownload from '../hooks/useCvDownload.js';
import ParticleField from './ParticleField.jsx';
import styles from './Hero.module.css';

const SUBTITLE = 'Cloud Engineer | Solutions Architect | Building Scalable Cloud Solutions';

/**
 * Splits text into user-perceived characters so the typing effect never cuts a
 * multi-code-point glyph (the 🇰🇪 flag) in half.
 */
function toGraphemes(text) {
  if (typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'function') {
    const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
    return Array.from(segmenter.segment(text), (entry) => entry.segment);
  }
  return Array.from(text);
}

/** Types `text` out one grapheme at a time; resolves instantly when the
 *  visitor prefers reduced motion. */
function useTypingEffect(text, { speed = 32, startDelay = 650, enabled = true } = {}) {
  const [typed, setTyped] = useState(enabled ? '' : text);

  useEffect(() => {
    if (!enabled) {
      setTyped(text);
      return undefined;
    }

    const graphemes = toGraphemes(text);
    let index = 0;
    let intervalId;

    setTyped('');

    const startId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        index += 1;
        setTyped(graphemes.slice(0, index).join(''));
        if (index >= graphemes.length) window.clearInterval(intervalId);
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(startId);
      window.clearInterval(intervalId);
    };
  }, [text, speed, startDelay, enabled]);

  return typed;
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const typedSubtitle = useTypingEffect(SUBTITLE, { enabled: !prefersReducedMotion });
  const { hasDownloaded, downloadCv } = useCvDownload();

  const fadeUp = {
    initial: prefersReducedMotion ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section className={styles.hero} id="hero" aria-labelledby="hero-title">
      <ParticleField className={styles.canvas} />
      <div className={styles.grid} aria-hidden="true" />

      <div className={styles.shapes} aria-hidden="true">
        <span className={`${styles.shape} ${styles.shapeRing}`} />
        <span className={`${styles.shape} ${styles.shapeSquare}`} />
        <span className={`${styles.shape} ${styles.shapeBlob}`} />
      </div>

      <div className={styles.content}>
        <motion.p
          className={styles.locationPill}
          {...fadeUp}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <span className={styles.pulse} aria-hidden="true" />
          Nairobi, Kenya
        </motion.p>

        <motion.h1
          className={styles.title}
          id="hero-title"
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 0.61, 0.36, 1] }}
        >
          Hi, I&rsquo;m <span className={styles.titleName}>Ivy Mbengi</span>
        </motion.h1>

        {/* The animated copy is hidden from assistive tech; the full string is
            exposed once, below, so screen readers never hear partial text. */}
        <p className={styles.subtitle}>
          <span aria-hidden="true">
            {typedSubtitle}
            <span className={styles.caret} />
          </span>
          <span className="sr-only">{SUBTITLE}</span>
        </p>

        <motion.p
          className={styles.intro}
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
        >
          Early-career cloud and IT professional with hands-on experience in cloud
          infrastructure, network operations, and technical support. Passionate about
          delivering reliable, scalable cloud solutions.
        </motion.p>

        <motion.div
          className={styles.actions}
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <a className={styles.buttonPrimary} href="#projects">
            View My Work
            <FiArrowRight aria-hidden="true" />
          </a>

          <button
            type="button"
            className={styles.buttonSecondary}
            onClick={downloadCv}
            disabled={hasDownloaded}
          >
            {hasDownloaded ? (
              <>
                Thanks &mdash; downloading
                <FiCheck aria-hidden="true" />
              </>
            ) : (
              <>
                Download CV
                <FiDownload aria-hidden="true" />
              </>
            )}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
