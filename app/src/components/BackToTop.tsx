import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed z-[140] flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition-all duration-300 ${
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      style={{
        bottom: '92px',
        right: '24px',
        width: '44px',
        height: '44px',
        backgroundColor: 'var(--tb-text)',
        color: 'var(--tb-bg)',
      }}
      aria-label="Retour en haut"
    >
      <ChevronUp size={20} />
    </button>
  );
}
