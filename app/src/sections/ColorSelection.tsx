import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── DATA ─── */
interface Shade {
  nameFr: string;
  nameAr: string;
  code: string;
  hex: string;
  image?: string;
}

interface Category {
  id: string;
  labelFr: string;
  labelAr: string;
  image: string;
  shades: Shade[];
}

const categories: Category[] = [
  {
    id: 'noirs',
    labelFr: 'Noirs',
    labelAr: 'أسود',
    image: '/images/cat-noirs.jpg',
    shades: [
      { nameFr: 'Noir Jais', nameAr: 'أسود حالك', code: '#1', hex: '#0a0a0a', image: '/images/nr-2.jpg' },
      { nameFr: 'Noir Naturel', nameAr: 'أسود طبيعي', code: '#1B', hex: 'var(--tb-text)', image: '/images/nr-1.jpg' },
    ],
  },
  {
    id: 'bruns',
    labelFr: 'Bruns',
    labelAr: 'بني',
    image: '/images/cat-bruns.jpg',
    shades: [
      { nameFr: 'Brun Très Foncé', nameAr: 'بني غامق جداً', code: '#2', hex: '#1c1209', image: '/images/brun-2.jpg' },
      { nameFr: 'Brun Foncé', nameAr: 'بني غامق', code: '#3', hex: '#2d1a0e', image: '/images/brun-3.jpg' },
      { nameFr: 'Brun Moyen', nameAr: 'بني متوسط', code: '#4', hex: '#4a2d17', image: '/images/brun-4.jpg' },
      { nameFr: 'Brun Toffee', nameAr: 'بني توفي', code: '#5', hex: '#5c3a1e', image: '/images/brun-5.jpg' },
      { nameFr: 'Brun Clair', nameAr: 'بني فاتح', code: '#6', hex: '#6b4423', image: '/images/brun-6.jpg' },
      { nameFr: 'Brun Souris', nameAr: 'بني رمادي', code: '#6B', hex: '#7a6b5d', image: '/images/brun-6b.jpg' },
      { nameFr: 'Brun Cendré Moyen', nameAr: 'بني رمادي متوسط', code: '#8', hex: '#8a7b6b', image: '/images/brun-8.jpg' },
      { nameFr: 'Brun Cendré', nameAr: 'بني رمادي فاتح', code: '#9', hex: '#9a8b7b', image: '/images/brun-9.jpg' },
    ],
  },
  {
    id: 'blonds',
    labelFr: 'Blonds',
    labelAr: 'أشقر',
    image: '/images/cat-blonds.jpg',
    shades: [
      { nameFr: 'Blond Foncé', nameAr: 'أشقر غامق', code: '#14', hex: '#b8956a', image: '/images/bl-1.jpg' },
      { nameFr: 'Brun Très Clair', nameAr: 'بني فاتح جداً', code: '#18', hex: '#a67c52', image: '/images/bl-2.jpg' },
      { nameFr: 'Blond Doré Clair', nameAr: 'أشقر ذهبي فاتح', code: '#16', hex: '#d4a76a', image: '/images/bl-3.jpg' },
      { nameFr: 'Blond Fraise', nameAr: 'أشقر فراولة', code: '#27', hex: '#daa06d', image: '/images/bl-4.jpg' },
      { nameFr: 'Blond Cendré Clair', nameAr: 'أشقر رمادي فاتح', code: '#22', hex: '#e8c97a', image: '/images/bl-5.jpg' },
      { nameFr: 'Blond Très Clair', nameAr: 'أشقر فاتح جداً', code: '#60', hex: '#f5e6c8', image: '/images/bl-6.jpg' },
      { nameFr: 'Blond Platine', nameAr: 'أشقر بلاتيني', code: '#613', hex: '#f0e0c0', image: '/images/bl-7.jpg' },
      { nameFr: 'Blond Glacé', nameAr: 'أشقر جليدي', code: '#Ice', hex: '#f5f0e8', image: '/images/bl-8.jpg' },
      { nameFr: 'Arctic Blonde', nameAr: 'أركتيك أشقر', code: '#AB', hex: '#f0ede8', image: '/images/bl-arctic.jpg' },
      { nameFr: 'Barbie Blonde', nameAr: 'باربي أشقر', code: '#BB', hex: '#f5ecd8', image: '/images/bl-barbie.jpg' },
      { nameFr: 'Creamy Blonde', nameAr: 'كريمي أشقر', code: '#CB', hex: '#f0e8d4', image: '/images/bl-creamy.jpg' },
      { nameFr: 'Platinum Blonde', nameAr: 'بلاتيني أشقر', code: '#PB', hex: '#e8e0d0', image: '/images/bl-platinum.jpg' },
    ],
  },
  {
    id: 'meches',
    labelFr: 'Mèches',
    labelAr: 'هايلايت',
    image: '/images/cat-meches.jpg',
    shades: [
      { nameFr: 'Cappuccino Glacé', nameAr: 'كابتشينو مثلج', code: '#14/22', hex: '#c4a882', image: '/images/mc-1.jpg' },
      { nameFr: 'Bronde Chêne', nameAr: 'بروند بلوطي', code: '#6/18', hex: '#8a6d4b', image: '/images/mc-2.jpg' },
      { nameFr: 'Blondey Biscuit', nameAr: 'بلوندي بسكويت', code: '#18/613', hex: '#c8b898', image: '/images/mc-3.jpg' },
      { nameFr: 'Blonde Moi', nameAr: 'بلوند مي', code: '#60/SS', hex: '#eae0d0', image: '/images/mc-4.jpg' },
      { nameFr: 'Pêches & Crème', nameAr: 'خوخ وكريم', code: '#27/613', hex: '#e0c8a8', image: '/images/mc-5.jpg' },
      { nameFr: 'Goldilocks', nameAr: 'غولديلوكس', code: '#16/22', hex: '#d8c078', image: '/images/mc-6.jpg' },
      { nameFr: 'Blonde Caramel', nameAr: 'بلوند كراميل', code: '#10/16', hex: '#c4a060', image: '/images/mc-7.jpg' },
      { nameFr: 'Sandy Naturel', nameAr: 'ساندي طبيعي', code: '#12/16/613', hex: '#c8b898', image: '/images/mc-8.jpg' },
      { nameFr: 'Espresso Fondu', nameAr: 'إسبريسو', code: '#2/4/6', hex: '#4a3525', image: '/images/mc-9.jpg' },
      { nameFr: 'Cookies & Cream', nameAr: 'كوكيز وكريم', code: '#4/613', hex: '#9a8a7a', image: '/images/mc-10.jpg' },
      { nameFr: 'Bronde Châtain', nameAr: 'بروند كستنائي', code: '#6/613', hex: '#9a7d5c', image: '/images/mc-11.jpg' },
      { nameFr: 'Blond Sale', nameAr: 'أشقر مائل', code: '#9/613', hex: '#b8a898', image: '/images/mc-12.jpg' },
      { nameFr: 'Miel Chocolat', nameAr: 'شوكولا عسلي', code: '#4/27', hex: '#9a7038', image: '/images/mc-13.jpg' },
      { nameFr: 'Bronde Noisette', nameAr: 'بروند بندقي', code: '#6/27', hex: '#9a7038', image: '/images/mc-14.jpg' },
      { nameFr: 'Brownie Cannelle', nameAr: 'براوني قرفة', code: '#4/30', hex: '#7a5030', image: '/images/mc-15.jpg' },
      { nameFr: 'Blonde Crèmeuse', nameAr: 'بلوند كريمي', code: '#60/613', hex: '#e8dcc8', image: '/images/mc-16.jpg' },
    ],
  },
  {
    id: 'rouges',
    labelFr: 'Rouges',
    labelAr: 'أحمر',
    image: '/images/cat-rouges.jpg',
    shades: [
      { nameFr: 'Auburn Clair', nameAr: 'أوبورن فاتح', code: '#30', hex: '#a0522d', image: '/images/rd-1.jpg' },
      { nameFr: 'Épice Automne', nameAr: 'بهارات الخريف', code: '#30B', hex: '#b05a30', image: '/images/rd-2.jpg' },
      { nameFr: 'Auburn Foncé', nameAr: 'أوبورن غامق', code: '#33', hex: '#722f37', image: '/images/rd-3.jpg' },
      { nameFr: 'Gingembre Doré', nameAr: 'زنجبيل ذهبي', code: '#27G', hex: '#daa06d', image: '/images/rd-4.jpg' },
      { nameFr: 'Roux Gingembre', nameAr: 'أحمر زنجبيلي', code: '#350G', hex: '#cc6622', image: '/images/rd-5.jpg' },
      { nameFr: 'Acajou', nameAr: 'ماهوجني', code: '#99J', hex: '#6b1a1a', image: '/images/rd-6.jpg' },
      { nameFr: 'Rouge Vif', nameAr: 'أحمر ساطع', code: '#Bright', hex: '#c41e3a', image: '/images/rd-7.jpg' },
      { nameFr: 'Prune Cerise', nameAr: 'برقوقي كرزي', code: '#530', hex: '#6b1a2a', image: '/images/rd-8.jpg' },
      { nameFr: 'Cowgirl Copper', nameAr: 'كوبر كاورغيرل', code: '#CC', hex: '#b0623a', image: '/images/rd-cowgirl.jpg' },
      { nameFr: 'Deep Red', nameAr: 'أحمر عميق', code: '#DR', hex: '#8b1a1a', image: '/images/rd-deep.jpg' },
      { nameFr: 'Flaming Ginger', nameAr: 'زنجبيل مشتعل', code: '#FG', hex: '#c4662a', image: '/images/rd-ginger.jpg' },
      { nameFr: 'Strawberry Blond', nameAr: 'أشقر فراولة', code: '#SB', hex: '#d4865a', image: '/images/rd-strawberry.jpg' },
    ],
  },
  {
    id: 'balayages',
    labelFr: 'Balayages',
    labelAr: 'بالاياج',
    image: '/images/cat-balayages.jpg',
    shades: [
      { nameFr: 'Balayage Espresso', nameAr: 'بالاياج إسبريسو', code: '#2/4', hex: '#2d1a0e', image: '/images/ba-1.jpg' },
      { nameFr: 'Balayage Châtain Miel', nameAr: 'بالاياج كستنائي عسلي', code: '#4/16', hex: '#7a5a30', image: '/images/ba-2.jpg' },
      { nameFr: 'Balayage Bronze', nameAr: 'بالاياج برونزي', code: '#6/14', hex: '#8a7038', image: '/images/ba-3.jpg' },
      { nameFr: 'Balayage Bronde', nameAr: 'بالاياج بروند', code: '#6/18', hex: '#9a7d5c', image: '/images/ba-4.jpg' },
      { nameFr: 'Balayage Biscuit', nameAr: 'بالاياج بسكويت', code: '#18/613', hex: '#c8b898', image: '/images/ba-5.jpg' },
      { nameFr: 'Balayage Cannelle', nameAr: 'بالاياج قرفة', code: '#4/27', hex: '#9a7038', image: '/images/ba-6.jpg' },
      { nameFr: 'Balayage Cendré Noir', nameAr: 'بالاياج رمادي أسود', code: '#1B/8', hex: '#4a3a2a', image: '/images/ba-7.jpg' },
      { nameFr: 'Balayage Argent', nameAr: 'بالاياج فضي', code: '#8/Silver', hex: '#9a9a9a', image: '/images/ba-8.jpg' },
      { nameFr: 'Ash Bronde Balayage', nameAr: 'آش بروند بالاياج', code: '#AB', hex: '#8a7a6a', image: '/images/ba-ash.jpg' },
      { nameFr: 'Espresso Melt', nameAr: 'إسبريسو ميلت', code: '#EM', hex: '#3a2a1a', image: '/images/ba-esspresso.jpg' },
      { nameFr: 'Natural Mocha Melt', nameAr: 'موكا طبيعي ميلت', code: '#NM', hex: '#6a5040', image: '/images/ba-mocha.jpg' },
      { nameFr: 'Toasted Chestnut Melt', nameAr: 'كستناء محمص ميلت', code: '#TC', hex: '#7a5a40', image: '/images/ba-chestnut.jpg' },
    ],
  },
  {
    id: 'ombre',
    labelFr: 'Ombré',
    labelAr: 'أومبري',
    image: '/images/cat-ombre.jpg',
    shades: [
      { nameFr: 'Ombré Chocolat Miel', nameAr: 'أومبري شوكولا عسلي', code: '#2/27', hex: '#5a3a20', image: '/images/om-1.jpg' },
      { nameFr: 'Ombré Toffee Miel', nameAr: 'أومبري توفي عسلي', code: '#4/27', hex: '#7a5a30', image: '/images/om-2.jpg' },
      { nameFr: 'Ombré Espresso Miel', nameAr: 'أومبري إسبريسو عسلي', code: '#2/14', hex: '#4a3525', image: '/images/om-3.jpg' },
      { nameFr: 'Ombré Argent Noir', nameAr: 'أومبري فضي أسود', code: '#1B/Silver', hex: '#5a5a5a', image: '/images/om-4.jpg' },
    ],
  },
  {
    id: 'fantaisie',
    labelFr: 'Fantaisie',
    labelAr: 'ألوان مميزة',
    image: '/images/cat-fantaisie.jpg',
    shades: [
      { nameFr: 'Gris Argent', nameAr: 'رمادي فضي', code: '—', hex: '#c0c0c0', image: '/images/fan-1.jpg' },
      { nameFr: 'Gris Sable', nameAr: 'رمادي رملي', code: '—', hex: '#b8b0a8', image: '/images/fan-2.jpg' },
      { nameFr: 'Rose', nameAr: 'وردي', code: '—', hex: '#e8a0b8', image: '/images/fan-3.jpg' },
      { nameFr: 'Rose Pastel', nameAr: 'وردي باستيل', code: '—', hex: '#f5c6c6', image: '/images/fan-4.jpg' },
      { nameFr: 'Turquoise', nameAr: 'تركواز', code: '—', hex: '#40e0d0', image: '/images/fan-5.jpg' },
      { nameFr: 'Bleu', nameAr: 'أزرق', code: '—', hex: '#4169e1', image: '/images/fan-6.jpg' },
      { nameFr: 'Violet', nameAr: 'بنفسجي', code: '—', hex: '#6b3fa0', image: '/images/fan-7.jpg' },
      { nameFr: 'Rouge Vif', nameAr: 'أحمر ساطع', code: '—', hex: '#c41e3a', image: '/images/fan-8.jpg' },
      { nameFr: 'Prune Cerise', nameAr: 'برقوقي كرزي', code: '—', hex: '#6b1a2a', image: '/images/fan-9.jpg' },
    ],
  },
];

