import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Media query equivalent for hover: hover and pointer: fine
    const isHoverableDevice = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isHoverableDevice) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    let isMounted = true;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    };

    const animateFollower = () => {
      if (!isMounted) return;
      followerX += (mouseX - followerX) * 0.2;
      followerY += (mouseY - followerY) * 0.2;
      follower.style.left = `${followerX}px`;
      follower.style.top = `${followerY}px`;
      requestAnimationFrame(animateFollower);
    };

    window.addEventListener('mousemove', onMouseMove);
    requestAnimationFrame(animateFollower);

    // MutationObserver to attach hover events to dynamic elements
    const handleHoverElements = () => {
      const hoverTargets = document.querySelectorAll('a, button, .clickable, .work-card, .game-item, .magnetic');
      hoverTargets.forEach((el) => {
        // Avoid adding multiple listeners
        if (el.getAttribute('data-cursor-attached')) return;
        el.setAttribute('data-cursor-attached', 'true');

        el.addEventListener('mouseenter', () => {
          cursor.classList.add('hovered');
          follower.classList.add('hovered');
        });
        el.addEventListener('mouseleave', () => {
          cursor.classList.remove('hovered');
          follower.classList.remove('hovered');
        });
      });
    };

    const observer = new MutationObserver(() => {
      handleHoverElements();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    handleHoverElements();

    return () => {
      isMounted = false;
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="noise-overlay"></div>
      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor-follower" ref={followerRef}></div>
    </>
  );
}
