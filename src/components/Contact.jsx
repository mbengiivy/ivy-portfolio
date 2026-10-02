import { useState } from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FiArrowRight, FiMail, FiMapPin, FiSend } from 'react-icons/fi';

import {
  EMAIL,
  EMAIL_HREF,
  GITHUB_URL,
  LINKEDIN_URL,
  LOCATION,
} from '../data/contactInfo.js';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import styles from './Contact.module.css';

const CHANNELS = [
  { label: 'Email', value: EMAIL, href: EMAIL_HREF, icon: FiMail, external: false },
  { label: 'LinkedIn', value: 'ivy-mbengi', href: LINKEDIN_URL, icon: FaLinkedinIn, external: true },
  { label: 'GitHub', value: 'mbengiivy', href: GITHUB_URL, icon: FaGithub, external: true },
  { label: 'Location', value: LOCATION, icon: FiMapPin, external: false },
];

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // TODO: wire this up to a form backend (Netlify Forms, Formspree, or an API
  // Gateway + Lambda endpoint). For now it only confirms the click.
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section className="panel" id="contact" aria-labelledby="contact-title">
      <SectionHeading
        title="Let's Connect"
        subtitle="Open to cloud engineering and solutions architecture conversations. The fastest route is email."
        id="contact-title"
      />

      <div className={styles.layout}>
        <Reveal className={styles.channels} amount={0.15}>
          {CHANNELS.map(({ label, value, href, icon: Icon, external }) => {
            // Location has nothing to link to, so it renders as a plain card.
            const Tag = href ? 'a' : 'div';

            return (
              <Tag
                className={styles.channel}
                key={label}
                {...(href ? { href } : {})}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className={styles.channelIcon} aria-hidden="true">
                  <Icon />
                </span>
                <span className={styles.channelText}>
                  <span className={styles.channelLabel}>{label}</span>
                  <span className={styles.channelValue}>{value}</span>
                </span>
                {href && <FiArrowRight className={styles.channelArrow} aria-hidden="true" />}
              </Tag>
            );
          })}
        </Reveal>

        <Reveal amount={0.15} delay={0.08}>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <h3 className={styles.formTitle}>Send a message</h3>
            <p className={styles.formHint}>
              Tell me about the role, the project, or just say hello.
            </p>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="contact-name">
                Name
              </label>
              <input
                className={styles.input}
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="contact-email">
                Email
              </label>
              <input
                className={styles.input}
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="contact-message">
                Message
              </label>
              <textarea
                className={styles.textarea}
                id="contact-message"
                name="message"
                placeholder="What would you like to build?"
              />
            </div>

            <button className={styles.submit} type="submit">
              Send Message
              <FiSend aria-hidden="true" />
            </button>

            <p className={styles.status} role="status">
              {isSubmitted ? (
                <>
                  Thanks for reaching out. This form isn&rsquo;t connected to a backend yet, so
                  please email me at{' '}
                  <a className={styles.statusLink} href={EMAIL_HREF}>
                    {EMAIL}
                  </a>
                  .
                </>
              ) : (
                <>
                  Heads-up: this form is a styled placeholder. Email reaches me fastest at{' '}
                  <a className={styles.statusLink} href={EMAIL_HREF}>
                    {EMAIL}
                  </a>
                  .
                </>
              )}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
