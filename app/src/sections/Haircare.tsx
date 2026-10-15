import { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    nameFr: 'Shampoing Nourrissant',
    nameAr: 'شامبو مغذي',
    image: '/images/accessoires/acc18.jpg',
    price: 49,
    tagFr: 'Haircare',
    tagAr: 'العناية',
  },
  {
    nameFr: 'Après-Shampoing Hydratant',
    nameAr: 'بلسم مرطب',
    image: '/images/accessoires/acc27.jpg',
    price: 49,
    tagFr: 'Haircare',
    tagAr: 'العناية',
  },
  {
    nameFr: 'Sérum Elixir Argan',
    nameAr: 'سيروم أرجان',
    image: '/images/accessoires/acc23.jpg',
    price: 69,
    tagFr: 'Soin',
    tagAr: 'علاج',
  },
  {
    nameFr: 'Brosse Lissante',
    nameAr: 'فرشاة شعر',
    image: '/images/accessoires/acc9.jpg',
    price: 39,
    tagFr: 'Accessoire',
    tagAr: 'إكسسوار',
  },
  {
    nameFr: 'Bonnet Satin',
    nameAr: 'بونيه ساتان',
    image: '/images/accessoires/acc10.jpg',
    price: 29,
    tagFr: 'Accessoire',
    tagAr: 'إكسسوار',
  },
  {
    nameFr: 'Hair Spray Nourrissant',
    nameAr: 'بخاخ الشعر المغذي',
    image: '/images/accessoires/acc29.jpg',
    price: 55,
    tagFr: 'Haircare',
    tagAr: 'العناية',
  },
  {
    nameFr: 'Barrettes Ornées',
    nameAr: 'مشابك ذهبية',
    image: '/images/accessoires/acc25.jpg',
    price: 35,
    tagFr: 'Accessoire',
    tagAr: 'إكسسوار',
  },
  {
    nameFr: 'Masque Réparateur',
    nameAr: 'ماسك إصلاحي',
    image: '/images/accessoires/acc24.jpg',
    price: 59,
    tagFr: 'Soin',
    tagAr: 'علاج',
  },
  {
    nameFr: 'Colle Perruque',
    nameAr: 'غراء الباروكة',
    image: '/images/accessoires/acc2.jpg',
    price: 45,
    tagFr: 'Accessoire',
    tagAr: 'إكسسوار',
  },
];

export default function Haircare() {
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        );
      }
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.querySelectorAll('.hc-card'),
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08,
            scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="haircare"
      className="relative w-full"
      style={{ zIndex: 1, backgroundColor: 'var(--tb-bg)', padding: '120px 0' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--tb-accent-text)',
              marginBottom: '10px',
            }}
          >
            {lang === 'fr' ? 'SOIN & STYLE' : 'العناية والأناقة'}
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: 'var(--tb-accent-text)',
              lineHeight: 1.15,
              marginBottom: '12px',
            }}
          >
            {lang === 'fr' ? 'Haircare & Accessoires' : 'العناية بالشعر والإكسسوارات'}
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
              ? 'Des produits professionnels et des accessoires soigneusement sélectionnés pour sublimer vos cheveux au quotidien.'
              : 'منتجات مهنية وإكسسوارات مختارة بعناية لتجميل شعركِ يوميًا.'}
          </p>
        </div>

        {/* Product Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          style={{ gap: '24px' }}
        >
          {products.map((p, idx) => (
            <div
              key={idx}
              className="hc-card rounded-2xl overflow-hidden bg-white"
              style={{
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow =
                  '0 8px 32px rgba(0,0,0,0.1)';
                const img = e.currentTarget.querySelector(
                  '.hc-img'
                ) as HTMLElement;
                if (img) img.style.transform = 'scale(1.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  '0 2px 12px rgba(0,0,0,0.06)';
                const img = e.currentTarget.querySelector(
                  '.hc-img'
                ) as HTMLElement;
                if (img) img.style.transform = 'scale(1)';
              }}
            >
              {/* Image */}
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: '1/1.2' }}
              >
                <img
                  src={p.image}
                  alt={lang === 'fr' ? p.nameFr : p.nameAr}
                  className="hc-img w-full h-full object-cover"
                  style={{ transition: 'transform 0.6s ease' }}
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div style={{ padding: '14px 16px 18px' }}>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '10px',
                    color: 'var(--tb-accent-text)',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {lang === 'fr' ? p.tagFr : p.tagAr}
                </span>
                <h3
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: '14px',
                    color: 'var(--tb-text)',
                    marginTop: '4px',
                    marginBottom: '6px',
                    lineHeight: 1.3,
                  }}
                >
                  {lang === 'fr' ? p.nameFr : p.nameAr}
                </h3>
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={10}
                      fill="#d4a5a5"
                      color="#d4a5a5"
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: '15px',
                      color: 'var(--tb-accent-text)',
                    }}
                  >
                    {p.price} TND
                  </span>
                </div>
                <button
                  className="w-full mt-3"
                  style={{
                    height: '40px',
                    backgroundColor: 'var(--tb-text)',
                    color: 'var(--tb-bg)',
                    borderRadius: '8px',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: '12px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#d4a5a5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--tb-text)';
                  }}
                >
                  {lang === 'fr'
                    ? 'Ajouter au Panier'
                    : 'أضيفي إلى السلة'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
