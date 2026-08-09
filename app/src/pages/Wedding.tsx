import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const galleryItems = [
  { id: 1, category: 'hair-up', label: 'Chignon', image: null, video: '/images/chignon-video.mp4' },
  { id: 2, category: 'hair-up', label: 'Chignon', image: null },
  { id: 3, category: 'hair-up', label: 'Chignon', image: null },
  { id: 4, category: 'hair-down', label: 'Cheveux Lâchés', image: null },
  { id: 5, category: 'hair-down', label: 'Cheveux Lâchés', image: null },
  { id: 6, category: 'hair-down', label: 'Cheveux Lâchés', image: null },
  { id: 7, category: 'half-up', label: 'Mi-Haut Mi-Bas', image: null, video: true },
  { id: 8, category: 'half-up', label: 'Mi-Haut Mi-Bas', image: null },
  { id: 9, category: 'half-up', label: 'Mi-Haut Mi-Bas', image: null },
  { id: 10, category: 'braids', label: 'Tresses', image: '/images/braid-1.jpg' },
  { id: 11, category: 'braids', label: 'Tresses', image: '/images/braid-2.jpg' },
  { id: 12, category: 'braids', label: 'Tresses', image: '/images/braid-3.jpg' },
];

const styleDetails: Record<string, { titleFr: string; titleAr: string; descFr: string; descAr: string; productName: string; stylistName: string; stylistTitle: string; testimonial: string; }> = {
  'hair-up': {
    titleFr: 'Chignon',
    titleAr: 'شعر مرفوع',
    descFr: 'Élégants et intemporels, nos chignons subliment votre silhouette et tiennent parfaitement en place toute la journée de cérémonie.',
    descAr: 'أنيقة وخالدة، تسريحات شعرنا المرفوع تبرز أنوثتكِ وتبقى مثالية طوال يوم الاحتفال.',
    productName: 'Extension Chignon - 150g',
    stylistName: 'Zoe Stevenson',
    stylistTitle: 'Spécialiste Coiffure de Mariée',
    testimonial: 'Cliphair est la seule marque avec laquelle je choisis de travailler, et celle que je recommande en toute confiance à toutes mes mariées pour leur grand jour.',
  },
  'hair-down': {
    titleFr: 'Cheveux Lâchés',
    titleAr: 'شعر منسدل',
    descFr: 'Des ondulations naturelles ou un lissé parfait, nos extensions cheveux lâchés ajoutent volume et longueur pour un look romantique et aérien.',
    descAr: 'خصلات طبيعية أو شعر ناعم مثالي، إضافاتنا تمنحكِ الحجم والطول لإطلالة رومانسية وخفيفة.',
    productName: 'Extension Lisses - 160g',
    stylistName: 'Mika Laurent',
    stylistTitle: 'Styliste Bridal Paris',
    testimonial: 'La qualité est incroyable, elles restent parfaitement en place toute la journée. Mes clientes sont toujours ravies du résultat final.',
  },
  'half-up': {
    titleFr: 'Mi-Haut Mi-Bas',
    titleAr: 'نصف مرفوع',
    descFr: 'Le meilleur des deux mondes : volume en haut, fluidité en bas. Idéal pour un look de mariée à la fois sophistiqué et naturel.',
    descAr: 'أفضل ما في العالمين: حجم في الأعلى، انسيابية في الأسفل. مثالي لإطلالة عروس أنيقة وطبيعية.',
    productName: 'Extension Mi-Haut - 140g',
    stylistName: 'Sabrina Elbaz',
    stylistTitle: 'Maquilleuse & Coiffeuse',
    testimonial: 'Je les ai utilisées pour des dizaines de mariées, le résultat est toujours impeccable. La couleur se fond parfaitement avec les cheveux naturels.',
  },
  'braids': {
    titleFr: 'Tresses',
    titleAr: 'ضفائر',
    descFr: 'Des tresses romantiques et travaillées qui apportent une touche bohème chic à votre look de mariée. Résistantes et confortables.',
    descAr: 'ضفائر رومانسية وأنيقة تضيف لمسة بوهيمية شيك إلى إطلالة العروس. متينة ومريحة.',
    productName: 'Extension Tressée - 130g',
    stylistName: 'Lucy Martin',
    stylistTitle: 'Coiffeuse Événementielle',
    testimonial: 'Excellent rapport qualité-prix. Les extensions tiennent parfaitement pendant le coiffage en tresse. Je les recommande à toutes mes clientes.',
  },
};

