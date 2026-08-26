import { useEffect } from 'react';

export function useMagnetic() {
  useEffect(() => {
    const isHoverableDevice = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isHoverableDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      el.style.transform = '';
    };

    const applyMagnetic = () => {
      const magnetics = document.querySelectorAll('.magnetic');
      magnetics.forEach(el => {
        if (el.getAttribute('data-magnetic-attached')) return;
        el.setAttribute('data-magnetic-attached', 'true');
        el.addEventListener('mousemove', handleMouseMove as EventListener);
        el.addEventListener('mouseleave', handleMouseLeave as EventListener);
      });
    };

    const observer = new MutationObserver(applyMagnetic);
    observer.observe(document.body, { childList: true, subtree: true });
    applyMagnetic();

    return () => {
      observer.disconnect();
      document.querySelectorAll('.magnetic').forEach(el => {
        el.removeEventListener('mousemove', handleMouseMove as EventListener);
        el.removeEventListener('mouseleave', handleMouseLeave as EventListener);
      });
    };
  }, []);
}
