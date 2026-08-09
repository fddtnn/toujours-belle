import { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import gsap from 'gsap';

export default function Hero() {
  const { t, isRTL } = useLanguage();
  const overlineRef = useRef<HTMLParagraphElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.to(overlineRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    })
      .to(
        line1Ref.current,
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      )
      .to(
        line2Ref.current,
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.65'
      )
      .to(
        subtitleRef.current,
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.5'
      )
      .to(
        ctaRef.current,
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', zIndex: 1, backgroundColor: 'var(--tb-bg)' }}
    >
      {/* Image Background */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <img
          src="/images/hero-main.jpg"
          alt="Toujours Belle"
          className="w-full h-full object-cover object-center md:object-[center_15%]"
        />
        {/* Gradient overlay - stronger on mobile */}
        <div
          className="absolute inset-0"
          style={{
            background: isRTL
              ? 'linear-gradient(to left, rgba(250,246,244,0.95) 0%, rgba(250,246,244,0.75) 35%, rgba(250,246,244,0.3) 65%, transparent 100%)'
              : 'linear-gradient(to right, rgba(250,246,244,0.95) 0%, rgba(250,246,244,0.75) 35%, rgba(250,246,244,0.3) 65%, transparent 100%)',
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '120px',
            background: 'linear-gradient(to top, var(--tb-bg) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* Text Content */}
      <div className="absolute inset-0 flex items-center" style={{ zIndex: 2 }}>
        <div
          className="flex flex-col justify-center"
          style={{
            padding: isRTL ? '0 8vw 0 0' : '0 0 0 8vw',
            maxWidth: '600px',
            textAlign: isRTL ? 'right' : 'left',
            marginLeft: isRTL ? 'auto' : '0',
            marginRight: isRTL ? '0' : 'auto',
          }}
        >
          <p
            ref={overlineRef}
            className="opacity-0 translate-y-5"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#d4a5a5',
              marginBottom: '16px',
            }}
          >
            {t({ fr: '100% CHEVEUX NATURELS', ar: '100٪ شعر طبيعي' })}
          </p>

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              lineHeight: 1.1,
              color: '#d4a5a5',
            }}
          >
            <span ref={line1Ref} className="block opacity-0 translate-y-10">
              {t({ fr: 'La Beauté', ar: 'جمال' })}
            </span>
            <span ref={line2Ref} className="block opacity-0 translate-y-10">
              {t({ fr: 'de Vos Cheveux', ar: 'شعركِ' })}
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="opacity-0 translate-y-8"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: 1.6,
              color: 'var(--tb-text-secondary)',
              marginTop: '24px',
              maxWidth: '480px',
            }}
          >
            {t({
              fr: 'Découvrez notre collection de cheveux naturels, soigneusement sélectionnés pour sublimer votre élégance.',
              ar: 'اكتشفي مجموعتنا من الشعر الطبيعي، المختارة بعناية لتجميل أناقتكِ.',
            })}
          </p>

          <a
            ref={ctaRef}
            href="#hair-types"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#hair-types')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="opacity-0 translate-y-5 inline-block transition-all duration-300"
            style={{
              marginTop: '32px',
              backgroundColor: 'var(--tb-text)',
              color: 'var(--tb-bg)',
              borderRadius: '100px',
              padding: '14px 36px',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '13px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              width: 'fit-content',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#d4a5a5';
              e.currentTarget.style.color = '#1a1a1a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--tb-text)';
              e.currentTarget.style.color = 'var(--tb-bg)';
            }}
          >
            {t({ fr: 'Découvrir', ar: 'اكتشفي' })}
          </a>
        </div>
      </div>
    </section>
  );
}