const filters = ['all', 'hair-up', 'hair-down', 'half-up', 'braids'];

const ctaCards = [
  {
    title: 'Quiz Coiffure de Mariée',
    desc: 'Trouvez votre coiffure de mariage parfaite',
    btn: 'Faire le Quiz',
    image: '/images/cta-quiz.jpg',
  },
  {
    title: 'Assortiment Express de Couleur',
    desc: 'Envoyez-nous une photo, nous assortissons votre teinte',
    btn: 'Assortir ma Couleur',
    image: '/images/cta-color.jpg',
  },
  {
    title: 'Cheveux Primés',
    desc: 'Reconnus par les mariées et les stylistes du monde entier',
    btn: 'Voir les Prix',
    image: '/images/cta-awards.jpg',
  },
];

const reviews = [
  { name: 'Mika', text: "J'ai récemment acheté des extensions Cliphair pour mon mariage et elles étaient absolument parfaites. Si légères et confortables tout au long de la journée. J'ai dansé toute la nuit et elles sont restées solidement en place. Mon photographe a été étonné de voir à quel point elles semblaient naturelles sur les photos !" },
  { name: 'Sabrina', text: "Achetées pour une mariée qui voulait des ondulations hollywoodiennes pour son grand jour. La couleur se fondait parfaitement avec ses cheveux naturels, et la styliste a dit que c'étaient les meilleures extensions avec lesquelles elle avait jamais travaillé. La mariée était aux anges avec le résultat final !" },
  { name: 'Holly', text: "Je les ai portées le jour de mon mariage et elles étaient fantastiques et sont restées en place toute la journée. De la cérémonie à la dernière danse, mes cheveux étaient impeccables. J'ai reçu tant de compliments des invités qui me demandaient où je m'étais faite coiffer !" },
  { name: 'Lucy', text: "Excellent rapport qualité-prix. Je les ai utilisées pour mon mariage et elles ont rendu mes cheveux tellement plus beaux. La qualité est incroyable pour le prix, et je les réutilise pour les occasions spéciales depuis. Le meilleur achat de ma mariée !" },
  { name: 'Shannon', text: "J'ai reçu tellement de compliments et la styliste les a adorées. Elles m'ont donné tellement de confiance en moi pour mon jour spécial. Les extensions ont ajouté le volume et la longueur parfaits pour mon chignon de mariée de rêve. Je me sentais comme une princesse !" },
  { name: 'Jessica', text: "Je ne peux que recommander ! La qualité était incroyable et l'assortiment de couleur était parfait. J'étais nerveuse à l'idée d'acheter des extensions en ligne mais le guide des couleurs était exact. Ma coiffure de mariée était tout ce dont j'avais rêvé et plus encore !" },
];

