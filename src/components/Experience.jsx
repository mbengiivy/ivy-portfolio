import { FiBriefcase } from 'react-icons/fi';

import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import styles from './Experience.module.css';

const ROLES = [
  {
    role: 'Cloud Support Associate Intern',
    org: 'Amazon Web Services',
    location: 'Nairobi',
    period: 'April 2026 – October 2026',
    points: [
      'Resolved complex customer cases spanning Networking, Linux, Security, and core AWS services',
      'Designed secure, scalable cloud architectures including serverless, 3-tier, and multi-AZ patterns',
      'Worked hands-on with AWS AI/ML services: Rekognition, Lex, and Polly',
      'Earned AWS Solutions Architect – Associate and AWS AI Practitioner certifications',
    ],
  },
  {
    role: 'NOC Engineer Intern',
    org: 'V-Squared Networks',
    location: 'Nairobi',
    period: 'Jan 2026 – Mar 2026',
    points: [
      'Monitored network performance and resolved outages and throughput bottlenecks',
      'Troubleshot Cisco and Mikrotik hardware across VLAN, OSPF, and BGP configurations',
      'Applied automation with Ansible and maintained SLA compliance',
    ],
  },
  {
    role: 'Networks & Telecommunications Intern',
    org: 'KenGen Kenya',
    location: 'Nairobi',
    period: 'Sep 2025 – Dec 2025',
    points: [
      'Configured Cisco Nexus switches, firewalls, and Cisco ThousandEyes monitoring',
      'Supported user access management in high-availability environments',
    ],
  },
  {
    role: 'IT Support Intern',
    org: 'Sarova Panafric Hotel',
    location: 'Nairobi',
    period: 'Jul 2024 – Sep 2024',
    points: [
      'Delivered frontline ICT support across hospitality management and POS systems',
      'Handled hardware and software installation, configuration, and maintenance',
    ],
  },
];

export default function Experience() {
  return (
    <section className="panel" id="experience" aria-labelledby="experience-title">
      <SectionHeading
        title="Experience"
        subtitle="Four internships across cloud support, network operations, and enterprise IT."
        id="experience-title"
      />

      <Reveal className={styles.header} amount={0.4}>
        <span className={styles.headerIcon} aria-hidden="true">
          <FiBriefcase />
        </span>
        <h3 className={styles.headerTitle}>Internships</h3>
      </Reveal>

      <ol className={styles.timeline}>
        {ROLES.map((item, index) => (
          <Reveal
            as="li"
            className={styles.item}
            key={`${item.org}-${item.role}`}
            delay={index * 0.06}
            amount={0.2}
          >
            <span className={styles.dot} aria-hidden="true" />

            <h4 className={styles.role}>{item.role}</h4>

            <p className={styles.org}>
              {item.org}
              <span className={styles.separator} aria-hidden="true">
                /
              </span>
              <span className={styles.location}>{item.location}</span>
            </p>

            <p className={styles.period}>{item.period}</p>

            <ul className={styles.points}>
              {item.points.map((point) => (
                <li className={styles.point} key={point}>
                  <span className={styles.pointDot} aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
