import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

import { EMAIL, EMAIL_HREF, GITHUB_URL, LINKEDIN_URL } from '../data/contactInfo.js';
import styles from './Footer.module.css';

const SOCIALS = [
  { label: 'LinkedIn profile', href: LINKEDIN_URL, icon: FaLinkedinIn, external: true },
  { label: 'GitHub profile', href: GITHUB_URL, icon: FaGithub, external: true },
  { label: `Email ${EMAIL}`, href: EMAIL_HREF, icon: FiMail, external: false },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a className={styles.brand} href="#hero">
        <span className={styles.brandMark} aria-hidden="true">
          IM
        </span>
        Ivy Mbengi
      </a>

      <p className={styles.copyright}>
        &copy; 2026 Ivy Mbengi. Built with &#9729;&#65039; and curiosity.
      </p>

      <ul className={styles.socials}>
        {SOCIALS.map(({ label, href, icon: Icon, external }) => (
          <li key={label}>
            <a
              className={styles.social}
              href={href}
              aria-label={label}
              title={label}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <Icon aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