const ugcCards = [
  { name: 'Emma', stylist: '@hairbyemma', product: 'Seamless Full Head 150g', caption: 'Ondulations de mariée romantiques pour le vignoble d\'Emma' },
  { name: 'Sophia', stylist: '@bridalglam', product: 'Classic Full Head 130g', caption: 'Chignon élégant de Sophia pour sa cérémonie en cathédrale' },
  { name: 'Isabella', stylist: '@weddinghairpro', product: 'Double Weft 180g', caption: 'Style bohème mi-haut d\'Isabella au bord de la mer' },
  { name: 'Olivia', stylist: '@luxelocks', product: 'Ultra-Volume 240g', caption: 'Glamour hollywoodien d\'Olivia pour son mariage en ville' },
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function Wedding() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [readMore, setReadMore] = useState(false);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [expandedReview, setExpandedReview] = useState<number | null>(null);
  const [videoModal, setVideoModal] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.wed-reveal').forEach((el) => {
        gsap.fromTo(el, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  /* Carousel autoplay */
  const totalSlides = Math.ceil(reviews.length / 2);

  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setCarouselIdx((prev) => (prev + 1) % totalSlides);
    }, 5000);
  }, [totalSlides]);

  useEffect(() => {
    startAutoplay();
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
  }, [startAutoplay]);

  const handlePrev = () => {
    setCarouselIdx((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    startAutoplay();
  };

  const handleNext = () => {
    setCarouselIdx((prev) => (prev + 1) % totalSlides);
    startAutoplay();
  };

  const filteredGallery = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter);

  const t = {
    heroTitle: lang === 'fr'
      ? 'Extensions pour Mariage — Collection Mariée 2026'
      : 'إكسسوارات شعر الزفاف — مجموكة العروس 2026',
    heroSub: lang === 'fr'
      ? 'Naturellement Vous'
      : 'طبيعياً أنتِ',
    musesTitle: lang === 'fr' ? 'Rencontrez Nos Muses' : 'تعرفي على ملهماتنا',
    musesText: lang === 'fr'
      ? 'Découvrez nos vraies mariées et leurs looks approuvés pour l\'allée. Des extensions naturelles qui subliment chaque coiffure de mariage, des chignons sophistiqués aux ondulations hollywoodiennes. Chaque mariée mérite de se sentir exceptionnelle le jour de son mariage.'
      : 'اكتشفي عرائسنا الحقيقيات وأناقتهن المعتمدة. إكسسوارات طبيعية تُجمّل كل تسريحة زفاف، من الكعكات الراقية إلى الموجات الهوليوودية. كل عروس تستحق أن تشعر باستثنائية في يوم زفافها.',
    readMore: lang === 'fr' ? 'Lire la suite' : 'اقرأي المزيد',
    readLess: lang === 'fr' ? 'Réduire' : 'أقل',
    chooseStyle: lang === 'fr' ? 'Choisir par style' : 'اختاري حسب التسريحة',
    all: lang === 'fr' ? 'Tout' : 'الكل',
    hairUp: lang === 'fr' ? 'Chignon' : 'شعر مرفوع',
    hairDown: lang === 'fr' ? 'Cheveux Lâchés' : 'شهر منسدل',
    halfUp: lang === 'fr' ? 'Mi-Haut Mi-Bas' : 'نصف مرفوع',
    braids: lang === 'fr' ? 'Tresses' : 'ضفائر',
    ctaTitle: lang === 'fr' ? 'Toujours incertaine ? On vous guide.' : 'ما زلتِ محتارة؟ نحن هنا.',
    reviewsTitle: lang === 'fr' ? 'Les avis de nos Mariées' : 'لنسمع من عرائسنا',
    ugcTitle: lang === 'fr' ? 'Les Mariées qui nous inspirent.' : 'عرائس يلهموننا.',
    ugcSub: lang === 'fr'
      ? 'Vous pourriez être notre prochaine muse. Partagez votre coiffure de mariée et inspirez celles qui vous suivront.'
      : 'يمكنكِ أن تكوني ملهمتنا القادمة. شاركي تسريحة زفافكِ وألهمي العروس التي تليها.',
    shopNow: lang === 'fr' ? 'Acheter' : 'تسوقي',
  };

  const filterLabels: Record<string, string> = {
    all: t.all,
    'hair-up': t.hairUp,
    'hair-down': t.hairDown,
    'half-up': t.halfUp,
    braids: t.braids,
  };

  return (
    <div ref={pageRef} style={{ backgroundColor: '#ffffff', fontFamily: "'Inter', sans-serif" }}>
      {/* ========== SECTION 1 — HERO BANNER ========== */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          minHeight: '85vh',
          background: '#faf6f4',
        }}
      >
        <div className="wed-reveal max-w-[1400px] mx-auto flex flex-col md:flex-row items-stretch" style={{ minHeight: '85vh' }}>
          {/* Image left — BIG & STRETCHED */}
          <div className="w-full md:w-3/5 relative overflow-hidden">
            <img
              src="/images/bridal-hero.jpg"
              alt="Bride wedding hair"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: 'center 15%' }}
            />
            {/* Subtle gradient overlay on right edge for blend */}
            <div
              className="absolute top-0 right-0 bottom-0 hidden md:block"
              style={{
                width: '120px',
                background: 'linear-gradient(to right, transparent 0%, #faf6f4 100%)',
              }}
            />
          </div>

          {/* Text right */}
          <div
            className="w-full md:w-2/5 flex flex-col justify-center"
            style={{ padding: '80px 40px', backgroundColor: '#faf6f4' }}
          >
            <p
              className="uppercase tracking-widest mb-6"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#c8adad', fontWeight: 600, letterSpacing: '0.25em' }}
            >
              {lang === 'fr' ? 'COLLECTION MARIAGE 2026' : 'مجموعة الزفاف 2026'}
            </p>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(32px, 4.5vw, 52px)',
                fontWeight: 500,
                color: '#1a1a1a',
                lineHeight: 1.12,
                letterSpacing: '0.02em',
                marginBottom: '16px',
              }}
            >
              {t.heroTitle}
            </h1>
            <p
              className="mb-8"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', color: '#c8adad', letterSpacing: '0.08em' }}
            >
              {t.heroSub}
            </p>
            <div className="flex gap-4 flex-wrap">
              <button
                className="transition-all duration-200 hover:opacity-80"
                style={{
                  padding: '14px 32px',
                  borderRadius: '50px',
                  backgroundColor: '#1a1a1a',
                  color: '#ffffff',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {lang === 'fr' ? 'Découvrir la Collection' : 'اكتشفي المجموعة'} →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 2 — MEET OUR MUSES ========== */}
      <section style={{ padding: '80px 24px', backgroundColor: '#ffffff' }}>
        <div className="wed-reveal max-w-[720px] mx-auto text-center">
          <h2
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 500, color: '#1a1a1a', letterSpacing: '0.02em', marginBottom: '24px' }}
          >
            {t.musesTitle}
          </h2>
          <div
            className="overflow-hidden transition-all duration-500"
            style={{ maxHeight: readMore ? '500px' : '80px' }}
          >
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', lineHeight: 1.7, color: '#666666' }}>
              {t.musesText}
            </p>
          </div>
          <button
            onClick={() => setReadMore(!readMore)}
            className="mt-4 uppercase tracking-widest hover:opacity-70 transition-opacity"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: '#c8adad', letterSpacing: '0.15em', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {readMore ? t.readLess : t.readMore}
          </button>
        </div>
      </section>

      {/* ========== SECTION 3 — STYLE FILTER + GALLERY ========== */}
      <section style={{ padding: '0 0 80px', backgroundColor: '#ffffff' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <h2
            className="wed-reveal mb-8"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 500, color: '#1a1a1a', letterSpacing: '0.02em' }}
          >
            {t.chooseStyle}
          </h2>

          {/* Filter buttons */}
          <div className="wed-reveal flex gap-3 mb-8 flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="transition-all duration-200"
                style={{
                  padding: '10px 24px',
                  borderRadius: '50px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  backgroundColor: activeFilter === f ? '#1a1a1a' : '#ffffff',
                  color: activeFilter === f ? '#ffffff' : '#1a1a1a',
                  border: activeFilter === f ? '1px solid #1a1a1a' : '1px solid #e0d0d0',
                }}
              >
                {filterLabels[f]}
              </button>
            ))}
          </div>

          {/* Gallery — 2-column layout: Image Grid + Details */}
          <div className="wed-reveal flex flex-col lg:flex-row gap-8">
            {/* LEFT: Image Grid (2 cols × 3 rows) */}
            <div className="relative" style={{ flex: '1.4' }}>
              <div
                className="grid grid-cols-2 gap-3"
                style={{ minHeight: '480px' }}
              >
                {filteredGallery.slice(0, 6).map((item, idx) => (
                  <div
                    key={item.id}
                    className="overflow-hidden transition-all duration-300 hover:scale-[1.02] relative"
                    style={{
                      borderRadius: '16px',
                      aspectRatio: '1/1.05',
                      background: item.image || item.video ? '#f0e8e4' : `linear-gradient(135deg, #F9E8E4 0%, #f0e0d8 50%, #E8D5B0 100%)`,
                      cursor: item.video ? 'pointer' : 'default',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item.video ? (
                      <>
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                          style={{ borderRadius: '16px' }}
                        >
                          <source src={item.video} type="video/mp4" />
                        </video>
                        <button
                          type="button"
                          onClick={() => setVideoModal(item.video)}
                          style={{
                            position: 'absolute', inset: 0, zIndex: 2,
                            background: 'rgba(0,0,0,0.1)', border: 'none', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            borderRadius: '16px', transition: 'background 0.3s ease',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.05)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.1)'; }}
                        >
                          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="#1a1a1a"><polygon points="8,5 8,19 19,12" /></svg>
                          </div>
                        </button>
                      </>
                    ) : item.image ? (
                      <img
                        src={item.image}
                        alt={item.label}
                        className="w-full h-full object-cover"
                        style={{ borderRadius: '16px' }}
                        loading="lazy"
                      />
                    ) : (
                      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', color: '#1a1a1a', opacity: 0.35 }}>
                        {item.label}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              {/* Navigation arrows */}
              {filteredGallery.length > 6 && (
                <div className="flex justify-center gap-4 mt-4">
                  <button
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    style={{ backgroundColor: '#faf6f4', border: '1px solid #e0d0d0', cursor: 'pointer' }}
                  >
                    <ChevronLeft size={18} color="#1a1a1a" />
                  </button>
                  <button
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    style={{ backgroundColor: '#faf6f4', border: '1px solid #e0d0d0', cursor: 'pointer' }}
                  >
                    <ChevronRight size={18} color="#1a1a1a" />
                  </button>
                </div>
              )}
            </div>

            {/* RIGHT: Details Panel */}
            <div style={{ flex: '1', maxWidth: '400px' }}>
              {(() => {
                const firstItem = filteredGallery[0];
                const detail = firstItem ? styleDetails[firstItem.category] : null;
                if (!detail) return null;
                return (
                  <div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 500, color: '#1a1a1a', marginBottom: '12px' }}>
                      {lang === 'fr' ? detail.titleFr : detail.titleAr}
                    </h3>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#5a5a5a', lineHeight: 1.7, marginBottom: '24px' }}>
                      {lang === 'fr' ? detail.descFr : detail.descAr}
                    </p>

                    {/* Product Grid */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div style={{ borderRadius: '12px', overflow: 'hidden', aspectRatio: '1', backgroundColor: '#f0e8e4' }}>
                        <img src="/images/braid-1.jpg" alt="Product" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div style={{ borderRadius: '12px', overflow: 'hidden', aspectRatio: '1', backgroundColor: '#f0e8e4' }}>
                          <img src="/images/braid-2.jpg" alt="Product" className="w-full h-full object-cover" />
                        </div>
                        <div style={{ borderRadius: '12px', overflow: 'hidden', aspectRatio: '1', backgroundColor: '#f0e8e4' }}>
                          <img src="/images/braid-3.jpg" alt="Product" className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>

                    {/* Shop Now Card */}
                    <div className="flex items-center gap-3 mb-6" style={{ backgroundColor: '#f0e8e4', borderRadius: '12px', padding: '14px 16px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                        <img src="/images/braid-1.jpg" alt="Product" className="w-full h-full object-cover" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#1a1a1a', fontWeight: 500 }}>{detail.productName}</p>
                      </div>
                      <button
                        className="transition-all hover:opacity-80"
                        style={{
                          padding: '10px 20px', borderRadius: '8px', backgroundColor: '#1a1a1a', color: '#ffffff',
                          fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 500, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
                        }}
                      >
                        {lang === 'fr' ? 'Acheter' : 'تسوقي'}
                      </button>
                    </div>

                    {/* Stylist Testimonial */}
                    <div style={{ backgroundColor: '#faf6f4', borderRadius: '16px', padding: '24px', border: '1px solid #f0e0e0' }}>
                      <div className="flex items-center gap-2 mb-3">
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', fontWeight: 600, color: '#1a1a1a' }}>{detail.stylistName}</span>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#8a8a8a' }}>{detail.stylistTitle}</span>
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="#1a1a1a" color="#1a1a1a" />)}
                        </div>
                      </div>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#5a5a5a', lineHeight: 1.7 }}>
                        "{detail.testimonial}"
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 4 — THREE CTA CARDS ========== */}
      <section style={{ padding: '80px 24px', backgroundColor: '#faf6f4' }}>
        <div className="max-w-[1200px] mx-auto">
          <h2
            className="wed-reveal text-center mb-12"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 500, color: '#1a1a1a', letterSpacing: '0.02em' }}
          >
            {t.ctaTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ctaCards.map((card, idx) => (
              <div
                key={idx}
                className="wed-reveal relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  minHeight: '320px',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '32px',
                  cursor: 'pointer',
                }}
              >
                {/* Background Image */}
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Dark overlay for text readability */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.05) 100%)' }}
                />
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 500, color: '#ffffff', marginBottom: '8px', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
                    {card.title}
                  </h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.9)', marginBottom: '16px', lineHeight: 1.6 }}>
                    {card.desc}
                  </p>
                  <button
                    className="transition-all duration-200 hover:opacity-80"
                    style={{
                      padding: '12px 28px',
                      borderRadius: '8px',
                      backgroundColor: '#1a1a1a',
                      color: '#ffffff',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '13px',
                      fontWeight: 500,
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {card.btn} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 5 — BRIDES REVIEWS CAROUSEL ========== */}
      <section
        style={{ padding: '80px 24px', backgroundColor: '#ffffff' }}
        onMouseEnter={() => { if (autoplayRef.current) clearInterval(autoplayRef.current); }}
        onMouseLeave={startAutoplay}
      >
        <div className="max-w-[1000px] mx-auto">
          <h2
            className="wed-reveal text-center mb-12"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 500, color: '#1a1a1a', letterSpacing: '0.02em' }}
          >
            {t.reviewsTitle}
          </h2>

          {/* Carousel */}
          <div className="wed-reveal relative overflow-hidden" ref={carouselRef}>
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${carouselIdx * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIdx) => (
                <div key={slideIdx} className="w-full flex-shrink-0 flex gap-6" style={{ minWidth: '100%' }}>
                  {[reviews[slideIdx * 2], reviews[slideIdx * 2 + 1]].filter(Boolean).map((review, rIdx) => {
                    const globalIdx = slideIdx * 2 + rIdx;
                    const isExpanded = expandedReview === globalIdx;
                    const initial = review.name.charAt(0);
                    const avatarColors = ['#c8adad', '#d4a5a5', '#b8a090', '#c49393', '#b88282', '#a67c52'];
                    return (
                      <div
                        key={globalIdx}
                        className="flex-1"
                        style={{
                          backgroundColor: '#faf6f4',
                          borderRadius: '16px',
                          padding: '32px',
                          border: '1px solid #f0e0e0',
                        }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: avatarColors[globalIdx % avatarColors.length] }}
                          >
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', fontWeight: 600, color: '#ffffff' }}>
                              {initial}
                            </span>
                          </div>
                          <div>
                            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', fontWeight: 600, color: '#1a1a1a' }}>
                              {review.name}
                            </p>
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} size={12} fill="#D4A843" color="#D4A843" />
                              ))}
                            </div>
                          </div>
                        </div>

                        <Quote size={16} color="#c8adad" className="mb-2" />

                        <div className="overflow-hidden transition-all duration-500" style={{ maxHeight: isExpanded ? '300px' : '60px' }}>
                          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', lineHeight: 1.7, color: '#666666' }}>
                            <strong style={{ color: '#1a1a1a' }}>{review.text.split('.')[0]}.</strong>{' '}
                            {review.text.split('.').slice(1).join('.')}
                          </p>
                        </div>

                        <button
                          onClick={() => setExpandedReview(isExpanded ? null : globalIdx)}
                          className="mt-2 hover:opacity-70 transition-opacity"
                          style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 500, color: '#c8adad', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                          {isExpanded ? t.readLess : t.readMore}
                        </button>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 12px rgba(0,0,0,0.1)', zIndex: 10 }}
            >
              <ChevronLeft size={20} color="#1a1a1a" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 12px rgba(0,0,0,0.1)', zIndex: 10 }}
            >
              <ChevronRight size={20} color="#1a1a1a" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => { setCarouselIdx(i); startAutoplay(); }}
                className="transition-all duration-300"
                style={{
                  width: carouselIdx === i ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: carouselIdx === i ? '#c8adad' : '#e0d0d0',
                  border: 'none',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 6 — UGC SOCIAL PROOF ========== */}
      <section style={{ padding: '80px 24px', backgroundColor: '#faf6f4' }}>
        <div className="max-w-[1200px] mx-auto">
          <h2
            className="wed-reveal text-center mb-4"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 500, color: '#1a1a1a', letterSpacing: '0.02em' }}
          >
            {t.ugcTitle}
          </h2>
          <p
            className="wed-reveal text-center mb-12 max-w-2xl mx-auto"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', lineHeight: 1.7, color: '#666666' }}
          >
            {t.ugcSub}
          </p>

          <div
            className="flex gap-4 overflow-x-auto pb-4"
            style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'thin' }}
          >
            {ugcCards.map((card, idx) => (
              <div
                key={idx}
                className="wed-reveal flex-shrink-0"
                style={{ width: '300px', scrollSnapAlign: 'start' }}
              >
                {/* Main image */}
                <div
                  className="mb-4"
                  style={{
                    width: '300px',
                    height: '380px',
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, #F9E8E4 0%, #E8D5B0 50%, #f0e0d0 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '48px', color: '#1a1a1a', opacity: 0.15 }}>
                    {card.name.charAt(0)}
                  </span>
                </div>

                {/* Product thumb + caption */}
                <div className="flex items-start gap-3">
                  <div
                    className="flex-shrink-0"
                    style={{ width: '40px', height: '40px', borderRadius: '6px', backgroundColor: '#e0d0d0' }}
                  />
                  <div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#1a1a1a', lineHeight: 1.5, marginBottom: '4px' }}>
                      <strong>{card.name}</strong> — coiffure par {card.stylist}, porte <strong>{card.product}</strong>
                    </p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#c8adad', fontWeight: 500 }}>
                      {card.caption}
                    </p>
                    <button
                      className="mt-2 hover:opacity-70 transition-opacity"
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: '#c8adad', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      {t.shopNow} →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Back link */}
      <div className="max-w-7xl mx-auto px-6 py-6" style={{ backgroundColor: '#ffffff' }}>
        <button
          onClick={() => navigate('/')}
          className="text-sm hover:text-[#c8adad] transition-colors duration-300"
          style={{ fontFamily: "'Inter', sans-serif", color: 'var(--tb-text-muted)', textDecoration: 'underline' }}
        >
          {lang === 'fr' ? "← Retour à l'accueil" : 'العودة إلى الرئيسية →'}
        </button>
      </div>

      {/* Video Modal Popup */}
      {videoModal && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            backgroundColor: 'rgba(0,0,0,0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setVideoModal(null)}
        >
          <div
            style={{ position: 'relative', maxWidth: '900px', width: '100%', borderRadius: '12px', overflow: 'hidden' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setVideoModal(null)}
              style={{
                position: 'absolute', top: '12px', right: '12px', zIndex: 10,
                width: '36px', height: '36px', borderRadius: '50%',
                backgroundColor: 'rgba(0,0,0,0.6)', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: '18px', transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.9)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.6)'; }}
            >
              ✕
            </button>
            <video
              src={videoModal}
              autoPlay
              controls
              playsInline
              style={{ width: '100%', height: 'auto', maxHeight: '80vh', display: 'block', borderRadius: '12px' }}
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
