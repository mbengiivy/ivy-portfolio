import { FiActivity, FiArrowUpRight, FiHeart } from 'react-icons/fi';

import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import styles from './Projects.module.css';

// TODO: swap each `href: '#'` for the live demo or GitHub URL.
const PROJECTS = [
  {
    title: 'Project ARIA',
    category: 'AI-Powered Healthcare Accessibility Platform',
    icon: FiHeart,
    points: [
      'Built a serverless backend using AWS Lambda, API Gateway, S3, and CloudFront',
      'Integrated Amazon Polly, Lex, and SageMaker for multilingual, accessible healthcare services',
      'Responsive React frontend designed for non-English-speaking and low-literacy users',
    ],
    tags: [
      'AWS Lambda',
      'API Gateway',
      'S3',
      'CloudFront',
      'Amazon Polly',
      'Amazon Lex',
      'SageMaker',
      'React',
    ],
    href: '#',
  },
  {
    title: 'CampusResolve',
    category: 'Campus Incident Reporting Platform',
    icon: FiActivity,
    points: [
      'Co-developed a real-time web platform on AWS for incident and item reporting',
      'Led frontend development using React with an intuitive student-facing interface',
    ],
    tags: ['AWS', 'React', 'Real-time', 'Cloud Infrastructure'],
    href: '#',
  },
];

export default function Projects() {
  return (
    <section className="panel" id="projects" aria-labelledby="projects-title">
      <SectionHeading
        title="Projects"
        subtitle="Cloud-native builds where accessibility and reliability drove the architecture."
        id="projects-title"
      />

      <ul className={styles.grid}>
        {PROJECTS.map((project, index) => {
          const Icon = project.icon;

          return (
            <Reveal as="li" key={project.title} delay={index * 0.09} amount={0.12}>
              <article className={styles.card}>
                <div className={styles.cover}>
                  <span className={styles.coverGrid} aria-hidden="true" />
                  <Icon className={styles.coverIcon} aria-hidden="true" />

                  <span className={styles.overlay} aria-hidden="true">
                    <span className={styles.overlayIcon}>
                      <FiArrowUpRight />
                    </span>
                  </span>
                </div>

                <div className={styles.body}>
                  <p className={styles.category}>{project.category}</p>
                  <h3 className={styles.title}>{project.title}</h3>

                  <ul className={styles.points}>
                    {project.points.map((point) => (
                      <li className={styles.point} key={point}>
                        <span className={styles.pointDot} aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <ul className={styles.tags} aria-label={`${project.title} tech stack`}>
                    {project.tags.map((tag) => (
                      <li className={styles.tag} key={tag}>
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <span className={styles.spacer} aria-hidden="true" />

                  <a
                    className={styles.link}
                    href={project.href}
                    aria-label={`View project: ${project.title}`}
                  >
                    View Project
                    <FiArrowUpRight aria-hidden="true" />
                  </a>
                </div>
              </article>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
