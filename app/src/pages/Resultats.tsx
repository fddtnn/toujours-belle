import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';
import Footer from '../sections/Footer';

/* Client transformations. Each photo the salon supplied is its own card -
   several are multi-shot collages and folding them together would lose the
   individual fittings. */
const RESULTS = Array.from({ length: 20 }, (_, i) => {
  const n = String(i + 1).padStart(2, '0');
  return { id: i + 1, thumb: `/images/resultats/thumb-${n}.jpg`, full: `/images/resultats/full-${n}.jpg` };
});

export default function Resultats() {
  const { lang, isRTL } = useLanguage();
  const navigate = useNavigate();
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => {
    setOpen(cur => (cur === null ? cur : (cur + d + RESULTS.length) % RESULTS.length));
  }, []);

  /* Keyboard control, and the page behind must not scroll while the lightbox
     is up - on a phone that otherwise drags the gallery around under it. */
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') step(isRTL ? -1 : 1);
      else if (e.key === 'ArrowLeft') step(isRTL ? 1 : -1);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, step, isRTL]);

  const t = {
    overline: lang === 'fr' ? 'TRANSFORMATIONS' : 'تحوّلات',
    title: lang === 'fr' ? 'Résultats' : 'النتائج',
    intro: lang === 'fr'
      ? 'Des poses réalisées dans notre salon, photographiées avant et après. Chaque pièce est choisie, coupée et ajustée sur place, sans retouche sur les photos.'
      : 'تركيبات تمّت في صالوننا، مصوّرة قبل وبعد. كل قطعة تُختار وتُقصّ وتُضبط في المكان، وبدون أي تعديل على الصور.',
    count: lang === 'fr' ? `${RESULTS.length} transformations` : `${RESULTS.length} تحوّل`,
    badge: lang === 'fr' ? 'Avant / Après' : 'قبل / بعد',
    cta: lang === 'fr' ? 'Prendre rendez-vous' : 'احجزي موعد',
    closeLabel: lang === 'fr' ? 'Fermer' : 'إغلاق',
    prevLabel: lang === 'fr' ? 'Précédent' : 'السابق',
    nextLabel: lang === 'fr' ? 'Suivant' : 'التالي',
    alt: (i: number) => lang === 'fr'
      ? `Transformation ${i} : cliente avant et après la pose en salon`
      : `تحوّل ${i}: الزبونة قبل وبعد التركيب في الصالون`,
  };

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{ backgroundColor: 'var(--tb-bg)', fontFamily: "'Inter', sans-serif", minHeight: '100vh' }}
    >
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-2">
        <div className="flex items-center gap-2 text-xs flex-wrap" style={{ color: 'var(--tb-text-muted)' }}>
          <button onClick={() => navigate('/')} className="hover:text-[#d4a5a5] transition-colors">
            {lang === 'fr' ? 'Home' : 'الرئيسية'}
          </button>
          <ChevronRight size={12} style={{ transform: isRTL ? 'rotate(180deg)' : undefined }} />
          <span style={{ color: 'var(--tb-text)' }}>{t.title}</span>
        </div>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-10">
        <p
          style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '11px',
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'var(--tb-accent-text)', marginBottom: '12px',
          }}
        >
          {t.overline}
        </p>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 400,
            fontSize: 'clamp(2rem, 4.2vw, 3.2rem)', lineHeight: 1.15,
            color: 'var(--tb-text)', marginBottom: '14px',
          }}
        >
          {t.title}
        </h1>
        <p
          style={{
            fontSize: '16px', lineHeight: 1.7, color: 'var(--tb-text-secondary)',
            maxWidth: '58ch',
          }}
        >
          {t.intro}
        </p>
        <p
          className="mt-5 inline-block px-3 py-1 rounded-full text-xs font-medium"
          style={{ backgroundColor: 'var(--tb-surface)', color: 'var(--tb-accent-text)' }}
        >
          {t.count}
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {RESULTS.map((r, i) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setOpen(i)}
              className="group text-left cursor-pointer"
              aria-label={t.alt(r.id)}
              style={{ padding: 0, border: 'none', background: 'none' }}
            >
              <div
                className="tb-sheen relative overflow-hidden"
                style={{
                  borderRadius: '14px',
                  border: '1px solid var(--tb-border)',
                  backgroundColor: 'var(--tb-surface)',
                  aspectRatio: '1 / 1',
                }}
              >
                <img
                  src={r.thumb}
                  alt={t.alt(r.id)}
                  width={640}
                  height={640}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span
                  aria-hidden="true"
                  className="absolute top-3 px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase"
                  style={{
                    [isRTL ? 'right' : 'left']: '12px',
                    backgroundColor: 'rgba(24, 16, 16, 0.62)',
                    color: '#faf6f4',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                  }}
                >
                  {t.badge}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center mt-14">
          <a
            href="#about"
            onClick={(e) => { e.preventDefault(); navigate('/'); }}
            className="inline-block transition-colors duration-300"
            style={{
              backgroundColor: 'var(--tb-text)', color: 'var(--tb-bg)',
              borderRadius: '100px', padding: '14px 34px',
              fontWeight: 500, fontSize: '13px', letterSpacing: '0.08em',
              textTransform: 'uppercase', textDecoration: 'none',
            }}
          >
            {t.cta}
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {open !== null && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex: 200, backgroundColor: 'rgba(18, 12, 12, 0.92)' }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={t.alt(RESULTS[open].id)}
        >
          <img
            src={RESULTS[open].full}
            alt={t.alt(RESULTS[open].id)}
            className="object-contain"
            style={{ maxWidth: '92vw', maxHeight: '82vh', borderRadius: '8px' }}
            onClick={(e) => e.stopPropagation()}
          />

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); close(); }}
            aria-label={t.closeLabel}
            className="absolute flex items-center justify-center"
            style={{
              top: '16px', [isRTL ? 'left' : 'right']: '16px',
              width: '44px', height: '44px', borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.12)', border: 'none', cursor: 'pointer',
            }}
          >
            <X size={22} color="#faf6f4" />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            aria-label={isRTL ? t.nextLabel : t.prevLabel}
            className="absolute flex items-center justify-center"
            style={{
              left: '12px', top: '50%', transform: 'translateY(-50%)',
              width: '44px', height: '44px', borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.12)', border: 'none', cursor: 'pointer',
            }}
          >
            <ChevronLeft size={24} color="#faf6f4" />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); step(1); }}
            aria-label={isRTL ? t.prevLabel : t.nextLabel}
            className="absolute flex items-center justify-center"
            style={{
              right: '12px', top: '50%', transform: 'translateY(-50%)',
              width: '44px', height: '44px', borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.12)', border: 'none', cursor: 'pointer',
            }}
          >
            <ChevronRight size={24} color="#faf6f4" />
          </button>

          <span
            className="absolute text-xs"
            style={{ bottom: '20px', left: '50%', transform: 'translateX(-50%)', color: 'rgba(250,246,244,0.82)' }}
          >
            {open + 1} / {RESULTS.length}
          </span>
        </div>
      )}

      <Footer />
    </div>
  );
}
