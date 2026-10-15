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
  {
    id: 'acc6',
    image: '/images/accessoires/acc6.jpg',
    nameFr: 'Tête à perruque & trépied',
    nameAr: 'رأس عرض مع حامل ثلاثي',
    descFr: 'Pour coiffer, poser et ranger sans déformer. Trépied réglable en hauteur, tête en toile qui accepte les épingles.',
    descAr: 'لتصفيف الباروكة وتركيبها وحفظها دون أن تفقد شكلها. حامل قابل لضبط الارتفاع، ورأس من القماش يتحمّل الدبابيس.',
  },
  {
    id: 'acc7',
    image: '/images/accessoires/acc7.jpg',
    nameFr: 'Brosses ventilées dorées',
    nameAr: 'فرشاتان ذهبيتان مفرّغتان',
    descFr: 'Structure ajourée qui laisse passer l’air : démêlage rapide, séchage plus court, moins de tension sur les attaches.',
    descAr: 'هيكل مفرّغ يسمح بمرور الهواء: فك التشابك أسرع، والتجفيف أقصر، وشدّ أقل على أماكن التثبيت.',
  },
  {
    id: 'acc8',
    image: '/images/accessoires/acc8.jpg',
    nameFr: 'Bandeaux antidérapants en velours',
    nameAr: 'ربطات مخمل مانعة للانزلاق',
    descFr: 'Cinq teintes de velours matelassé à glisser sous la perruque : elle tient sans colle et sans tirer sur les tempes.',
    descAr: 'خمس درجات من المخمل المبطّن توضع تحت الباروكة: تثبت بدون غراء وبدون شدّ على الصدغين.',
  },
  {
    id: 'acc9',
    image: '/images/accessoires/acc9.jpg',
    nameFr: 'Brosse lissante à poils denses',
    nameAr: 'فرشاة تمليس بشعيرات كثيفة',
    descFr: 'Poils serrés pour lisser la longueur et faire briller sans casser la fibre. Manche doré, prise en main confortable.',
    descAr: 'شعيرات متقاربة لتمليس الأطوال وإظهار اللمعان دون كسر الخصلة. مقبض ذهبي ومريح في اليد.',
  },
  {
    id: 'acc10',
    image: '/images/accessoires/acc10.jpg',
    nameFr: 'Bonnet en satin',
    nameAr: 'بونيه ساتان',
    descFr: 'À porter la nuit : le satin ne boit pas l’hydratation et ne crée pas de frisottis, contrairement au coton.',
    descAr: 'للنوم: الساتان لا يمتصّ الترطيب ولا يسبّب التشعّث، على عكس القطن.',
  },
  {
    id: 'acc11',
    image: '/images/accessoires/acc11.jpg',
    nameFr: 'Support & cintre à perruque',
    nameAr: 'حامل وعلّاقة باروكة',
    descFr: 'Le support garde la forme sur le plan de travail, le cintre libère l’espace dans l’armoire. Pliables tous les deux.',
    descAr: 'الحامل يحافظ على الشكل على الطاولة، والعلّاقة توفّر مساحة في الخزانة. وكلاهما قابل للطي.',
  },
  {
    id: 'acc12',
    image: '/images/accessoires/acc12.jpg',
    nameFr: 'Brosses — trois finitions',
    nameAr: 'ثلاث فرش بثلاث تشطيبات',
    descFr: 'Or rose, noir mat et argent. Même base ventilée, à choisir selon ce qui traîne déjà sur votre coiffeuse.',
    descAr: 'ذهبي وردي، أسود مطفي، وفضي. نفس القاعدة المفرّغة، تختارين حسب ما يناسب تسريحتكِ.',
  },
  {
    id: 'acc13',
    image: '/images/accessoires/acc13.jpg',
    nameFr: 'Chouchou en satin',
    nameAr: 'سكرانشي ساتان',
    descFr: 'Attache sans trace : le satin glisse sur la fibre au lieu de la marquer, même serré toute la journée.',
    descAr: 'ربطة بدون أثر: الساتان ينزلق على الخصلة بدل ما يترك علامة، حتى لو بقيت مشدودة طول اليوم.',
  },
  {
    id: 'acc14',
    image: '/images/accessoires/acc14.jpg',
    nameFr: 'Bonnets sous-perruque',
    nameAr: 'شبكات تحت الباروكة',
    descFr: 'Maille fine et teintes nude pour aplatir vos cheveux et disparaître sous la lace, sans surépaisseur au contour.',
    descAr: 'شبكة ناعمة ودرجات قريبة من لون البشرة لتسطيح شعركِ والاختفاء تحت الليس، بدون سماكة عند الحدود.',
  },
  {
    id: 'acc15',
    image: '/images/accessoires/acc15.jpg',
    nameFr: 'Housses de rangement',
    nameAr: 'أكياس حفظ الباروكة',
    descFr: 'Housse à fenêtre avec cintre intégré : vous voyez ce qu’il y a dedans sans ouvrir, et rien ne prend la poussière.',
    descAr: 'كيس بنافذة مع علّاقة مدمجة: تشوفين وش بداخله بدون ما تفتحينه، ولا يدخله الغبار.',
  },
  {
    id: 'acc16',
    image: '/images/accessoires/acc16.jpg',
    nameFr: 'Coffret soin complet',
    nameAr: 'طقم العناية الكامل',
    descFr: 'Shampoing, après-shampoing, masque et huile. La routine entière pour cheveux naturels et perruques.',
    descAr: 'شامبو وبلسم وماسك وزيت. الروتين الكامل للشعر الطبيعي وللباروكات.',
  },
  {
    id: 'acc17',
    image: '/images/accessoires/acc17.jpg',
    nameFr: 'Pinces crabe',
    nameAr: 'مشابك كلاب',
    descFr: 'Marbre, écaille, nacre et ivoire. Assez solides pour relever une longueur épaisse sans marquer la fibre.',
    descAr: 'رخامي، سلحفاتي، صدفي، وعاجي. قوية بما يكفي لرفع الأطوال الكثيفة دون ترك علامة.',
  },
  {
    id: 'acc18',
    image: '/images/accessoires/acc18.jpg',
    nameFr: 'Shampoing',
    nameAr: 'شامبو',
    descFr: 'Sans sulfates ni parabènes, formulé pour ne pas décaper la couleur ni assécher une fibre travaillée.',
    descAr: 'بدون سلفات ولا بارابين، مركّب حتى لا يسحب اللون ولا يجفّف الخصلة المعالَجة.',
  },
  {
    id: 'acc19',
    image: '/images/accessoires/acc19.jpg',
    nameFr: 'Bandes adhésives pré-découpées',
    nameAr: 'لصقات مقصوصة مسبقاً',
    descFr: 'Courbées à la forme du contour, prêtes à poser. Huit sachets, pour ne plus découper le ruban à la main.',
    descAr: 'مقوّسة حسب شكل مقدمة الرأس وجاهزة للتركيب. ثمانية أكياس، فما تحتاجين تقصّين الشريط بيدكِ.',
  },
  {
    id: 'acc20',
    image: '/images/accessoires/acc20.jpg',
    nameFr: 'Bandes de maintien silicone',
    nameAr: 'ربطات تثبيت بنقاط سيليكون',
    descFr: 'Picots en silicone à l’intérieur : la perruque reste en place toute la journée sans serrer le crâne.',
    descAr: 'نقاط سيليكون من الداخل: الباروكة تبقى ثابتة طول اليوم بدون ضغط على الرأس.',
  },
  {
    id: 'acc21',
    image: '/images/accessoires/acc21.jpg',
    nameFr: 'Shampoing colorant & shampoing violet',
    nameAr: 'شامبو ملوّن وشامبو بنفسجي',
    descFr: 'L’un ravive un brun qui a terni, l’autre annule les reflets jaunes d’un blond. À alterner avec votre shampoing habituel.',
    descAr: 'واحد ينعش البني الباهت، والثاني يلغي الاصفرار من الأشقر. استعمليهما بالتناوب مع شامبوكِ المعتاد.',
  },
  {
    id: 'acc22',
    image: '/images/accessoires/acc22.jpg',
    nameFr: 'Feuilles adhésives & toile de maintien',
    nameAr: 'شرائح لاصقة وشبكة تثبيت',
    descFr: 'Grandes feuilles à découper vous-même, pour les contours qui ne tombent pas sur un format standard.',
    descAr: 'شرائح كبيرة تقصّينها بنفسكِ، للحدود اللي ما تناسبها المقاسات الجاهزة.',
  },
  {
    id: 'acc23',
    image: '/images/accessoires/acc23.jpg',
    nameFr: 'Huile capillaire',
    nameAr: 'زيت الشعر',
    descFr: 'Argan, jojoba et vitamine E. Quelques gouttes sur les pointes : brillance et protection à la chaleur.',
    descAr: 'أرغان وجوجوبا وفيتامين E. قطرات على الأطراف: لمعان وحماية من الحرارة.',
  },
  {
    id: 'acc24',
    image: '/images/accessoires/acc24.jpg',
    nameFr: 'Masque capillaire',
    nameAr: 'ماسك الشعر',
    descFr: 'Réparation intensive pour une fibre sèche ou décolorée. À poser sur longueurs et pointes, pas sur les racines.',
    descAr: 'إصلاح مكثّف للشعر الجاف أو المصبوغ. يوضع على الأطوال والأطراف، لا على الجذور.',
  },
  {
    id: 'acc25',
    image: '/images/accessoires/acc25.jpg',
    nameFr: 'Barrettes perles & cristal',
    nameAr: 'مشابك لؤلؤ وكريستال',
    descFr: 'Pour un mariage ou une soirée : nœud en cristal et barrettes perlées, à poser sur un chignon ou un côté relevé.',
    descAr: 'لعرس أو سهرة: فيونكة كريستال ومشابك لؤلؤية، توضع على كعكة أو جانب مرفوع.',
  },
  {
    id: 'acc26',
    image: '/images/accessoires/acc26.jpg',
    nameFr: 'Pochettes en satin',
    nameAr: 'أكياس ساتان',
    descFr: 'Quatre pochettes pour séparer vos clips, vos barrettes et vos pièces courtes sans qu’elles s’emmêlent.',
    descAr: 'أربعة أكياس لفصل المشابك والقطع القصيرة حتى لا تتشابك.',
  },
  {
    id: 'acc27',
    image: '/images/accessoires/acc27.jpg',
    nameFr: 'Après-shampoing',
    nameAr: 'بلسم',
    descFr: 'Referme l’écaille après le shampoing : moins de nœuds, un coiffage plus facile, une longueur plus souple.',
    descAr: 'يغلق قشرة الشعرة بعد الشامبو: عقد أقل، وتصفيف أسهل، وأطوال أطرى.',
  },
  {
    id: 'acc28',
    image: '/images/accessoires/acc28.jpg',
    nameFr: 'Fixing Spray — fixateur de maquillage',
    nameAr: 'بخاخ تثبيت المكياج',
    descFr: 'Fixe le maquillage et le rafraîchit en cours de journée. Acide hyaluronique, eau de rose et vitamine E, fini naturel. 100 ml.',
    descAr: 'يثبّت المكياج وينعشه خلال اليوم. حمض الهيالورونيك وماء الورد وفيتامين E، بلمسة نهائية طبيعية. 100 مل.',
  },
  {
    id: 'acc29',
    image: '/images/accessoires/acc29.jpg',
    nameFr: 'Hair Spray — soin sans rinçage',
    nameAr: 'بخاخ الشعر — عناية بدون شطف',
    descFr: 'Nourrit, protège et fait briller sans alourdir. Huile d’argan, kératine et vitamine E. À vaporiser sur longueurs sèches ou humides. 100 ml.',
    descAr: 'يغذّي ويحمي ويمنح لمعاناً دون أن يثقّل. زيت أرغان وكيراتين وفيتامين E. يُرشّ على الأطوال الجافة أو الرطبة. 100 مل.',
  },
];

export default function Accessoires() {
  const { lang, isRTL } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const t = {
    overline: lang === 'fr' ? 'POSE, SOIN & RANGEMENT' : 'التركيب والعناية والحفظ',
    title: lang === 'fr' ? 'Accessoires' : 'إكسسوارات',
    intro: lang === 'fr'
      ? 'Tout ce qui entoure la pièce : ce qui la fixe, ce qui la retire, ce qui la lave, ce qui la range. Dites-nous ce qu’il vous faut, nous vous indiquons le prix avec votre commande.'
      : 'كل ما يحيط بالقطعة: ما يثبّتها، وما يفكّها، وما يغسلها، وما يحفظها. قولي لنا وش تحتاجين، ونعطيكِ السعر مع طلبكِ.',
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
