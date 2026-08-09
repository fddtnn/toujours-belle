import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Truck, RotateCcw, ShieldCheck, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProductSectionProps {
  onAddToCart: (item: { type: string; color: string; length: string; quantity: number; price: number }) => void;
  initialType?: string;
}

const hairTypes = [
  { id: 'straight', nameFr: 'Lisses', nameAr: 'ناعم', image: '/images/raides.jpg' },
  { id: 'wavy', nameFr: 'Boucles', nameAr: 'مموج', image: '/images/ondules.jpg' },
  { id: 'curly', nameFr: 'Crepus', nameAr: 'مجعد', image: '/images/boucles.jpg' },
  { id: 'kinky', nameFr: 'Ondulé', nameAr: 'مجعد', image: '/images/frises.jpg' },
];

const hairColors = [
  { nameFr: 'Noir', nameAr: 'أسود', hex: 'var(--tb-text)' },
  { nameFr: 'Ch\u00e2tain', nameAr: 'بني', hex: '#6b4423' },
  { nameFr: 'Blond Miel', nameAr: 'أشقر عسلي', hex: '#d4a76a' },
  { nameFr: 'Auburn', nameAr: 'أوبورن', hex: '#722f37' },
];

const lengths = [
  { inch: '12"', cm: '30سم', price: 290 },
  { inch: '14"', cm: '35سم', price: 330 },
  { inch: '16"', cm: '40سم', price: 370 },
  { inch: '18"', cm: '45سم', price: 410 },
  { inch: '20"', cm: '50سم', price: 450 },
  { inch: '22"', cm: '55سم', price: 490 },
  { inch: '24"', cm: '60سم', price: 530 },
];

