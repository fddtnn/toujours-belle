import { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HairType {
  id: string;
  nameFr: string;
  nameAr: string;
  descFr: string;
  descAr: string;
  image: string;
}

const hairTypes: HairType[] = [
  {
    id: 'straight',
    nameFr: 'Lisses',
    nameAr: 'الشعر الناعم',
    descFr: 'Cheveux raides et soyeux, parfaits pour un look chic et sophistiqué.',
    descAr: 'شعر ناعم وحريري، مثالي لإطلالة أنيقة وراقية.',
    image: '/images/lisses-demi-perruque.jpg',
  },
  {
    id: 'wavy',
    nameFr: 'Ondulé',
    nameAr: 'الشعر المموج',
    descFr: 'Ondulations naturelles pour un style décontracté et élégant.',
    descAr: 'تموجات طبيعية لأسلوب غير رسمي وأنيق.',
    image: '/images/ondules.jpg',
  },
  {
    id: 'curly',
    nameFr: 'Crepus',
    nameAr: 'الشعر المجعد',
    descFr: 'Boucles définies et rebondissantes, pleines de volume et de vitalité.',
    descAr: 'خصلات محددة ونابضة، مليئة بالحجم والحيوية.',
    image: '/images/boucles.jpg',
  },
  {
    id: 'kinky',
    nameFr: 'Frisés',
    nameAr: 'الشعر المجعد',
    descFr: 'Texture frisée authentique, célébrant la beauté naturelle des cheveux afro.',
    descAr: 'ملمس مجعد أصيل، يحتفي بجمال الشعر الأفرو الطبيعي.',
    image: '/images/frises.jpg',
  },
];

interface HairTypesProps {
  onSelectType: (type: string) => void;
}

export default function HairTypes({ onSelectType }: HairTypesProps) {
  const { t, lang, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (introRef.current) {
        const imgEl = introRef.current.querySelector('.intro-image');
        const textEl = introRef.current.querySelector('.intro-text');
        if (imgEl) {
          gsap.fromTo(imgEl, { opacity: 0, x: isRTL ? 60 : -60, scale: 0.95 }, {
            opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: introRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          });
        }
        if (textEl) {
          gsap.fromTo(textEl, { opacity: 0, x: isRTL ? -60 : 60 }, {
            opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.2,
            scrollTrigger: { trigger: introRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          });
        }
      }
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.hair-card');
        gsap.fromTo(cards, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: cardsRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [isRTL]);

  return (
    <section ref={sectionRef} id="hair-types" className="relative w-full" style={{ zIndex: 1, backgroundColor: 'rgba(250, 246, 244, 0.92)', padding: '120px 0' }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        {/* Intro Block */}
        <div ref={introRef} className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center mb-20" style={{ flexDirection: isRTL ? 'row-reverse' : undefined }}>
          <div className="intro-image w-full lg:w-[55%]">
            <img src="/images/raides.jpg" alt="Natural hair" className="w-full rounded-xl object-cover" style={{ maxHeight: '500px' }} loading="lazy" />
          </div>
          <div className="intro-text w-full lg:w-[45%]">
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--tb-text-secondary)', marginBottom: '16px' }}>
              {t({ fr: 'NOTRE COLLECTION', ar: 'مجموعتنا' })}
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.15, color: '#d4a5a5', marginBottom: '20px' }}>
              {t({ fr: 'Quatre Types de Cheveux', ar: 'أربعة أنواع الشعر' })}
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '16px', lineHeight: 1.6, color: 'var(--tb-text-secondary)', marginBottom: '24px' }}>
              {t({ fr: "De raide à frisé, trouvez le style qui vous correspond. Chaque mèche est soigneusement sélectionnée pour sa qualité exceptionnelle et son aspect naturel.", ar: 'من الشعر الناعم إلى المجعد، اعثري على الأسلوب المناسب لكِ. كل خصلة مختارة بعناية لجودتها الاستثنائية ومظهرها الطبيعي.' })}
            </p>
            <a href="#colors" onClick={(e) => { e.preventDefault(); document.querySelector('#colors')?.scrollIntoView({ behavior: 'smooth' }); }} className="inline-block relative group" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--tb-text)', textDecoration: 'none' }}>
              {t({ fr: 'Voir la Collection', ar: 'شاهدي المجموعة' })}
              <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[1px] bg-[var(--tb-text)] transition-all duration-300" />
            </a>
          </div>
        </div>

        {/* Hair Type Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {hairTypes.map((hair) => (
            <div key={hair.id} className="hair-card bg-white rounded-xl overflow-hidden cursor-pointer" style={{ padding: '24px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', transition: 'all 0.4s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)'; }}
              onClick={() => onSelectType(hair.id)}>
              <div className="rounded-lg overflow-hidden mb-5" style={{ aspectRatio: '3/4', maxHeight: '320px' }}>
                <img src={hair.image} alt={lang === 'fr' ? hair.nameFr : hair.nameAr} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: '1.5rem', color: 'var(--tb-text)', marginBottom: '8px' }}>
                {lang === 'fr' ? hair.nameFr : hair.nameAr}
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: 1.5, color: 'var(--tb-text-secondary)', marginBottom: '12px' }}>
                {lang === 'fr' ? hair.descFr : hair.descAr}
              </p>
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '12px', letterSpacing: '0.08em', color: '#d4a5a5' }}>
                {isRTL ? '← ' : ''}{t({ fr: 'Voir plus', ar: 'المزيد' })}{!isRTL ? ' →' : ''}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