/* ─── COMPONENT ─── */
interface ColorSelectionProps {
  onShadeSelect?: (shadeCode: string) => void;
}

export default function ColorSelection({ onShadeSelect }: ColorSelectionProps) {
  const { lang, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [selectedCategory, setSelectedCategory] = useState('bruns');
  const [isSwitching, setIsSwitching] = useState(false);

  const currentCategory = categories.find((c) => c.id === selectedCategory) || categories[1];

  /* GSAP — section entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (circlesRef.current) {
        gsap.fromTo(
          circlesRef.current.querySelectorAll('.cat-circle'),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: {
              trigger: circlesRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.querySelectorAll('.shade-card'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
            stagger: 0.08,
            delay: 0.3,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* GSAP — category switch */
  const handleCategoryChange = (catId: string) => {
    if (catId === selectedCategory || isSwitching) return;
    setIsSwitching(true);

    if (gridRef.current) {
      gsap.to(gridRef.current.querySelectorAll('.shade-card'), {
        opacity: 0,
        y: -10,
        duration: 0.2,
        stagger: 0.03,
        ease: 'power2.in',
        onComplete: () => {
          setSelectedCategory(catId);
          requestAnimationFrame(() => {
            if (gridRef.current) {
              gsap.fromTo(
                gridRef.current.querySelectorAll('.shade-card'),
                { opacity: 0, y: 20 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  ease: 'power3.out',
                  stagger: 0.06,
                  onComplete: () => setIsSwitching(false),
                }
              );
            }
          });
        },
      });
    } else {
      setSelectedCategory(catId);
      setIsSwitching(false);
    }
  };

  const handleShadeClick = (shadeCode: string) => {
    if (onShadeSelect) onShadeSelect(shadeCode);
    document.querySelector('#product')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="colors"
      className="relative w-full"
      style={{ zIndex: 1, backgroundColor: 'var(--tb-bg-secondary)' }}
    >
      {/* ─── A. Section Header ─── */}
      <div style={{ padding: '120px 0 40px' }}>
        <div
          ref={headerRef}
          className="max-w-[1200px] mx-auto px-6 lg:px-10 text-center"
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--tb-text-muted)',
              marginBottom: '16px',
            }}
          >
            {lang === 'fr' ? 'PALETTE DE COULEURS' : 'لوحة الألوان'}
          </p>

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: '#d4a5a5',
              lineHeight: 1.15,
              marginBottom: '12px',
            }}
          >
            {lang === 'fr' ? 'Choisissez Votre Teinte' : 'اختاري لونكِ'}
          </h2>

          <p
            className="mx-auto"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '16px',
              color: 'var(--tb-text-secondary)',
              maxWidth: '600px',
              lineHeight: 1.6,
            }}
          >
            {lang === 'fr'
              ? 'Explorez nos 8 familles de couleurs et trouvez la teinte parfaite pour vous.'
              : 'استكشفي عائلاتنا الثماني من الألوان واعثري على الظل المثالي لكِ.'}
          </p>
        </div>
      </div>

      {/* ─── B. Category Circle Swatches ─── */}
      <div
        ref={circlesRef}
        className="max-w-[1200px] mx-auto px-6 lg:px-10"
        style={{ padding: '40px 0' }}
      >
        <div
          className="flex items-start justify-center gap-5 lg:gap-8 overflow-x-auto pb-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            flexDirection: isRTL ? 'row-reverse' : 'row',
            scrollSnapType: 'x mandatory',
          }}
        >
          <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                className="cat-circle flex flex-col items-center gap-3 flex-shrink-0 cursor-pointer"
                style={{
                  scrollSnapAlign: 'center',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                }}
                onClick={() => handleCategoryChange(cat.id)}
              >
                <div
                  className="rounded-full overflow-hidden"
                  style={{
                    width: 'clamp(64px, 10vw, 80px)',
                    height: 'clamp(64px, 10vw, 80px)',
                    boxShadow: isSelected
                      ? '0 0 0 3px #d4a5a5, 0 0 0 7px var(--tb-bg-secondary), 0 4px 16px rgba(0,0,0,0.12)'
                      : '0 2px 8px rgba(0,0,0,0.08)',
                    transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.transform = 'scale(1.08)';
                      e.currentTarget.style.boxShadow =
                        '0 4px 16px rgba(0,0,0,0.12)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow =
                        '0 2px 8px rgba(0,0,0,0.08)';
                    }
                  }}
                >
                  <img
                    src={cat.image}
                    alt={lang === 'fr' ? cat.labelFr : cat.labelAr}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: '12px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: isSelected ? 'var(--tb-text)' : 'var(--tb-text-muted)',
                    transition: 'color 0.3s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {lang === 'fr' ? cat.labelFr : cat.labelAr}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── C. Shade Grid ─── */}
      <div
        className="max-w-[1200px] mx-auto px-6 lg:px-10"
        style={{ padding: '0 0 120px' }}
      >
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          style={{ gap: '24px' }}
        >
          {currentCategory.shades.map((shade, idx) => (
            <div
              key={`${selectedCategory}-${shade.code}-${idx}`}
              className="shade-card rounded-2xl overflow-hidden"
              style={{
                backgroundColor: 'var(--tb-bg-secondary)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow =
                  '0 8px 32px rgba(0,0,0,0.1)';
                const img = e.currentTarget.querySelector(
                  '.shade-img'
                ) as HTMLElement;
                if (img) img.style.transform = 'scale(1.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  '0 2px 12px rgba(0,0,0,0.06)';
                const img = e.currentTarget.querySelector(
                  '.shade-img'
                ) as HTMLElement;
                if (img) img.style.transform = 'scale(1)';
              }}
            >
              {/* Shade Image with color tint overlay */}
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: '4/5' }}
              >
                <img
                  src={shade.image || currentCategory.image}
                  alt={lang === 'fr' ? shade.nameFr : shade.nameAr}
                  className="shade-img w-full h-full object-cover"
                  style={{
                    transition: 'transform 0.6s ease',
                  }}
                  loading="lazy"
                />
                {/* Color tint overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: shade.hex,
                    opacity: 0.35,
                    mixBlendMode: 'multiply',
                  }}
                />
                {/* Bottom gradient for text legibility */}
                <div
                  className="absolute bottom-0 left-0 right-0"
                  style={{
                    height: '40%',
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 100%)',
                  }}
                />
              </div>

              {/* Card Content */}
              <div style={{ padding: '16px 20px 20px' }}>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: '13px',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: 'var(--tb-text)',
                    marginBottom: '12px',
                  }}
                >
                  {lang === 'fr'
                    ? `${shade.nameFr} (${shade.code})`
                    : `${shade.nameAr} (${shade.code})`}
                </p>

                <button
                  onClick={() => handleShadeClick(shade.code)}
                  className="w-full"
                  style={{
                    height: '44px',
                    backgroundColor: '#d4a5a5',
                    color: 'var(--tb-bg-secondary)',
                    borderRadius: '8px',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: '13px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#c49494';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#d4a5a5';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {lang === 'fr'
                    ? 'Voir les Produits'
                    : 'عرض المنتجات'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
