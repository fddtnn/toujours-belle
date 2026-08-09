import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, ChevronDown, ArrowLeft, Home } from 'lucide-react';
import gsap from 'gsap';

interface FAQItem {
  questionFr: string;
  questionAr: string;
  answerFr: string;
  answerAr: string;
}

const faqData: FAQItem[] = [
  {
    questionFr: 'Quels types de cheveux proposez-vous ?',
    questionAr: 'ما هي أنواع الشعر التي تقدمونها؟',
    answerFr: 'Nous proposons quatre types de cheveux 100% naturels : lisses, ondul\u00e9s, boucl\u00e9s et cr\u00e9pus (afro). Chaque type est disponible en plusieurs longueurs (de 12 \u00e0 24 pouces) et en plus de 16 couleurs diff\u00e9rentes pour s\u2019adapter parfaitement \u00e0 votre style.',
    answerAr: 'نقدم أربعة أنواع من الشعر 100٪ طبيعي: الناعم، المموج، المجعد، والأفرو. كل نوع متوفر بأطوال متعددة (من 12 إلى 24 بوصة) وبأكثر من 16 لونًا مختلفًا لتناسب أسلوبكِ تمامًا.',
  },
  {
    questionFr: 'Vos cheveux sont-ils vraiment 100% naturels ?',
    questionAr: 'هل شعركم حقًا 100٪ طبيعي؟',
    answerFr: 'Oui, absolument. Tous nos cheveux sont 100% naturels et humains, soigneusement s\u00e9lectionn\u00e9s pour leur qualit\u00e9 exceptionnelle. Ils conservent leurs cuticules intactes, ce qui garantit une texture soyeuse, un \u00e9clat naturel et une durabilit\u00e9 optimale. Aucun m\u00e9lange synth\u00e9tique n\u2019est utilis\u00e9.',
    answerAr: 'نعم، بالتأكيد. كل شعرنا 100٪ طبيعي وبشري، مختار بعناية لجودته الاستثنائية. يحتفظ بقشوره سليمة، مما يضمن ملمسًا حريريًا، وبريقًا طبيعيًا، ومتانة مثالية. لا يُستخدم أي خلط صناعي.',
  },
  {
    questionFr: 'Comment choisir la bonne couleur ?',
    questionAr: 'كيف أختار اللون المناسب؟',
    answerFr: 'Nous proposons une palette de 16 couleurs allant du noir naturel au violet pastel en passant par le blond miel et l\u2019auburn. Vous pouvez consulter notre nuancier interactif sur la page \u00ab Couleurs \u00bb. Nous offrons \u00e9galement une consultation personnalis\u00e9e sur demande pour vous aider \u00e0 trouver la teinte parfaite.',
    answerAr: 'نقدم لوحة من 16 لونًا تتراوح من الأسود الطبيعي إلى البنفسجي الباستيل مرورًا بالأشقر العسلي والأوبورن. يمكنكِ استشارة لوح ألواننا التفاعلي في صفحة "الألوان". نقدم أيضًا استشارة مخصصة عند الطلب لمساعدتكِ في العثور على الظل المثالي.',
  },
  {
    questionFr: 'Quelle est la diff\u00e9rence entre les longueurs disponibles ?',
    questionAr: 'ما هو الفرق بين الأطوال المتاحة؟',
    answerFr: 'Nos cheveux sont disponibles en 7 longueurs : 12\u201d (30cm), 14\u201d (35cm), 16\u201d (40cm), 18\u201d (45cm), 20\u201d (50cm), 22\u201d (55cm) et 24\u201d (60cm). Le choix d\u00e9pend de l\u2019effet souhait\u00e9 : les longueurs courtes (12\u201d\u201316\u201d) offrent un look naturel et facile \u00e0 entretenir, tandis que les longueurs longues (20\u201d\u201324\u201d) garantissent un rendu glamour et volumineux.',
    answerAr: 'شعرنا متوفر بـ 7 أطوال: 12 بوصة (30سم)، 14 بوصة (35سم)، 16 بوصة (40سم)، 18 بوصة (45سم)، 20 بوصة (50سم)، 22 بوصة (55سم)، و24 بوصة (60سم). يعتمد الاختيار على التأثير المطلوب: الأطوال القصيرة (12-16 بوصة) تمنح إطلالة طبيعية وسهلة الصيانة، بينما الأطوال الطويلة (20-24 بوصة) تضمن مظهرًا جذابًا ومن voluminous.',
  },
  {
    questionFr: 'Comment entretenir mes extensions de cheveux naturels ?',
    questionAr: 'كيف أعتني على إضافات شعري الطبيعية؟',
    answerFr: 'Pour pr\u00e9server la qualit\u00e9 de vos extensions, nous recommandons : de les laver avec un shampooing sans sulfate 1 \u00e0 2 fois par semaine, d\u2019appliquer un masque hydratant hebdomadaire, d\u2019\u00e9viter les outils chauffants \u00e0 temp\u00e9rature excessive, de les brosser d\u00e9licatement avec une brosse en poils de sanglier, et de les attacher en tresse l\u00e2che avant de dormir.',
    answerAr: 'للحفاظ على جودة إضافات شعركِ، نوصي بـ: غسلها بشامبو خالٍ من الكبريتات مرة أو مرتين في الأسبوع، تطبيق قناع مرطب أسبوعي، تجنب الأدوات الساخنة بدرجات حرارة مفرطة، تمشيطها بلطف بفرشاة شعر الخنزير، وربطها بضفيرة فضفاضة قبل النوم.',
  },
  {
    questionFr: 'Combien de temps durent vos extensions ?',
    questionAr: 'كم تدوم إضافاتكم؟',
    answerFr: 'Avec un entretien appropri\u00e9, nos extensions de cheveux naturels durent de 6 mois \u00e0 1 an, voire plus. La dur\u00e9e de vie d\u00e9pend de la fr\u00e9quence d\u2019utilisation, des soins apport\u00e9s et des produits utilis\u00e9s. Les cheveux lisses ont tendance \u00e0 durer plus longtemps que les textures boucl\u00e9es ou cr\u00e9pues.',
    answerAr: 'مع العناية المناسبة، تدوم إضافات شعرنا الطبيعي من 6 أشهر إلى سنة أو أكثر. تعتمد مدة الحياة على تكرار الاستخدام، والعناية المقدمة، والمنتجات المستخدمة. يميل الشعر الناعم إلى الاستمرار لفترة أطول من القوام المجعد أو الأفرو.',
  },
  {
    questionFr: 'Proposez-vous des consultations ?',
    questionAr: 'هل تقدمون استشارات؟',
    answerFr: 'Oui, nous proposons des consultations personnalis\u00e9es sur demande pour vous aider \u00e0 choisir le type, la couleur et la longueur id\u00e9aux. Veuillez noter que nos consultations sont payantes et non gratuites. Contactez-nous par email ou t\u00e9l\u00e9phone pour prendre rendez-vous.',
    answerAr: 'نعم، نقدم استشارات مخصصة عند الطلب لمساعدتكِ في اختيار النوع واللون والطول المثاليين. يرجى ملاحظة أن استشاراتنا مدفوعة وليست مجانية. تواصلي معنا عبر البريد الإلكتروني أو الهاتف لتحديد موعد.',
  },
  {
    questionFr: 'Quels sont vos d\u00e9lais de livraison ?',
    questionAr: 'ما هي مدة التوصيل لديكم؟',
    answerFr: 'Nos d\u00e9lais de livraison sont de 2 \u00e0 5 jours ouvr\u00e9s en France m\u00e9tropolitaine. Pour les commandes internationales, comptez 5 \u00e0 10 jours ouvr\u00e9s. Vous recevrez un num\u00e9ro de suivi d\u00e8s l\u2019exp\u00e9dition de votre colis.',
    answerAr: 'مدة توصيلنا من 2 إلى 5 أيام عمل في فرنسا Metropolitan. للطلبات الدولية، يستغرق 5 إلى 10 أيام عمل. ستتلقين رقم تتبع فور شحن طلبكِ.',
  },
  {
    questionFr: 'Puis-je colorer ou d\u00e9colorer les cheveux ?',
    questionAr: 'هل يمكنني صبغ أو فتح لون الشعر؟',
    answerFr: 'Oui, \u00e9tant donn\u00e9 que nos cheveux sont 100% naturels, ils peuvent \u00eatre color\u00e9s, d\u00e9color\u00e9s, liss\u00e9s ou boucl\u00e9s comme vos propres cheveux. Nous recommandons toutefois de faire appel \u00e0 un professionnel pour obtenir le meilleur r\u00e9sultat sans endommager la fibre capillaire.',
    answerAr: 'نعم، بما أن شعرنا 100٪ طبيعي، يمكن صبغه أو فتح لونه أو تمليسه أو تجعيده مثل شعركِ الخاص. ومع ذلك، نوصي بالاستعانة بأخصائي للحصول على أفضل نتيجة دون إلحاق الضرر بالليفة الشعرية.',
  },
  {
    questionFr: 'Comment passer commande ?',
    questionAr: 'كيف أقدم طلبًا؟',
    answerFr: 'S\u00e9lectionnez simplement le type de cheveux, la couleur et la longueur souhait\u00e9s sur notre page produit, ajoutez au panier, puis suivez les instructions de paiement. Pour les commandes de cheveux, un acompte de 50% du montant total est exig\u00e9 \u00e0 la commande. Le solde est \u00e0 r\u00e9gler avant l\u2019exp\u00e9dition.',
    answerAr: 'ما عليكِ سوى اختيار نوع الشعر واللون والطول المطلوبين في صفحة منتجنا، إضافة إلى السلة، ثم اتباع تعليمات الدفع. لطلبات الشعر، يُطلب دفع 50٪ من المبلغ الإجمالي عند الطلب. يتم دفع الرصيد قبل الشحن.',
  },
];

