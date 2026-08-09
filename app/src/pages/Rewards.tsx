import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import {
  Star, Heart, UserPlus, ShoppingBag, Calendar, MessageSquare,
  Check, Mail, FileText, Instagram, Facebook
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const waysToEarn = [
  { icon: FileText, points: '100', labelFr: 'Lire notre blog', labelAr: 'اقرأ مدونتنا' },
  { icon: Instagram, points: '100', labelFr: 'Suivez-nous sur Instagram', labelAr: 'تابعنا على انستغرام' },
  { icon: Facebook, points: '100', labelFr: 'Suivez-nous sur Facebook', labelAr: 'تابعنا على فيسبوك' },
  { icon: ShoppingBag, points: '200', labelFr: 'Après votre premier achat', labelAr: 'بعد أول عملية شراء' },
  { icon: Calendar, points: '500', labelFr: 'Célébrez votre anniversaire', labelAr: 'احتفل بعيد ميلادك' },
  { icon: MessageSquare, points: '300', labelFr: 'Écrivez un avis produit', labelAr: 'اكتب تقييم منتج' },
  { icon: Star, points: '1', labelFr: 'Par 1 TND dépensé', labelAr: ' por كل 1 TND' },
  { icon: UserPlus, points: '45', labelFr: 'Parrainez une amie', labelAr: 'أحيلي صديقة' },
  { icon: Heart, points: '500', labelFr: 'Récompense anniversaire', labelAr: 'مكافأة الذكرى' },
];

interface Tier {
  name: string;
  nameAr: string;
  requirement: string;
  requirementAr: string;
  img: string;
  benefits: string[];
  benefitsAr: string[];
}

const tiers: Tier[] = [
  {
    name: 'Membre',
    nameAr: 'عضو',
    requirement: 'Pour celles qui commencent',
    requirementAr: 'لمن تبدأ رحلتها',
    img: '/images/tier-membre.jpg',
    benefits: [
      'Gagnez 1 point par 1 TND',
      '200 points après premier achat',
      '500 points anniversaire',
      '500 points de fidélité',
      '15 TND de récompense parrainage',
    ],
    benefitsAr: [
      '1 نقطة por كل 1 TND',
      '200 نقطة بعد أول عملية شراء',
      '500 نقطة عيد ميلاد',
      '500 نقطة ولاء',
      '15 TND مكافأة إحالة',
    ],
  },
  {
    name: 'Insider',
    nameAr: 'داخلية',
    requirement: 'Dépensez 400 TND',
    requirementAr: 'أنفقي 400 TND',
    img: '/images/tier-insider.jpg',
    benefits: [
      'Gagnez 1.25 point par 1 TND',
      '500 points de récompense',
      '625 points anniversaire',
      '500 points de fidélité',
      '15 TND de récompense parrainage',
    ],
    benefitsAr: [
      '1.25 نقطة por كل 1 TND',
      '500 نقطة مكافأة',
      '625 نقطة عيد ميلاد',
      '500 نقطة ولاء',
      '15 TND مكافأة إحالة',
    ],
  },
  {
    name: 'Icône',
    nameAr: 'أيقونة',
    requirement: 'Dépensez 1000 TND',
    requirementAr: 'أنفقي 1000 TND',
    img: '/images/tier-icone.jpg',
    benefits: [
      'Gagnez 1.5 point par 1 TND',
      '750 points de récompense',
      '750 points anniversaire',
      '500 points de fidélité',
      '15 TND de récompense parrainage',
    ],
    benefitsAr: [
      '1.5 نقطة por كل 1 TND',
      '750 نقطة مكافأة',
      '750 نقطة عيد ميلاد',
      '500 نقطة ولاء',
      '15 TND مكافأة إحالة',
    ],
  },
  {
    name: 'Cercle Privé',
    nameAr: 'الدائرة الخاصة',
    requirement: 'Dépensez 2000 TND',
    requirementAr: 'أنفقي 2000 TND',
    img: '/images/tier-cercle.jpg',
    benefits: [
      'Gagnez 2 points par 1 TND',
      '1000 points de récompense',
      '1000 points anniversaire',
      'Livraison express gratuite',
      '15 TND de récompense parrainage',
    ],
    benefitsAr: [
      'نقطتان por كل 1 TND',
      '1000 نقطة مكافأة',
      '1000 نقطة عيد ميلاد',
      'توصيل سريع مجاني',
      '15 TND مكافأة إحالة',
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function Rewards() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.rewards-reveal').forEach((el) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          }
        );
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const t = {
    heroTitle: lang === 'fr' ? 'Toujours Belle Rewards' : 'مكافآت توجور بيل',
    heroSubtitle: lang === 'fr'
      ? 'De magnifiques cheveux, des récompenses encore plus belles. Profitez d\'avantages exclusifs à chaque achat !'
      : 'شعر رائع، مكافآت أجمل. استمتعي بمزايا حصرية مع كل عملية شراء!',
    join: lang === 'fr' ? 'Rejoindre' : 'انضمي',
    signIn: lang === 'fr' ? 'Connexion' : 'تسجيل الدخول',
    howItWorks: lang === 'fr' ? 'Comment ça marche' : 'كيف يعمل',
    step1: lang === 'fr' ? 'Rejoignez le club : Créez un compte et commencez à cumuler' : 'انضمي إلى النادي: أنشئي حساباً وابدئي بالتجميع',
    step2: lang === 'fr' ? 'Gagnez des points à votre façon : Achetez, célébrez votre anniversaire, parrainez une amie et plus' : 'اكسبي النقاط بطريقتك: تسوقي، احتفلي بعيد ميلادك، أحيلي صديقة وأكثر',
    step3: lang === 'fr' ? 'Débloquez des avantages exclusifs : Plus vous dépensez, plus vous montez en grade — meilleurs sont les avantages' : 'افتحي مزايا حصرية: كلما أنفقت أكثر، ارتفع مستواكِ — وتحسنت المكافآت',
    usePoints: lang === 'fr' ? 'Comment utiliser vos points' : 'كيف تستخدمين نقاطك',
    pointsEq: lang === 'fr' ? '100 POINTS = 1 TND' : '100 نقطة = 1 TND',
    redeemDesc: lang === 'fr'
      ? 'Utiliser vos points est facile ! Connectez-vous et choisissez une récompense éligible au moment de payer.'
      : 'استخدام نقاطك سهل! سجلي الدخول واختي مكافأة مؤهلة عند الدفع.',
    redeemBtn: lang === 'fr' ? 'Utiliser mes points' : 'استبدلي نقاطك',
    earnPoints: lang === 'fr' ? 'Façons de gagner des points' : 'طرق كسب النقاط',
    vipTitle: lang === 'fr' ? 'Niveaux VIP' : 'مستويات النخبة',
    vipSubtitle: lang === 'fr' ? 'Plus vous dépensez, plus vous montez en grade' : 'كلما أنفقت أكثر، ارتفع مستواكِ',
    referTitle: lang === 'fr' ? 'Parrainez une amie' : 'أحيلي صديقة',
    referGiveGet: lang === 'fr' ? 'OFFREZ 45 TND, RECEVEZ 45 TND' : 'أعطي 45 TND، احصلي على 45 TND',
    referDesc: lang === 'fr'
      ? 'Partagez votre lien, elle obtient 45 TND de réduction sur sa première commande. Vous recevez 45 TND de récompense lorsqu\'elle achète.'
      : 'شاركي رابطك، تحصل صديقتك على خصم 45 TND على أول طلب. تحصلي على 45 TND مكافأة عند شرائها.',
    newsletter: lang === 'fr'
      ? 'Profitez d\'une remise exclusive + rejoignez la communauté Toujours Belle !'
      : 'احصلي على خصم حصري + انضمي إلى مجتمع توجور بيل!',
    emailPlaceholder: lang === 'fr' ? 'Votre adresse e-mail' : 'عنوان بريدك الإلكتروني',
    signUp: lang === 'fr' ? 'M\'inscrire' : 'سجلي',
  };

  return (
    <div ref={pageRef} style={{ backgroundColor: 'var(--tb-bg)' }}>
      {/* ========== HERO BANNER ========== */}
      <section
        className="relative flex items-center justify-center text-center"
        style={{
          minHeight: '480px',
          background: `linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%), url('/images/rewards-banner.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          padding: '120px 24px 80px',
        }}
      >
        <div className="rewards-reveal max-w-3xl mx-auto" style={{ position: 'relative', zIndex: 2 }}>
          <p
            className="uppercase tracking-widest mb-4"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#c8adad', fontWeight: 600, letterSpacing: '0.2em' }}
          >
            {lang === 'fr' ? 'PROGRAMME DE FIDÉLITÉ' : 'برنامج الولاء'}
          </p>
          <h1
            className="mb-6"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 6vw, 64px)', color: '#ffffff', fontWeight: 400, lineHeight: 1.1, textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
          >
            {t.heroTitle}
          </h1>
          <p
            className="mb-10 max-w-xl mx-auto"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: '17px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, textShadow: '0 1px 10px rgba(0,0,0,0.3)' }}
          >
            {t.heroSubtitle}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button
              className="px-10 py-3.5 text-white transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
              style={{ backgroundColor: '#c8adad', fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 500, letterSpacing: '0.05em' }}
            >
              {t.join}
            </button>
            <button
              className="px-10 py-3.5 transition-all duration-300 hover:-translate-y-0.5"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.5)', color: '#ffffff', fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 500, letterSpacing: '0.05em', backdropFilter: 'blur(4px)' }}
            >
              {t.signIn}
            </button>
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section style={{ backgroundColor: '#c8adad', padding: '36px 24px' }}>
        <h2
          className="text-center mb-12 rewards-reveal"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 40px)', color: 'var(--tb-bg-secondary)', fontWeight: 400 }}
        >
          {t.howItWorks}
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {[
            { num: '01.', text: t.step1 },
            { num: '02.', text: t.step2 },
            { num: '03.', text: t.step3 },
          ].map((step) => (
            <div key={step.num} className="rewards-reveal text-center">
              <p
                className="mb-3"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: '40px', color: 'var(--tb-bg-secondary)', fontWeight: 300, lineHeight: 1 }}
              >
                {step.num}
              </p>
              <p
                style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--tb-bg-secondary)', lineHeight: 1.7, opacity: 0.95 }}
              >
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== HOW TO USE POINTS ========== */}
      <section style={{ padding: '80px 24px' }}>
        <div className="max-w-6xl mx-auto">
          <h2
            className="rewards-reveal mb-2"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 40px)', color: 'var(--tb-text)', fontWeight: 400 }}
          >
            {t.usePoints}
          </h2>

          <div className="rewards-reveal inline-block mb-6" style={{ backgroundColor: '#c8adad', padding: '8px 18px' }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--tb-bg-secondary)', fontWeight: 600, letterSpacing: '0.1em' }}>
              {t.pointsEq}
            </p>
          </div>

          <p
            className="rewards-reveal mb-12"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#5a5a5a', lineHeight: 1.7 }}
          >
            {t.redeemDesc}
          </p>

          <div className="rewards-reveal mb-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 items-center">
              {[
                '/images/reward-2.png',
                '/images/reward-3.png',
                '/images/reward-4.png',
                '/images/reward-5.png',
              ].map((src, idx) => (
                <div key={idx} className="flex items-center justify-center" style={{ minHeight: '120px' }}>
                  <img
                    src={src}
                    alt={`Reward ${idx + 1}`}
                    className="object-contain"
                    style={{ maxHeight: '140px', width: 'auto', display: 'block' }}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="rewards-reveal text-center">
            <button
              className="px-12 py-4 text-white transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: 'var(--tb-text)', fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 500, letterSpacing: '0.05em' }}
            >
              {t.redeemBtn}
            </button>
          </div>
        </div>
      </section>

      {/* ========== WAYS TO EARN ========== */}
      <section style={{ backgroundColor: '#c8adad', padding: '60px 24px' }}>
        <h2
          className="rewards-reveal text-center mb-14"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 40px)', color: 'var(--tb-bg-secondary)', fontWeight: 400 }}
        >
          {t.earnPoints}
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
          {waysToEarn.map((way, idx) => {
            const Icon = way.icon;
            return (
              <div key={idx} className="rewards-reveal text-center">
                <div
                  className="w-14 h-14 mx-auto mb-4 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                >
                  <Icon size={24} color="var(--tb-bg-secondary)" />
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--tb-bg-secondary)', fontWeight: 600, marginBottom: '4px' }}>
                  {way.points} {lang === 'fr' ? (way.points === '1' ? 'Point' : 'Points') : 'نقطة'}
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>
                  {lang === 'fr' ? way.labelFr : way.labelAr}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========== VIP TIERS ========== */}
      <section style={{ padding: '80px 24px' }}>
        <div className="max-w-7xl mx-auto">
          <h2
            className="rewards-reveal text-center mb-3"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 5vw, 48px)', color: 'var(--tb-text)', fontWeight: 400, fontStyle: 'italic' }}
          >
            {t.vipTitle}
          </h2>
          <p
            className="rewards-reveal text-center mb-14"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--tb-text-muted)' }}
          >
            {t.vipSubtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className="rewards-reveal overflow-hidden"
                style={{ backgroundColor: 'var(--tb-bg-secondary)', borderRadius: '12px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
              >
                {/* Tier Header Image */}
                <div className="relative flex flex-col items-center justify-end text-center overflow-hidden" style={{ height: '260px' }}>
                  <img
                    src={tier.img}
                    alt={tier.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 100%)' }} />
                  <div
                    className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#c8adad' }}
                  >
                    <Star size={18} color="var(--tb-bg-secondary)" fill="var(--tb-bg-secondary)" />
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', color: 'var(--tb-bg-secondary)', fontWeight: 400, marginBottom: '2px' }}>
                    Toujours Belle {tier.name}
                  </h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.85)' }}>
                    {lang === 'fr' ? tier.requirement : tier.requirementAr}
                  </p>
                </div>

                {/* Benefits */}
                <div style={{ padding: '20px 0' }}>
                  {(lang === 'fr' ? tier.benefits : tier.benefitsAr).map((b, bIdx) => (
                    <div
                      key={bIdx}
                      className="flex items-center gap-3"
                      style={{
                        padding: '12px 20px',
                        borderBottom: bIdx < tier.benefits.length - 1 ? '1px solid var(--tb-border)' : 'none',
                      }}
                    >
                      <Check size={16} color="#c8adad" strokeWidth={3} />
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#4a4a4a', lineHeight: 1.5 }}>
                        {b}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== REFER A FRIEND ========== */}
      <section style={{ backgroundColor: '#f0e6e0', padding: '80px 24px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rewards-reveal">
              <p
                className="mb-2"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: '#8a5a5a', fontWeight: 500, fontStyle: 'italic' }}
              >
                {t.referTitle}
              </p>
              <h3
                className="mb-5"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(24px, 3.5vw, 36px)', color: '#8a5a5a', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.2 }}
              >
                {t.referGiveGet}
              </h3>
              <p
                className="mb-8"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#3a3a3a', lineHeight: 1.7 }}
              >
                {t.referDesc}
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <button
                  className="px-8 py-3 text-white transition-all duration-300 hover:opacity-90"
                  style={{ backgroundColor: '#c8adad', fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 500 }}
                >
                  {t.join}
                </button>
                <button
                  className="px-8 py-3 transition-all duration-300"
                  style={{ backgroundColor: 'transparent', border: '2px solid var(--tb-text)', color: 'var(--tb-text)', fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 500 }}
                >
                  {t.signIn}
                </button>
              </div>
            </div>

            <div className="rewards-reveal flex items-center justify-center">
              <img
                src="/images/refer-friend.jpg"
                alt="Refer a friend"
                className="w-full max-w-md rounded-2xl"
                style={{ objectFit: 'contain', maxHeight: '580px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== NEWSLETTER ========== */}
      <section style={{ padding: '60px 24px', borderTop: '1px solid var(--tb-border)' }}>
        <div className="rewards-reveal max-w-xl mx-auto text-center">
          <p
            className="mb-6"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#5a5a5a' }}
          >
            {t.newsletter}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail size={18} color="var(--tb-text-muted)" className="absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                className="w-full rounded-lg"
                style={{
                  padding: '14px 16px 14px 44px',
                  border: '1px solid #e0d0d0',
                  backgroundColor: 'var(--tb-bg-secondary)',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  color: 'var(--tb-text)',
                  outline: 'none',
                }}
              />
            </div>
            <button
              className="px-8 py-3.5 text-white transition-all duration-300 hover:opacity-90 whitespace-nowrap"
              style={{ backgroundColor: '#c8adad', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}
            >
              {t.signUp}
            </button>
          </div>
        </div>
      </section>

      {/* ========== INFORMATIONS RÉCOMPENSES ========== */}
      <section style={{ padding: '60px 24px', borderTop: '1px solid var(--tb-border)' }}>
        <div className="max-w-5xl mx-auto">
          <h2
            className="rewards-reveal text-center mb-12"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 3.5vw, 36px)', color: 'var(--tb-text)', fontWeight: 400 }}
          >
            {lang === 'fr' ? 'Informations Récompenses' : 'معلومات المكافآت'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Comment ça marche */}
            <div className="rewards-reveal">
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', color: 'var(--tb-text)', marginBottom: '12px' }}>
                {lang === 'fr' ? 'Comment fonctionne le programme ?' : 'كيف يعمل البرنامج؟'}
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--tb-text-secondary)', lineHeight: 1.7 }}>
                {lang === 'fr'
                  ? 'Notre programme de fidélité vous permet de cumuler des points à chaque achat. 100 points = 1 TND de réduction. Vous pouvez également gagner des points en célébrant votre anniversaire, en parrainant une amie, en écrivant un avis ou en nous suivant sur les réseaux sociaux.'
                  : 'يتيح لك برنامج الولاء تجميع النقاط مع كل عملية شراء. 100 نقطة = 1 TND خصم. يمكنك أيضًا كسب النقاط بالاحتفال بعيد ميلادك، وإحالة صديقة، وكتابة تقييم، أو متابعتنا على وسائل التواصل الاجتماعي.'}
              </p>
            </div>

            {/* Utiliser les points */}
            <div className="rewards-reveal">
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', color: 'var(--tb-text)', marginBottom: '12px' }}>
                {lang === 'fr' ? 'Comment utiliser mes points ?' : 'كيف أستخدم نقاطي؟'}
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--tb-text-secondary)', lineHeight: 1.7 }}>
                {lang === 'fr'
                  ? 'Connectez-vous à votre compte et choisissez une récompense éligible au moment de payer. Vous pouvez échanger vos points contre des réductions de 15 TND, 30 TND, 45 TND ou 60 TND selon le nombre de points cumulés.'
                  : 'سجلي الدخول إلى حسابك واختي مكافأة مؤهلة عند الدفع. يمكنك استبدال نقاطك بخصومات 15 TND أو 30 TND أو 45 TND أو 60 TND حسب عدد النقاط المجمعة.'}
              </p>
            </div>

            {/* Niveaux VIP */}
            <div className="rewards-reveal">
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', color: 'var(--tb-text)', marginBottom: '12px' }}>
                {lang === 'fr' ? 'Les niveaux VIP' : 'مستويات النخبة'}
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--tb-text-secondary)', lineHeight: 1.7 }}>
                {lang === 'fr'
                  ? 'Plus vous dépensez, plus vous montez en grade ! Du niveau Membre au Cercle Privé, chaque palier débloque des avantages exclusifs : plus de points par TND dépensé, des récompenses anniversaire plus importantes et la livraison express gratuite pour nos clientes les plus fidèles.'
                  : 'كلما أنفقت أكثر، ارتفع مستواكِ! من مستوى العضو إلى الدائرة الخاصة، يفتح كل مستوى مزايا حصرية: نقاط أكثر por كل TND، مكافآت عيد ميلاد أكبر، وتوصيل سريع مجاني لعملائنا الأكثر ولاءً.'}
              </p>
            </div>

            {/* Parrainage */}
            <div className="rewards-reveal">
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', color: 'var(--tb-text)', marginBottom: '12px' }}>
                {lang === 'fr' ? 'Parrainez une amie' : 'أحيلي صديقة'}
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--tb-text-secondary)', lineHeight: 1.7 }}>
                {lang === 'fr'
                  ? 'Partagez votre lien de parrainage avec une amie. Elle reçoit 45 TND de réduction sur sa première commande, et vous recevez 45 TND de récompense dès qu\'elle effectue son achat. C\'est gagnant-gagnant !'
                  : 'شاركي رابط الإحالة مع صديقة. تحصل على خصم 45 TND على أول طلب، وتحصلين على 45 TND مكافأة بمجرد قيامها بالشراء. إنه ربح مزدوج!'}
              </p>
            </div>

            {/* Conditions */}
            <div className="rewards-reveal">
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', color: 'var(--tb-text)', marginBottom: '12px' }}>
                {lang === 'fr' ? 'Conditions générales' : 'الشروط العامة'}
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--tb-text-secondary)', lineHeight: 1.7 }}>
                {lang === 'fr'
                  ? 'Les points sont valables pendant 12 mois à compter de leur date d\'attribution. Les récompenses ne sont pas cumulables avec d\'autres offres promotionnelles. Un compte client est nécessaire pour cumuler et utiliser des points. Toujours Belle se réserve le droit de modifier le programme à tout moment.'
                  : 'النقاط صالحة لمدة 12 شهرًا من تاريخ الحصول عليها. المكافآت غير قابلة للجمع مع عروض ترويجية أخرى. يُشترط وجود حساب عميل لتجميع واستخدام النقاط. تحتفظ Toujours Belle بالحق في تعديل البرنامج في أي وقت.'}
              </p>
            </div>

            {/* Contact */}
            <div className="rewards-reveal">
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', color: 'var(--tb-text)', marginBottom: '12px' }}>
                {lang === 'fr' ? 'Une question ?' : 'هل لديكِ سؤال؟'}
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--tb-text-secondary)', lineHeight: 1.7 }}>
                {lang === 'fr'
                  ? 'Notre équipe est à votre disposition pour toute question concernant le programme de fidélité. Contactez-nous par email à contact@toujoursbelle.com ou via WhatsApp. Nous vous répondrons dans les plus brefs délais.'
                  : 'فريقنا جاهز لأي استفسار حول برنامج الولاء. تواصلي معنا عبر البريد الإلكتروني contact@toujoursbelle.com أو واتساب. سنجيبكِ في أقرب وقت.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Back link */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <button
          onClick={() => navigate('/')}
          className="text-sm hover:text-[#c8adad] transition-colors duration-300"
          style={{ fontFamily: "'Inter', sans-serif", color: 'var(--tb-text-muted)', textDecoration: 'underline' }}
        >
          {lang === 'fr' ? "← Retour à l'accueil" : 'العودة إلى الرئيسية →'}
        </button>
      </div>

      <Footer />
    </div>
  );
}
