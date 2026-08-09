import { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  quoteFr: string;
  quoteAr: string;
  authorFr: string;
  authorAr: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    quoteFr: "Franchement, j'ai adoré la perruque. La qualité est incroyable, elle est douce, naturelle et très facile à coiffer. La couleur est exactement comme sur la photo et elle me va parfaitement. C'est sûr que je vais commander encore une fois sans hésiter ! Merci pour votre professionnalisme et votre gentillesse.",
    quoteAr: 'أعجبتني الباروكة بصراحة. الجودة لا تصدق، ناعمة وطبيعية وسهلة التصفيف جدًا. اللون مطابق تمامًا للصورة ويليق بي تمامًا. سأطلب مرة أخرى بدون تردد بالتأكيد! شكرًا على احترافيتكم ولطفكم.',
    authorFr: '— Molka.C, Tunis',
    authorAr: '— ملكى.ك، تونس',
    image: '/images/testimonial-1.jpg',
  },
  {
    quoteFr: "Merci pour la qualité de service et pour le professionnalisme :) perruque bien reçu et hyper satisfaite.",
    quoteAr: 'شكرًا على جودة الخدمة والاحترافية :) استلمت الباروكة وأنا راضية للغاية.',
    authorFr: '— Mouna.D, Sfax',
    authorAr: '— منى.د، تونس',
    image: '/images/testimonial-2.jpg',
  },
  {
    quoteFr: "Bonjour, j'ai bien reçu la commande et je suis très satisfaite. Merci beaucoup pour votre professionnalisme ainsi que pour l'excellent suivi.",
    quoteAr: 'مرحبًا، استلمت الطلب وأنا راضية جدًا. شكرًا جزيلاً على احترافيتكم والمتابعة الممتازة.',
    authorFr: '— Yousra.I, Gabès',
    authorAr: '— يسرى.أ، تونس',
    image: '/images/testimonial-3.jpg',
  },
  {
    quoteFr: "Honnêtement, j'ai beaucoup hésité avant de faire cet achat, mais ton écoute, ta patience et tes conseils m'ont vraiment rassurée. Aujourd'hui, je viens de recevoir mon topper et je suis sincèrement bluffée par la qualité et la couleur. Le rendu est tellement naturel qu'on dirait vraiment mes propres cheveux ! Je suis vraiment très contente de mon achat. Merci infiniment.",
    quoteAr: 'بصراحة، ترددت كثيرًا قبل هذا الشراء، لكن استماعك وصبرك ونصائحك طمأنوني حقًا. اليوم استلمت توبير وأنا مندهشة حقًا من الجودة واللون. النتيجة طبيعية جدًا يبدو وكأنه شعري الخاص! أنا سعيدة جدًا بشرائي. شكرًا جزيلاً.',
    authorFr: '— Ikram.C, Gammarth',
    authorAr: '— إكرام.ك، تونس',
    image: '/images/testimonial-4.jpg',
  },
  {
    quoteFr: "Merci beaucoup pour le perruque, vraiment haja top w mzyena jeni kima habit w akther, alors la qualité tayara et je suis satisfaite alekher bih.",
    quoteAr: 'شكرًا جزيلاً على الباروكة، حقًا شيء راقي وجميل، جاءني كما أردت وأكثر، الجودة رائعة وأنا راضية تمامًا.',
    authorFr: '— Imen.D, Sousse',
    authorAr: '— ايمان.د، تونس',
    image: '/images/testimonial-5.jpg',
  },
  {
    quoteFr: "Je viens de recevoir la perruque, elle est superbe très jolie et cheveux naturel parfaite.",
    quoteAr: 'لقد استلمت الباروكة للتو، إنها رائعة وجميلة جدًا وشعر طبيعي مثالي.',
    authorFr: '— Olfa.M, La Marsa',
    authorAr: '— ألفة.م، تونس',
    image: '/images/testimonial-6.jpg',
  },
  {
    quoteFr: "La perruque la taille est parfait, couleur comme la photo et comme j'ai commandé, très satisfaite.",
    quoteAr: 'الباروكة المقاس مثالي، اللون كالصورة وكما طلبت، راضية جدًا.',
    authorFr: '— Syrine.G, Zaghouane',
    authorAr: '— سيرين.ج، تونس',
    image: '/images/testimonial-7.jpg',
  },
  {
    quoteFr: "Waslatni la commande ye3tiik saha, très satisfaite, qualité tayara et khfif 3la rass kima n7eb, a la prochaine inshallah.",
    quoteAr: 'وصلني الطلب يعطيك الصحة، راضية جدًا، الجودة رائعة وخفيف على الرأس كما أحب، إلى المرة القادمة إن شاء الله.',
    authorFr: '— Yosra.C, Sfax',
    authorAr: '— يسرى.ك، تونس',
    image: '/images/testimonial-8.jpg',
  },
];

export default function Testimonials() {
  const { lang, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Auto-play every 5 seconds */
  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));
    }, 5000);
  }, []);

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const goTo = (idx: number) => {
    stopAutoplay();
    setCurrent(idx);
    startAutoplay();
  };

  const prev = () => {
    stopAutoplay();
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
    startAutoplay();
  };

  const next = () => {
    stopAutoplay();
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));
    startAutoplay();
  };

  const t = testimonials[current];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative w-full"
      style={{ zIndex: 1, backgroundColor: 'var(--tb-bg)', padding: '120px 0' }}
    >
      <div className="max-w-[1000px] mx-auto px-6 lg:px-10 text-center">
        <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--tb-text-muted)', marginBottom: '32px' }}>
          {lang === 'fr' ? 'TÉMOIGNAGES' : 'آراء العملاء'}
        </p>

        <div ref={quoteRef}>
          {/* Avatar */}
          <div className="mx-auto mb-6 rounded-full overflow-hidden" style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #d4a5a5, #c49393)' }}>
            <img src={t.image} alt="" className="w-full h-full object-cover" />
          </div>

          <blockquote
            key={current}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
              fontStyle: 'italic',
              fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
              lineHeight: 1.6,
              color: 'var(--tb-text)',
              marginBottom: '32px',
              transition: 'opacity 0.3s ease',
              minHeight: '120px',
            }}
          >
            "{lang === 'fr' ? t.quoteFr : t.quoteAr}"
          </blockquote>

          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '14px', color: 'var(--tb-text-muted)', marginBottom: '32px' }}>
            {lang === 'fr' ? t.authorFr : t.authorAr}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button onClick={prev} className="w-10 h-10 rounded-full border border-[var(--tb-text)] flex items-center justify-center hover:bg-[var(--tb-text)] hover:text-[var(--tb-bg)] transition-all duration-300" style={{ color: 'var(--tb-text)' }} aria-label="Previous">
            {isRTL ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className="rounded-full transition-all duration-300"
                style={{ width: '8px', height: '8px', backgroundColor: current === idx ? 'var(--tb-text)' : '#d4a5a5' }}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

          <button onClick={next} className="w-10 h-10 rounded-full border border-[var(--tb-text)] flex items-center justify-center hover:bg-[var(--tb-text)] hover:text-[var(--tb-bg)] transition-all duration-300" style={{ color: 'var(--tb-text)' }} aria-label="Next">
            {isRTL ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>
      </div>
    </section>
  );
}
