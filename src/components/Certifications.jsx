import { FaAws } from 'react-icons/fa';
import { SiKubernetes } from 'react-icons/si';
import { FiCheckCircle } from 'react-icons/fi';

import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import styles from './Certifications.module.css';

// Badge glyphs use Accent Teal rather than AWS orange, to stay inside the palette.
const CERTIFICATIONS = [
  {
    name: 'AWS Certified CloudOps – Associate',
    issuer: 'Amazon Web Services',
    date: 'Sep 2026',
    icon: FaAws,
  },
  {
    name: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    date: 'Jun 2026',
    icon: FaAws,
  },
  {
    name: 'AWS Certified AI Practitioner',
    issuer: 'Amazon Web Services',
    date: 'Jun 2026',
    icon: FaAws,
  },
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '2024',
    icon: FaAws,
  },
  {
    name: 'Kubernetes Cloud Native Associate (KCNA)',
    issuer: 'The Linux Foundation',
    date: 'Sep 2026',
    icon: SiKubernetes,
  },
];

export default function Certifications() {
  return (
    <section className="panel" id="certifications" aria-labelledby="certifications-title">
      <SectionHeading
        title="Certifications"
        subtitle="Five cloud and cloud-native credentials earned alongside hands-on project work."
        id="certifications-title"
      />

      <ul className={styles.grid}>
        {CERTIFICATIONS.map((cert, index) => {
          const Icon = cert.icon;

          return (
            <Reveal as="li" key={cert.name} delay={index * 0.06} amount={0.2}>
              <article className={styles.card}>
                <span className={styles.badge} aria-hidden="true">
                  <span className={styles.badgeSheen} />
                  <Icon className={styles.badgeIcon} />
                </span>

                <div className={styles.body}>
                  <p className={styles.issuer}>{cert.issuer}</p>
                  <h3 className={styles.name}>{cert.name}</h3>
                  <p className={styles.date}>
                    <FiCheckCircle aria-hidden="true" />
                    <span className="sr-only">Earned </span>
                    {cert.date}
                  </p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
