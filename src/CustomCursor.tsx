import { useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  // Use springs for the follower lag
  const cursorX = useSpring(0, { stiffness: 1000, damping: 50 });
  const cursorY = useSpring(0, { stiffness: 1000, damping: 50 });
  
  const followerX = useSpring(0, { stiffness: 200, damping: 25, mass: 0.5 });
  const followerY = useSpring(0, { stiffness: 200, damping: 25, mass: 0.5 });

  useEffect(() => {
    const isHoverableDevice = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isHoverableDevice) return;

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      followerX.set(e.clientX);
      followerY.set(e.clientY);
    };

    window.addEventListener('mousemove', onMouseMove);

    const handleHoverElements = () => {
      const hoverTargets = document.querySelectorAll('a, button, .clickable, .work-card, .game-item, .magnetic');
      hoverTargets.forEach((el) => {
        if (el.getAttribute('data-cursor-attached')) return;
        el.setAttribute('data-cursor-attached', 'true');

        el.addEventListener('mouseenter', () => {
          if (cursorRef.current) cursorRef.current.classList.add('hovered');
          document.documentElement.style.setProperty('--follower-scale', '2');
          document.documentElement.style.setProperty('--follower-bg', 'rgba(0, 51, 255, 0.1)');
          document.documentElement.style.setProperty('--follower-border', 'var(--blue)');
        });
        el.addEventListener('mouseleave', () => {
          if (cursorRef.current) cursorRef.current.classList.remove('hovered');
          document.documentElement.style.setProperty('--follower-scale', '1');
          document.documentElement.style.setProperty('--follower-bg', 'transparent');
          document.documentElement.style.setProperty('--follower-border', 'var(--black)');
        });
      });
    };

    const observer = new MutationObserver(handleHoverElements);
    observer.observe(document.body, { childList: true, subtree: true });
    handleHoverElements();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
    };
  }, [cursorX, cursorY, followerX, followerY]);

  return (
    <>
      <div className="noise-overlay"></div>
      
      {/* Real cursor (instant) */}
      <motion.div 
        className="cursor" 
        ref={cursorRef}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      
      {/* Bouncy Follower */}
      <motion.div 
        className="cursor-follower" 
        style={{
          x: followerX,
          y: followerY,
          translateX: '-50%',
          translateY: '-50%',
          scale: 'var(--follower-scale, 1)',
          background: 'var(--follower-bg, transparent)',
          borderColor: 'var(--follower-border, var(--black))',
          transition: 'scale 0.3s, background 0.3s, border-color 0.3s'
        }}
      />
    </>
  );
}
