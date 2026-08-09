import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import {
  Star, Heart, ShoppingCart, Minus, Plus, Truck, Shield,
  ChevronRight, Sparkles, Check, Zap, Package, AlertTriangle, ArrowLeft
} from 'lucide-react';
import Footer from '../sections/Footer';

/* ═══════════════════════════════════════════
   PRODUCT DATA — 51 Long Wigs by Color Category
   ═══════════════════════════════════════════ */

interface WigProduct {
  id: string;
  nameFr: string;
  nameAr: string;
  image: string;
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
  { id: 'll001', nameFr: 'Frange Noire Lisse Élégance', nameAr: 'غرة سوداء ناعمة أنيقة', image: '/images/perruques/long/ll001.jpg', typeFr: 'Perruque Longue — Noir Naturel', typeAr: 'باروكة طويلة — أسود طبيعي', basePrice: 444, rating: 4.2, reviews: 35, sold: 26, stock: 62, category: 'natural-black', categoryFr: 'Noir Naturel', categoryAr: 'أسود طبيعي' },
  { id: 'll002', nameFr: 'Frange Noire Lisse Glamour', nameAr: 'غرة سوداء ناعمة جلامور', image: '/images/perruques/long/ll002.jpg', typeFr: 'Perruque Longue — Noir Naturel', typeAr: 'باروكة طويلة — أسود طبيعي', basePrice: 489, rating: 4.2, reviews: 29, sold: 48, stock: 54, category: 'natural-black', categoryFr: 'Noir Naturel', categoryAr: 'أسود طبيعي' },
  { id: 'll003', nameFr: 'Frange Noire Lisse Soyeuse', nameAr: 'غرة سوداء ناعمة حريرية', image: '/images/perruques/long/ll003.jpg', typeFr: 'Perruque Longue — Noir Naturel', typeAr: 'باروكة طويلة — أسود طبيعي', basePrice: 411, rating: 4.7, reviews: 54, sold: 64, stock: 50, category: 'natural-black', categoryFr: 'Noir Naturel', categoryAr: 'أسود طبيعي' },
  { id: 'll048', nameFr: 'Noir Lisse Long Intense', nameAr: 'أسود ناعم طويل كثيف', image: '/images/perruques/long/ll048.jpg', typeFr: 'Perruque Longue — Noir Naturel', typeAr: 'باروكة طويلة — أسود طبيعي', basePrice: 415, rating: 4.3, reviews: 48, sold: 44, stock: 41, category: 'natural-black', categoryFr: 'Noir Naturel', categoryAr: 'أسود طبيعي' },
  { id: 'll004', nameFr: 'Châtain Foncé Vague Élégance', nameAr: 'كستنائي داكن مموج أنيق', image: '/images/perruques/long/ll004.jpg', typeFr: 'Perruque Longue — Châtain Foncé', typeAr: 'باروكة طويلة — كستنائي داكن', basePrice: 503, rating: 4.9, reviews: 10, sold: 52, stock: 58, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'll005', nameFr: 'Châtain Foncé Vague Glamour', nameAr: 'كستنائي داكن مموج جلامور', image: '/images/perruques/long/ll005.jpg', typeFr: 'Perruque Longue — Châtain Foncé', typeAr: 'باروكة طويلة — كستنائي داكن', basePrice: 393, rating: 4.8, reviews: 11, sold: 32, stock: 60, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'll006', nameFr: 'Châtain Foncé Vague Soyeuse', nameAr: 'كستنائي داكن مموج حريري', image: '/images/perruques/long/ll006.jpg', typeFr: 'Perruque Longue — Châtain Foncé', typeAr: 'باروكة طويلة — كستنائي داكن', basePrice: 510, rating: 4.6, reviews: 8, sold: 52, stock: 36, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'll007', nameFr: 'Châtain Foncé Vague Volume', nameAr: 'كستنائي داكن مموج كثيف', image: '/images/perruques/long/ll007.jpg', typeFr: 'Perruque Longue — Châtain Foncé', typeAr: 'باروكة طويلة — كستنائي داكن', basePrice: 429, rating: 4.7, reviews: 43, sold: 59, stock: 57, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'll008', nameFr: 'Frange Châtain Foncé Lisse', nameAr: 'غرة كستنائية داكنة ناعمة', image: '/images/perruques/long/ll008.jpg', typeFr: 'Perruque Longue — Châtain Foncé', typeAr: 'باروكة طويلة — كستنائي داكن', basePrice: 402, rating: 4.4, reviews: 27, sold: 51, stock: 37, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'll012', nameFr: 'Frange Châtain Foncé Vague Douce', nameAr: 'غرة كستنائية داكنة مموجة ناعمة', image: '/images/perruques/long/ll012.jpg', typeFr: 'Perruque Longue — Châtain Foncé', typeAr: 'باروكة طويلة — كستنائي داكن', basePrice: 518, rating: 4.6, reviews: 46, sold: 15, stock: 42, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'll015', nameFr: 'Frange Châtain Foncé Lisse Intense', nameAr: 'غرة كستنائية داكنة ناعمة كثيفة', image: '/images/perruques/long/ll015.jpg', typeFr: 'Perruque Longue — Châtain Foncé', typeAr: 'باروكة طويلة — كستنائي داكن', basePrice: 409, rating: 4.4, reviews: 49, sold: 20, stock: 65, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'll036', nameFr: 'Balayage Châtain Foncé Vague', nameAr: 'كستنائي داكن مموج بالياج', image: '/images/perruques/long/ll036.jpg', typeFr: 'Perruque Longue — Châtain Foncé', typeAr: 'باروكة طويلة — كستنائي داكن', basePrice: 414, rating: 4.2, reviews: 9, sold: 28, stock: 38, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'll037', nameFr: 'Balayage Châtain Foncé Vague Soyeux', nameAr: 'كستنائي داكن مموج بالياج حريري', image: '/images/perruques/long/ll037.jpg', typeFr: 'Perruque Longue — Châtain Foncé', typeAr: 'باروكة طويلة — كستنائي داكن', basePrice: 396, rating: 4.8, reviews: 35, sold: 22, stock: 44, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'll038', nameFr: 'Balayage Châtain Foncé Vague Glamour', nameAr: 'كستنائي داكن مموج بالياج جلامور', image: '/images/perruques/long/ll038.jpg', typeFr: 'Perruque Longue — Châtain Foncé', typeAr: 'باروكة طويلة — كستنائي داكن', basePrice: 456, rating: 4.4, reviews: 47, sold: 17, stock: 64, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'll040', nameFr: 'Châtain Foncé Vague Royal', nameAr: 'كستنائي داكن مموج ملكي', image: '/images/perruques/long/ll040.jpg', typeFr: 'Perruque Longue — Châtain Foncé', typeAr: 'باروكة طويلة — كستنائي داكن', basePrice: 457, rating: 4.4, reviews: 37, sold: 21, stock: 42, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'll041', nameFr: 'Triptyque Châtain Foncé Mixte', nameAr: 'ثلاثي كستنائي داكن مختلط', image: '/images/perruques/long/ll041.jpg', typeFr: 'Perruque Longue — Châtain Foncé', typeAr: 'باروكة طويلة — كستنائي داكن', basePrice: 467, rating: 4.7, reviews: 31, sold: 20, stock: 50, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'll009', nameFr: 'Balayage Châtain Clair Lisse', nameAr: 'كستنائي فاتح ناعم بالياج', image: '/images/perruques/long/ll009.jpg', typeFr: 'Perruque Longue — Châtain', typeAr: 'باروكة طويلة — كستنائي', basePrice: 397, rating: 5.0, reviews: 38, sold: 49, stock: 44, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'll010', nameFr: 'Balayage Châtain Doré Lisse', nameAr: 'كستنائي ذهبي ناعم بالياج', image: '/images/perruques/long/ll010.jpg', typeFr: 'Perruque Longue — Châtain', typeAr: 'باروكة طويلة — كستنائي', basePrice: 503, rating: 4.5, reviews: 45, sold: 62, stock: 51, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'll013', nameFr: 'Ombré Châtain Blond Lisse', nameAr: 'كستنائي أشقر ناعم أومبره', image: '/images/perruques/long/ll013.jpg', typeFr: 'Perruque Longue — Châtain', typeAr: 'باروكة طويلة — كستنائي', basePrice: 390, rating: 4.4, reviews: 49, sold: 47, stock: 65, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'll049', nameFr: 'Balayage Châtain Blond Vague', nameAr: 'كستنائي أشقر مموج بالياج', image: '/images/perruques/long/ll049.jpg', typeFr: 'Perruque Longue — Châtain', typeAr: 'باروكة طويلة — كستنائي', basePrice: 508, rating: 4.8, reviews: 20, sold: 42, stock: 59, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'll051', nameFr: 'Frange Cuivre Vague Intense', nameAr: 'غرة نحاسية مموجة كثيفة', image: '/images/perruques/long/ll051.jpg', typeFr: 'Perruque Longue — Rouge', typeAr: 'باروكة طويلة — أحمر', basePrice: 475, rating: 4.7, reviews: 32, sold: 38, stock: 55, category: 'red', categoryFr: 'Rouge', categoryAr: 'أحمر' },
  { id: 'll011', nameFr: 'Triptyque Balayage Mixte Élégance', nameAr: 'ثلاثي بالياج مختلط أنيق', image: '/images/perruques/long/ll011.jpg', typeFr: 'Perruque Longue — Highlight', typeAr: 'باروكة طويلة — هايلايت', basePrice: 390, rating: 4.2, reviews: 36, sold: 56, stock: 53, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'll014', nameFr: 'Balayage Blond Vague Élégance', nameAr: 'أشقر مموج بالياج أنيق', image: '/images/perruques/long/ll014.jpg', typeFr: 'Perruque Longue — Highlight', typeAr: 'باروكة طويلة — هايلايت', basePrice: 495, rating: 4.3, reviews: 42, sold: 29, stock: 64, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'll016', nameFr: 'Balayage Blond Vague Glamour', nameAr: 'أشقر مموج بالياج جلامور', image: '/images/perruques/long/ll016.jpg', typeFr: 'Perruque Longue — Highlight', typeAr: 'باروكة طويلة — هايلايت', basePrice: 497, rating: 4.3, reviews: 45, sold: 45, stock: 63, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'll017', nameFr: 'Balayage Blond Vague Douce', nameAr: 'أشقر مموج بالياج ناعم', image: '/images/perruques/long/ll017.jpg', typeFr: 'Perruque Longue — Highlight', typeAr: 'باروكة طويلة — هايلايت', basePrice: 451, rating: 4.1, reviews: 16, sold: 22, stock: 43, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'll022', nameFr: 'Racines Foncées Blond Lisse', nameAr: 'أشقر ناعم بجذور داكنة', image: '/images/perruques/long/ll022.jpg', typeFr: 'Perruque Longue — Highlight', typeAr: 'باروكة طويلة — هايلايت', basePrice: 407, rating: 4.6, reviews: 49, sold: 47, stock: 59, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'll018', nameFr: 'Blond Bouclé Volume Intense', nameAr: 'أشقر مجعد كثيف كثيف', image: '/images/perruques/long/ll018.jpg', typeFr: 'Perruque Longue — Blond', typeAr: 'باروكة طويلة — أشقر', basePrice: 493, rating: 4.7, reviews: 20, sold: 13, stock: 41, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'll019', nameFr: 'Blond Bouclé Glamour', nameAr: 'أشقر مجعد جلامور', image: '/images/perruques/long/ll019.jpg', typeFr: 'Perruque Longue — Blond', typeAr: 'باروكة طويلة — أشقر', basePrice: 390, rating: 4.3, reviews: 55, sold: 47, stock: 52, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'll020', nameFr: 'Blond Bouclé Soyeux Arrière', nameAr: 'أشقر مجعد حريري خلفي', image: '/images/perruques/long/ll020.jpg', typeFr: 'Perruque Longue — Blond', typeAr: 'باروكة طويلة — أشقر', basePrice: 455, rating: 4.2, reviews: 25, sold: 63, stock: 58, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'll021', nameFr: 'Blond Vague Élégance', nameAr: 'أشقر مموج أنيق', image: '/images/perruques/long/ll021.jpg', typeFr: 'Perruque Longue — Blond', typeAr: 'باروكة طويلة — أشقر', basePrice: 513, rating: 4.5, reviews: 26, sold: 13, stock: 46, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'll023', nameFr: 'Triptyque Racines Foncées Blond Vague', nameAr: 'ثلاثي أشقر مموج بجذور داكنة', image: '/images/perruques/long/ll023.jpg', typeFr: 'Perruque Longue — Blond', typeAr: 'باروكة طويلة — أشقر', basePrice: 418, rating: 4.6, reviews: 41, sold: 31, stock: 57, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'll024', nameFr: 'Racines Foncées Blond Vague', nameAr: 'أشقر مموج بجذور داكنة', image: '/images/perruques/long/ll024.jpg', typeFr: 'Perruque Longue — Blond', typeAr: 'باروكة طويلة — أشقر', basePrice: 445, rating: 4.5, reviews: 18, sold: 70, stock: 61, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'll025', nameFr: 'Racines Foncées Blond Arrière', nameAr: 'أشقر خلفي بجذور داكنة', image: '/images/perruques/long/ll025.jpg', typeFr: 'Perruque Longue — Blond', typeAr: 'باروكة طويلة — أشقر', basePrice: 432, rating: 4.9, reviews: 30, sold: 63, stock: 44, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'll026', nameFr: 'Blond Vague Side Élégance', nameAr: 'أشقر مموج جانبي أنيق', image: '/images/perruques/long/ll026.jpg', typeFr: 'Perruque Longue — Blond', typeAr: 'باروكة طويلة — أشقر', basePrice: 457, rating: 5.0, reviews: 52, sold: 49, stock: 43, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'll027', nameFr: 'Balayage Blond Lisse Racines Foncées', nameAr: 'أشقر ناعم بالياج بجذور داكنة', image: '/images/perruques/long/ll027.jpg', typeFr: 'Perruque Longue — Blond', typeAr: 'باروكة طويلة — أشقر', basePrice: 520, rating: 4.4, reviews: 17, sold: 22, stock: 57, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'll028', nameFr: 'Balayage Blond Lisse Soyeux', nameAr: 'أشقر ناعم بالياج حريري', image: '/images/perruques/long/ll028.jpg', typeFr: 'Perruque Longue — Blond', typeAr: 'باروكة طويلة — أشقر', basePrice: 428, rating: 4.5, reviews: 20, sold: 56, stock: 39, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'll029', nameFr: 'Balayage Blond Vague Side', nameAr: 'أشقر مموج بالياج جانبي', image: '/images/perruques/long/ll029.jpg', typeFr: 'Perruque Longue — Blond', typeAr: 'باروكة طويلة — أشقر', basePrice: 436, rating: 4.3, reviews: 34, sold: 52, stock: 39, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'll030', nameFr: 'Balayage Blond Vague Glamour', nameAr: 'أشقر مموج بالياج جلامور', image: '/images/perruques/long/ll030.jpg', typeFr: 'Perruque Longue — Blond', typeAr: 'باروكة طويلة — أشقر', basePrice: 461, rating: 4.3, reviews: 11, sold: 57, stock: 60, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'll031', nameFr: 'Triptyque Balayage Blond Mixte', nameAr: 'ثلاثي أشقر بالياج مختلط', image: '/images/perruques/long/ll031.jpg', typeFr: 'Perruque Longue — Blond', typeAr: 'باروكة طويلة — أشقر', basePrice: 432, rating: 4.4, reviews: 18, sold: 19, stock: 43, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'll032', nameFr: 'Platine Lisse Argenté Intense', nameAr: 'فضي ناعم بلاتيني كثيف', image: '/images/perruques/long/ll032.jpg', typeFr: 'Perruque Longue — Blond', typeAr: 'باروكة طويلة — أشقر', basePrice: 425, rating: 4.2, reviews: 29, sold: 64, stock: 49, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'll033', nameFr: 'Balayage Blond Vague Soyeuse', nameAr: 'أشقر مموج بالياج حريري', image: '/images/perruques/long/ll033.jpg', typeFr: 'Perruque Longue — Blond', typeAr: 'باروكة طويلة — أشقر', basePrice: 453, rating: 4.6, reviews: 26, sold: 30, stock: 51, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'll034', nameFr: 'Bleu Nuit Lisse Intense', nameAr: 'أزرق ليلي ناعم كثيف', image: '/images/perruques/long/ll034.jpg', typeFr: 'Perruque Longue — Blond', typeAr: 'باروكة طويلة — أشقر', basePrice: 429, rating: 4.6, reviews: 35, sold: 51, stock: 47, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'll035', nameFr: 'Balayage Blond Vague Intense', nameAr: 'أشقر مموج بالياج كثيف', image: '/images/perruques/long/ll035.jpg', typeFr: 'Perruque Longue — Blond', typeAr: 'باروكة طويلة — أشقر', basePrice: 514, rating: 4.5, reviews: 14, sold: 33, stock: 56, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'll039', nameFr: 'Balayage Blond Vague Élégance', nameAr: 'أشقر مموج بالياج أنيق', image: '/images/perruques/long/ll039.jpg', typeFr: 'Perruque Longue — Blond', typeAr: 'باروكة طويلة — أشقر', basePrice: 469, rating: 4.6, reviews: 20, sold: 22, stock: 39, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'll042', nameFr: 'Balayage Châtain Foncé Vague Floral', nameAr: 'كستنائي داكن مموج بالياج زهري', image: '/images/perruques/long/ll042.jpg', typeFr: 'Perruque Longue — Blond', typeAr: 'باروكة طويلة — أشقر', basePrice: 464, rating: 4.6, reviews: 42, sold: 21, stock: 64, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'll043', nameFr: 'Racines Foncées Blond Balayage', nameAr: 'أشقر بالياج بجذور داكنة', image: '/images/perruques/long/ll043.jpg', typeFr: 'Perruque Longue — Blond', typeAr: 'باروكة طويلة — أشقر', basePrice: 512, rating: 4.8, reviews: 16, sold: 32, stock: 53, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'll044', nameFr: 'Balayage Blond Vague Royal', nameAr: 'أشقر مموج بالياج ملكي', image: '/images/perruques/long/ll044.jpg', typeFr: 'Perruque Longue — Blond', typeAr: 'باروكة طويلة — أشقر', basePrice: 456, rating: 4.5, reviews: 24, sold: 56, stock: 38, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'll045', nameFr: 'Blond Lisse Soyeux Arrière', nameAr: 'أشقر ناعم حريري خلفي', image: '/images/perruques/long/ll045.jpg', typeFr: 'Perruque Longue — Blond', typeAr: 'باروكة طويلة — أشقر', basePrice: 442, rating: 4.1, reviews: 37, sold: 27, stock: 40, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'll046', nameFr: 'Frange Blonde Lisse Élégance', nameAr: 'غرة أشقر ناعمة أنيقة', image: '/images/perruques/long/ll046.jpg', typeFr: 'Perruque Longue — Blond', typeAr: 'باروكة طويلة — أشقر', basePrice: 502, rating: 4.9, reviews: 24, sold: 62, stock: 47, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'll047', nameFr: 'Balayage Blond Vague Prestige', nameAr: 'أشقر مموج بالياج بريستيج', image: '/images/perruques/long/ll047.jpg', typeFr: 'Perruque Longue — Blond', typeAr: 'باروكة طويلة — أشقر', basePrice: 391, rating: 4.7, reviews: 42, sold: 16, stock: 55, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'll050', nameFr: 'Balayage Blond Platine Vague', nameAr: 'أشقر بلاتيني مموج بالياج', image: '/images/perruques/long/ll050.jpg', typeFr: 'Perruque Longue — Blond', typeAr: 'باروكة طويلة — أشقر', basePrice: 494, rating: 4.5, reviews: 12, sold: 45, stock: 60, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
];



/* ═══════════════════════════════════════════
   VARIANT OPTIONS (shared)
   ═══════════════════════════════════════════ */

const lengths = ['10 pouces', '12 pouces', '14 pouces', '16 pouces', '18 pouces'];
const densities = ['120%', '150%', '180%', '220%', '280%'];
const hairTypes = ['Lisses', 'Ondul\u00e9s', 'Cr\u00e9pus', 'Fris\u00e9s'];
const wigCaps = [
  '5\u00d75 Glueless Wig', '13\u00d74 Lace Front Wig', '13\u00d76 Lace Front Wig',
  '2\u00d76 Lace', '6\u00d76 Closure Wig', '7\u00d77 Closure Wig',
  '360\u00b0 Lace', 'Full Lace Wig', 'Silicone M\u00e9dicale', 'Silk M\u00e9dicale', 'Mono M\u00e9dicale',
];
const wigSizes = ['Standard', 'Taille S', 'Taille M', 'Taille L', 'Sur Mesure'];

const priceMap: Record<string, number> = {
  '10 pouces': -150, '12 pouces': -100, '14 pouces': -50, '16 pouces': 0, '18 pouces': 80,
};
const originalMap: Record<string, number> = {
  '10 pouces': -350, '12 pouces': -250, '14 pouces': -120, '16 pouces': 0, '18 pouces': 180,
};

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */

export default function PerruquesMiLong() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get('product');