function FAQItemComponent({ item, isOpen, onToggle, lang }: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  lang: string;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="border-b"
      style={{ borderColor: 'var(--tb-border)' }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400,
            fontSize: '1.1rem',
            color: 'var(--tb-text)',
            paddingRight: '16px',
          }}
        >
          {lang === 'fr' ? item.questionFr : item.questionAr}
        </span>
        <ChevronDown
          size={20}
          color="var(--tb-text-muted)"
          className="flex-shrink-0 transition-transform duration-300"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isOpen ? '400px' : '0',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p
          className="pb-5"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: '15px',
            lineHeight: 1.7,
            color: 'var(--tb-text-muted)',
          }}
        >
          {lang === 'fr' ? item.answerFr : item.answerAr}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (pageRef.current) {
      gsap.fromTo(
        pageRef.current.querySelectorAll('.faq-animate'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08 }
      );
    }
  }, []);

  return (
    <div ref={pageRef} style={{ backgroundColor: 'var(--tb-bg)', minHeight: '100vh' }}>
      {/* Header */}
      <nav
        className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-6 lg:px-10"
        style={{
          zIndex: 100,
          backgroundColor: 'rgba(250, 246, 244, 0.9)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--tb-border)',
        }}
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 hover:text-[#d4a5a5] transition-colors"
          style={{ color: 'var(--tb-text)' }}
        >
          <ArrowLeft size={20} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500 }}>
            {lang === 'fr' ? 'Retour' : 'رجوع'}
          </span>
        </button>

        <a
          href="/"
          onClick={(e) => { e.preventDefault(); navigate('/'); }}
          className="flex items-center gap-2"
          style={{ fontFamily: "'Playfair Display', serif", color: 'var(--tb-text)', fontSize: '18px' }}
        >
          <Sparkles size={18} color="#d4a5a5" />
          Toujours Belle
        </a>

        <div style={{ width: '60px' }} />
      </nav>

      {/* Content */}
      <div className="pt-24 pb-20 px-6 lg:px-10">
        <div className="max-w-[800px] mx-auto">
          <div className="faq-animate text-center mb-12">
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
              {lang === 'fr' ? 'QUESTIONS FR\u00c9QUENTES' : 'الأسئلة الشائعة'}
            </p>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 400,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: 'var(--tb-text)',
                lineHeight: 1.15,
                marginBottom: '12px',
              }}
            >
              {lang === 'fr' ? 'FAQ' : 'الأسئلة الشائعة'}
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                color: 'var(--tb-text-muted)',
                lineHeight: 1.6,
              }}
            >
              {lang === 'fr'
                ? 'Trouvez les r\u00e9ponses aux questions les plus fr\u00e9quentes sur nos produits et services.'
                : 'اعثري على إجابات لأكثر الأسئلة شيوعًا حول منتجاتنا وخدماتنا.'}
            </p>
          </div>

          <div className="faq-animate bg-white rounded-xl p-6 lg:p-8" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
            {faqData.map((item, idx) => (
              <FAQItemComponent
                key={idx}
                item={item}
                isOpen={openIndex === idx}
                onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
                lang={lang}
              />
            ))}
          </div>

          <div className="faq-animate text-center mt-10">
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '15px',
                color: 'var(--tb-text-muted)',
                marginBottom: '16px',
              }}
            >
              {lang === 'fr'
                ? 'Vous ne trouvez pas la r\u00e9ponse \u00e0 votre question ?'
                : 'لم تجدي إجابة على سؤالكِ؟'}
            </p>
            <a
              href="mailto:contact@toujoursbelle.com"
              style={{
                display: 'inline-block',
                padding: '12px 28px',
                backgroundColor: 'var(--tb-text)',
                color: 'var(--tb-bg)',
                borderRadius: '100px',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: '13px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#d4a5a5';
                e.currentTarget.style.color = 'var(--tb-text)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--tb-text)';
                e.currentTarget.style.color = 'var(--tb-bg)';
              }}
            >
              {lang === 'fr' ? 'Contactez-nous' : 'تواصلي معنا'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
