import { useLanguage } from '../context/LanguageContext';
import { Truck, ShieldCheck } from 'lucide-react';

const items = [
  { icon: Truck, labelFr: 'Livraison Gratuite Pour La Premiere commande', labelAr: 'توصيل مجاني للطلب الأول' },
  { icon: ShieldCheck, labelFr: 'Paiement 100% Sécurisé', labelAr: 'دفع 100٪ آمن' },
];

export default function TrustBar() {
  const { lang, isRTL } = useLanguage();
  return (
    <div
      className="hidden lg:flex w-full items-center justify-center gap-8"
      style={{
        height: '36px',
        backgroundColor: 'var(--tb-bg)',
        borderBottom: '1px solid var(--tb-border)',
        zIndex: 109,
        flexDirection: isRTL ? 'row-reverse' : 'row',
      }}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className="flex items-center gap-2"
          style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
        >
          <item.icon size={14} color="#d4a5a5" strokeWidth={1.5} />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '11px',
              color: 'var(--tb-text-secondary)',
            }}
          >
            {lang === 'fr' ? item.labelFr : item.labelAr}
          </span>
        </div>
      ))}
    </div>
  );
}
