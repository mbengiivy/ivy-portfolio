import { FiCloud, FiCode, FiGitBranch, FiShare2, FiTerminal } from 'react-icons/fi';

import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import styles from './Skills.module.css';

const SKILL_GROUPS = [
  {
    category: 'Cloud',
    icon: FiCloud,
    wide: true,
    skills: [
      'AWS EC2',
      'S3',
      'Lambda',
      'API Gateway',
      'CloudFront',
      'Rekognition',
      'Lex',
      'Polly',
      'SageMaker',
      'VPC',
      'Microsoft Azure',
    ],
  },
  {
    category: 'Networking',
    icon: FiShare2,
    skills: ['TCP/IP', 'LAN/WAN', 'Cisco Switches & Routers', 'Firewalls', 'OSPF', 'BGP', 'VLAN'],
  },
  {
    category: 'Systems & Support',
    icon: FiTerminal,
    skills: [
      'Linux Administration',
      'Enterprise IT Support',
      'System Troubleshooting',
      'User Access Management',
    ],
  },
  {
    category: 'Development',
    icon: FiCode,
    skills: ['React', 'Django', 'SQL', 'Git'],
  },
  {
    category: 'DevOps',
    icon: FiGitBranch,
    skills: ['Ansible', 'Version Control Workflows'],
  },
];

export default function Skills() {
  return (
    <section className="panel" id="skills" aria-labelledby="skills-title">
      <SectionHeading
        title="Skills"
        subtitle="The tooling I reach for across cloud, network, and platform work."
        id="skills-title"
      />

      <ul className={styles.grid}>
        {SKILL_GROUPS.map((group, index) => {
          const Icon = group.icon;

          return (
            <Reveal
              as="li"
              key={group.category}
              delay={index * 0.06}
              amount={0.15}
              data-wide={group.wide ? 'true' : undefined}
            >
              <article className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.icon} aria-hidden="true">
                    <Icon />
                  </span>
                  <div>
                    <h3 className={styles.category}>{group.category}</h3>
                    <p className={styles.count}>
                      {group.skills.length} {group.skills.length === 1 ? 'skill' : 'skills'}
                    </p>
                  </div>
                </div>

                <ul className={styles.tags}>
                  {group.skills.map((skill) => (
                    <li className={styles.tag} key={skill}>
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
