import { useEffect } from 'react';

import Sidebar from './components/Sidebar.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Experience from './components/Experience.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import Certifications from './components/Certifications.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import styles from './App.module.css';

/**
 * Scrolls to the section named in the URL hash once React has mounted.
 *
 * The browser resolves `#projects` while the document is still an empty root
 * div, so a shared deep link would otherwise land at the top of the page.
 */
function useHashScrollOnMount() {
  useEffect(() => {
    const { hash } = window.location;
    if (!hash || hash.length < 2) return;

    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!target) return;

    // One frame, so layout has settled before measuring the offset.
    const frame = window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'auto', block: 'start' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);
}

export default function App() {
  useHashScrollOnMount();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <div className={styles.shell}>
        <div className={styles.sidebarColumn}>
          <Sidebar />
        </div>

        <div className={styles.content}>
          <Navbar />

          <main className={styles.content} id="main">
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Certifications />
            <Contact />
            <Footer />
          </main>
        </div>
      </div>
    </>
  );
}
