import { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const products = [
  { nameFr: 'Cheveux ondulés ombre et balayage', nameAr: 'شعر مموج أومبر وبالياج', image: '/images/featured-1.jpg', typeFr: 'Demi-perruque', typeAr: 'نصف باروكة', price: 290 },
  { nameFr: 'Cheveux lisses noir naturel', nameAr: 'شعر ناعم أسود طبيعي', image: '/images/featured-2.jpg', typeFr: 'perruque', typeAr: 'باروكة', price: 330 },
  { nameFr: 'Cheveux lisses noir naturel', nameAr: 'شعر ناعم أسود طبيعي', image: '/images/featured-3.jpg', typeFr: 'Frange Hd avc cotês', typeAr: 'غرة HD مع جوانب', price: 370 },
  { nameFr: 'Cheveux lisse noir nero, noir naturel, marron chocolat', nameAr: 'شعر ناعم أسود، أسود طبيعي، بني شوكولاتة', image: '/images/featured-4.jpg', typeFr: 'Demi perruque', typeAr: 'نصف باروكة', price: 410 },
];

export default function FeaturedProducts() {
  const { t, lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.fp-card');
      if (cards) {
        gsap.fromTo(cards, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full" style={{ zIndex: 1, backgroundColor: 'var(--tb-bg-secondary)', padding: '80px 0' }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-10">
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#d4a5a5', marginBottom: '10px' }}>
            {t({ fr: 'NOS BEST-SELLERS', ar: 'الأكثر مبيعًا' })}
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#d4a5a5', lineHeight: 1.15 }}>
            {t({ fr: 'Les Plus Demandés', ar: 'الأكثر طلبًا' })}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, idx) => (
            <div key={idx} className="fp-card group cursor-pointer rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--tb-bg)', transition: 'all 0.4s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div className="overflow-hidden flex items-center justify-center" style={{ aspectRatio: '1/1.2', backgroundColor: '#f5ece8' }}>
                <img src={p.image} alt={lang === 'fr' ? p.nameFr : p.nameAr} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="p-4">
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#d4a5a5', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{lang === 'fr' ? p.typeFr : p.typeAr}</span>
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '14px', color: 'var(--tb-text)', marginTop: '4px', marginBottom: '6px' }}>{lang === 'fr' ? p.nameFr : p.nameAr}</h3>
                <div className="flex items-center gap-1 mb-2">{[1,2,3,4,5].map(s => <Star key={s} size={12} fill="#d4a5a5" color="#d4a5a5" />)}</div>
                <div className="flex items-center justify-between">
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '15px', color: '#d4a5a5' }}>{t({ fr: `À partir de ${p.price} TND`, ar: `ابتداءً من ${p.price} د.ت` })}</span>
                </div>
                <button className="w-full mt-3 py-2.5 rounded-lg transition-colors duration-300" style={{ backgroundColor: 'var(--tb-text)', color: 'var(--tb-bg)', fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#d4a5a5'; e.currentTarget.style.color = 'var(--tb-text)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--tb-text)'; e.currentTarget.style.color = 'var(--tb-bg)'; }}>
                  {t({ fr: 'Ajouter au Panier', ar: 'أضيفي إلى السلة' })}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a href="#product" onClick={(e) => { e.preventDefault(); document.querySelector('#product')?.scrollIntoView({ behavior: 'smooth' }); }} className="inline-flex items-center gap-2 group" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--tb-text)', textDecoration: 'none' }}>
            {t({ fr: 'Voir Tout', ar: 'عرض الكل' })}<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
