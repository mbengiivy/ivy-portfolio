import { FiAward, FiBookOpen, FiCloud, FiCpu, FiMapPin, FiShare2, FiTerminal } from 'react-icons/fi';

import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import styles from './About.module.css';

const FACTS = [
  { icon: FiMapPin, label: 'Nairobi, Kenya' },
  { icon: FiBookOpen, label: 'BIT, Kenyatta University' },
  { icon: FiAward, label: '5 Cloud Certifications' },
];

/** Each one summarises work Ivy has actually done, drawn from her roles. */
const SERVICES = [
  {
    title: 'Cloud Architecture',
    icon: FiCloud,
    text: 'Designing secure, scalable architectures on AWS — serverless, 3-tier, and multi-AZ patterns.',
  },
  {
    title: 'Network Operations',
    icon: FiShare2,
    text: 'Monitoring and troubleshooting enterprise networks across Cisco and Mikrotik hardware, VLAN, OSPF, and BGP.',
  },
  {
    title: 'Linux & IT Support',
    icon: FiTerminal,
    text: 'Resolving Linux, security, and user access issues across multi-user enterprise environments.',
  },
  {
    title: 'AI on AWS',
    icon: FiCpu,
    text: 'Building with Rekognition, Lex, Polly, and SageMaker to make services more accessible.',
  },
];

export default function About() {
  return (
    <section className="panel" id="about" aria-labelledby="about-title">
      <SectionHeading title="About Me" id="about-title" />

      <Reveal className={styles.bio} amount={0.15}>
        <p>
          I&rsquo;m a cloud and IT professional based in Nairobi, Kenya, with hands-on experience
          across <span className={styles.highlight}>cloud infrastructure</span>,{' '}
          <span className={styles.highlight}>network operations</span>, and{' '}
          <span className={styles.highlight}>technical support</span> in enterprise and
          cloud-native environments.
        </p>
        <p>
          I&rsquo;m adept at diagnosing complex technical issues, supporting multi-user
          environments, and communicating clearly with both technical and non-technical
          stakeholders. I hold a Bachelor of Information Technology from Kenyatta University and
          multiple AWS certifications.
        </p>
        <p>
          When I&rsquo;m not building in the cloud, I&rsquo;m exploring how AI and serverless
          architectures can solve real-world problems.
        </p>

        <ul className={styles.facts}>
          {FACTS.map(({ icon: Icon, label }) => (
            <li className={styles.fact} key={label}>
              <Icon className={styles.factIcon} aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal amount={0.2}>
        <h3 className={styles.subheading}>What I&rsquo;m Doing</h3>
      </Reveal>

      <ul className={styles.services}>
        {SERVICES.map(({ title, icon: Icon, text }, index) => (
          <Reveal as="li" key={title} delay={index * 0.07} amount={0.15}>
            <article className={styles.service}>
              <span className={styles.serviceIcon} aria-hidden="true">
                <Icon />
              </span>
              <div>
                <h4 className={styles.serviceTitle}>{title}</h4>
                <p className={styles.serviceText}>{text}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