export default function ProductSection({ onAddToCart, initialType }: ProductSectionProps) {
  const { t, lang, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const [selectedType, setSelectedType] = useState(initialType || 'straight');
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedLength, setSelectedLength] = useState(3);
  const [quantity, setQuantity] = useState(1);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  const galleryImages = ['/images/product-gallery-1.jpg', '/images/product-gallery-2.jpg', '/images/product-gallery-3.jpg'];

  const currentType = hairTypes.find((t) => t.id === selectedType) || hairTypes[0];
  const currentColor = hairColors[selectedColor];
  const currentLength = lengths[selectedLength];
  const price = currentLength.price;

  useEffect(() => { if (initialType) setSelectedType(initialType); }, [initialType]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (galleryRef.current) {
        gsap.fromTo(galleryRef.current, { opacity: 0, x: isRTL ? 50 : -50 }, { opacity: 1, x: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' } });
      }
      if (detailsRef.current) {
        gsap.fromTo(detailsRef.current, { opacity: 0, x: isRTL ? -50 : 50 }, { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.2, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' } });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [isRTL]);

  const handleAddToCart = () => {
    onAddToCart({ type: currentType.id, color: currentColor.nameFr, length: currentLength.inch, quantity, price: price * quantity });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const prevGallery = () => setGalleryIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  const nextGallery = () => setGalleryIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));

  return (
    <section ref={sectionRef} id="product" className="relative w-full" style={{ zIndex: 1, backgroundColor: 'var(--tb-bg-secondary)', padding: '100px 0' }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="mb-8 flex items-center gap-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--tb-text-secondary)' }}>{t({ fr: 'Accueil', ar: 'الرئيسية' })} /</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--tb-text-secondary)' }}>{t({ fr: 'Nos Cheveux', ar: 'شعرنا' })} /</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--tb-text)' }}>{lang === 'fr' ? currentType.nameFr : currentType.nameAr}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16" style={{ flexDirection: isRTL ? 'row-reverse' : undefined }}>
          <div ref={galleryRef} className="w-full lg:w-[55%]">
            <div className="relative rounded-xl overflow-hidden mb-4" style={{ aspectRatio: '1/1' }}>
              <img src={galleryImages[galleryIndex]} alt="Product" className="w-full h-full object-cover" />
              <button onClick={prevGallery} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors" aria-label="Previous">{isRTL ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}</button>
              <button onClick={nextGallery} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors" aria-label="Next">{isRTL ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}</button>
            </div>
            <div className="flex gap-3">
              {galleryImages.map((img, idx) => (
                <button key={idx} onClick={() => setGalleryIndex(idx)} className="rounded-lg overflow-hidden" style={{ width: '80px', height: '80px', border: galleryIndex === idx ? '2px solid var(--tb-text)' : '2px solid transparent', opacity: galleryIndex === idx ? 1 : 0.6, transition: 'all 0.3s ease' }}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div ref={detailsRef} className="w-full lg:w-[45%]">
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: 'var(--tb-text)', marginBottom: '12px' }}>
              {t({ fr: 'Cheveux', ar: 'شعر' })} {lang === 'fr' ? currentType.nameFr : currentType.nameAr} {t({ fr: 'Naturels', ar: 'الطبيعي' })}
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '24px', color: '#d4a5a5', marginBottom: '8px' }}>
              {t({ fr: '\u00c0 partir de', ar: 'ابتداءً من' })} {price} TND
            </p>
            <div className="flex items-center gap-2 mb-6" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <div className="flex">{[1,2,3,4,5].map((s) => <Star key={s} size={16} fill="#d4a5a5" color="#d4a5a5" />)}</div>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--tb-text-secondary)' }}>(128 {t({ fr: 'avis', ar: 'تقييم' })})</span>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '15px', lineHeight: 1.6, color: 'var(--tb-text-secondary)', marginBottom: '24px' }}>
              {t({ fr: "Nos cheveux 100% naturels offrent une texture soyeuse et un \u00e9clat incomparable. Disponibles en plusieurs longueurs et couleurs pour s'adapter parfaitement \u00e0 votre style.", ar: 'يقدم شعرنا 100٪ طبيعي ملمسًا حريريًا وبريقًا لا مثيل له. متوفر بأطوال وألوان متعددة لتناسب أسلوبكِ تمامًا.' })}
            </p>

            {/* Hair Type Selector */}
            <div className="mb-6">
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--tb-text-secondary)', marginBottom: '10px' }}>{t({ fr: 'Type de Cheveux', ar: 'نوع الشعر' })}</p>
              <div className="flex flex-wrap gap-2">
                {hairTypes.map((type) => (
                  <button key={type.id} onClick={() => setSelectedType(type.id)} style={{ padding: '10px 20px', borderRadius: '8px', fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '13px', backgroundColor: selectedType === type.id ? 'var(--tb-text)' : 'var(--tb-border)', color: selectedType === type.id ? 'var(--tb-bg)' : 'var(--tb-text)', transition: 'all 0.3s ease', border: 'none', cursor: 'pointer' }}>
                    {lang === 'fr' ? type.nameFr : type.nameAr}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div className="mb-6">
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--tb-text-secondary)', marginBottom: '10px' }}>{t({ fr: 'Couleur', ar: 'اللون' })}</p>
              <div className="flex gap-3">
                {hairColors.map((color, idx) => (
                  <button key={color.hex} onClick={() => setSelectedColor(idx)} aria-label={lang === 'fr' ? color.nameFr : color.nameAr} style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: color.hex, border: selectedColor === idx ? '3px solid var(--tb-text)' : '3px solid transparent', boxShadow: selectedColor === idx ? '0 0 0 2px #fff' : 'none', cursor: 'pointer', transition: 'all 0.3s ease' }} />
                ))}
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--tb-text)', marginTop: '8px' }}>{lang === 'fr' ? currentColor.nameFr : currentColor.nameAr}</p>
            </div>

            {/* Length Selector */}
            <div className="mb-6">
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--tb-text-secondary)', marginBottom: '10px' }}>{t({ fr: 'Longueur', ar: 'الطول' })}</p>
              <select value={selectedLength} onChange={(e) => setSelectedLength(Number(e.target.value))} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--tb-border)', backgroundColor: 'var(--tb-bg)', fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--tb-text)', cursor: 'pointer' }}>
                {lengths.map((len, idx) => (
                  <option key={idx} value={idx}>{len.inch} / {len.cm} \u2014 {len.price} TND</option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--tb-text-secondary)', marginBottom: '10px' }}>{t({ fr: 'Quantit\u00e9', ar: 'الكمية' })}</p>
              <div className="inline-flex items-center rounded-lg overflow-hidden" style={{ border: '1px solid var(--tb-border)' }}>
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="p-3 hover:bg-[var(--tb-border)] transition-colors" style={{ color: 'var(--tb-text)' }}><Minus size={16} /></button>
                <span className="px-5 py-3" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '14px', minWidth: '48px', textAlign: 'center' }}>{quantity}</span>
                <button onClick={() => setQuantity((q) => Math.min(10, q + 1))} className="p-3 hover:bg-[var(--tb-border)] transition-colors" style={{ color: 'var(--tb-text)' }}><Plus size={16} /></button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button onClick={handleAddToCart} style={{ width: '100%', padding: '18px', borderRadius: '8px', backgroundColor: addedToCart ? '#4a7c59' : 'var(--tb-text)', color: 'var(--tb-bg)', fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', marginBottom: '24px' }} onMouseEnter={(e) => { if (!addedToCart) e.currentTarget.style.backgroundColor = '#d4a5a5'; }} onMouseLeave={(e) => { if (!addedToCart) e.currentTarget.style.backgroundColor = 'var(--tb-text)'; }}>
              {addedToCart ? t({ fr: 'Ajout\u00e9 au Panier \u2713', ar: 'تمت الإضافة إلى السلة \u2713' }) : t({ fr: 'Ajouter au Panier', ar: 'أضيفي إلى السلة' })}
            </button>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 lg:gap-6 pt-4" style={{ borderTop: '1px solid var(--tb-border)', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              {[{ icon: Truck, fr: 'Livraison Rapide', ar: 'توصيل سريع' }, { icon: RotateCcw, fr: 'Retours 30 Jours', ar: 'إرجاع خلال 30 يومًا' }, { icon: ShieldCheck, fr: 'Paiement S\u00e9curis\u00e9', ar: 'دفع آمن' }].map((badge) => (
                <div key={badge.fr} className="flex items-center gap-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <badge.icon size={18} color="var(--tb-text-secondary)" />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--tb-text-secondary)' }}>{lang === 'fr' ? badge.fr : badge.ar}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