  const [mainIdx, setMainIdx] = useState(0);
  const [selLength, setSelLength] = useState('14 pouces');
  const [selDensity, setSelDensity] = useState('180%');
  const [selHairType, setSelHairType] = useState('Ondul\u00e9s');
  const [selCap, setSelCap] = useState('13\u00d76 Lace Front Wig');
  const [selSize, setSelSize] = useState('Standard');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0.5, y: 0.5 });
  const imgRef = useRef<HTMLDivElement>(null);

  const selectedProduct = products.find(p => p.id === selectedId);

  const basePrice = selectedProduct?.basePrice || 420;
  const price = basePrice + (priceMap[selLength] || 0);
  const original = (basePrice + 400) + (originalMap[selLength] || 0);
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
    setSelLength('14 pouces');
    setSelDensity('180%');
    setSelHairType('Ondul\u00e9s');
    setSelCap('13\u00d76 Lace Front Wig');
    setSelSize('Standard');
    setQty(1);
  };

  const backToGrid = () => {
    setSearchParams({});
  };

  // Group products by category
  const grouped = products.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {} as Record<string, WigProduct[]>);

  /* ───── GRID VIEW ───── */
  if (!selectedProduct) {
    return (
      <div style={{ backgroundColor: '#faf6f4', fontFamily: "'Inter', sans-serif", minHeight: '100vh' }}>
        {/* Header */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-24 sm:pt-28 pb-3 sm:pb-4">
          <div className="flex items-center gap-2 text-xs mb-2 sm:mb-4" style={{ color: '#8a8a8a' }}>
            <button onClick={() => navigate('/')} className="hover:text-[#d4a5a5] transition-colors">Home</button>
            <ChevronRight size={12} />
            <span>Cheveux</span>
            <ChevronRight size={12} />
            <span>Perruques</span>
            <ChevronRight size={12} />
            <span style={{ color: '#333' }}>Longues</span>
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#d4a5a5', marginBottom: '8px' }}>
            {lang === 'fr' ? 'COLLECTION PERRUQUES LONGUES \u2014 51 MOD\u00c8LES' : '\u0645\u062c\u0645\u0648\u0639\u0629 \u0627\u0644\u0628\u0627\u0631\u0648\u0643\u0627\u062a \u0627\u0644\u0637\u0648\u064a\u0644\u0629 \u2014 51 \u0645\u0648\u062f\u064a\u0644'}
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#d4a5a5', lineHeight: 1.15, marginBottom: '8px' }}>
            {lang === 'fr' ? 'Perruques Longues' : '\u0628\u0627\u0631\u0648\u0643\u0627\u062a \u0637\u0648\u064a\u0644\u0629'}
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
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', color: '#d4a5a5' }}>
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
                        style={{ backgroundColor: '#ffffff', transition: 'all 0.4s ease' }}
                        onClick={() => openProduct(q.id)}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                      >
                        <div className="relative overflow-hidden flex items-center justify-center" style={{ aspectRatio: '1/1.15', backgroundColor: '#f5ece8' }}>
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-xs font-semibold z-10" style={{ backgroundColor: 'rgba(255,255,255,0.85)', color: '#555', fontSize: '10px', letterSpacing: '0.05em' }}>
                            {String(products.indexOf(q) + 1).padStart(2, '0')}
                          </span>
                          <img src={q.image} alt={lang === 'fr' ? q.nameFr : q.nameAr} className="w-full h-full object-cover sm:object-contain transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                        </div>
                        <div className="p-2 sm:p-4">
                          <h3 className="text-xs sm:text-sm font-medium leading-snug mb-1 sm:mb-2" style={{ fontFamily: "'Inter', sans-serif", color: '#1a1a1a', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.4 }}>
                            {lang === 'fr' ? q.nameFr : q.nameAr}
                          </h3>
                          <div className="flex items-center justify-between mb-1 sm:mb-2">
                            <span className="text-xs sm:text-base font-semibold" style={{ fontFamily: "'Inter', sans-serif", color: '#d4a5a5' }}>
                              <span className="sm:hidden">{q.basePrice} TND</span>
                              <span className="hidden sm:inline">{lang === 'fr' ? `\u00c0 partir de ${q.basePrice} TND` : `\u0627\u0628\u062a\u062f\u0627\u0621\u064b \u0645\u0646 ${q.basePrice} \u062f.\u062a`}</span>
                            </span>
                          </div>
                          <button className="w-full py-1.5 sm:py-2.5 rounded-lg transition-colors duration-300" style={{ backgroundColor: '#3a1a2a', color: '#ffffff', fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '10px', letterSpacing: '0.04em', border: 'none', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#d4a5a5'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#3a1a2a'; }}>
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
    capType: lang === 'fr' ? 'Bonnet de Perruque' : '\u0642\u0628\u0639\u0629 \u0627\u0644\u0628\u0627\u0631\u0648\u0643\u0629',
    wigSize: lang === 'fr' ? 'Taille de Perruque' : '\u062d\u062c\u0645 \u0627\u0644\u0628\u0627\u0631\u0648\u0643\u0629',
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

  const images = [
    { src: selectedProduct.image, alt: selectedProduct.nameFr },
    { src: selectedProduct.image, alt: selectedProduct.nameFr + ' - vue 2' },
    { src: selectedProduct.image, alt: selectedProduct.nameFr + ' - vue 3' },
  ];

  const catLabel = lang === 'fr' ? selectedProduct.categoryFr : selectedProduct.categoryAr;
  const name = lang === 'fr' ? selectedProduct.nameFr : selectedProduct.nameAr;

  const specs = [
    { label: lang === 'fr' ? 'Mat\u00e9riau' : '\u0627\u0644\u0645\u0627\u062f\u0629', value: lang === 'fr' ? '100% Cheveux Humains Remy' : '100% \u0634\u0639\u0631 \u0628\u0634\u0631\u064a \u0631\u064a\u0645\u064a' },
    { label: lang === 'fr' ? 'Type' : '\u0627\u0644\u0646\u0648\u0639', value: lang === 'fr' ? 'Ondul\u00e9s Glamour' : '\u0645\u0645\u0648\u062c \u0623\u0646\u064a\u0642' },
    { label: lang === 'fr' ? 'Densit\u00e9' : '\u0627\u0644\u0643\u062b\u0627\u0641\u0629', value: '130% \u2013 280%' },
    { label: lang === 'fr' ? 'Longueur' : '\u0627\u0644\u0637\u0648\u0644', value: '10" \u2013 18"' },
    { label: lang === 'fr' ? 'Couleur' : '\u0627\u0644\u0644\u0648\u0646', value: catLabel },
    { label: lang === 'fr' ? 'Racines' : '\u0627\u0644\u062c\u0630\u0648\u0631', value: lang === 'fr' ? 'Fondues Naturelles' : '\u062c\u0630\u0648\u0631 \u0645\u062a\u062f\u0631\u062c\u0629 \u0637\u0628\u064a\u0639\u064a\u0629' },
    { label: lang === 'fr' ? 'Lace' : '\u0627\u0644\u0644\u064a\u0633', value: 'HD Transparent Lace Front' },
    { label: lang === 'fr' ? 'Texture' : '\u0627\u0644\u0645\u0644\u0645\u0633', value: lang === 'fr' ? 'Souples Volumineuses' : '\u0646\u0627\u0639\u0645\u0629 \u0643\u062b\u064a\u0641\u0629' },
    { label: lang === 'fr' ? 'Poids' : '\u0627\u0644\u0648\u0632\u0646', value: '140g \u2013 220g' },
  ];

  const descBlocks = lang === 'fr' ? [
    `Perruque Lace Front Premium ${name} \u2014 Qualit\u00e9 Haut de Gamme`,
    `Cette magnifique perruque longue de couleur ${catLabel.toLowerCase()} est confectionn\u00e9e avec des cheveux humains Remy de premi\u00e8re qualit\u00e9. Les fibres offrent une douceur soyeuse, une brillance naturelle et un mouvement fluide pour un r\u00e9sultat ultra-r\u00e9aliste.`,
    `La lace front HD transparente assure une int\u00e9gration parfaite et une ligne frontale discr\u00e8te. Densit\u00e9 personnalisable de 130% \u00e0 280%, longueurs disponibles de 10" \u00e0 18".`,
  ] : [
    `\u0628\u0627\u0631\u0648\u0643\u0629 \u0644\u064a\u0633 \u0641\u0631\u0648\u0646\u062a \u0628\u0631\u064a\u0645\u064a\u0648\u0645 ${name} \u2014 \u062c\u0648\u062f\u0629 \u0639\u0627\u0644\u064a\u0629`,
    `\u0647\u0630\u0647 \u0627\u0644\u0628\u0627\u0631\u0648\u0643\u0629 \u0627\u0644\u0645\u062a\u0648\u0633\u0637\u0629 \u0627\u0644\u0631\u0627\u0626\u0639\u0629 \u0628\u0627\u0644\u0644\u0648\u0646 ${catLabel} \u0645\u0635\u0646\u0648\u0639\u0629 \u0645\u0646 \u0634\u0639\u0631 \u0628\u0634\u0631\u064a \u0631\u064a\u0645\u064a \u0641\u0627\u0626\u0642 \u0627\u0644\u062c\u0648\u062f\u0629. \u062a\u0648\u0641\u0631 \u0627\u0644\u0623\u0644\u064a\u0627\u0641 \u0646\u0639\u0648\u0645\u0629 \u062d\u0631\u064a\u0631\u064a\u0629 \u0648\u0644\u0645\u0639\u0627\u0646 \u0637\u0628\u064a\u0639\u064a \u0648\u062d\u0631\u0643\u0629 \u0633\u0644\u0633\u0629 \u0644\u0646\u062a\u064a\u062c\u0629 \u0641\u0627\u0626\u0642\u0629 \u0627\u0644\u0648\u0627\u0642\u0639\u064a\u0629.`,
    `\u064a\u0636\u0645\u0646 \u0627\u0644\u0644\u064a\u0633 \u0641\u0631\u0648\u0646\u062a \u0627\u0644\u0634\u0641\u0627\u0641 HD \u0627\u0646\u062f\u0645\u0627\u062c\u0627\u064b \u0645\u062b\u0627\u0644\u064a\u0627\u064b \u0648\u062e\u0637\u0627\u064b \u0623\u0645\u0627\u0645\u064a\u0627\u064b \u062f\u0642\u064a\u0642\u0627\u064b. \u0643\u062b\u0627\u0641\u0629 \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u062a\u062e\u0635\u064a\u0635 \u0645\u0646 130% \u0625\u0644\u0649 280%\u060c \u0648\u0623\u0637\u0648\u0627\u0644 \u0645\u062a\u0648\u0641\u0631\u0629 \u0645\u0646 10" \u0625\u0644\u0649 18".`,
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
    <div style={{ backgroundColor: '#ffffff', fontFamily: "'Inter', sans-serif", minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-2">
        <div className="flex items-center gap-2 text-xs flex-wrap" style={{ color: '#8a8a8a' }}>
          <button onClick={() => navigate('/')} className="hover:text-[#d4a5a5] transition-colors">Home</button>
          <ChevronRight size={12} />
          <span>Cheveux</span>
          <ChevronRight size={12} />
          <button onClick={backToGrid} className="hover:text-[#d4a5a5] transition-colors">Perruques</button>
          <ChevronRight size={12} />
          <span style={{ color: '#333' }}>{name}</span>
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
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div ref={imgRef} className="relative flex-1 overflow-hidden bg-gray-50 cursor-crosshair" style={{ minHeight: '400px', maxHeight: '600px' }} onMouseEnter={() => setZoom(true)} onMouseLeave={() => setZoom(false)} onMouseMove={handleMouseMove}>
              <img src={images[mainIdx].src} alt={images[mainIdx].alt} className="w-full h-full object-contain transition-transform duration-300" style={{ transform: zoom ? `scale(2)` : 'scale(1)', transformOrigin: `${zoomPos.x * 100}% ${zoomPos.y * 100}%` }} />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff' }}>
                {mainIdx + 1} / {images.length}
              </div>
            </div>
          </div>

          {/* RIGHT \u2014 Product Details */}
          <div>
            <button onClick={backToGrid} className="flex items-center gap-1 text-xs mb-4 hover:text-[#d4a5a5] transition-colors" style={{ color: '#888' }}>
              <ArrowLeft size={14} /> {t.back}
            </button>
            <h1 className="text-xl sm:text-2xl font-semibold leading-snug mb-2" style={{ color: '#1a1a1a', fontWeight: 600 }}>{name}</h1>
            <p className="text-sm leading-relaxed mb-3" style={{ color: '#666' }}>
              {lang === 'fr'
                ? `Perruque Lace Front longue de couleur ${catLabel.toLowerCase()} aux longueurs ondul\u00e9es volumineuses. Cheveux humains Remy premium pour un r\u00e9sultat naturel, doux et brillant.`
                : `\u0628\u0627\u0631\u0648\u0643\u0629 \u0644\u064a\u0633 \u0641\u0631\u0648\u0646\u062a \u0645\u062a\u0648\u0633\u0637\u0629 \u0628\u0627\u0644\u0644\u0648\u0646 ${catLabel} \u0628\u0623\u0637\u0648\u0627\u0644 \u0645\u0645\u0648\u062c\u0629 \u0643\u062b\u064a\u0641\u0629. \u0634\u0639\u0631 \u0628\u0634\u0631\u064a \u0631\u064a\u0645\u064a \u0628\u0631\u064a\u0645\u064a\u0648\u0645 \u0644\u0646\u062a\u064a\u062c\u0629 \u0637\u0628\u064a\u0639\u064a\u0629 \u0648\u0646\u0627\u0639\u0645\u0629 \u0648\u0644\u0627\u0645\u0639\u0629.`}
            </p>
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(s => <Star key={s} size={16} fill={s <= Math.floor(selectedProduct.rating) ? "#f4c430" : "none"} color="#f4c430" />)}
                <span className="text-sm font-semibold ml-1" style={{ color: '#333' }}>{selectedProduct.rating}</span>
              </div>
              <span className="text-sm" style={{ color: '#888' }}>{selectedProduct.reviews} {lang === 'fr' ? 'Avis' : '\u062a\u0642\u064a\u064a\u0645'}</span>
              <span className="text-sm" style={{ color: '#888' }}>|</span>
              <span className="text-sm font-medium" style={{ color: '#c44' }}>{selectedProduct.sold} {lang === 'fr' ? 'vendus' : '\u0645\u0628\u0627\u0639'}</span>
            </div>
            <div className="flex gap-2 mb-4 flex-wrap">
              {tags.map(tag => <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#f0e8e4', color: '#8a6b5d' }}>{tag}</span>)}
            </div>
            <div className="flex items-end gap-3 mb-4 flex-wrap">
              <span className="text-3xl font-bold" style={{ color: '#c44' }}>TND {price.toFixed(2)}</span>
              <span className="text-lg line-through" style={{ color: '#aaa' }}>TND {original.toFixed(2)}</span>
              <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ backgroundColor: '#c44', color: '#fff' }}>-{discount}%</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg mb-5" style={{ backgroundColor: '#fff0f0', border: '1px solid #ffd0d0' }}>
              <Zap size={16} color="#c44" />
              <span className="text-sm" style={{ color: '#c44' }}>{lang === 'fr' ? 'Livraison gratuite + Garantie Qualit\u00e9 30 jours' : '\u062a\u0648\u0635\u064a\u0644 \u0645\u062c\u0627\u0646\u064a + \u0636\u0645\u0627\u0646 \u062c\u0648\u062f\u0629 30 \u064a\u0648\u0645'}</span>
            </div>

            {/* Variant Selectors */}
            <div className="mb-4">
              <p className="text-sm font-medium mb-2" style={{ color: '#333' }}>{t.length}: <span style={{ color: '#888' }}>{selLength}</span></p>
              <div className="flex gap-2 flex-wrap">
                {lengths.map(l => <button key={l} onClick={() => setSelLength(l)} className="px-3 py-2 text-xs border transition-all" style={{ borderColor: selLength === l ? '#d4a5a5' : '#ddd', backgroundColor: selLength === l ? '#faf0ec' : '#fff', color: selLength === l ? '#8a6b5d' : '#333', fontWeight: selLength === l ? 500 : 400 }}>{l}</button>)}
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm font-medium mb-2" style={{ color: '#333' }}>{t.density}: <span style={{ color: '#888' }}>{selDensity}</span></p>
              <div className="flex gap-2 flex-wrap">
                {densities.map(d => <button key={d} onClick={() => setSelDensity(d)} className="px-3 py-2 text-xs border transition-all" style={{ borderColor: selDensity === d ? '#d4a5a5' : '#ddd', backgroundColor: selDensity === d ? '#faf0ec' : '#fff', color: selDensity === d ? '#8a6b5d' : '#333', fontWeight: selDensity === d ? 500 : 400 }}>{d}</button>)}
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm font-medium mb-2" style={{ color: '#333' }}>{t.hairType}: <span style={{ color: '#888' }}>{selHairType}</span></p>
              <div className="flex gap-2 flex-wrap">
                {hairTypes.map(h => <button key={h} onClick={() => setSelHairType(h)} className="px-4 py-2 text-sm border transition-all" style={{ borderColor: selHairType === h ? '#d4a5a5' : '#ddd', backgroundColor: selHairType === h ? '#faf0ec' : '#fff', color: selHairType === h ? '#8a6b5d' : '#333', fontWeight: selHairType === h ? 500 : 400 }}>{h}</button>)}
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm font-medium mb-2" style={{ color: '#333' }}>{t.capType}: <span style={{ color: '#888' }}>{selCap}</span></p>
              <div className="flex gap-2 flex-wrap">
                {wigCaps.map(c => <button key={c} onClick={() => setSelCap(c)} className="px-3 py-2 text-xs border transition-all" style={{ borderColor: selCap === c ? '#d4a5a5' : '#ddd', backgroundColor: selCap === c ? '#faf0ec' : '#fff', color: selCap === c ? '#8a6b5d' : '#333', fontWeight: selCap === c ? 500 : 400 }}>{c}</button>)}
              </div>
            </div>
            <div className="mb-5">
              <p className="text-sm font-medium mb-2" style={{ color: '#333' }}>{t.wigSize}: <span style={{ color: '#888' }}>{selSize}</span></p>
              <div className="flex gap-2 flex-wrap">
                {wigSizes.map(s => <button key={s} onClick={() => setSelSize(s)} className="px-4 py-2 text-sm border transition-all" style={{ borderColor: selSize === s ? '#d4a5a5' : '#ddd', backgroundColor: selSize === s ? '#faf0ec' : '#fff', color: selSize === s ? '#8a6b5d' : '#333', fontWeight: selSize === s ? 500 : 400 }}>{s}</button>)}
              </div>
            </div>

            {/* Quantity + Actions */}
            <div className="flex items-center gap-4 mb-5">
              <div className="flex items-center gap-2">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 flex items-center justify-center border rounded" style={{ borderColor: '#ddd' }}><Minus size={14} /></button>
                <span className="w-8 text-center text-sm font-medium">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-8 h-8 flex items-center justify-center border rounded" style={{ borderColor: '#ddd' }}><Plus size={14} /></button>
              </div>
              <span className="text-xs" style={{ color: '#888' }}>{selectedProduct.stock} {t.stock}</span>
            </div>
            <div className="flex gap-3 mb-6">
              <button onClick={handleAdd} className="flex-1 py-3 rounded-lg text-sm font-medium transition-all" style={{ backgroundColor: added ? '#4a9b5e' : '#d4a5a5', color: '#fff', border: 'none', cursor: 'pointer' }}>
                {added ? <span className="flex items-center justify-center gap-2"><Check size={16} /> {lang === 'fr' ? 'Ajout\u00e9 !' : '\u062a\u0645 \u0627\u0644\u0625\u0636\u0627\u0641\u0629!'}</span> : t.addCart}
              </button>
              <button className="px-4 py-3 rounded-lg border text-sm font-medium transition-all hover:bg-[#faf0ec]" style={{ borderColor: '#d4a5a5', color: '#8a6b5d' }}>{t.buyNow}</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border transition-all hover:bg-[#faf0ec]" style={{ borderColor: '#ddd' }}><Heart size={18} color="#d4a5a5" /></button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { icon: <Truck size={18} color="#d4a5a5" />, text: t.shipping },
                { icon: <Shield size={18} color="#d4a5a5" />, text: t.guarantee },
                { icon: <Package size={18} color="#d4a5a5" />, text: lang === 'fr' ? 'Livr\u00e9e en 2-5 jours' : '\u062a\u0648\u0635\u064a\u0644 \u0641\u064a 2-5 \u0623\u064a\u0627\u0645' },
                { icon: <Sparkles size={18} color="#d4a5a5" />, text: lang === 'fr' ? 'Qualit\u00e9 Premium' : '\u062c\u0648\u062f\u0629 \u0628\u0631\u064a\u0645\u064a\u0648\u0645' },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: '#faf6f4' }}>
                  {badge.icon}<span className="text-xs font-medium" style={{ color: '#666' }}>{badge.text}</span>
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
              <h3 className="text-sm font-semibold mb-3" style={{ color: '#333' }}>{t.info}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                {specs.map((s, i) => (
                  <div key={i} className="flex justify-between py-1.5" style={{ borderBottom: '1px solid #f0e8e4' }}>
                    <span className="text-xs" style={{ color: '#888' }}>{s.label}</span>
                    <span className="text-xs font-medium" style={{ color: '#333' }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-3" style={{ color: '#333' }}>{t.descTitle}</h3>
              <div className="space-y-2">
                {descBlocks.map((block, i) => <p key={i} className="text-sm leading-relaxed" style={{ color: '#666' }}>{block}</p>)}
              </div>
            </div>

            {/* AI Summary */}
            <div className="p-4 rounded-xl" style={{ backgroundColor: '#faf6f4', border: '1px solid #f0e8e4' }}>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: '#333' }}>
                <Sparkles size={16} color="#d4a5a5" /> {t.aiTitle}
              </h3>
              <ul className="space-y-2">
                {aiItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#666' }}>
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
