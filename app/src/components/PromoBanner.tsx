import { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PromoBanner() {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.promo-content', { opacity: 0, x: isRTL ? -50 : 50 }, {
        opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [isRTL]);

  return (
    <section ref={sectionRef} className="relative w-full" style={{ zIndex: 1 }}>
      <div className="flex flex-row" style={{ minHeight: '100px', flexDirection: isRTL ? 'row-reverse' : undefined }}>
        {/* Text on LEFT */}
        <div
          className="promo-content w-1/2 flex flex-col items-center justify-center text-center px-3 sm:px-4 md:px-8"
          style={{ backgroundColor: 'var(--tb-text)', padding: 'clamp(20px, 4vw, 60px) clamp(12px, 3vw, 40px)' }}
        >
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 'clamp(0.9rem, 3.5vw, 3.5rem)', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#d4a5a5', marginBottom: '12px' }}>
            {t({ fr: 'OFFRE SPÉCIALE', ar: 'عرض خاص' })}
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(0.75rem, 1.3vw, 1.1rem)', color: '#d4a5a5', fontWeight: 300, marginBottom: '16px' }}>
            <span style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.8rem)', fontWeight: 700 }}>-15%</span>{' '}
            {t({ fr: 'avec le code', ar: 'مع الكود' })} <strong style={{ fontWeight: 600 }}>BIENVENUE15</strong>
          </p>
          <a
            href="#product"
            onClick={(e) => { e.preventDefault(); document.querySelector('#product')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="whitespace-nowrap"
            style={{
              padding: 'clamp(8px, 1.5vw, 14px) clamp(16px, 3vw, 36px)',
              borderRadius: '100px',
              backgroundColor: '#d4a5a5',
              color: 'var(--tb-text)',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 'clamp(10px, 1.2vw, 13px)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--tb-bg)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#d4a5a5'; }}
          >
            {t({ fr: 'Commander Maintenant', ar: 'اطلبي الآن' })}
          </a>
        </div>
        {/* Image on RIGHT */}
        <div className="w-1/2 flex items-stretch justify-end overflow-hidden">
          <img
            src="/images/product-gallery-3.jpg"
            alt="Promo"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
