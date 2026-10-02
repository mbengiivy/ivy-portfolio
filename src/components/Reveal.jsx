import { motion, useReducedMotion } from 'framer-motion';

/**
 * Scroll-triggered reveal wrapper.
 *
 * Animates its children once, the first time they enter the viewport.
 * Honours `prefers-reduced-motion` by rendering the final state immediately.
 */

const OFFSETS = {
  up: { y: 28, x: 0 },
  left: { y: 0, x: -56 },
  right: { y: 0, x: 56 },
  none: { y: 0, x: 0 },
};

export default function Reveal({
  children,
  as = 'div',
  direction = 'up',
  delay = 0,
  duration = 0.55,
  amount = 0.2,
  className,
  ...rest
}) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;
  const offset = OFFSETS[direction] ?? OFFSETS.up;

  return (
    <MotionTag
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: [0.22, 0.61, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
