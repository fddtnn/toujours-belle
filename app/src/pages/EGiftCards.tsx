import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Star, ChevronDown, Minus, Plus } from 'lucide-react';
import gsap from 'gsap';
import { useNavigate } from 'react-router';
import Footer from '../sections/Footer';

const amounts = [25, 50, 75, 100, 150, 200];

export default function EGiftCards() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isGift, setIsGift] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [addedToBag, setAddedToBag] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.egift-reveal').forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const handleAddToBag = () => {
    if (!selectedAmount) return;
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 2000);
  };

  const t = {
    title: lang === 'fr' ? 'Toujours Belle E-Gift Card' : 'بطاقة هدايا توجور بيل الإلكترونية',
    reviews: lang === 'fr' ? '(4 Avis)' : '(4 تقييمات)',
    features: lang === 'fr' ? 'Caractéristiques' : 'المميزات',
    desc: lang === 'fr'
      ? "Le cadeau qui ne cesse de faire plaisir ? Nous l'avons. Cette carte e-cadeau est la solution parfaite : à partir de 25 TND, choisissez votre montant et envoyez-la à une personne chère pour qu'elle puisse choisir le produit qu'elle aime le plus. Durable, instantanée et polyvalente : votre geste d'appréciation est livré immédiatement par email."
      : "الهدية التي تستمر في الإبهار؟ لدينا ذلك. بطاقة الهدايا الإلكترونية هي الحل المثالي: ابتداءً من 25 د.ت، اختاري المبلغ وأرسليها لشخص عزيز لتختار المنتج الذي تحبه أكثر. مستدامة وفورية ومتعددة الاستخدامات.",
    selectAmount: lang === 'fr' ? 'CHOISIR LE MONTANT' : 'اختيار المبلغ',
    giftLabel: lang === 'fr' ? 'Je veux envoyer cela comme cadeau' : 'أريد إرسالها كهدية',
    addToBag: lang === 'fr' ? 'Ajouter au Panier' : 'أضيفي إلى السلة',
    added: lang === 'fr' ? 'Ajouté !' : 'تمت الإضافة!',
    currency: lang === 'fr' ? 'TND' : 'د.ت',
  };

  return (
    <div ref={pageRef} style={{ backgroundColor: 'var(--tb-card)', fontFamily: "'Inter', sans-serif" }}>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-6 pb-2">
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--tb-text-muted)' }}>
          {lang === 'fr' ? 'Accueil / Accessoires / E-Gift Cards' : 'الرئيسية / إكسسوارات / بطاقات الهدايا'}
        </p>
      </div>

      {/* Product Section */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* LEFT - Gift Card Image */}
          <div className="egift-reveal lg:w-1/2">
            <div
              className="relative flex items-center justify-center overflow-hidden"
              style={{
                backgroundColor: '#f8e8f0',
                borderRadius: '20px',
                minHeight: '550px',
                padding: '40px',
              }}
            >
              {/* Sparkle decorations */}
              <div className="absolute inset-0" style={{ pointerEvents: 'none' }}>
                {[
                  { top: '8%', left: '15%', size: 16 },
                  { top: '12%', right: '20%', size: 12 },
                  { top: '25%', left: '8%', size: 14 },
                  { top: '35%', right: '10%', size: 10 },
                  { top: '55%', left: '12%', size: 12 },
                  { top: '65%', right: '15%', size: 16 },
                  { top: '78%', left: '20%', size: 10 },
                  { top: '85%', right: '25%', size: 14 },
                  { top: '90%', left: '45%', size: 12 },
                ].map((s, i) => (
                  <svg
                    key={i}
                    className="absolute"
                    style={{ top: s.top, left: s.left, right: s.right }}
                    width={s.size}
                    height={s.size}
                    viewBox="0 0 24 24"
                    fill="#d4a5a5"
                    opacity="0.5"
                  >
                    <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10Z" />
                  </svg>
                ))}
              </div>

              {/* Gift Card Image */}
              <img
                src="/images/egift-card.png"
                alt="Toujours Belle E-Gift Card"
                className="relative z-10"
                style={{
                  maxWidth: '380px',
                  width: '100%',
                  borderRadius: '16px',
                  boxShadow: '0 12px 40px rgba(212,165,165,0.35)',
                }}
              />
            </div>
          </div>

          {/* RIGHT - Product Details */}
          <div className="egift-reveal lg:w-1/2">
            {/* Title */}
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3vw, 36px)', color: 'var(--tb-text)', fontWeight: 400, marginBottom: '12px' }}>
              {t.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="#d4a5a5" color="#d4a5a5" />)}
              </div>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#5a5a5a' }}>{t.reviews}</span>
            </div>

            {/* Features */}
            <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '18px', color: 'var(--tb-text)', fontWeight: 500, marginBottom: '12px' }}>
              {t.features}
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#5a5a5a', lineHeight: 1.7, marginBottom: '24px' }}>
              {t.desc}
            </p>

            {/* Price */}
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '28px', color: '#d4a5a5', fontWeight: 600, marginBottom: '24px' }}>
              {selectedAmount ? `${selectedAmount} ${t.currency}` : `25 ${t.currency}`}
            </p>

            {/* Promo Banner */}
            <div
              className="mb-6 overflow-hidden"
              style={{ borderRadius: '12px', backgroundColor: 'var(--tb-bg)' }}
            >
              <img
                src="/images/promo-banner.jpg"
                alt="Promo"
                className="w-full object-cover"
                style={{ height: '100px' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>

            {/* Amount Selector */}
            <div className="mb-5 relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex items-center justify-between"
                style={{
                  padding: '16px 20px',
                  border: '1px solid var(--tb-border)',
                  borderRadius: '8px',
                  backgroundColor: 'var(--tb-card)',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  fontWeight: 500,
                  color: selectedAmount ? 'var(--tb-text)' : 'var(--tb-text-muted)',
                  cursor: 'pointer',
                  letterSpacing: '0.05em',
                }}
              >
                <span>{selectedAmount ? `${selectedAmount} ${t.currency}` : t.selectAmount}</span>
                <ChevronDown size={18} color="var(--tb-text-muted)" style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              {dropdownOpen && (
                <div
                  className="absolute w-full z-10"
                  style={{
                    backgroundColor: 'var(--tb-card)',
                    border: '1px solid var(--tb-border)',
                    borderRadius: '8px',
                    marginTop: '4px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                    overflow: 'hidden',
                  }}
                >
                  {amounts.map((amt) => (
                    <button
                      key={amt}
                      className="w-full text-left transition-colors"
                      style={{
                        padding: '14px 20px',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '14px',
                        color: 'var(--tb-text)',
                        border: 'none',
                        backgroundColor: selectedAmount === amt ? 'var(--tb-bg)' : 'var(--tb-card)',
                        cursor: 'pointer',
                        borderBottom: '1px solid #f0e8e8',
                      }}
                      onClick={() => { setSelectedAmount(amt); setDropdownOpen(false); }}
                      onMouseEnter={(e) => { if (selectedAmount !== amt) e.currentTarget.style.backgroundColor = 'var(--tb-bg)'; }}
                      onMouseLeave={(e) => { if (selectedAmount !== amt) e.currentTarget.style.backgroundColor = 'var(--tb-card)'; }}
                    >
                      {amt} {t.currency}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quantity */}
            <div
              className="flex items-center justify-between mb-5"
              style={{
                padding: '14px 20px',
                border: '1px solid var(--tb-border)',
                borderRadius: '8px',
              }}
            >
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
              >
                <Minus size={18} color="var(--tb-text-muted)" />
              </button>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: 'var(--tb-text)', fontWeight: 500 }}>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
              >
                <Plus size={18} color="var(--tb-text-muted)" />
              </button>
            </div>

            {/* Gift Checkbox */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setIsGift(!isGift)}
                style={{
                  width: '20px',
                  height: '20px',
                  border: isGift ? '2px solid #d4a5a5' : '2px solid var(--tb-border)',
                  borderRadius: '4px',
                  backgroundColor: isGift ? '#d4a5a5' : 'var(--tb-card)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {isGift && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--tb-card)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
              </button>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#5a5a5a' }}>{t.giftLabel}</span>
            </div>

            {/* Add to Bag */}
            <button
              onClick={handleAddToBag}
              className="w-full transition-all duration-300"
              style={{
                padding: '18px',
                backgroundColor: addedToBag ? '#4a7c59' : '#d4a5a5',
                color: 'var(--tb-card)',
                fontFamily: "'Inter', sans-serif",
                fontSize: '15px',
                fontWeight: 500,
                letterSpacing: '0.05em',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              {addedToBag ? t.added : t.addToBag}
            </button>
          </div>
        </div>
      </section>

      {/* Back link */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <button
          onClick={() => navigate('/')}
          className="text-sm hover:text-[#d4a5a5] transition-colors duration-300"
          style={{ fontFamily: "'Inter', sans-serif", color: 'var(--tb-text-muted)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {lang === 'fr' ? "← Retour à l'accueil" : 'العودة إلى الرئيسية →'}
        </button>
      </div>

      <Footer />
    </div>
  );
}
