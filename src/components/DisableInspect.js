'use client';
import { useEffect } from 'react';

export default function DisableInspect() {
  useEffect(() => {
    const disableRightClick = (e) => e.preventDefault();
    const disableKeyShortcuts = (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
        (e.ctrlKey && e.key === 'U') ||
        (e.metaKey && e.key.toLowerCase() === 'u')
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', disableRightClick);
    document.addEventListener('keydown', disableKeyShortcuts);

    const devToolsCheck = setInterval(() => {
      if (
        window.outerWidth - window.innerWidth > 160 ||
        window.outerHeight - window.innerHeight > 160
      ) {
        console.clear();
        console.log('DevTools is open');
        // Optional: Redirect or show warning
      }
    }, 1000);

    return () => {
      document.removeEventListener('contextmenu', disableRightClick);
      document.removeEventListener('keydown', disableKeyShortcuts);
      clearInterval(devToolsCheck);
    };
  }, []);

  return null;
}
