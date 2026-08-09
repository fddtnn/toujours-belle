import { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Award, Leaf, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Users, value: 5, suffix: 'K+', suffixAr: '+5 ألف', labelFr: 'Clientes Satisfaites', labelAr: 'زبونة راضية' },
  { icon: Award, value: 12, suffix: '+', suffixAr: '+12', labelFr: 'Années d\'Expérience', labelAr: 'سنوات الخبرة' },
  { icon: Leaf, value: 100, suffix: '%', suffixAr: '%100', labelFr: 'Cheveux Naturels', labelAr: 'شعر طبيعي' },
  { icon: Star, value: 4.8, suffix: '/5', suffixAr: '/5', labelFr: 'Note Moyenne', labelAr: 'التقييم المتوسط', isDecimal: true },
];

export default function TrustStrip() {
  const { lang, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      stats.forEach((stat, idx) => {
        const el = countersRef.current[idx];
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            if (stat.isDecimal) {
              el.textContent = obj.val.toFixed(1) + (lang === 'fr' ? stat.suffix : stat.suffixAr);
            } else {
              el.textContent = Math.floor(obj.val) + (lang === 'fr' ? stat.suffix : stat.suffixAr);
            }
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [lang]);

  return (
    <section ref={sectionRef} className="relative w-full" style={{ zIndex: 1, backgroundColor: 'var(--tb-bg-secondary)', padding: '60px 0' }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8" style={{ flexDirection: isRTL ? 'row-reverse' : undefined }}>
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <stat.icon size={24} color="#d4a5a5" className="mx-auto mb-3" strokeWidth={1.5} />
              <span
                ref={(el) => { countersRef.current[idx] = el; }}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 400,
                  fontSize: '40px',
                  color: '#d4a5a5',
                  lineHeight: 1.2,
                }}
              >
                0{lang === 'fr' ? stat.suffix : stat.suffixAr}
              </span>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '13px', color: 'var(--tb-text-secondary)', marginTop: '4px' }}>
                {lang === 'fr' ? stat.labelFr : stat.labelAr}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
