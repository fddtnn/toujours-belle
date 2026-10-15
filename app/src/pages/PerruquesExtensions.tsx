import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import {
  Star, Heart, Minus, Plus, Truck, Shield,
  ChevronRight, Sparkles, Check, Zap, Package, AlertTriangle, ArrowLeft
} from 'lucide-react';
import Footer from '../sections/Footer';

/* ═══════════════════════════════════════════
   PRODUCT DATA — 7 extension sets
   ═══════════════════════════════════════════ */

interface WigProduct {
  id: string;
  nameFr: string;
  nameAr: string;
  image: string;
  gallery?: string[];
  typeFr: string;
  typeAr: string;
  basePrice: number;
  rating: number;
  reviews: number;
  sold: number;
  stock: number;
  category: string;
  categoryFr: string;
  categoryAr: string;
}

const products: WigProduct[] = [
  { id: 'ex001', nameFr: 'Extensions Clip-In Noir & Blond', nameAr: 'إكستنشن كليب أسود وأشقر', image: '/images/perruques/extensions/ex001.jpg', typeFr: 'Extensions — Noir Naturel', typeAr: 'إكستنشن — أسود طبيعي', basePrice: 420, rating: 4.9, reviews: 46, sold: 58, stock: 33, category: 'natural-black', categoryFr: 'Noir Naturel', categoryAr: 'أسود طبيعي' },
  { id: 'ex002', nameFr: 'Extensions Noir Ondulé', nameAr: 'إكستنشن أسود مموج', image: '/images/perruques/extensions/ex002.jpg', typeFr: 'Extensions — Noir Naturel', typeAr: 'إكستنشن — أسود طبيعي', basePrice: 395, rating: 4.8, reviews: 39, sold: 51, stock: 37, category: 'natural-black', categoryFr: 'Noir Naturel', categoryAr: 'أسود طبيعي' },
  { id: 'ex003', nameFr: 'Extensions Brun Clips Renforcés', nameAr: 'إكستنشن بني بمشابك مقواة', image: '/images/perruques/extensions/ex003.jpg', typeFr: 'Extensions — Châtain Foncé', typeAr: 'إكستنشن — كستنائي داكن', basePrice: 405, rating: 4.9, reviews: 43, sold: 54, stock: 35, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'ex004', nameFr: 'Extensions Dégradé Brun-Blond', nameAr: 'إكستنشن متدرج بني-أشقر', image: '/images/perruques/extensions/ex004.jpg', typeFr: 'Extensions — Highlight', typeAr: 'إكستنشن — هايلايت', basePrice: 430, rating: 4.8, reviews: 37, sold: 47, stock: 30, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'ex005', nameFr: 'Extensions Nuancier Complet', nameAr: 'إكستنشن تشكيلة ألوان كاملة', image: '/images/perruques/extensions/ex005.jpg', typeFr: 'Extensions — Highlight', typeAr: 'إكستنشن — هايلايت', basePrice: 415, rating: 4.7, reviews: 33, sold: 44, stock: 38, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'ex006', nameFr: 'Extensions Blond Ondulé', nameAr: 'إكستنشن أشقر مموج', image: '/images/perruques/extensions/ex006.jpg', typeFr: 'Extensions — Blond', typeAr: 'إكستنشن — أشقر', basePrice: 400, rating: 4.8, reviews: 41, sold: 52, stock: 36, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'ex007', nameFr: 'Extensions Blond Volume Avant-Après', nameAr: 'إكستنشن أشقر قبل وبعد', image: '/images/perruques/extensions/ex007.jpg', typeFr: 'Extensions — Blond', typeAr: 'إكستنشن — أشقر', basePrice: 440, rating: 4.9, reviews: 48, sold: 61, stock: 28, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
];



/* ═══════════════════════════════════════════
   VARIANT OPTIONS (shared)
   ═══════════════════════════════════════════ */

const lengths = ['16 pouces', '18 pouces', '20 pouces', '22 pouces', '24 pouces'];
const densities = ['120%', '150%', '180%', '220%', '280%'];
const hairTypes = ['Lisses', 'Ondul\u00e9s', 'Cr\u00e9pus', 'Fris\u00e9s'];
const wigCaps = ['Clip-In', 'Bande Adh\u00e9sive', 'Keratine'];
const wigSizes = ['Standard', 'Taille S', 'Taille M', 'Taille L', 'Sur Mesure'];

const priceMap: Record<string, number> = {
  '16 pouces': -80, '18 pouces': -40, '20 pouces': 0, '22 pouces': 60, '24 pouces': 140,
};
const originalMap: Record<string, number> = {
  '16 pouces': -180, '18 pouces': -90, '20 pouces': 0, '22 pouces': 140, '24 pouces': 320,
};

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */

export default function PerruquesExtensions() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get('product');

  const [mainIdx, setMainIdx] = useState(0);
  const [selLength, setSelLength] = useState('Clip-In');
  const [selDensity, setSelDensity] = useState('180%');
  const [selHairType, setSelHairType] = useState('Ondul\u00e9s');
  const [selCap, setSelCap] = useState('Clip-In');
  const [selSize, setSelSize] = useState('Standard');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0.5, y: 0.5 });
  const imgRef = useRef<HTMLDivElement>(null);

  const selectedProduct = products.find(p => p.id === selectedId);

  const basePrice = selectedProduct?.basePrice || 390;
  const price = basePrice + (priceMap[selLength] || 0);
  const original = (basePrice + 240) + (originalMap[selLength] || 0);
  const discount = Math.round((1 - price / original) * 100);

  useEffect(() => { window.scrollTo(0, 0); }, [selectedId]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    setZoomPos({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
  };

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const openProduct = (id: string) => {
    setSearchParams({ product: id });
    setMainIdx(0);
    setSelLength('20 pouces');
    setSelDensity('180%');
    setSelHairType('Ondul\u00e9s');
    setSelCap('Clip-In');
    setSelSize('Standard');
    setQty(1);
  };

  const backToGrid = () => {
    setSearchParams({});
  };


  /* ───── GRID VIEW ───── */
  if (!selectedProduct) {
    return (
      <div className="tb-textured" style={{ backgroundColor: 'var(--tb-bg)', fontFamily: "'Inter', sans-serif", minHeight: '100vh' }}>
        {/* Header */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-24 sm:pt-28 pb-3 sm:pb-4">
          <div className="flex items-center gap-2 text-xs mb-2 sm:mb-4" style={{ color: 'var(--tb-text-muted)' }}>
            <button onClick={() => navigate('/')} className="hover:text-[#d4a5a5] transition-colors">Home</button>
            <ChevronRight size={12} />
            <span>Cheveux</span>
            <ChevronRight size={12} />
            <span style={{ color: 'var(--tb-text)' }}>Extensions</span>
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--tb-accent-text)', marginBottom: '8px' }}>
            {lang === 'fr' ? 'COLLECTION EXTENSIONS \u2014 7 MOD\u00c8LES' : '\u0645\u062c\u0645\u0648\u0639\u0629 \u0627\u0644\u0625\u0643\u0633\u062a\u0646\u0634\u0646 \u2014 7 \u0645\u0648\u062f\u064a\u0644\u0627\u062a'}
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--tb-accent-text)', lineHeight: 1.15, marginBottom: '8px' }}>
            {lang === 'fr' ? 'Extensions' : '\u0625\u0643\u0633\u062a\u0646\u0634\u0646'}
          </h1>
        </div>

        {/* Product Grid by Category */}
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 pb-20">
          {products.map((p, idx) => {
            // Show category header when category changes
            const showHeader = idx === 0 || p.category !== products[idx - 1].category;
            return (
              <div key={p.id}>
                {showHeader && (
                  <div className="mt-6 sm:mt-10 mb-3 sm:mb-4">
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', color: 'var(--tb-accent-text)' }}>
                      {lang === 'fr' ? p.categoryFr : p.categoryAr}
                    </h2>
                    <div style={{ width: '60px', height: '2px', backgroundColor: '#d4a5a5', marginTop: '6px' }} />
                  </div>
                )}
                {/* Product card: inline 2-col grid per category group */}
                {idx === 0 || p.category !== products[idx - 1].category ? (
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                    {products.filter(q => q.category === p.category).map((q) => (
                      <div
                        key={q.id}
                        className="group cursor-pointer rounded-xl overflow-hidden"
                        style={{ backgroundColor: 'var(--tb-card)', transition: 'all 0.4s ease' }}
                        onClick={() => openProduct(q.id)}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                      >
                        <div className="relative tb-sheen overflow-hidden flex items-center justify-center" style={{ aspectRatio: '1/1.4', backgroundColor: 'var(--tb-surface)' }}>
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-xs font-semibold z-10" style={{ backgroundColor: 'rgba(255,255,255,0.85)', color: 'var(--tb-text-secondary)', fontSize: '10px', letterSpacing: '0.05em' }}>
                            {String(products.indexOf(q) + 1).padStart(2, '0')}
                          </span>
                          <img src={q.image} alt={lang === 'fr' ? q.nameFr : q.nameAr} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                        </div>
                        <div className="p-2 sm:p-4">
                          <h3 className="text-xs sm:text-sm font-medium leading-snug mb-1 sm:mb-2" style={{ fontFamily: "'Inter', sans-serif", color: 'var(--tb-text)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.4 }}>
                            {lang === 'fr' ? q.nameFr : q.nameAr}
                          </h3>
                          <div className="flex items-center justify-between mb-1 sm:mb-2">
                            <span className="text-xs sm:text-base font-semibold" style={{ fontFamily: "'Inter', sans-serif", color: 'var(--tb-accent-text)' }}>
                              <span className="sm:hidden">{q.basePrice} TND</span>
                              <span className="hidden sm:inline">{lang === 'fr' ? `\u00c0 partir de ${q.basePrice} TND` : `\u0627\u0628\u062a\u062f\u0627\u0621\u064b \u0645\u0646 ${q.basePrice} \u062f.\u062a`}</span>
                            </span>
                          </div>
                          <button className="w-full py-1.5 sm:py-2.5 min-h-[44px] rounded-lg transition-colors duration-300" style={{ backgroundColor: '#3a1a2a', color: 'var(--tb-card)', fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '10px', letterSpacing: '0.04em', border: 'none', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#d4a5a5'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#3a1a2a'; }}>
                            <span className="sm:hidden">{lang === 'fr' ? 'Voir +' : '\u0639\u0631\u0636 \u0627\u0644\u0645\u0632\u064a\u062f'}</span>
                            <span className="hidden sm:inline">{lang === 'fr' ? 'Voir le Produit' : '\u0639\u0631\u0636 \u0627\u0644\u0645\u0646\u062a\u062c'}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <Footer />
      </div>
    );
  }

  /* ───── DETAIL VIEW ───── */
  const t = {
    length: lang === 'fr' ? 'Longueur' : '\u0627\u0644\u0637\u0648\u0644',
    density: lang === 'fr' ? 'Densit\u00e9' : '\u0627\u0644\u0643\u062b\u0627\u0641\u0629',
    hairType: lang === 'fr' ? 'Type de Cheveux' : '\u0646\u0648\u0639 \u0627\u0644\u0634\u0639\u0631',
    capType: lang === 'fr' ? 'Fixation' : '\u0637\u0631\u064a\u0642\u0629 \u0627\u0644\u062a\u062b\u0628\u064a\u062a',
    wigSize: lang === 'fr' ? 'Format' : '\u0627\u0644\u0634\u0643\u0644',
    stock: lang === 'fr' ? 'disponibles' : '\u0645\u062a\u0648\u0641\u0631',
    addCart: lang === 'fr' ? 'Ajouter au Panier' : '\u0623\u0636\u064a\u0641\u064a \u0625\u0644\u0649 \u0627\u0644\u0633\u0644\u0629',
    buyNow: lang === 'fr' ? 'Acheter Maintenant' : '\u0627\u0634\u062a\u0631\u064a \u0627\u0644\u0622\u0646',
    info: lang === 'fr' ? 'Informations Produit' : '\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u0645\u0646\u062a\u062c',
    descTitle: lang === 'fr' ? 'Description' : '\u0627\u0644\u0648\u0635\u0641',
    aiTitle: lang === 'fr' ? 'Aper\u00e7u du Produit' : '\u0646\u0638\u0631\u0629 \u0639\u0644\u0649 \u0627\u0644\u0645\u0646\u062a\u062c',
    shipping: lang === 'fr' ? 'Livraison gratuite' : '\u062a\u0648\u0635\u064a\u0644 \u0645\u062c\u0627\u0646\u064a',
    guarantee: lang === 'fr' ? 'Garantie 30 jours' : '\u0636\u0645\u0627\u0646 30 \u064a\u0648\u0645',
    back: lang === 'fr' ? 'Retour aux perruques' : '\u0627\u0644\u0639\u0648\u062f\u0629 \u0625\u0644\u0649 \u0627\u0644\u0628\u0627\u0631\u0648\u0643\u0627\u062a',
  };

  /* The photos this wig actually has: the main shot, then any others grouped
     onto it. A product with one photo shows one, not the same one three
     times. */
  const images = [
    { src: selectedProduct.image, alt: selectedProduct.nameFr },
    ...(selectedProduct.gallery ?? []).map((src, i) => ({
      src,
      alt: `${selectedProduct.nameFr} - vue ${i + 2}`,
    })),
  ];

  const catLabel = lang === 'fr' ? selectedProduct.categoryFr : selectedProduct.categoryAr;
  const name = lang === 'fr' ? selectedProduct.nameFr : selectedProduct.nameAr;

  const specs = [
    { label: lang === 'fr' ? 'Mat\u00e9riau' : '\u0627\u0644\u0645\u0627\u062f\u0629', value: lang === 'fr' ? '100% Cheveux Humains Remy' : '100% \u0634\u0639\u0631 \u0628\u0634\u0631\u064a \u0631\u064a\u0645\u064a' },
    { label: lang === 'fr' ? 'Type' : '\u0627\u0644\u0646\u0648\u0639', value: lang === 'fr' ? 'Ondul\u00e9s Glamour' : '\u0645\u0645\u0648\u062c \u0623\u0646\u064a\u0642' },
    { label: lang === 'fr' ? 'Densit\u00e9' : '\u0627\u0644\u0643\u062b\u0627\u0641\u0629', value: '130% \u2013 280%' },
    { label: lang === 'fr' ? 'Longueur' : '\u0627\u0644\u0637\u0648\u0644', value: '16" \u2013 24"' },
    { label: lang === 'fr' ? 'Couleur' : '\u0627\u0644\u0644\u0648\u0646', value: catLabel },
    { label: lang === 'fr' ? 'Racines' : '\u0627\u0644\u062c\u0630\u0648\u0631', value: lang === 'fr' ? 'Fondues Naturelles' : '\u062c\u0630\u0648\u0631 \u0645\u062a\u062f\u0631\u062c\u0629 \u0637\u0628\u064a\u0639\u064a\u0629' },
    { label: lang === 'fr' ? 'Fixation' : '\u0637\u0631\u064a\u0642\u0629 \u0627\u0644\u062a\u062b\u0628\u064a\u062a', value: 'Clip-In / Bande Adh\u00e9sive / Keratine' },
    { label: lang === 'fr' ? 'Texture' : '\u0627\u0644\u0645\u0644\u0645\u0633', value: lang === 'fr' ? 'Souples Volumineuses' : '\u0646\u0627\u0639\u0645\u0629 \u0643\u062b\u064a\u0641\u0629' },
    { label: lang === 'fr' ? 'Poids' : '\u0627\u0644\u0648\u0632\u0646', value: '140g \u2013 220g' },
  ];

  const descBlocks = lang === 'fr' ? [
    `Extensions Premium ${name} \u2014 Qualit\u00e9 Haut de Gamme`,
    `Ce jeu d\'extensions de couleur ${catLabel.toLowerCase()} est confectionn\u00e9e avec des cheveux humains Remy de premi\u00e8re qualit\u00e9. Les fibres offrent une douceur soyeuse, une brillance naturelle et un mouvement fluide pour un r\u00e9sultat ultra-r\u00e9aliste.`,
    `Jeu complet de bandes \u00e0 poser soi-m\u00eame en quelques minutes, sans salon. Longueurs disponibles de 16" \u00e0 24".`,
  ] : [
    `\u0625\u0643\u0633\u062a\u0646\u0634\u0646 \u0628\u0631\u064a\u0645\u064a\u0648\u0645 ${name} \u2014 \u062c\u0648\u062f\u0629 \u0639\u0627\u0644\u064a\u0629`,
    `\u0637\u0642\u0645 \u0627\u0644\u0625\u0643\u0633\u062a\u0646\u0634\u0646 \u0627\u0644\u0631\u0627\u0626\u0639 \u0628\u0627\u0644\u0644\u0648\u0646 ${catLabel} \u0645\u0635\u0646\u0648\u0639\u0629 \u0645\u0646 \u0634\u0639\u0631 \u0628\u0634\u0631\u064a \u0631\u064a\u0645\u064a \u0641\u0627\u0626\u0642 \u0627\u0644\u062c\u0648\u062f\u0629. \u062a\u0648\u0641\u0631 \u0627\u0644\u0623\u0644\u064a\u0627\u0641 \u0646\u0639\u0648\u0645\u0629 \u062d\u0631\u064a\u0631\u064a\u0629 \u0648\u0644\u0645\u0639\u0627\u0646 \u0637\u0628\u064a\u0639\u064a \u0648\u062d\u0631\u0643\u0629 \u0633\u0644\u0633\u0629 \u0644\u0646\u062a\u064a\u062c\u0629 \u0641\u0627\u0626\u0642\u0629 \u0627\u0644\u0648\u0627\u0642\u0639\u064a\u0629.`,
    `\u0637\u0642\u0645 \u0643\u0627\u0645\u0644 \u0645\u0646 \u0627\u0644\u062e\u0635\u0644 \u064a\u064f\u0631\u0643\u064e\u0651\u0628 \u0630\u0627\u062a\u064a\u0627\u064b \u062e\u0644\u0627\u0644 \u062f\u0642\u0627\u0626\u0642 \u0628\u062f\u0648\u0646 \u0635\u0627\u0644\u0648\u0646. \u0623\u0637\u0648\u0627\u0644 \u0645\u062a\u0648\u0641\u0631\u0629 \u0645\u0646 16" \u0625\u0644\u0649 24".`,
  ];

  const aiItems = lang === 'fr' ? [
    `Couleur ${catLabel.toLowerCase()} au rendu naturel et \u00e9l\u00e9gant`,
    'Racines fondues pour une transition ultra-r\u00e9aliste',
    'Ondulations glamour au volume ma\u00eetris\u00e9',
    'Lace front HD transparente pour int\u00e9gration parfaite',
    'Cheveux humains Remy premium : douceur et long\u00e9vit\u00e9',
    'Parfaite pour un usage quotidien ou des occasions sp\u00e9ciales',
  ] : [
    `\u0644\u0648\u0646 ${catLabel} \u0628\u0645\u0638\u0647\u0631 \u0637\u0628\u064a\u0639\u064a \u0648\u0623\u0646\u064a\u0642`,
    '\u062c\u0630\u0648\u0631 \u0645\u062a\u062f\u0631\u062c\u0629 \u0644\u0627\u0646\u062a\u0642\u0627\u0644 \u0641\u0627\u0626\u0642 \u0627\u0644\u0648\u0627\u0642\u0639\u064a\u0629',
    '\u0645\u0648\u062c\u0627\u062a \u0623\u0646\u064a\u0642\u0629 \u0628\u062d\u062c\u0645 \u0645\u062a\u062d\u0643\u0645 \u0641\u064a\u0647',
    '\u0644\u064a\u0633 \u0641\u0631\u0648\u0646\u062a HD \u0634\u0641\u0627\u0641 \u0644\u0627\u0646\u062f\u0645\u0627\u062c \u0645\u062b\u0627\u0644\u064a',
    '\u0634\u0639\u0631 \u0628\u0634\u0631\u064a \u0631\u064a\u0645\u064a \u0628\u0631\u064a\u0645\u064a\u0648\u0645: \u0646\u0639\u0648\u0645\u0629 \u0648\u0645\u062a\u0627\u0646\u0629',
    '\u0645\u062b\u0627\u0644\u064a\u0629 \u0644\u0644\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0627\u0644\u064a\u0648\u0645\u064a \u0623\u0648 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0627\u062a \u0627\u0644\u062e\u0627\u0635\u0629',
  ];

  const colorNote = lang === 'fr'
    ? "Toute coloration, d\u00e9coloration ou modification de la couleur doit imp\u00e9rativement \u00eatre r\u00e9alis\u00e9e par notre \u00e9quipe. Nous ne garantissons pas le r\u00e9sultat ni l'\u00e9tat de la perruque en cas de coloration effectu\u00e9e par une tierce personne ou \u00e0 domicile."
    : '\u064a\u062c\u0628 \u0623\u0646 \u064a\u062a\u0645 \u0623\u064a \u0635\u0628\u063a\u0629 \u0623\u0648 \u062a\u0641\u062a\u064a\u062d \u0623\u0648 \u062a\u0639\u062f\u064a\u0644 \u0644\u0644\u0648\u0646 \u0645\u0646 \u0642\u0628\u0644 \u0641\u0631\u064a\u0642\u0646\u0627 \u0641\u0642\u0637. \u0646\u062d\u0646 \u0644\u0627 \u0646\u0636\u0645\u0646 \u0627\u0644\u0646\u062a\u064a\u062c\u0629 \u0623\u0648 \u062d\u0627\u0644\u0629 \u0627\u0644\u0628\u0627\u0631\u0648\u0643\u0629 \u0641\u064a \u062d\u0627\u0644 \u0642\u0627\u0645 \u0634\u062e\u0635 \u0622\u062e\u0631 \u0628\u0627\u0644\u0635\u0628\u063a \u0641\u064a \u0627\u0644\u0645\u0646\u0632\u0644.';

  const tags = ['Premium Quality', lang === 'fr' ? `Couleur ${catLabel}` : `\u0644\u0648\u0646 ${catLabel}`, 'Best Seller'];

  return (
    <div style={{ backgroundColor: 'var(--tb-card)', fontFamily: "'Inter', sans-serif", minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-2">
        <div className="flex items-center gap-2 text-xs flex-wrap" style={{ color: 'var(--tb-text-muted)' }}>
          <button onClick={() => navigate('/')} className="hover:text-[#d4a5a5] transition-colors">Home</button>
          <ChevronRight size={12} />
          <span>Cheveux</span>
          <ChevronRight size={12} />
          <button onClick={backToGrid} className="hover:text-[#d4a5a5] transition-colors">Extensions</button>
          <ChevronRight size={12} />
          <span style={{ color: 'var(--tb-text)' }}>{name}</span>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT \u2014 Image Gallery */}
          <div className="flex gap-3">
            <div className="flex flex-col gap-2 flex-shrink-0">
              {images.map((img, i) => (
                <button key={i} onClick={() => setMainIdx(i)} className="w-16 h-16 overflow-hidden border-2 transition-all" style={{ borderColor: mainIdx === i ? '#d4a5a5' : '#eee', opacity: mainIdx === i ? 1 : 0.7 }}>
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
            <div ref={imgRef} className="relative flex-1 overflow-hidden cursor-crosshair" style={{ minHeight: '400px', maxHeight: '600px' }} onMouseEnter={() => setZoom(true)} onMouseLeave={() => setZoom(false)} onMouseMove={handleMouseMove}>
              <img src={images[mainIdx].src} alt={images[mainIdx].alt} className="w-full h-full object-contain transition-transform duration-300" style={{ transform: zoom ? `scale(2)` : 'scale(1)', transformOrigin: `${zoomPos.x * 100}% ${zoomPos.y * 100}%` }} loading="lazy" />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(0,0,0,0.6)', color: 'var(--tb-card)' }}>
                {mainIdx + 1} / {images.length}
              </div>
            </div>
          </div>

          {/* RIGHT \u2014 Product Details */}
          <div>
            <button onClick={backToGrid} className="flex items-center gap-1 text-xs mb-4 hover:text-[#d4a5a5] transition-colors" style={{ color: '#888' }}>
              <ArrowLeft size={14} /> {t.back}
            </button>
            <h1 className="text-xl sm:text-2xl font-semibold leading-snug mb-2" style={{ color: 'var(--tb-text)', fontWeight: 600 }}>{name}</h1>
            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--tb-text-secondary)' }}>
              {lang === 'fr'
                ? `Extensions à clips de couleur ${catLabel.toLowerCase()} aux longueurs ondul\u00e9es volumineuses. Cheveux humains Remy premium pour un r\u00e9sultat naturel, doux et brillant.`
                : `\u0625\u0643\u0633\u062a\u0646\u0634\u0646 \u0628\u0645\u0634\u0627\u0628\u0643 \u0628\u0627\u0644\u0644\u0648\u0646 ${catLabel} \u0628\u0623\u0637\u0648\u0627\u0644 \u0645\u0645\u0648\u062c\u0629 \u0643\u062b\u064a\u0641\u0629. \u0634\u0639\u0631 \u0628\u0634\u0631\u064a \u0631\u064a\u0645\u064a \u0628\u0631\u064a\u0645\u064a\u0648\u0645 \u0644\u0646\u062a\u064a\u062c\u0629 \u0637\u0628\u064a\u0639\u064a\u0629 \u0648\u0646\u0627\u0639\u0645\u0629 \u0648\u0644\u0627\u0645\u0639\u0629.`}
            </p>
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(s => <Star key={s} size={16} fill={s <= Math.floor(selectedProduct.rating) ? "#f4c430" : "none"} color="#f4c430" />)}
                <span className="text-sm font-semibold ml-1" style={{ color: 'var(--tb-text)' }}>{selectedProduct.rating}</span>
              </div>
              <span className="text-sm" style={{ color: '#888' }}>{selectedProduct.reviews} {lang === 'fr' ? 'Avis' : '\u062a\u0642\u064a\u064a\u0645'}</span>
              <span className="text-sm" style={{ color: '#888' }}>|</span>
              <span className="text-sm font-medium" style={{ color: '#c44' }}>{selectedProduct.sold} {lang === 'fr' ? 'vendus' : '\u0645\u0628\u0627\u0639'}</span>
            </div>
            <div className="flex gap-2 mb-4 flex-wrap">
              {tags.map(tag => <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--tb-surface)', color: 'var(--tb-tint-text)' }}>{tag}</span>)}
            </div>
            <div className="flex items-end gap-3 mb-4 flex-wrap">
              <span className="text-3xl font-bold" style={{ color: '#c44' }}>TND {price.toFixed(2)}</span>
              <span className="text-lg line-through" style={{ color: '#aaa' }}>TND {original.toFixed(2)}</span>
              <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ backgroundColor: '#c44', color: 'var(--tb-card)' }}>-{discount}%</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg mb-5" style={{ backgroundColor: '#fff0f0', border: '1px solid #ffd0d0' }}>
              <Zap size={16} color="#c44" />
              <span className="text-sm" style={{ color: '#c44' }}>{lang === 'fr' ? 'Livraison gratuite + Garantie Qualit\u00e9 30 jours' : '\u062a\u0648\u0635\u064a\u0644 \u0645\u062c\u0627\u0646\u064a + \u0636\u0645\u0627\u0646 \u062c\u0648\u062f\u0629 30 \u064a\u0648\u0645'}</span>
            </div>

            {/* Variant Selectors */}
            <div className="mb-4">
              <p className="text-sm font-medium mb-2" style={{ color: 'var(--tb-text)' }}>{t.length}: <span style={{ color: '#888' }}>{selLength}</span></p>
              <div className="flex gap-2 flex-wrap">
                {lengths.map(l => <button key={l} onClick={() => setSelLength(l)} className="px-3 py-2 text-xs border transition-all" style={{ borderColor: selLength === l ? '#d4a5a5' : 'var(--tb-border)', backgroundColor: selLength === l ? 'var(--tb-tint)' : 'var(--tb-card)', color: selLength === l ? 'var(--tb-tint-text)' : 'var(--tb-text)', fontWeight: selLength === l ? 500 : 400 }}>{l}</button>)}
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm font-medium mb-2" style={{ color: 'var(--tb-text)' }}>{t.density}: <span style={{ color: '#888' }}>{selDensity}</span></p>
              <div className="flex gap-2 flex-wrap">
                {densities.map(d => <button key={d} onClick={() => setSelDensity(d)} className="px-3 py-2 text-xs border transition-all" style={{ borderColor: selDensity === d ? '#d4a5a5' : 'var(--tb-border)', backgroundColor: selDensity === d ? 'var(--tb-tint)' : 'var(--tb-card)', color: selDensity === d ? 'var(--tb-tint-text)' : 'var(--tb-text)', fontWeight: selDensity === d ? 500 : 400 }}>{d}</button>)}
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm font-medium mb-2" style={{ color: 'var(--tb-text)' }}>{t.hairType}: <span style={{ color: '#888' }}>{selHairType}</span></p>
              <div className="flex gap-2 flex-wrap">
                {hairTypes.map(h => <button key={h} onClick={() => setSelHairType(h)} className="px-4 py-2 text-sm border transition-all" style={{ borderColor: selHairType === h ? '#d4a5a5' : 'var(--tb-border)', backgroundColor: selHairType === h ? 'var(--tb-tint)' : 'var(--tb-card)', color: selHairType === h ? 'var(--tb-tint-text)' : 'var(--tb-text)', fontWeight: selHairType === h ? 500 : 400 }}>{h}</button>)}
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm font-medium mb-2" style={{ color: 'var(--tb-text)' }}>{t.capType}: <span style={{ color: '#888' }}>{selCap}</span></p>
              <div className="flex gap-2 flex-wrap">
                {wigCaps.map(c => <button key={c} onClick={() => setSelCap(c)} className="px-3 py-2 text-xs border transition-all" style={{ borderColor: selCap === c ? '#d4a5a5' : 'var(--tb-border)', backgroundColor: selCap === c ? 'var(--tb-tint)' : 'var(--tb-card)', color: selCap === c ? 'var(--tb-tint-text)' : 'var(--tb-text)', fontWeight: selCap === c ? 500 : 400 }}>{c}</button>)}
              </div>
            </div>
            <div className="mb-5">
              <p className="text-sm font-medium mb-2" style={{ color: 'var(--tb-text)' }}>{t.wigSize}: <span style={{ color: '#888' }}>{selSize}</span></p>
              <div className="flex gap-2 flex-wrap">
                {wigSizes.map(s => <button key={s} onClick={() => setSelSize(s)} className="px-4 py-2 text-sm border transition-all" style={{ borderColor: selSize === s ? '#d4a5a5' : 'var(--tb-border)', backgroundColor: selSize === s ? 'var(--tb-tint)' : 'var(--tb-card)', color: selSize === s ? 'var(--tb-tint-text)' : 'var(--tb-text)', fontWeight: selSize === s ? 500 : 400 }}>{s}</button>)}
              </div>
            </div>

            {/* Quantity + Actions */}
            <div className="flex items-center gap-4 mb-5">
              <div className="flex items-center gap-2">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 flex items-center justify-center border rounded" style={{ borderColor: 'var(--tb-border)' }}><Minus size={14} /></button>
                <span className="w-8 text-center text-sm font-medium">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-8 h-8 flex items-center justify-center border rounded" style={{ borderColor: 'var(--tb-border)' }}><Plus size={14} /></button>
              </div>
              <span className="text-xs" style={{ color: '#888' }}>{selectedProduct.stock} {t.stock}</span>
            </div>
            <div className="flex gap-3 mb-6">
              <button onClick={handleAdd} className="flex-1 py-3 rounded-lg text-sm font-medium transition-all" style={{ backgroundColor: added ? '#4a9b5e' : '#d4a5a5', color: 'var(--tb-card)', border: 'none', cursor: 'pointer' }}>
                {added ? <span className="flex items-center justify-center gap-2"><Check size={16} /> {lang === 'fr' ? 'Ajout\u00e9 !' : '\u062a\u0645 \u0627\u0644\u0625\u0636\u0627\u0641\u0629!'}</span> : t.addCart}
              </button>
              <button className="px-4 py-3 rounded-lg border text-sm font-medium transition-all hover:bg-[var(--tb-tint)]" style={{ borderColor: '#d4a5a5', color: 'var(--tb-tint-text)' }}>{t.buyNow}</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border transition-all hover:bg-[var(--tb-tint)]" style={{ borderColor: 'var(--tb-border)' }}><Heart size={18} color="#d4a5a5" /></button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { icon: <Truck size={18} color="#d4a5a5" />, text: t.shipping },
                { icon: <Shield size={18} color="#d4a5a5" />, text: t.guarantee },
                { icon: <Package size={18} color="#d4a5a5" />, text: lang === 'fr' ? 'Livr\u00e9e en 2-5 jours' : '\u062a\u0648\u0635\u064a\u0644 \u0641\u064a 2-5 \u0623\u064a\u0627\u0645' },
                { icon: <Sparkles size={18} color="#d4a5a5" />, text: lang === 'fr' ? 'Qualit\u00e9 Premium' : '\u062c\u0648\u062f\u0629 \u0628\u0631\u064a\u0645\u064a\u0648\u0645' },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: 'var(--tb-bg)' }}>
                  {badge.icon}<span className="text-xs font-medium" style={{ color: 'var(--tb-text-secondary)' }}>{badge.text}</span>
                </div>
              ))}
            </div>

            {/* Color Note */}
            <div className="flex items-start gap-2 p-3 rounded-lg mb-6" style={{ backgroundColor: '#fff8e8', border: '1px solid #ffe0a0' }}>
              <AlertTriangle size={16} color="#c8840a" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p className="text-xs" style={{ color: '#8a6b3d' }}>{colorNote}</p>
            </div>

            {/* Product Info */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--tb-text)' }}>{t.info}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                {specs.map((s, i) => (
                  <div key={i} className="flex justify-between py-1.5" style={{ borderBottom: '1px solid var(--tb-surface)' }}>
                    <span className="text-xs" style={{ color: '#888' }}>{s.label}</span>
                    <span className="text-xs font-medium" style={{ color: 'var(--tb-text)' }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--tb-text)' }}>{t.descTitle}</h3>
              <div className="space-y-2">
                {descBlocks.map((block, i) => <p key={i} className="text-sm leading-relaxed" style={{ color: 'var(--tb-text-secondary)' }}>{block}</p>)}
              </div>
            </div>

            {/* AI Summary */}
            <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--tb-bg)', border: '1px solid var(--tb-surface)' }}>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--tb-text)' }}>
                <Sparkles size={16} color="#d4a5a5" /> {t.aiTitle}
              </h3>
              <ul className="space-y-2">
                {aiItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--tb-text-secondary)' }}>
                    <Check size={14} color="#4a9b5e" style={{ flexShrink: 0, marginTop: '3px' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
