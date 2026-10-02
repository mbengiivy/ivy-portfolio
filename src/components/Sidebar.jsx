import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import {
  FiBookOpen,
  FiCheck,
  FiChevronDown,
  FiDownload,
  FiMail,
  FiMapPin,
} from 'react-icons/fi';

import {
  EMAIL,
  EMAIL_HREF,
  GITHUB_URL,
  LINKEDIN_URL,
  LOCATION,
} from '../data/contactInfo.js';
import useCvDownload from '../hooks/useCvDownload.js';
import styles from './Sidebar.module.css';

const CONTACT_ROWS = [
  { label: 'Email', value: EMAIL, href: EMAIL_HREF, icon: FiMail },
  { label: 'Location', value: LOCATION, icon: FiMapPin },
  { label: 'Education', value: 'BIT, Kenyatta University', icon: FiBookOpen },
];

const SOCIALS = [
  { label: 'LinkedIn profile', href: LINKEDIN_URL, icon: FaLinkedinIn },
  { label: 'GitHub profile', href: GITHUB_URL, icon: FaGithub },
];

const DESKTOP_BREAKPOINT = 1024;

/** Tracks whether the viewport is wide enough that the card is always open. */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.innerWidth >= DESKTOP_BREAKPOINT
  );

  useEffect(() => {
    const query = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
    const update = (event) => setIsDesktop(event.matches);

    setIsDesktop(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return isDesktop;
}

export default function Sidebar() {
  const isDesktop = useIsDesktop();
  const prefersReducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const { hasDownloaded, downloadCv } = useCvDownload();

  // On desktop the details are always visible; on mobile they disclose.
  const showDetails = isDesktop || isOpen;

  return (
    <aside className={`panel ${styles.sidebar}`} aria-label="Profile">
      <div className={styles.identity}>
        <span className={styles.avatar} aria-hidden="true">
          IM
        </span>

        {/* Not an <h1>: the hero heading is the page's single top-level title. */}
        <p className={styles.name}>Ivy Mbengi</p>

        <p className={styles.roleChip}>Cloud Engineer</p>
      </div>

      {!isDesktop && (
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={isOpen}
          aria-controls="sidebar-details"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? 'Hide contacts' : 'Show contacts'}
          <FiChevronDown className={styles.toggleIcon} aria-hidden="true" />
        </button>
      )}

      <AnimatePresence initial={false}>
        {showDetails && (
          <motion.div
            className={styles.details}
            id="sidebar-details"
            initial={prefersReducedMotion || isDesktop ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className={styles.divider} aria-hidden="true" />

            <ul className={styles.contactList}>
              {CONTACT_ROWS.map(({ label, value, href, icon: Icon }) => (
                <li className={styles.contactRow} key={label}>
                  <span className={styles.iconBox} aria-hidden="true">
                    <Icon />
                  </span>

                  <span className={styles.contactText}>
                    <span className={styles.contactLabel}>{label}</span>
                    {href ? (
                      <a className={styles.contactValue} href={href}>
                        {value}
                      </a>
                    ) : (
                      <span className={styles.contactValue}>{value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <ul className={styles.socials}>
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    className={styles.social}
                    href={href}
                    aria-label={label}
                    title={label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon aria-hidden="true" />
                  </a>
                </li>
              ))}
              <li>
                <a className={styles.social} href={EMAIL_HREF} aria-label={`Email ${EMAIL}`} title="Email">
                  <FiMail aria-hidden="true" />
                </a>
              </li>
            </ul>

            <button
              type="button"
              className={styles.download}
              onClick={downloadCv}
              disabled={hasDownloaded}
            >
              {hasDownloaded ? (
                <>
                  Downloading
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
        )}
      </AnimatePresence>
    </aside>
  );
}
