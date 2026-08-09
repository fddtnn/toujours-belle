import { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { t, lang, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.fromTo(imageRef.current, { opacity: 0, x: isRTL ? 80 : -80 }, {
          opacity: 1, x: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' },
        });
      }
      if (textRef.current) {
        const elements = textRef.current.querySelectorAll('.animate-in');
        gsap.fromTo(elements, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [isRTL]);

  return (
    <section ref={sectionRef} id="about" className="relative w-full overflow-hidden transition-colors duration-500" style={{ zIndex: 1, backgroundColor: 'var(--tb-bg)' }}>
      <div className="flex flex-col lg:flex-row items-stretch" style={{ minHeight: '600px', flexDirection: isRTL ? 'row-reverse' : undefined }}>
        {/* Image - Full picture visible */}
        <div ref={imageRef} className="w-full lg:w-1/2 flex items-center justify-center overflow-hidden" style={{ minHeight: '400px', backgroundColor: '#f5ece8' }}>
          <img
            src="/images/about-new.jpg"
            alt="About Toujours Belle"
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>

        {/* Text Content */}
        <div ref={textRef} className="w-full lg:w-1/2 flex flex-col justify-center transition-colors duration-500" style={{ padding: '80px 40px', paddingLeft: isRTL ? '40px' : '80px', paddingRight: isRTL ? '80px' : '40px', backgroundColor: 'var(--tb-bg)' }}>
          <p className="animate-in" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#d4a5a5', marginBottom: '16px' }}>
            {t({ fr: 'À PROPOS', ar: 'من نحن' })}
          </p>

          <h2 className="animate-in" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.15, color: 'var(--tb-text)', marginBottom: '24px' }}>
            {t({ fr: 'Depuis 2014, la confiance se construit par les résultats', ar: 'منذ 2014، الثقة تُبنى بالنتائج' })}
          </h2>

          <p className="animate-in" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '15px', lineHeight: 1.7, color: 'var(--tb-text-secondary)', marginBottom: '16px' }}>
            {t({ fr: "Chez Toujours Belle, nous croyons que chaque femme mérite une solution personnalisée, adaptée à sa beauté naturelle, à ses besoins et à ses objectifs.", ar: 'في Toujours Belle، نؤمن أن كل امرأة تستحق حلاً مخصصًا، يناسب جمالها الطبيعي، و احتياجاتها، و أهدافها.' })}
          </p>

          <p className="animate-in" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '15px', lineHeight: 1.7, color: 'var(--tb-text-secondary)', marginBottom: '20px' }}>
            {t({ fr: "Depuis plus de 12 ans, nous proposons une expérience de vente en ligne basée sur l'écoute, le conseil et la qualité, avec un accompagnement sur mesure pour chaque cliente.", ar: 'منذ أكثر من 12 عامًا، نقدم تجربة بيع عبر الإنترنت قائمة على الاستماع، والنصيحة، والجودة، مع مرافقة مخصصة لكل عميلة.' })}
          </p>

          {/* Consultation */}
          <div className="animate-in mb-4">
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: 'var(--tb-text)', marginBottom: '8px' }}>
              {t({ fr: 'Consultation avec un expert', ar: 'استشارة مع خبير' })}
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', lineHeight: 1.6, color: 'var(--tb-text-secondary)', marginBottom: '8px' }}>
              {t({ fr: "Chaque demande est étudiée avec précision afin de recommander les produits les plus adaptés selon :", ar: 'يتم دراسة كل طلب بدقة لاقتراح المنتجات الأنسب حسب:' })}
            </p>
            <ul className="space-y-1" style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--tb-text-secondary)', lineHeight: 1.6 }}>
              {[
                { fr: 'la texture', ar: 'الملمس' },
                { fr: 'la couleur', ar: 'اللون' },
                { fr: 'le besoin', ar: 'الحاجة' },
                { fr: 'le résultat souhaité', ar: 'النتيجة المرجوة' },
              ].map((item) => (
                <li key={item.fr} className="flex items-start gap-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <span className="flex-shrink-0 mt-2 rounded-full" style={{ width: '5px', height: '5px', backgroundColor: '#d4a5a5' }} />
                  {lang === 'fr' ? item.fr : item.ar}
                </li>
              ))}
            </ul>
          </div>

          {/* Catalogue */}
          <div className="animate-in mb-4">
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: 'var(--tb-text)', marginBottom: '8px' }}>
              {t({ fr: 'Catalogue personnalisé', ar: 'كتالوج مخصص' })}
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', lineHeight: 1.6, color: 'var(--tb-text-secondary)' }}>
              {t({ fr: "Nous ne proposons pas des produits au hasard : chaque cliente reçoit uniquement les options qui lui correspondent réellement.", ar: 'لا نقدم منتجات عشوائية: كل عميلة تتلقى فقط الخيارات التي تناسبها حقًا.' })}
            </p>
          </div>

          {/* Preuves */}
          <div className="animate-in mb-4">
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: 'var(--tb-text)', marginBottom: '8px' }}>
              {t({ fr: 'Des preuves réelles et transparentes', ar: 'أدلة حقيقية وشفافة' })}
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', lineHeight: 1.6, color: 'var(--tb-text-secondary)' }}>
              {t({ fr: "Photos, vidéos, avis authentiques, audios clientes… Notre réputation s'est construite grâce aux résultats et à la satisfaction de nos clientes. Plusieurs de nos produits ont également été portés par des célébrités et présentés à la télévision.", ar: 'صور، وفيديوهات، وآراء أصيلة، وتسجيلات صوتية للعملاء... بنيت سمعتنا على النتائج ورضا عملائنا. تم ارتداء العديد من منتجاتنا أيضًا من قبل المشاهير وعرضها على التلفزيون.' })}
            </p>
          </div>

          {/* Methode */}
          <div className="animate-in mb-6">
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: 'var(--tb-text)', marginBottom: '8px' }}>
              {t({ fr: 'Une méthode fiable, testée depuis des années', ar: 'طريقة موثوقة، مجربة منذ سنوات' })}
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', lineHeight: 1.6, color: 'var(--tb-text-secondary)' }}>
              {t({ fr: "Notre expérience nous permet d'offrir des solutions efficaces, naturelles et adaptées à différents profils. Aujourd'hui, nos clientes continuent de nous faire confiance, reviennent régulièrement et recommandent Toujours Belle autour d'elles.", ar: 'تتيح لنا خبرتنا تقديم حلول فعالة، وطبيعية، ومناسبة لمختلف الأنماط. اليوم، عملائنا يواصلون الثقة بنا، والعودة بانتظام، وتوصية Toujours Belle لمن حولهم.' })}
            </p>
          </div>

          <a href="#product" onClick={(e) => { e.preventDefault(); document.querySelector('#product')?.scrollIntoView({ behavior: 'smooth' }); }} className="animate-in inline-block transition-all duration-300 hover:-translate-y-0.5" style={{ padding: '14px 36px', borderRadius: '100px', border: '1px solid var(--tb-text)', backgroundColor: 'transparent', color: 'var(--tb-text)', fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', width: 'fit-content' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--tb-text)'; e.currentTarget.style.color = 'var(--tb-bg)'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--tb-text)'; }}>
            {t({ fr: 'Découvrir nos Produits', ar: 'اكتشفي منتجاتنا' })}
          </a>
        </div>
      </div>
    </section>
  );
}
