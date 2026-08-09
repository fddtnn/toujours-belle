import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { ShoppingCart, Menu, X, Search, Sun, Moon, ChevronDown, User } from 'lucide-react';
import gsap from 'gsap';

interface NavigationProps {
  cartCount: number;
  onCartClick: () => void;
  onLoginClick?: () => void;
  onMenuOpenChange?: (open: boolean) => void; // Kept for backward compat; MenuCoordinator handles conflicts
}

const searchableItems = [
  { nameFr: 'Cheveux Lisses', nameAr: 'شعر ناعم', href: '#hair-types' },
  { nameFr: 'Cheveux Boucles', nameAr: 'شعر مموج', href: '#hair-types' },
  { nameFr: 'Cheveux Crepus', nameAr: 'شعر مجعد', href: '#hair-types' },
  { nameFr: 'Cheveux Ondulé', nameAr: 'شعر مجعد', href: '#hair-types' },
  { nameFr: 'Couleurs', nameAr: 'الألوان', href: '#colors' },
  { nameFr: 'Noir', nameAr: 'أسود', href: '#colors' },
  { nameFr: 'Châtain', nameAr: 'بني', href: '#colors' },
  { nameFr: 'Blond Miel', nameAr: 'أشقر عسلي', href: '#colors' },
  { nameFr: 'Auburn', nameAr: 'أوبورن', href: '#colors' },
  { nameFr: 'Consultation', nameAr: 'استشارة', href: '#about' },
  { nameFr: 'Accessoires', nameAr: 'إكسسوارات', href: '#product' },
  { nameFr: 'E-Gift Cards', nameAr: 'بطاقات الهدايا', href: '/e-gift-cards' },
  { nameFr: 'Extensions', nameAr: 'إضافات', href: '/extensions' },
  { nameFr: 'Perruques', nameAr: 'باروكات', href: '/perruques' },
  { nameFr: 'Tissages', nameAr: 'نسج', href: '#product' },
  { nameFr: 'Clips', nameAr: 'كليبس', href: '#product' },
  { nameFr: 'Livraison', nameAr: 'التوصيل', href: '#product' },
  { nameFr: 'Paiement', nameAr: 'الدفع', href: '#product' },
];

interface CheveuxItem {
  fr: string;
  ar: string;
  href: string;
  external?: boolean;
  children?: { fr: string; ar: string; href: string }[];
}

const cheveuxSubmenu: CheveuxItem[] = [
  {
    fr: 'Perruques',
    ar: 'باروكات',
    href: '/perruques',
    children: [
      { fr: 'Garçon', ar: 'قصير جداً', href: '/perruques' },
      { fr: 'Carré Court', ar: 'كاريه قصير', href: '/perruques' },
      { fr: 'Carré Long', ar: 'كاريه طويل', href: '/perruques' },
      { fr: 'Mi-Long', ar: 'متوسط الطول', href: '/perruques-mi-long' },
      { fr: 'Long', ar: 'طويل', href: '/perruques-long' },
      { fr: 'Extra Long', ar: 'طويل جداً', href: '/perruques' },
    ],
  },
  {
    fr: 'Demi-Perruques',
    ar: 'نصف باروكات',
    href: '#product',
    children: [
      { fr: 'Light Volume', ar: 'حجم خفيف', href: '#product' },
      { fr: 'Full Volume', ar: 'حجم كامل', href: '#product' },
      { fr: 'Extra Full Volume', ar: 'حجم كامل إضافي', href: '#product' },
    ],
  },
  { fr: 'Topper', ar: 'توبير', href: '#product' },
  { fr: 'TB Secret Volume', ar: 'TB سيكريت فوليوم', href: '#product' },
  { fr: 'Rajouts Frontaux', ar: 'إضافات أمامية', href: '#product' },
  { fr: 'Franges', ar: 'غرة', href: '#product' },
  { fr: 'Queues de Cheval', ar: 'ذيول الحصان', href: '#product' },
  { fr: 'Chignons & Chouchous', ar: 'كعكات وربطات', href: '#product' },
  { fr: 'Hair Care', ar: 'العناية بالشعر', href: '#product' },
  { fr: 'Accessoires', ar: 'إكسسوارات', href: '#product' },
  { fr: 'E-Gift Cards', ar: 'بطاقات الهدايا الإلكترونية', href: '/e-gift-cards' },
  { fr: 'Extensions', ar: 'إضافات', href: '/extensions.html', external: true },
];

