import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { ChevronRight } from 'lucide-react';
import Footer from '../sections/Footer';

/* The policy describes what this site actually does, not a generic template:
   email-code sign-in, orders taken in the salon, an opt-in newsletter, and a
   virtual try-on that never sends a frame anywhere. */
const SECTIONS: { fr: string; ar: string; bodyFr: string[]; bodyAr: string[] }[] = [
  {
    fr: 'Qui nous sommes',
    ar: 'من نحن',
    bodyFr: [
      'Toujours Belle est un salon et une boutique de cheveux naturels, perruques, toppers et extensions. Ce site est édité par Toujours Belle, Tunis, Tunisie.',
      'Pour toute question sur vos données, écrivez-nous à contact@toujours-belle.com. Nous répondons dans un délai de 30 jours.',
    ],
    bodyAr: [
      'توجور بيل صالون ومتجر للشعر الطبيعي والباروكات والتوبرز والإكستنشن. هذا الموقع تديره توجور بيل، تونس.',
      'لأي سؤال عن بياناتكِ، راسلينا على contact@toujours-belle.com. نرد خلال 30 يوماً كحد أقصى.',
    ],
  },
  {
    fr: 'Les données que nous collectons',
    ar: 'البيانات التي نجمعها',
    bodyFr: [
      'Votre adresse email, lorsque vous vous connectez. La connexion se fait sans mot de passe : nous vous envoyons un code à 6 chiffres par email, et c’est tout ce dont nous avons besoin.',
      'Votre prénom, si vous le renseignez lors de la création de votre compte.',
      'Les informations nécessaires à une commande : nom, téléphone, adresse de livraison, et le détail de ce que vous commandez.',
      'Les messages que vous nous envoyez, par email ou via WhatsApp.',
      'Votre accord explicite, si vous cochez « M’envoyer des nouvelles et des offres ». Cette case est décochée par défaut.',
    ],
    bodyAr: [
      'بريدكِ الإلكتروني عند تسجيل الدخول. الدخول بدون كلمة مرور: نرسل لكِ رمزاً من 6 أرقام على بريدكِ، وهذا كل ما نحتاجه.',
      'اسمكِ الأول، إذا أدخلتِه عند إنشاء الحساب.',
      'المعلومات اللازمة للطلب: الاسم، الهاتف، عنوان التوصيل، وتفاصيل ما تطلبينه.',
      'الرسائل التي ترسلينها لنا، بالبريد أو عبر واتساب.',
      'موافقتكِ الصريحة، إذا فعّلتِ خيار «أرسلي لي الأخبار والعروض». هذا الخيار غير مفعّل افتراضياً.',
    ],
  },
  {
    fr: 'L’essayage virtuel ne quitte pas votre appareil',
    ar: 'التجربة الافتراضية لا تغادر جهازكِ',
    bodyFr: [
      'La page « Essayage IA » utilise la caméra de votre appareil, ou une photo que vous choisissez, pour poser une perruque à l’image.',
      'Tout le traitement se fait dans votre navigateur. Aucune image, aucune vidéo et aucune mesure de votre visage n’est envoyée à nos serveurs, ni enregistrée, ni partagée. Fermez la page et il n’en reste rien.',
      'Votre navigateur vous demande l’autorisation avant d’activer la caméra, et vous pouvez la retirer à tout moment dans ses réglages.',
    ],
    bodyAr: [
      'صفحة «التجربة الافتراضية» تستخدم كاميرا جهازكِ، أو صورة تختارينها، لتركيب الباروكة على الصورة.',
      'كل المعالجة تتم داخل متصفحكِ. لا تُرسَل أي صورة أو فيديو أو قياسات لوجهكِ إلى خوادمنا، ولا تُحفَظ، ولا تُشارَك. بمجرد إغلاق الصفحة لا يبقى منها شيء.',
      'متصفحكِ يطلب إذنكِ قبل تشغيل الكاميرا، ويمكنكِ سحب الإذن في أي وقت من إعداداته.',
    ],
  },
  {
    fr: 'Pourquoi nous utilisons ces données',
    ar: 'لماذا نستخدم هذه البيانات',
    bodyFr: [
      'Pour vous identifier quand vous vous connectez et vous permettre de retrouver vos commandes.',
      'Pour préparer, confirmer et livrer ce que vous commandez, et pour vous répondre quand vous nous écrivez.',
      'Pour vous envoyer nos nouveautés et nos offres, uniquement si vous l’avez demandé. Chaque email contient un lien de désinscription.',
      'Pour respecter nos obligations comptables et légales.',
      'Nous ne vendons vos données à personne, et nous ne les utilisons pas pour de la publicité ciblée.',
    ],
    bodyAr: [
      'للتعرّف عليكِ عند تسجيل الدخول وتمكينكِ من متابعة طلباتكِ.',
      'لتحضير وتأكيد وتوصيل ما تطلبينه، وللرد عليكِ عندما تراسلينا.',
      'لإرسال جديدنا وعروضنا، فقط إذا طلبتِ ذلك. كل رسالة تحتوي على رابط لإلغاء الاشتراك.',
      'للالتزام بواجباتنا المحاسبية والقانونية.',
      'لا نبيع بياناتكِ لأي جهة، ولا نستخدمها لإعلانات موجّهة.',
    ],
  },
  {
    fr: 'Cookies et stockage local',
    ar: 'الكوكيز والتخزين المحلي',
    bodyFr: [
      'Un cookie de session est déposé après votre connexion, pour vous garder connectée. Il est strictement nécessaire au fonctionnement du compte et ne sert à rien d’autre.',
      'Votre choix de thème (clair ou sombre) et de langue est enregistré dans votre navigateur, sur votre appareil uniquement. Ces informations ne nous parviennent jamais.',
      'Vous pouvez effacer ces éléments à tout moment en vidant les données de site dans votre navigateur.',
    ],
    bodyAr: [
      'يُحفَظ كوكي جلسة بعد تسجيل الدخول لإبقائكِ مسجّلة. هو ضروري لعمل الحساب فقط ولا يُستخدَم لغير ذلك.',
      'اختياركِ للوضع (فاتح أو ليلي) وللغة يُحفَظ داخل متصفحكِ على جهازكِ فقط. هذه المعلومات لا تصلنا أبداً.',
      'يمكنكِ مسح هذه العناصر في أي وقت بحذف بيانات الموقع من متصفحكِ.',
    ],
  },
  {
    fr: 'Avec qui elles sont partagées',
    ar: 'مع من تُشارَك',
    bodyFr: [
      'Avec notre prestataire d’envoi d’emails, pour vous transmettre votre code de connexion et, le cas échéant, nos newsletters.',
      'Avec le transporteur chargé de votre livraison, pour l’adresse et le contact nécessaires.',
      'Avec les autorités compétentes, si la loi nous y oblige.',
      'Ces prestataires n’ont accès qu’à ce qui leur est nécessaire, et n’ont pas le droit d’utiliser vos données pour leur propre compte.',
    ],
    bodyAr: [
      'مع مزوّد خدمة البريد الإلكتروني، لإيصال رمز الدخول ونشراتنا البريدية عند الاقتضاء.',
      'مع شركة التوصيل المكلّفة بطلبكِ، للعنوان ومعلومات التواصل اللازمة.',
      'مع الجهات المختصة، إذا ألزمنا القانون بذلك.',
      'هؤلاء المزوّدون لا يطّلعون إلا على ما يلزمهم، ولا يحق لهم استخدام بياناتكِ لحسابهم الخاص.',
    ],
  },
  {
    fr: 'Combien de temps nous les gardons',
    ar: 'مدة الاحتفاظ',
    bodyFr: [
      'Les codes de connexion expirent au bout de quelques minutes et sont supprimés après usage.',
      'Les données de votre compte sont conservées tant que le compte existe. Demandez-nous sa suppression et nous l’effaçons.',
      'Les documents liés aux commandes sont conservés le temps imposé par la réglementation comptable.',
      'Votre inscription à la newsletter est conservée jusqu’à votre désinscription.',
    ],
    bodyAr: [
      'رموز الدخول تنتهي خلال دقائق وتُحذَف بعد استخدامها.',
      'بيانات حسابكِ تبقى ما بقي الحساب. اطلبي حذفه ونحذفه.',
      'مستندات الطلبات تُحفَظ للمدة التي تفرضها الأنظمة المحاسبية.',
      'اشتراككِ في النشرة البريدية يبقى حتى تلغينه.',
    ],
  },
  {
    fr: 'Vos droits',
    ar: 'حقوقكِ',
    bodyFr: [
      'Vous pouvez demander une copie des données que nous détenons sur vous, les faire corriger, ou en demander la suppression.',
      'Vous pouvez retirer votre consentement à la newsletter à tout moment, sans que cela affecte vos commandes.',
      'Vous pouvez vous opposer à un traitement ou en demander la limitation.',
      'Une seule adresse pour tout cela : contact@toujours-belle.com.',
    ],
    bodyAr: [
      'يمكنكِ طلب نسخة من بياناتكِ لدينا، أو تصحيحها، أو طلب حذفها.',
      'يمكنكِ سحب موافقتكِ على النشرة البريدية في أي وقت، دون أن يؤثر ذلك على طلباتكِ.',
      'يمكنكِ الاعتراض على معالجة معيّنة أو طلب تقييدها.',
      'عنوان واحد لكل ذلك: contact@toujours-belle.com.',
    ],
  },
  {
    fr: 'Sécurité',
    ar: 'الأمان',
    bodyFr: [
      'Le site est servi en HTTPS. Le cookie de session est signé et inaccessible au code JavaScript de la page.',
      'Nous ne vous demanderons jamais votre mot de passe bancaire, ni le code de connexion par téléphone ou par message. Si quelqu’un vous le demande en notre nom, ce n’est pas nous.',
    ],
    bodyAr: [
      'الموقع يعمل عبر HTTPS. وكوكي الجلسة موقّع ولا يمكن لأكواد الصفحة الوصول إليه.',
      'لن نطلب منكِ أبداً كلمة مرور بنكية، ولا رمز الدخول عبر الهاتف أو الرسائل. إذا طلبه أحد باسمنا، فهو ليس نحن.',
    ],
  },
  {
    fr: 'Mineurs',
    ar: 'القاصرات',
    bodyFr: [
      'Ce site n’est pas destiné aux personnes de moins de 16 ans et nous ne collectons pas sciemment leurs données. Si c’était le cas, écrivez-nous et nous les supprimerons.',
    ],
    bodyAr: [
      'هذا الموقع غير موجّه لمن هنّ دون 16 سنة، ولا نجمع بياناتهنّ عن قصد. إذا حدث ذلك، راسلينا ونحذفها.',
    ],
  },
  {
    fr: 'Modifications de cette politique',
    ar: 'تعديلات هذه السياسة',
    bodyFr: [
      'Si nous modifions cette politique, la date ci-dessous change. Les modifications importantes vous seront signalées sur le site.',
    ],
    bodyAr: [
      'إذا عدّلنا هذه السياسة، يتغيّر التاريخ المذكور أدناه. وأي تعديل جوهري سننبّه إليه داخل الموقع.',
    ],
  },
];

