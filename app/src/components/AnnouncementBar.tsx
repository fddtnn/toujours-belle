import { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

const messages = [
  'Essayage Virtuel IA Offert',
  'Paiement par Facilité Sans Intérêt',
  'Livraison Rapide dans Toute la Tunisie',
  'Livraison Internationale Disponible',
  'Accompagnement Personnalisé par Expert',
];

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('announcement-dismissed');
    if (dismissed) setVisible(false);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [visible]);

  const handleDismiss = useCallback(() => {
    setVisible(false);
    sessionStorage.setItem('announcement-dismissed', 'true');
  }, []);

  if (!visible) return null;

  return (
    <div className="relative w-full flex items-center justify-center" style={{ height: '40px', backgroundColor: 'var(--tb-text)', zIndex: 110 }}>
      <p className="text-center px-12" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--tb-bg)', transition: 'opacity 0.5s ease' }}>
        {messages[current]}
      </p>
      <button onClick={handleDismiss} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity" style={{ color: 'var(--tb-bg)' }} aria-label="Fermer">
        <X size={14} />
      </button>
    </div>
  );
}
