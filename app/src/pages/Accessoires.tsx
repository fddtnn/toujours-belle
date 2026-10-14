import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { ChevronRight, MessageCircle } from 'lucide-react';
import Footer from '../sections/Footer';

/* Accessories carry no price. These are consumables whose cost moves with the
   order - quantity, format, what is already in the basket - so the card asks
   for the price instead of inventing one, and hands the question straight to
   WhatsApp with the product already named. */
const WHATSAPP = '33123456789';

type Item = {
  id: string;
  image: string;
  nameFr: string;
  nameAr: string;
  descFr: string;
  descAr: string;
};

const ITEMS: Item[] = [
  {
    id: 'acc1',
    image: '/images/accessoires/acc1.jpg',
    nameFr: 'Bandes adhésives Ultra Hold',
    nameAr: 'لصقات ألترا هولد',
    descFr: 'Pastilles prédécoupées pour une pose rapide, sans colle liquide. Tenue longue durée, retrait propre.',
    descAr: 'لصقات مقصوصة مسبقاً لتركيب سريع بدون غراء سائل. ثبات طويل وإزالة نظيفة.',
  },
  {
    id: 'acc2',
    image: '/images/accessoires/acc2.jpg',
    nameFr: 'Colle Ultra Hold — Maximum Wear',
    nameAr: 'غراء ألترا هولد — ثبات أقصى',
    descFr: 'Adhésif liquide waterproof pour lace et polyuréthane. Trois couches pour la tenue la plus forte.',
    descAr: 'غراء سائل مقاوم للماء للّيس والبولي يوريثان. ثلاث طبقات لأقوى ثبات.',
  },
  {
    id: 'acc3',
    image: '/images/accessoires/acc3.jpg',
    nameFr: 'Duo colle & dissolvant',
    nameAr: 'طقم غراء ومزيل',
    descFr: 'Le nécessaire complet : un adhésif pour la pose, un dissolvant pour retirer la lace sans l’abîmer.',
    descAr: 'الطقم الكامل: غراء للتركيب، ومزيل لفك الليس دون الإضرار بها.',
  },
  {
    id: 'acc4',
    image: '/images/accessoires/acc4.jpg',
    nameFr: 'Rouleaux adhésifs Lace Front — 3 yards',
    nameAr: 'شرائط لاصقة ليس فرونت — 3 ياردات',
    descFr: 'Ruban double face à découper à la forme de votre contour. Trois yards par rouleau.',
    descAr: 'شريط لاصق من الوجهين يُقص حسب شكل مقدمة رأسكِ. ثلاث ياردات لكل لفة.',
  },
  {
    id: 'acc5',
    image: '/images/accessoires/acc5.jpg',
    nameFr: 'Dissolvants — trois formules',
    nameAr: 'مزيلات — ثلاث تركيبات',
    descFr: 'Huile, solution douce ou formule rapide, selon l’adhésif utilisé et la sensibilité du cuir chevelu.',
    descAr: 'زيت، أو تركيبة لطيفة، أو سريعة المفعول، حسب نوع الغراء وحساسية فروة الرأس.',
  },
];

export default function Accessoires() {
  const { lang, isRTL } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const t = {
    overline: lang === 'fr' ? 'POSE & ENTRETIEN' : 'التركيب والعناية',
    title: lang === 'fr' ? 'Accessoires' : 'إكسسوارات',
    intro: lang === 'fr'
      ? 'Colles, rubans et dissolvants : tout ce qui tient une pose et tout ce qui la retire proprement. Dites-nous ce qu’il vous faut, nous vous indiquons le prix avec votre commande.'
      : 'غراء وشرائط ومزيلات: كل ما يثبّت التركيبة وكل ما يفكّها بأمان. قولي لنا وش تحتاجين، ونعطيكِ السعر مع طلبكِ.',
    onRequest: lang === 'fr' ? 'Prix sur demande' : 'السعر عند الطلب',
    withOrder: lang === 'fr' ? 'Communiqué avec votre commande' : 'يُحدَّد مع طلبكِ',
    ask: lang === 'fr' ? 'Demander le prix' : 'اسألي عن السعر',
    note: lang === 'fr'
      ? 'Le prix dépend de la quantité et du format, c’est pourquoi il n’est pas affiché ici. Écrivez-nous et vous l’avez tout de suite.'
      : 'السعر يختلف حسب الكمية والحجم، ولهذا ما هو معروض هنا. راسلينا ويوصلكِ على طول.',
  };

  const waLink = (item: Item) => {
    const name = lang === 'fr' ? item.nameFr : item.nameAr;
    const msg = lang === 'fr'
      ? `Bonjour, je voudrais connaître le prix de : ${name}`
      : `السلام عليكم، أبغى أعرف سعر: ${name}`;
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
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
          <span>{lang === 'fr' ? 'Cheveux' : 'الشعر'}</span>
          <ChevronRight size={12} style={{ transform: isRTL ? 'rotate(180deg)' : undefined }} />
          <span style={{ color: 'var(--tb-text)' }}>{t.title}</span>
        </div>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-10">
        <p
          style={{
            fontWeight: 500, fontSize: '11px', letterSpacing: '0.15em',
            textTransform: 'uppercase', color: 'var(--tb-accent-text)', marginBottom: '12px',
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
        <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--tb-text-secondary)', maxWidth: '62ch' }}>
          {t.intro}
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ITEMS.map((item, i) => (
            <article
              key={item.id}
              className="group flex flex-col overflow-hidden"
              style={{
                borderRadius: '16px',
                border: '1px solid var(--tb-border)',
                backgroundColor: 'var(--tb-card)',
              }}
            >
              <div className="tb-sheen relative overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
                <img
                  src={item.image}
                  alt={lang === 'fr' ? item.nameFr : item.nameAr}
                  width={1312}
                  height={1199}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex flex-col flex-1 p-5">
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: '18px',
                    lineHeight: 1.3, color: 'var(--tb-text)', marginBottom: '8px',
                  }}
                >
                  {lang === 'fr' ? item.nameFr : item.nameAr}
                </h2>
                <p
                  className="flex-1"
                  style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--tb-text-secondary)', marginBottom: '16px' }}
                >
                  {lang === 'fr' ? item.descFr : item.descAr}
                </p>

                <div
                  className="flex items-baseline gap-2 flex-wrap"
                  style={{ marginBottom: '14px' }}
                >
                  <span
                    style={{
                      fontFamily: "'Playfair Display', serif", fontSize: '17px',
                      color: 'var(--tb-accent-text)',
                    }}
                  >
                    {t.onRequest}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--tb-text-muted)' }}>
                    · {t.withOrder}
                  </span>
                </div>

                <a
                  href={waLink(item)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 transition-opacity duration-200 hover:opacity-90"
                  style={{
                    padding: '13px 20px', borderRadius: '100px',
                    backgroundColor: 'var(--tb-text)', color: 'var(--tb-bg)',
                    fontSize: '13px', fontWeight: 500, letterSpacing: '0.06em',
                    textTransform: 'uppercase', textDecoration: 'none',
                  }}
                >
                  <MessageCircle size={16} />
                  {t.ask}
                </a>
              </div>
            </article>
          ))}
        </div>

        <p
          className="mt-12 mx-auto text-center"
          style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--tb-text-muted)', maxWidth: '60ch' }}
        >
          {t.note}
        </p>
      </div>

      <Footer />
    </div>
  );
}
