import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Canvas particle network for the hero backdrop: drifting nodes that link up
 * when they drift close together.
 *
 * - Scales to devicePixelRatio so it stays crisp on retina screens.
 * - Pauses while off-screen or while the tab is hidden.
 * - Draws a single static frame when the visitor prefers reduced motion.
 */

const LINK_DISTANCE = 132;
const AREA_PER_PARTICLE = 17000;
const MIN_PARTICLES = 26;
const MAX_PARTICLES = 80;

/* Nodes borrow the two light palette roles, read from CSS so the canvas
   follows whichever theme is active rather than hardcoding hexes. */
const NODE_ROLES = ['--accent-light-rgb', '--accent-warm-rgb'];
const FALLBACK_RGB = '230, 220, 255';

/** Reads a `r, g, b` custom property off :root. */
function readRgb(property) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(property).trim();
  return value || FALLBACK_RGB;
}

export default function ParticleField({ className }) {
  const canvasRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext('2d');
    if (!context) return undefined;

    const nodeRgb = NODE_ROLES.map(readRgb);
    const linkRgb = nodeRgb[0];

    let particles = [];
    let width = 0;
    let height = 0;
    let frameId = null;
    let isVisible = true;

    const seedParticles = () => {
      const target = Math.round((width * height) / AREA_PER_PARTICLE);
      const count = Math.min(MAX_PARTICLES, Math.max(MIN_PARTICLES, target));

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.26,
        vy: (Math.random() - 0.5) * 0.26,
        radius: Math.random() * 1.7 + 0.9,
        rgb: nodeRgb[Math.random() < 0.78 ? 0 : 1],
        alpha: Math.random() * 0.35 + 0.3,
      }));
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();

      width = rect.width;
      height = rect.height;

      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      seedParticles();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      // Links first, so nodes sit on top of them.
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.hypot(dx, dy);

          if (distance < LINK_DISTANCE) {
            const strength = (1 - distance / LINK_DISTANCE) * 0.3;
            context.strokeStyle = `rgba(${linkRgb}, ${strength})`;
            context.lineWidth = 0.6;
            context.beginPath();
            context.moveTo(particles[i].x, particles[i].y);
            context.lineTo(particles[j].x, particles[j].y);
            context.stroke();
          }
        }
      }

      particles.forEach((particle) => {
        context.fillStyle = `rgba(${particle.rgb}, ${particle.alpha})`;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      });
    };

    const step = () => {
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around the edges for a seamless drift.
        if (particle.x < -10) particle.x = width + 10;
        if (particle.x > width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = height + 10;
        if (particle.y > height + 10) particle.y = -10;
      });

      draw();
      frameId = window.requestAnimationFrame(step);
    };

    const stop = () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
        frameId = null;
      }
    };

    const start = () => {
      if (frameId === null && isVisible && !document.hidden && !prefersReducedMotion) {
        frameId = window.requestAnimationFrame(step);
      }
    };

    resize();
    draw();
    start();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw();
    });
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) start();
        else stop();
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(canvas);

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [prefersReducedMotion]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