export default function Navigation({ cartCount, onCartClick, onLoginClick, onMenuOpenChange }: NavigationProps) {
  const { lang, toggleLang, isRTL } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cheveuxOpen, setCheveuxOpen] = useState(false);
  const [mobileCheveuxOpen, setMobileCheveuxOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const cheveuxTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mobileCheveuxRef = useRef<HTMLDivElement>(null);

  // Toggle hamburger menu + hide WhatsApp button via body attribute
  const toggleMobileMenu = (open: boolean) => {
    setMobileOpen(open);
    if (open) {
      document.body.setAttribute('data-active-menu', 'hamburger');
      onMenuOpenChange?.(true);
    } else {
      document.body.removeAttribute('data-active-menu');
      onMenuOpenChange?.(false);
    }
  };

  // Toggle cheveux dropdown + hide WhatsApp button
  const toggleCheveux = (open: boolean) => {
    setCheveuxOpen(open);
    if (open) {
      document.body.setAttribute('data-active-menu', 'hamburger');
      onMenuOpenChange?.(true);
    } else {
      document.body.removeAttribute('data-active-menu');
      onMenuOpenChange?.(false);
    }
  };

  useEffect(() => {
    const onScroll = () => { setScrolled(window.scrollY > 50); };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current, { y: -64, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 });
    }
  }, []);

  /* Mobile Cheveux auto-close on click outside */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileCheveuxRef.current && !mobileCheveuxRef.current.contains(event.target as Node)) {
        setMobileCheveuxOpen(false);
      }
    };
    if (mobileCheveuxOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [mobileCheveuxOpen]);

  const scrollToSection = (href: string) => {
    toggleMobileMenu(false);
    setSearchOpen(false);
    toggleCheveux(false);
    document.body.removeAttribute('data-active-menu');
    onMenuOpenChange?.(false);
    if (href.startsWith('/')) { navigate(href); return; }
    if (location.pathname !== '/') { navigate('/' + href); return; }
    const el = document.querySelector(href);
    if (el) { el.scrollIntoView({ behavior: 'smooth' }); }
  };

  const filteredResults = searchQuery.length > 1
    ? searchableItems.filter((item) =>
        (lang === 'fr' ? item.nameFr : item.nameAr).toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const navBg = scrolled
    ? (isDark ? 'rgba(18,18,18,0.9)' : 'rgba(250,246,244,0.9)')
    : 'transparent';
  const navBorder = scrolled
    ? (isDark ? '1px solid #2a2020' : '1px solid #f0e0e0')
    : '1px solid transparent';
  const textColor = 'var(--tb-text)';
  const searchBg = isDark ? '#1a1a1a' : '#faf6f4';
  const searchInputBg = isDark ? '#121212' : '#ffffff';
  const searchBorder = isDark ? '#2a2020' : '#f0e0e0';
  const resultHover = isDark ? '#2a2020' : '#faf6f4';
  const mobileBg = isDark ? '#1a1a1a' : '#faf6f4';

  const handleCheveuxEnter = () => {
    if (cheveuxTimeout.current) clearTimeout(cheveuxTimeout.current);
    toggleCheveux(true);
  };

  const handleCheveuxLeave = () => {
    toggleCheveux(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed left-0 right-0 h-16 flex items-center justify-between px-6 lg:px-10"
        style={{
          top: '76px',
          zIndex: 100,
          backgroundColor: navBg,
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: navBorder,
          transition: 'all 0.4s ease',
        }}
      >
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
          className="flex items-center"
        >
          <img
            src="/images/tb-logo.png"
            alt="Toujours Belle"
            style={{ height: '130px', width: 'auto', objectFit: 'contain' }}
          />
        </a>

        {/* Center Links - Desktop */}
        <div className="hidden lg:flex items-center gap-6" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
          {/* Regular links */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
            className="text-xs uppercase tracking-widest hover:text-[#d4a5a5] transition-colors duration-300"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, color: textColor, letterSpacing: '0.08em' }}
          >
            {lang === 'fr' ? 'Accueil' : 'الرئيسية'}
          </a>

          {/* Cheveux Dropdown - Hover only */}
          <div
            className="relative"
            onMouseEnter={handleCheveuxEnter}
            onMouseLeave={handleCheveuxLeave}
          >
            <button
              className="text-xs uppercase tracking-widest hover:text-[#d4a5a5] transition-colors duration-300 flex items-center gap-1 pointer-events-none"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, color: textColor, letterSpacing: '0.08em', background: 'none', border: 'none', cursor: 'default' }}
            >
              {lang === 'fr' ? 'Cheveux' : 'الشعر'}
              <ChevronDown size={12} className={`transition-transform duration-200 ${cheveuxOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {cheveuxOpen && (
              <div
                className="absolute top-full left-0 mt-0 pt-2 py-3 rounded-xl shadow-xl"
                style={{
                  backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
                  border: `1px solid ${isDark ? '#2a2020' : '#f0e0e0'}`,
                  minWidth: '220px',
                  zIndex: 200,
                }}
                onMouseEnter={handleCheveuxEnter}
                onMouseLeave={handleCheveuxLeave}
              >
                {cheveuxSubmenu.map((item) => (
                  <div key={item.fr}>
                    {item.external ? (
                      <a
                        href={item.href}
                        onClick={() => { toggleCheveux(false); document.body.removeAttribute('data-active-menu'); onMenuOpenChange?.(false); }}
                        className="block px-5 py-2.5 text-sm hover:text-[#d4a5a5] transition-colors duration-200"
                        style={{ fontFamily: "'Inter', sans-serif", color: 'var(--tb-text)', whiteSpace: 'nowrap' }}
                      >
                        {lang === 'fr' ? item.fr : item.ar}
                      </a>
                    ) : (
                      <a
                        href={item.href}
                        onClick={(e) => { e.preventDefault(); scrollToSection(item.href); toggleCheveux(false); document.body.removeAttribute('data-active-menu'); onMenuOpenChange?.(false); }}
                        className="block px-5 py-2.5 text-sm hover:text-[#d4a5a5] transition-colors duration-200"
                        style={{ fontFamily: "'Inter', sans-serif", color: 'var(--tb-text)', whiteSpace: 'nowrap' }}
                      >
                        {lang === 'fr' ? item.fr : item.ar}
                      </a>
                    )}
                    {/* Sub-items */}
                    {item.children && (
                      <div style={{ borderLeft: '2px solid #f0e0e0', marginLeft: '20px' }}>
                        {item.children.map((child) => (
                          <a
                            key={child.fr}
                            href={child.href}
                            onClick={(e) => { e.preventDefault(); scrollToSection(child.href); toggleCheveux(false); document.body.removeAttribute('data-active-menu'); onMenuOpenChange?.(false); }}
                            className="block px-4 py-1.5 text-xs hover:text-[#d4a5a5] transition-colors duration-200"
                            style={{ fontFamily: "'Inter', sans-serif", color: '#999', whiteSpace: 'nowrap' }}
                          >
                            {lang === 'fr' ? child.fr : child.ar}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <a href="#colors" onClick={(e) => { e.preventDefault(); scrollToSection('#colors'); }} className="text-xs uppercase tracking-widest hover:text-[#d4a5a5] transition-colors duration-300" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, color: textColor, letterSpacing: '0.08em' }}>
            {lang === 'fr' ? 'Couleurs' : 'الألوان'}
          </a>
          <a href="/try-on" onClick={(e) => { e.preventDefault(); scrollToSection('/try-on'); }} className="text-xs uppercase tracking-widest hover:text-[#d4a5a5] transition-colors duration-300" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, color: textColor, letterSpacing: '0.08em' }}>
            {lang === 'fr' ? 'Essayage IA' : 'تجربة ذكية'}
          </a>
          <a href="/rewards" onClick={(e) => { e.preventDefault(); scrollToSection('/rewards'); }} className="text-xs uppercase tracking-widest hover:text-[#d4a5a5] transition-colors duration-300" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, color: textColor, letterSpacing: '0.08em' }}>
            VIP
          </a>
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('#about'); }} className="text-xs uppercase tracking-widest hover:text-[#d4a5a5] transition-colors duration-300" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, color: textColor, letterSpacing: '0.08em' }}>
            {lang === 'fr' ? 'Expert' : 'خبير'}
          </a>
          <a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollToSection('#testimonials'); }} className="text-xs uppercase tracking-widest hover:text-[#d4a5a5] transition-colors duration-300" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, color: textColor, letterSpacing: '0.08em' }}>
            {lang === 'fr' ? 'Resultats' : 'النتائج'}
          </a>
          <a href="#product" onClick={(e) => { e.preventDefault(); scrollToSection('#product'); }} className="text-xs uppercase tracking-widest hover:text-[#d4a5a5] transition-colors duration-300" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, color: textColor, letterSpacing: '0.08em' }}>
            {lang === 'fr' ? 'Livraison' : 'التوصيل'}
          </a>
          <a href="/wedding" onClick={(e) => { e.preventDefault(); scrollToSection('/wedding'); }} className="text-xs uppercase tracking-widest hover:text-[#d4a5a5] transition-colors duration-300" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, color: textColor, letterSpacing: '0.08em' }}>
            {lang === 'fr' ? 'Mariage' : 'زفاف'}
          </a>
          <a href="/faq" onClick={(e) => { e.preventDefault(); scrollToSection('/faq'); }} className="text-xs uppercase tracking-widest hover:text-[#d4a5a5] transition-colors duration-300" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, color: textColor, letterSpacing: '0.08em' }}>
            FAQ
          </a>
          <a href="#footer" onClick={(e) => { e.preventDefault(); scrollToSection('#footer'); }} className="text-xs uppercase tracking-widest hover:text-[#d4a5a5] transition-colors duration-300" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, color: textColor, letterSpacing: '0.08em' }}>
            {lang === 'fr' ? 'Contact' : 'تواصل'}
          </a>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
          <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 hover:text-[#d4a5a5] transition-colors duration-300" style={{ color: textColor }} aria-label="Search">
            <Search size={18} />
          </button>
          <button onClick={toggleLang} className="text-xs uppercase tracking-widest hover:text-[#d4a5a5] transition-colors duration-300" style={{ fontWeight: 500, color: textColor }}>
            {lang === 'fr' ? 'AR' : 'FR'}
          </button>
          <button onClick={onLoginClick} className="p-2 hover:text-[#d4a5a5] transition-colors duration-300" style={{ color: textColor }} aria-label="Sign In">
            <User size={18} />
          </button>
          <button onClick={toggleTheme} className="p-2 hover:text-[#d4a5a5] transition-colors duration-300" style={{ color: textColor }} aria-label="Toggle Dark Mode">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={onCartClick} className="relative p-2 hover:text-[#d4a5a5] transition-colors duration-300" style={{ color: textColor }} aria-label="Cart">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs" style={{ backgroundColor: '#d4a5a5', fontSize: '10px', fontWeight: 600 }}>
                {cartCount}
              </span>
            )}
          </button>
          <button className="lg:hidden p-2" style={{ color: textColor }} onClick={() => { toggleMobileMenu(!mobileOpen); onMenuOpenChange?.(!mobileOpen); }} aria-label="Menu">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Search Overlay */}
      <div className={`fixed inset-0 z-[105] transition-all duration-300 ${searchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/20" onClick={() => { setSearchOpen(false); setSearchQuery(''); }} />
        <div className="absolute left-0 right-0 shadow-lg" style={{ top: '76px', padding: '24px', backgroundColor: searchBg }}>
          <div className="max-w-[600px] mx-auto">
            <div className="relative">
              <Search size={18} color="#8a8a8a" className="absolute left-4 top-1/2 -translate-y-1/2" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={lang === 'fr' ? 'Rechercher...' : 'بحث...'} autoFocus className="w-full rounded-full" style={{ padding: '14px 20px 14px 44px', border: `1px solid ${searchBorder}`, backgroundColor: searchInputBg, fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--tb-text)', outline: 'none' }} />
            </div>
            {filteredResults.length > 0 && (
              <div className="mt-3 rounded-xl overflow-hidden shadow-sm" style={{ border: `1px solid ${searchBorder}`, maxHeight: '280px', overflowY: 'auto', backgroundColor: searchInputBg }}>
                {filteredResults.map((item, idx) => (
                  <button key={idx} className="w-full text-left px-4 py-3 transition-colors" style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--tb-text)', borderBottom: `1px solid ${searchBorder}` }} onClick={() => { scrollToSection(item.href); setSearchQuery(''); }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = resultHover; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
                    {lang === 'fr' ? item.nameFr : item.nameAr}
                  </button>
                ))}
              </div>
            )}
            {searchQuery.length > 1 && filteredResults.length === 0 && (
              <p className="mt-3 text-center" style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#8a8a8a' }}>
                {lang === 'fr' ? 'Aucun résultat' : 'لا توجد نتائج'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`fixed inset-0 z-[110] lg:hidden transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/20" onClick={() => { toggleMobileMenu(false); onMenuOpenChange?.(false); }} />
        <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-72 h-full shadow-xl transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : isRTL ? '-translate-x-full' : 'translate-x-full'}`} style={{ paddingTop: '20px', backgroundColor: mobileBg }}>
          <div className="flex flex-col gap-6 px-8">
            <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }} className="text-sm uppercase tracking-widest hover:text-[#d4a5a5] transition-colors duration-300" style={{ fontWeight: 500, color: 'var(--tb-text)', letterSpacing: '0.1em' }}>Accueil</a>

            {/* Mobile Cheveux Toggle */}
            <div ref={mobileCheveuxRef}>
              <button
                onClick={() => setMobileCheveuxOpen(!mobileCheveuxOpen)}
                className="text-sm uppercase tracking-widest hover:text-[#d4a5a5] transition-colors duration-300 flex items-center gap-2 w-full text-left"
                style={{ fontWeight: 500, color: 'var(--tb-text)', letterSpacing: '0.1em', background: 'none', border: 'none' }}
              >
                {lang === 'fr' ? 'Cheveux' : 'الشعر'}
                <ChevronDown size={14} className={`transition-transform duration-200 ${mobileCheveuxOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileCheveuxOpen && (
                <div className="mt-2 ml-4 flex flex-col gap-3 transition-all duration-300">
                  {cheveuxSubmenu.map((item) => (
                    <div key={item.fr}>
                      {item.external ? (
                        <a href={item.href} onClick={() => { setMobileCheveuxOpen(false); }} className="text-sm hover:text-[#d4a5a5] transition-colors duration-300" style={{ fontWeight: 400, color: 'var(--tb-text)' }}>
                          {lang === 'fr' ? item.fr : item.ar}
                        </a>
                      ) : (
                        <a href={item.href} onClick={(e) => { e.preventDefault(); scrollToSection(item.href); setMobileCheveuxOpen(false); }} className="text-sm hover:text-[#d4a5a5] transition-colors duration-300" style={{ fontWeight: 400, color: 'var(--tb-text)' }}>
                          {lang === 'fr' ? item.fr : item.ar}
                        </a>
                      )}
                      {item.children && (
                        <div className="ml-3 mt-1 flex flex-col gap-2" style={{ borderLeft: '2px solid #f0e0e0', paddingLeft: '10px' }}>
                          {item.children.map((child) => (
                            <a key={child.fr} href={child.href} onClick={(e) => { e.preventDefault(); scrollToSection(child.href); setMobileCheveuxOpen(false); }} className="text-xs hover:text-[#d4a5a5] transition-colors duration-300" style={{ fontWeight: 400, color: '#999' }}>
                              {lang === 'fr' ? child.fr : child.ar}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <a href="#colors" onClick={(e) => { e.preventDefault(); scrollToSection('#colors'); }} className="text-sm uppercase tracking-widest hover:text-[#d4a5a5] transition-colors duration-300" style={{ fontWeight: 500, color: 'var(--tb-text)', letterSpacing: '0.1em' }}>Couleurs</a>
            <a href="/try-on" onClick={(e) => { e.preventDefault(); scrollToSection('/try-on'); }} className="text-sm uppercase tracking-widest hover:text-[#d4a5a5] transition-colors duration-300" style={{ fontWeight: 500, color: 'var(--tb-text)', letterSpacing: '0.1em' }}>Essayage IA</a>
            <a href="/rewards" onClick={(e) => { e.preventDefault(); scrollToSection('/rewards'); }} className="text-sm uppercase tracking-widest hover:text-[#d4a5a5] transition-colors duration-300" style={{ fontWeight: 500, color: 'var(--tb-text)', letterSpacing: '0.1em' }}>VIP</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('#about'); }} className="text-sm uppercase tracking-widest hover:text-[#d4a5a5] transition-colors duration-300" style={{ fontWeight: 500, color: 'var(--tb-text)', letterSpacing: '0.1em' }}>Expert</a>
            <a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollToSection('#testimonials'); }} className="text-sm uppercase tracking-widest hover:text-[#d4a5a5] transition-colors duration-300" style={{ fontWeight: 500, color: 'var(--tb-text)', letterSpacing: '0.1em' }}>Resultats</a>
            <a href="#product" onClick={(e) => { e.preventDefault(); scrollToSection('#product'); }} className="text-sm uppercase tracking-widest hover:text-[#d4a5a5] transition-colors duration-300" style={{ fontWeight: 500, color: 'var(--tb-text)', letterSpacing: '0.1em' }}>Livraison</a>
            <a href="/wedding" onClick={(e) => { e.preventDefault(); scrollToSection('/wedding'); }} className="text-sm uppercase tracking-widest hover:text-[#d4a5a5] transition-colors duration-300" style={{ fontWeight: 500, color: 'var(--tb-text)', letterSpacing: '0.1em' }}>Mariage</a>
            <a href="/faq" onClick={(e) => { e.preventDefault(); scrollToSection('/faq'); }} className="text-sm uppercase tracking-widest hover:text-[#d4a5a5] transition-colors duration-300" style={{ fontWeight: 500, color: 'var(--tb-text)', letterSpacing: '0.1em' }}>FAQ</a>
            <a href="#footer" onClick={(e) => { e.preventDefault(); scrollToSection('#footer'); }} className="text-sm uppercase tracking-widest hover:text-[#d4a5a5] transition-colors duration-300" style={{ fontWeight: 500, color: 'var(--tb-text)', letterSpacing: '0.1em' }}>Contact</a>
          </div>
        </div>
      </div>
    </>
  );
}