const UPDATED_FR = 'Dernière mise à jour : 13 octobre 2026';
const UPDATED_AR = 'آخر تحديث: 13 أكتوبر 2026';

export default function Privacy() {
  const { lang, isRTL } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ backgroundColor: 'var(--tb-bg)', minHeight: '100vh' }}>
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-2">
        <div className="flex items-center gap-2 text-xs flex-wrap" style={{ color: 'var(--tb-text-muted)' }}>
          <button onClick={() => navigate('/')} className="hover:text-[#d4a5a5] transition-colors">
            {lang === 'fr' ? 'Home' : 'الرئيسية'}
          </button>
          <ChevronRight size={12} style={{ transform: isRTL ? 'rotate(180deg)' : undefined }} />
          <span style={{ color: 'var(--tb-text)' }}>
            {lang === 'fr' ? 'Confidentialité' : 'الخصوصية'}
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-8 pb-6">
        <p
          style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '11px',
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'var(--tb-accent-text)', marginBottom: '12px',
          }}
        >
          {lang === 'fr' ? 'VOS DONNÉES' : 'بياناتكِ'}
        </p>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4.2vw, 3.2rem)',
            fontWeight: 400, color: 'var(--tb-text)', lineHeight: 1.15, marginBottom: '16px',
          }}
        >
          {lang === 'fr' ? 'Politique de confidentialité' : 'سياسة الخصوصية'}
        </h1>
        <p
          style={{
            fontFamily: "'Inter', sans-serif", fontSize: '16px', lineHeight: 1.7,
            color: 'var(--tb-text-secondary)', maxWidth: '62ch',
          }}
        >
          {lang === 'fr'
            ? 'Ce que nous collectons, pourquoi, et ce que nous ne faisons pas. Écrit en clair, sans formules creuses.'
            : 'ما الذي نجمعه، ولماذا، وما الذي لا نفعله. مكتوبة بوضوح وبدون عبارات فارغة.'}
        </p>
      </div>

      <div
        className="max-w-4xl mx-auto px-6 pb-20"
        style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', lineHeight: 1.8 }}
      >
        <div className="space-y-10">
          {SECTIONS.map((sec, i) => (
            <section key={i}>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 500,
                  color: 'var(--tb-text)', marginBottom: '12px',
                }}
              >
                {lang === 'fr' ? sec.fr : sec.ar}
              </h2>
              <ul className="space-y-3">
                {(lang === 'fr' ? sec.bodyFr : sec.bodyAr).map((line, j) => (
                  <li key={j} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="shrink-0"
                      style={{
                        width: '5px', height: '5px', borderRadius: '50%',
                        backgroundColor: 'var(--tb-accent-text)', marginTop: '11px',
                      }}
                    />
                    <span style={{ color: 'var(--tb-text-secondary)' }}>{line}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p
          className="mt-14 pt-6"
          style={{
            borderTop: '1px solid var(--tb-border)',
            fontSize: '13px', color: 'var(--tb-text-muted)',
          }}
        >
          {lang === 'fr' ? UPDATED_FR : UPDATED_AR} · www.toujours-belle.com
        </p>
      </div>

      <Footer />
    </div>
  );
}
