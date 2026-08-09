import { useEffect, useRef, useState } from 'react';
import type { ReactElement } from 'react';
import { useNavigate } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const { lang, isRTL } = useLanguage();
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (newsletterRef.current) {
        gsap.fromTo(newsletterRef.current, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: newsletterRef.current, start: 'top 80%' },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <section ref={sectionRef} id="footer" className="relative w-full" style={{ zIndex: 1 }}>
      {/* Newsletter */}
      <div ref={newsletterRef} style={{ backgroundColor: '#1a1a1a', padding: '100px 40px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#faf6f4', marginBottom: '12px' }}>
          {lang === 'fr' ? 'Rejoignez Notre Communauté' : 'انضمي إلى مجتمعنا'}
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#d4a5a5', marginBottom: '8px' }}>
          {lang === 'fr' ? '10% de réduction sur votre première commande' : 'خصم 10٪ على طلبكِ الأول'}
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#8a8a8a', maxWidth: '480px', margin: '0 auto 28px', lineHeight: 1.6 }}>
          {lang === 'fr' ? 'Inscrivez-vous pour recevoir nos offres exclusives et découvrir nos nouvelles collections.' : 'سجلي للحصول على عروضنا الحصرية واكتشاف مجموعاتنا الجديدة.'}
        </p>

        {subscribed ? (
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '14px', color: '#d4a5a5' }}>
            {lang === 'fr' ? 'Merci ! Vérifiez votre email ✓' : 'شكرًا! تحققي من بريدكِ ✓'}
          </p>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={lang === 'fr' ? 'Votre adresse email' : 'بريدكِ الإلكتروني'}
              required
              style={{
                width: '100%', maxWidth: '320px', padding: '14px 24px', borderRadius: '100px',
                backgroundColor: 'rgba(250,246,244,0.1)', border: '1px solid rgba(250,246,244,0.2)',
                color: '#faf6f4', fontFamily: "'Inter', sans-serif", fontSize: '14px', outline: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '14px 32px', borderRadius: '100px', backgroundColor: '#d4a5a5', color: '#1a1a1a',
                fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '13px', letterSpacing: '0.08em',
                textTransform: 'uppercase', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
              }}
              className="hover:brightness-110"
            >
              {lang === 'fr' ? "S'inscrire" : 'اشتركي'}
            </button>
          </form>
        )}
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#666', marginTop: '12px' }}>
          {lang === 'fr' ? 'Nous respectons votre vie privée. Désabonnement en un clic.' : 'نحترم خصوصيتكِ. يمكنكِ إلغاء الاشتراك بنقرة واحدة.'}
        </p>
      </div>

      {/* Footer */}
      <footer className="transition-colors duration-500" style={{ backgroundColor: 'var(--tb-bg)', padding: '60px 40px 30px' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand */}
            <div>
              <p className="flex items-center gap-2" style={{ marginBottom: '0px' }}>
                <img src="/images/tb-logo-footer.png" alt="Toujours Belle" style={{ height: '180px', width: 'auto', objectFit: 'contain' }} />
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-3">
                {[
                  { name: 'instagram', url: 'https://www.instagram.com/boutique_toujours_belle?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
                  { name: 'tiktok', url: 'https://www.tiktok.com/@boutique_toujours?_r=1&_t=ZS-96o8qkSDKPH' },
                  { name: 'facebook', url: 'https://www.facebook.com/TBcompanyimport/?ref=PRODASH_UPSELL_xav_ig_profile_page_web#' },
                  { name: 'threads', url: 'https://www.threads.com/@boutique_toujours_belle?xmt=AQG0FyYuTCl8hR0z-PbKSa7HTJkRoKfZS0F1crLFCWYP_K4' },
                ].map((social) => (
                  <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" aria-label={social.name}>
                    <SocialIcon name={social.name} />
                  </a>
                ))}
              </div>

            </div>

            {/* Boutique */}
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--tb-text)', marginBottom: '16px' }}>
                {lang === 'fr' ? 'Boutique' : 'المتجر'}
              </p>
              <ul className="space-y-2">
                {[
                  { fr: 'Cheveux Lisses', ar: 'شعر ناعم', href: '#hair-types' },
                  { fr: 'Cheveux Boucles - frange', ar: 'شعر مموج', href: '#hair-types' },
                  { fr: 'Cheveux Crepus - Rajout frontale', ar: 'شعر مجعد', href: '#hair-types' },
                  { fr: 'Cheveux Ondulé - perruque', ar: 'شعر أفرو', href: '#hair-types' },
                  { fr: 'Tous les Produits', ar: 'جميع المنتجات', href: '#product' },
                ].map((link) => (
                  <li key={link.fr}>
                    <a href={link.href} onClick={(e) => { e.preventDefault(); document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-[#d4a5a5] transition-colors" style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--tb-text-secondary)', textDecoration: 'none' }}>
                      {lang === 'fr' ? link.fr : link.ar}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Informations */}
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--tb-text)', marginBottom: '16px' }}>
                {lang === 'fr' ? 'Informations' : 'معلومات'}
              </p>
              <ul className="space-y-2">
                {[
                  { fr: 'À Propos', ar: 'من نحن', href: '#about' },
                  { fr: 'Témoignages', ar: 'آراء العملاء', href: '#testimonials' },
                  { fr: 'FAQ', ar: 'الأسئلة', href: '/faq' },
                  { fr: 'Récompenses', ar: 'المكافآت', href: '/rewards' },
                  { fr: 'Blog', ar: 'المدونة', href: '#' },
                ].map((link) => (
                  <li key={link.fr}>
                    <a href={link.href} onClick={(e) => { e.preventDefault(); if (link.href.startsWith('/')) navigate(link.href); else document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-[#d4a5a5] transition-colors" style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--tb-text-secondary)', textDecoration: 'none', cursor: 'pointer' }}>
                      {lang === 'fr' ? link.fr : link.ar}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Aide */}
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--tb-text)', marginBottom: '16px' }}>
                {lang === 'fr' ? 'Aide' : 'مساعدة'}
              </p>
              <ul className="space-y-2">
                {[
                  { fr: 'Livraison', ar: 'التوصيل' },
                  { fr: 'Retours', ar: 'الإرجاع' },
                  { fr: 'Guide des Tailles', ar: 'دليل المقاسات' },
                  { fr: 'Contact', ar: 'تواصل' },
                  { fr: 'Conditions Générales', ar: 'الشروط العامة', href: '/conditions' },
                ].map((link) => (
                  <li key={link.fr}>
                    <a href={link.href || '#'} onClick={(e) => { e.preventDefault(); if (link.href?.startsWith('/')) navigate(link.href); }} className="hover:text-[#d4a5a5] transition-colors" style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--tb-text-secondary)', textDecoration: 'none', cursor: link.href ? 'pointer' : 'default' }}>
                      {lang === 'fr' ? link.fr : link.ar}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--tb-text)', marginBottom: '16px' }}>
                {lang === 'fr' ? 'Contact' : 'تواصل'}
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <Mail size={14} color="#d4a5a5" />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--tb-text-secondary)' }}>contact@toujoursbelle.com</span>
                </div>
                <div className="flex items-center gap-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <Phone size={14} color="#d4a5a5" />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--tb-text-secondary)' }}>+33 1 23 45 67 89</span>
                </div>
                <div className="flex items-center gap-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <WhatsAppIcon />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--tb-text-secondary)' }}>WhatsApp</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors duration-500" style={{ borderTop: '1px solid var(--tb-border)', flexDirection: isRTL ? 'row-reverse' : undefined }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '12px', color: 'var(--tb-text-muted)' }}>
              © {new Date().getFullYear()} Toujours Belle. {lang === 'fr' ? 'Tous droits réservés.' : 'جميع الحقوق محفوظة.'}
            </p>
            {/* Payment Methods */}
            <img
              src="/images/payment-footer.jpg"
              alt="Payment methods"
              className="h-11 sm:h-14 object-contain rounded-md"
              style={{ display: 'block' }}
            />
            <div className="flex items-center gap-4" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--tb-text-muted)' }}>{lang === 'fr' ? 'Conditions' : 'الشروط'}</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--tb-text-muted)' }}>{lang === 'fr' ? 'Confidentialité' : 'الخصوصية'}</span>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}

function SocialIcon({ name }: { name: string }) {
  const iconColor = 'var(--tb-text)';
  const icons: Record<string, ReactElement> = {
    instagram: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: iconColor }}><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
    ),
    tiktok: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ color: iconColor }}><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.75a8.23 8.23 0 004.83 1.55V6.93a4.85 4.85 0 01-1.07-.24z"/></svg>
    ),
    facebook: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: iconColor }}><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
    ),
    youtube: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: iconColor }}><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.13C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.33 29 29 0 00-.46-5.35z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
    ),
    threads: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ color: iconColor }}><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.88-6.433 2.525-8.483C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.005.545c-1.065-3.69-3.637-5.62-7.33-5.73-2.99-.103-5.042.738-6.59 2.227-1.317 1.617-2.098 3.686-2.122 6.29v.013c.024 2.608.805 4.68 2.123 6.002 1.55 1.564 3.62 2.405 6.32 2.508 2.413.09 4.34-.663 5.72-2.236 1.218-1.39 1.86-3.366 1.85-5.671-.007-1.608-.367-2.855-1.07-3.706-.637-.77-1.555-1.16-2.73-1.16-.862 0-1.603.32-2.155.925-.626.688-.943 1.635-.943 2.815 0 .15.005.3.014.447.087 1.398.075 2.912-.034 4.24-1.013.194-2.058.29-3.105.287h-.007c-3.135-.01-5.097-1.713-5.164-4.587-.03-1.35.37-2.455 1.19-3.29.913-.93 2.25-1.42 3.855-1.42.413 0 .83.033 1.24.098l.174.698c-.45-.072-.91-.108-1.37-.108-1.355 0-2.457.4-3.207 1.163-.667.677-.98 1.582-.954 2.69.055 2.35 1.637 3.72 4.45 3.728.86.003 1.71-.07 2.52-.215.085-1.187.095-2.54.03-3.83-.007-.146-.01-.293-.01-.44 0-1.39.39-2.54 1.13-3.356.78-.86 1.86-1.31 3.13-1.31 1.52 0 2.71.52 3.53 1.51.88 1.06 1.33 2.59 1.34 4.42.01 2.64-.72 4.93-2.12 6.52-1.62 1.85-3.9 2.73-6.77 2.62z"/></svg>
    ),
  };
  return icons[name] || null;
}

function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#d4a5a5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}


