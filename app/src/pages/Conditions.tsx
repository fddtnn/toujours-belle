import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, ArrowLeft, AlertTriangle } from 'lucide-react';
import gsap from 'gsap';

interface ConditionSection {
  titleFr: string;
  titleAr: string;
  itemsFr: string[];
  itemsAr: string[];
}

const conditionsData: ConditionSection[] = [
  {
    titleFr: '1. Commande de Cheveux',
    titleAr: '1. طلب الشعر',
    itemsFr: [
      'Pour toute commande de cheveux, le client doit verser un acompte de 50% du montant total au moment de la commande.',
      'Le solde restant (50%) doit \u00eatre r\u00e9gl\u00e9 avant l\u2019exp\u00e9dition de la commande.',
      'En cas d\u2019annulation de la commande par le client, aucun remboursement ne sera effectu\u00e9, m\u00eame partiel. L\u2019acompte de 50% est conserv\u00e9 int\u00e9gralement.',
      'Aucune commande ne sera trait\u00e9e sans r\u00e9ception de l\u2019acompte.',
      'Les cheveux sont fabriqu\u00e9s sur commande et personnalis\u00e9s selon vos sp\u00e9cifications (type, couleur, longueur).',
    ],
    itemsAr: [
      'لأي طلب شعر، يجب على العميل دفع دفعة أولى بنسبة 50٪ من المبلغ الإجمالي وقت الطلب.',
      'يجب دفع المبلغ المتبقي (50٪) قبل شحن الطلب.',
      'في حال إلغاء الطلب من قبل العميلة، لن يتم استرداد أي مبلغ، حتى جزئيًا. تحتفظ الدفعة الأولى بنسبة 50٪ بالكامل.',
      'لن تتم معالجة أي طلب دون استلام الدفعة الأولى.',
      'يتم تصنيع الشعر حسب الطلب وتخصيصه وفقًا لمواصفاتكِ (النوع، اللون، الطول).',
    ],
  },
  {
    titleFr: '2. Services G\u00e9n\u00e9raux',
    titleAr: '2. الخدمات العامة',
    itemsFr: [
      'TOUS les services propos\u00e9s par Toujours Belle sont payants. Aucun service n\u2019est gratuit.',
      'Cela inclut, sans s\u2019y limiter : les consultations, les conseils personnalis\u00e9s, les estimations, les rendez-vous en salon, et tous les autres services associ\u00e9s.',
      'Les tarifs des services sont communiqu\u00e9s avant toute prestation et doivent \u00eatre r\u00e9gl\u00e9s avant ou au moment du service.',
      'Aucun service ne sera rendu sans paiement pr\u00e9alable ou simultan\u00e9.',
    ],
    itemsAr: [
      'جميع الخدمات التي تقدمها Toujours Belle مدفوعة. لا توجد خدمة مجانية.',
      'يتضمن ذلك، دون حصر: الاستشارات، والنصائح المخصصة، والتقديرات، والمواعيد في الصالون، وجميع الخدمات الأخرى المرتبطة.',
      'يتم إبلاغ أسعار الخدمات قبل أي خدمة ويجب دفعها قبل أو وقت الخدمة.',
      'لن يتم تقديم أي خدمة دون دفع مسبق أو متزامن.',
    ],
  },
  {
    titleFr: '3. Consultations',
    titleAr: '3. الاستشارات',
    itemsFr: [
      'Nous proposons des consultations personnalis\u00e9es sur demande pour vous accompagner dans le choix de vos cheveux.',
      'Les consultations NE SONT PAS gratuites. Un tarif de consultation s\u2019applique et doit \u00eatre r\u00e9gl\u00e9 avant ou au d\u00e9but de la consultation.',
      'La consultation couvre : l\u2019analyse de votre type de cheveux, le choix de la texture, la s\u00e9lection de la couleur, la d\u00e9termination de la longueur id\u00e9ale, et les conseils d\u2019entretien.',
      'En cas d\u2019annulation du rendez-vous de consultation moins de 24 heures \u00e0 l\u2019avance, le montant de la consultation n\u2019est pas rembours\u00e9.',
      'Le tarif de la consultation n\u2019est pas d\u00e9ductible du prix d\u2019achat de cheveux, sauf mention promotionnelle sp\u00e9cifique.',
    ],
    itemsAr: [
      'نقدم استشارات مخصصة عند الطلب لمرافقتكِ في اختيار شعركِ.',
      'الاستشارات ليست مجانية. يطبق رسم استشارة ويجب دفعه قبل أو في بداية الاستشارة.',
      'تغطي الاستشارة: تحليل نوع شعركِ، واختيار الملمس، واختيار اللون، وتحديد الطول المثالي، ونصائح العناية.',
      'في حال إلغاء موعد الاستشارة قبل أقل من 24 ساعة، لا يتم استرداد مبلغ الاستشارة.',
      'لا يتم خصم رسم الاستشارة من سعر شراء الشعر، ما لم يُذكر خلاف ذلك في عرض ترويجي محدد.',
    ],
  },
  {
    titleFr: '4. Livraison',
    titleAr: '4. التوصيل',
    itemsFr: [
      'Les d\u00e9lais de livraison sont de 2 \u00e0 5 jours ouvr\u00e9s en France m\u00e9tropolitaine.',
      'Pour les livraisons internationales, les d\u00e9lais sont de 5 \u00e0 10 jours ouvr\u00e9s selon la destination.',
      'Les frais de livraison sont \u00e0 la charge du client et sont communiqu\u00e9s au moment de la commande.',
      'Un num\u00e9ro de suivi est fourni d\u00e8s l\u2019exp\u00e9dition du colis.',
      'Toujours Belle n\u2019est pas responsable des retards caus\u00e9s par le transporteur ou les circonstances exceptionnelles.',
    ],
    itemsAr: [
      'مدة التوصيل من 2 إلى 5 أيام عمل في فرنسا Metropolitan.',
      'للتوصيل الدولي، المدة من 5 إلى 10 أيام عمل حسب الوجهة.',
      'رسوم التوصيل على عاتق العميلة ويتم إبلاغها وقت الطلب.',
      'يُقدم رقم تتبع فور شحن الطرد.',
      'لا تتحمل Toujours Belle المسؤولية عن التأخيرات الناجمة عن شركة النقل أو الظروف الاستثنائية.',
    ],
  },
  {
    titleFr: '5. Politique de Retour',
    titleAr: '5. سياسة الإرجاع',
    itemsFr: [
      'Pour des raisons d\u2019hygi\u00e8ne, les produits capillaires ne sont ni repris ni \u00e9chang\u00e9s une fois ouverts ou utilis\u00e9s.',
      'En cas de produit d\u00e9fectueux ou non conforme \u00e0 la commande, veuillez nous contacter sous 48 heures suivant la r\u00e9ception avec photos \u00e0 l\u2019appui.',
      'Aucun remboursement n\u2019est effectu\u00e9 pour les commandes annul\u00e9es par le client apr\u00e8s confirmation.',
      'Les articles doivent \u00eatre retourn\u00e9s dans leur emballage d\u2019origine, non ouverts et en parfait \u00e9tat pour tout \u00e9change autoris\u00e9.',
    ],
    itemsAr: [
      'لأسباب صحية، لا يتم استرجاع أو استبدال منتجات الشعر بمجرد فتحها أو استخدامها.',
      'في حال وجود منتج معيب أو لا يتوافق مع الطلب، يرجى التواصل معنا خلال 48 ساعة من الاستلام مع صور داعمة.',
      'لا يتم استرداد أي مبلغ للطلبات الملغاة من قبل العميلة بعد التأكيد.',
      'يجب إرجاع المنتجات في عبوتها الأصلية، غير مفتوحة، وفي حالة مثالية لأي استبدال مسموح به.',
    ],
  },
  {
    titleFr: '6. Paiement',
    titleAr: '6. الدفع',
    itemsFr: [
      'Nous acceptons les paiements par virement bancaire, carte bancaire et paiement mobile.',
      'Toutes les transactions sont s\u00e9curis\u00e9es et crypt\u00e9es.',
      'Le solde de commande doit \u00eatre r\u00e9gl\u00e9 dans un d\u00e9lai de 7 jours apr\u00e8s notification de disponibilit\u00e9, faute de quoi la commande sera annul\u00e9e et l\u2019acompte conserv\u00e9.',
    ],
    itemsAr: [
      'نقبل الدفع عن طريق التحويل البنكي، والبطاقة البنكية، والدفع عبر الهاتف المحمول.',
      'جميع المعاملات آمنة ومشفرة.',
      'يجب دفع رصيد الطلب خلال 7 أيام من إخطار التوفر، وإلا سيتم إلغاء الطلب والاحتفاظ بالدفعة الأولى.',
    ],
  },
  {
    titleFr: '7. Dispositions G\u00e9n\u00e9rales',
    titleAr: '7. الأحكام العامة',
    itemsFr: [
      'Toujours Belle se r\u00e9serve le droit de modifier ses conditions g\u00e9n\u00e9rales de vente \u00e0 tout moment.',
      'Les prix indiqu\u00e9s sont en euros (\u20ac) et peuvent \u00eatre modifi\u00e9s sans pr\u00e9avis.',
      'Tout litige relatif \u00e0 l\u2019interpr\u00e9tation ou l\u2019ex\u00e9cution des pr\u00e9sentes conditions sera soumis au tribunal comp\u00e9tent du ressort de notre si\u00e8ge social.',
      'En passant commande, le client accepte sans r\u00e9serve l\u2019int\u00e9gralit\u00e9 des pr\u00e9sentes conditions g\u00e9n\u00e9rales.',
    ],
    itemsAr: [
      'تحتفظ Toujours Belle بالحق في تعديل شروط البيع العامة في أي وقت.',
      'الأسعار المشار إليها باليورو (€) وقد تُعدل دون إشعار مسبق.',
      'أي نزاع يتعلق بتفسير أو تنفيذ هذه الشروط سيُحال إلى المحكمة المختصة في دائرة مقرنا الرئيسي.',
      'بتقديم الطلب، تقبل العميلة دون تحفظ الكامل لشروطنا العامة.',
    ],
  },
];

export default function Conditions() {
  const { lang, isRTL } = useLanguage();
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (pageRef.current) {
      gsap.fromTo(
        pageRef.current.querySelectorAll('.cond-animate'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.06 }
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
          <div className="cond-animate text-center mb-10">
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
              {lang === 'fr' ? 'INFORMATIONS L\u00c9GALES' : 'المعلومات القانونية'}
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
              {lang === 'fr' ? 'Conditions G\u00e9n\u00e9rales' : 'الشروط العامة'}
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
                ? 'Veuillez lire attentivement nos conditions avant de passer commande.'
                : 'يرجى قراءة شروطنا بعناية قبل تقديم الطلب.'}
            </p>
          </div>

          {/* Important Notice */}
          <div
            className="cond-animate flex items-start gap-3 p-4 rounded-lg mb-8"
            style={{
              backgroundColor: '#fff3e0',
              border: '1px solid #ffe0b2',
            }}
          >
            <AlertTriangle size={20} color="#e65100" className="flex-shrink-0 mt-0.5" />
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                color: '#bf360c',
                lineHeight: 1.6,
              }}
            >
              {lang === 'fr'
                ? 'Important : Tous nos services sont payants. Aucun service (consultation, conseil, estimation) n\u2019est gratuit. Les commandes de cheveux n\u00e9cessitent un acompte de 50% non remboursable.'
                : 'مهم: جميع خدماتنا مدفوعة. لا توجد خدمة (استشارة، نصيحة، تقدير) مجانية. تتطلب طلبات الشعر دفعة أولى بنسبة 50٪ غير قابلة للاسترداد.'}
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {conditionsData.map((section, idx) => (
              <div
                key={idx}
                className="cond-animate bg-white rounded-xl p-6 lg:p-8"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}
              >
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 400,
                    fontSize: '1.3rem',
                    color: 'var(--tb-text)',
                    marginBottom: '16px',
                  }}
                >
                  {lang === 'fr' ? section.titleFr : section.titleAr}
                </h2>
                <ul className="space-y-3">
                  {(lang === 'fr' ? section.itemsFr : section.itemsAr).map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3"
                      style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
                    >
                      <span
                        className="flex-shrink-0 mt-2 rounded-full"
                        style={{
                          width: '6px',
                          height: '6px',
                          backgroundColor: '#d4a5a5',
                        }}
                      />
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '14px',
                          lineHeight: 1.7,
                          color: '#4a4a4a',
                        }}
                      >
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="cond-animate text-center mt-10">
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                color: 'var(--tb-text-muted)',
                lineHeight: 1.6,
              }}
            >
              {lang === 'fr'
                ? 'Pour toute question concernant nos conditions g\u00e9n\u00e9rales, veuillez nous contacter \u00e0 contact@toujoursbelle.com'
                : 'لأي استفسار حول شروطنا العامة، يرجى التواصل معنا على contact@toujoursbelle.com'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
