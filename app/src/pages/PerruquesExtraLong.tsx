import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import {
  Star, Heart, Minus, Plus, Truck, Shield,
  ChevronRight, Sparkles, Check, Zap, Package, AlertTriangle, ArrowLeft
} from 'lucide-react';
import Footer from '../sections/Footer';

/* ═══════════════════════════════════════════
   PRODUCT DATA — 48 Extra Long Wigs by Color Category
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
  { id: 'xl001', nameFr: 'Noir Naturel Lisse Extra Luxe', nameAr: 'أسود طبيعي ناعم فاخر جداً', image: '/images/perruques/extra-long/xl001.jpg', typeFr: 'Perruque Extra Longue — Noir Naturel', typeAr: 'باروكة طويلة جداً — أسود طبيعي', basePrice: 585, rating: 4.8, reviews: 34, sold: 46, stock: 44, category: 'natural-black', categoryFr: 'Noir Naturel', categoryAr: 'أسود طبيعي' },
  { id: 'xl002', nameFr: 'Châtain Foncé Lisse Prestige', nameAr: 'كستنائي داكن ناعم بريستيج', image: '/images/perruques/extra-long/xl002.jpg', typeFr: 'Perruque Extra Longue — Châtain Foncé', typeAr: 'باروكة طويلة جداً — كستنائي داكن', basePrice: 595, rating: 4.7, reviews: 32, sold: 44, stock: 46, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'xl003', nameFr: 'Châtain Foncé Lisse Soyeux', nameAr: 'كستنائي داكن ناعم حريري', image: '/images/perruques/extra-long/xl003.jpg', typeFr: 'Perruque Extra Longue — Châtain Foncé', typeAr: 'باروكة طويلة جداً — كستنائي داكن', basePrice: 588, rating: 4.6, reviews: 29, sold: 41, stock: 48, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'xl004', nameFr: 'Châtain Foncé Frange Extra Long', nameAr: 'كستنائي داكن غرة طويلة جداً', image: '/images/perruques/extra-long/xl004.jpg', typeFr: 'Perruque Extra Longue — Châtain Foncé', typeAr: 'باروكة طويلة جداً — كستنائي داكن', basePrice: 605, rating: 4.8, reviews: 37, sold: 49, stock: 43, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'xl005', nameFr: 'Châtain Foncé Lisse Volume', nameAr: 'كستنائي داكن ناعم كثيف', image: '/images/perruques/extra-long/xl005.jpg', typeFr: 'Perruque Extra Longue — Châtain Foncé', typeAr: 'باروكة طويلة جداً — كستنائي داكن', basePrice: 592, rating: 4.7, reviews: 31, sold: 43, stock: 47, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'xl006', nameFr: 'Châtain Foncé Porté Naturel', nameAr: 'كستنائي داكن مطبق طبيعي', image: '/images/perruques/extra-long/xl006.jpg', typeFr: 'Perruque Extra Longue — Châtain Foncé', typeAr: 'باروكة طويلة جداً — كستنائي داكن', basePrice: 610, rating: 4.8, reviews: 39, sold: 51, stock: 41, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'xl007', nameFr: 'Châtain Foncé Porté Élégance', nameAr: 'كستنائي داكن مطبق أنيق', image: '/images/perruques/extra-long/xl007.jpg', typeFr: 'Perruque Extra Longue — Châtain Foncé', typeAr: 'باروكة طويلة جداً — كستنائي داكن', basePrice: 608, rating: 4.7, reviews: 35, sold: 47, stock: 44, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'xl008', nameFr: 'Châtain Foncé Lisse Miroir', nameAr: 'كستنائي داكن ناعم مرآة', image: '/images/perruques/extra-long/xl008.jpg', typeFr: 'Perruque Extra Longue — Châtain Foncé', typeAr: 'باروكة طويلة جداً — كستنائي داكن', basePrice: 598, rating: 4.6, reviews: 28, sold: 40, stock: 49, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'xl009', nameFr: 'Châtain Clair Lisse Extra Long', nameAr: 'كستنائي فاتح ناعم طويل جداً', image: '/images/perruques/extra-long/xl009.jpg', typeFr: 'Perruque Extra Longue — Châtain', typeAr: 'باروكة طويلة جداً — كستنائي', basePrice: 615, rating: 4.7, reviews: 33, sold: 45, stock: 45, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'xl010', nameFr: 'Châtain Lisse Reflets Dorés', nameAr: 'كستنائي ناعم بانعكاسات ذهبية', image: '/images/perruques/extra-long/xl010.jpg', typeFr: 'Perruque Extra Longue — Châtain', typeAr: 'باروكة طويلة جداً — كستنائي', basePrice: 620, rating: 4.8, reviews: 36, sold: 48, stock: 43, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'xl011', nameFr: 'Châtain Caramel Lisse Luxe', nameAr: 'كستنائي كراميل ناعم فاخر', image: '/images/perruques/extra-long/xl011.jpg', typeFr: 'Perruque Extra Longue — Châtain', typeAr: 'باروكة طويلة جداً — كستنائي', basePrice: 625, rating: 4.7, reviews: 34, sold: 46, stock: 42, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'xl012', nameFr: 'Châtain Vague Extra Volume', nameAr: 'كستنائي موجات كثيفة جداً', image: '/images/perruques/extra-long/xl012.jpg', typeFr: 'Perruque Extra Longue — Châtain', typeAr: 'باروكة طويلة جداً — كستنائي', basePrice: 630, rating: 4.8, reviews: 38, sold: 50, stock: 40, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'xl013', nameFr: 'Balayage Cendré Vague Prestige', nameAr: 'بالياج رمادي مموج بريستيج', image: '/images/perruques/extra-long/xl013.jpg', typeFr: 'Perruque Extra Longue — Highlight', typeAr: 'باروكة طويلة جداً — هايلايت', basePrice: 645, rating: 4.7, reviews: 35, sold: 47, stock: 42, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'xl014', nameFr: 'Balayage Beige Frisé Extra Long', nameAr: 'بالياج بيج مجعد طويل جداً', image: '/images/perruques/extra-long/xl014.jpg', typeFr: 'Perruque Extra Longue — Highlight', typeAr: 'باروكة طويلة جداً — هايلايت', basePrice: 660, rating: 4.6, reviews: 30, sold: 41, stock: 38, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'xl015', nameFr: 'Balayage Sable Vague Luxe', nameAr: 'بالياج رملي موجات فاخرة', image: '/images/perruques/extra-long/xl015.jpg', typeFr: 'Perruque Extra Longue — Highlight', typeAr: 'باروكة طويلة جداً — هايلايت', basePrice: 650, rating: 4.8, reviews: 39, sold: 51, stock: 40, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'xl016', nameFr: 'Balayage Blond Lisse Signature', nameAr: 'بالياج أشقر ناعم مميز', image: '/images/perruques/extra-long/xl016.jpg', typeFr: 'Perruque Extra Longue — Highlight', typeAr: 'باروكة طويلة جداً — هايلايت', basePrice: 655, rating: 4.7, reviews: 34, sold: 46, stock: 43, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'xl017', nameFr: 'Balayage Cendré Vague Élégance', nameAr: 'بالياج رمادي مموج أنيق', image: '/images/perruques/extra-long/xl017.jpg', typeFr: 'Perruque Extra Longue — Highlight', typeAr: 'باروكة طويلة جداً — هايلايت', basePrice: 648, rating: 4.6, reviews: 31, sold: 42, stock: 45, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'xl018', nameFr: 'Balayage Miel Vague Volume', nameAr: 'بالياج عسلي مموج كثيف', image: '/images/perruques/extra-long/xl018.jpg', typeFr: 'Perruque Extra Longue — Highlight', typeAr: 'باروكة طويلة جداً — هايلايت', basePrice: 652, rating: 4.8, reviews: 40, sold: 52, stock: 39, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'xl019', nameFr: 'Balayage Beige Vague Glamour', nameAr: 'بالياج بيج مموج جلامور', image: '/images/perruques/extra-long/xl019.jpg', typeFr: 'Perruque Extra Longue — Highlight', typeAr: 'باروكة طويلة جداً — هايلايت', basePrice: 658, rating: 4.7, reviews: 36, sold: 48, stock: 41, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'xl020', nameFr: 'Balayage Doré Vague Naturel', nameAr: 'بالياج ذهبي مموج طبيعي', image: '/images/perruques/extra-long/xl020.jpg', typeFr: 'Perruque Extra Longue — Highlight', typeAr: 'باروكة طويلة جداً — هايلايت', basePrice: 642, rating: 4.6, reviews: 29, sold: 40, stock: 46, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'xl021', nameFr: 'Balayage Cendré Porté Prestige', nameAr: 'بالياج رمادي مطبق بريستيج', image: '/images/perruques/extra-long/xl021.jpg', typeFr: 'Perruque Extra Longue — Highlight', typeAr: 'باروكة طويلة جداً — هايلايت', basePrice: 670, rating: 4.8, reviews: 42, sold: 54, stock: 37, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'xl022', nameFr: 'Balayage Cendré Porté Élégance', nameAr: 'بالياج رمادي مطبق أنيق', image: '/images/perruques/extra-long/xl022.jpg', typeFr: 'Perruque Extra Longue — Highlight', typeAr: 'باروكة طويلة جداً — هايلايت', basePrice: 665, rating: 4.7, reviews: 37, sold: 49, stock: 40, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'xl023', nameFr: 'Balayage Caramel Lisse Premium', nameAr: 'بالياج كراميل ناعم بريميوم', image: '/images/perruques/extra-long/xl023.jpg', typeFr: 'Perruque Extra Longue — Highlight', typeAr: 'باروكة طويلة جداً — هايلايت', basePrice: 656, rating: 4.8, reviews: 38, sold: 50, stock: 42, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'xl024', nameFr: 'Balayage Miel Porté Glamour', nameAr: 'بالياج عسلي مطبق جلامور', image: '/images/perruques/extra-long/xl024.jpg', typeFr: 'Perruque Extra Longue — Highlight', typeAr: 'باروكة طويلة جداً — هايلايت', basePrice: 675, rating: 4.7, reviews: 35, sold: 47, stock: 38, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'xl025', nameFr: 'Balayage Caramel Lisse Signature', nameAr: 'بالياج كراميل ناعم مميز', image: '/images/perruques/extra-long/xl025.jpg', typeFr: 'Perruque Extra Longue — Highlight', typeAr: 'باروكة طويلة جداً — هايلايت', basePrice: 662, rating: 4.6, reviews: 32, sold: 44, stock: 44, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'xl026', nameFr: 'Balayage Sable Porté Lisse', nameAr: 'بالياج رملي مطبق ناعم', image: '/images/perruques/extra-long/xl026.jpg', typeFr: 'Perruque Extra Longue — Highlight', typeAr: 'باروكة طويلة جداً — هايلايت', basePrice: 668, rating: 4.8, reviews: 41, sold: 53, stock: 39, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'xl027', nameFr: 'Balayage Blond Porté Naturel', nameAr: 'بالياج أشقر مطبق طبيعي', image: '/images/perruques/extra-long/xl027.jpg', typeFr: 'Perruque Extra Longue — Highlight', typeAr: 'باروكة طويلة جداً — هايلايت', basePrice: 672, rating: 4.7, reviews: 36, sold: 48, stock: 41, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'xl028', nameFr: 'Blond Frange Extra Long', nameAr: 'أشقر غرة طويلة جداً', image: '/images/perruques/extra-long/xl028.jpg', typeFr: 'Perruque Extra Longue — Blond', typeAr: 'باروكة طويلة جداً — أشقر', basePrice: 680, rating: 4.7, reviews: 34, sold: 46, stock: 40, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'xl029', nameFr: 'Blond Vague Extra Volume', nameAr: 'أشقر موجات كثيفة جداً', image: '/images/perruques/extra-long/xl029.jpg', typeFr: 'Perruque Extra Longue — Blond', typeAr: 'باروكة طويلة جداً — أشقر', basePrice: 690, rating: 4.8, reviews: 40, sold: 52, stock: 38, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'xl030', nameFr: 'Blond Beige Vague Luxe', nameAr: 'أشقر بيج موجات فاخرة', image: '/images/perruques/extra-long/xl030.jpg', typeFr: 'Perruque Extra Longue — Blond', typeAr: 'باروكة طويلة جداً — أشقر', basePrice: 685, rating: 4.7, reviews: 37, sold: 49, stock: 41, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'xl031', nameFr: 'Blond Platine Lisse Prestige', nameAr: 'أشقر بلاتيني ناعم بريستيج', image: '/images/perruques/extra-long/xl031.jpg', typeFr: 'Perruque Extra Longue — Blond', typeAr: 'باروكة طويلة جداً — أشقر', basePrice: 695, rating: 4.8, reviews: 42, sold: 54, stock: 37, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'xl032', nameFr: 'Blond Duo Vague Signature', nameAr: 'أشقر ثنائي مموج مميز', image: '/images/perruques/extra-long/xl032.jpg', typeFr: 'Perruque Extra Longue — Blond', typeAr: 'باروكة طويلة جداً — أشقر', basePrice: 688, rating: 4.6, reviews: 31, sold: 43, stock: 44, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'xl033', nameFr: 'Blond Cendré Lisse Longueur', nameAr: 'أشقر رمادي ناعم طويل', image: '/images/perruques/extra-long/xl033.jpg', typeFr: 'Perruque Extra Longue — Blond', typeAr: 'باروكة طويلة جداً — أشقر', basePrice: 678, rating: 4.7, reviews: 33, sold: 45, stock: 43, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'xl034', nameFr: 'Blond Cendré Vague Élégance', nameAr: 'أشقر رمادي مموج أنيق', image: '/images/perruques/extra-long/xl034.jpg', typeFr: 'Perruque Extra Longue — Blond', typeAr: 'باروكة طويلة جداً — أشقر', basePrice: 686, rating: 4.8, reviews: 39, sold: 51, stock: 39, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'xl035', nameFr: 'Blond Nacré Vague Premium', nameAr: 'أشقر لؤلؤي مموج بريميوم', image: '/images/perruques/extra-long/xl035.jpg', typeFr: 'Perruque Extra Longue — Blond', typeAr: 'باروكة طويلة جداً — أشقر', basePrice: 692, rating: 4.7, reviews: 36, sold: 48, stock: 40, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'xl036', nameFr: 'Blond Trio Lisse Collection', nameAr: 'أشقر ثلاثي ناعم مجموعة', image: '/images/perruques/extra-long/xl036.jpg', typeFr: 'Perruque Extra Longue — Blond', typeAr: 'باروكة طويلة جداً — أشقر', basePrice: 682, rating: 4.6, reviews: 30, sold: 42, stock: 45, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'xl037', nameFr: 'Blond Duo Lisse Prestige', nameAr: 'أشقر ثنائي ناعم بريستيج', image: '/images/perruques/extra-long/xl037.jpg', typeFr: 'Perruque Extra Longue — Blond', typeAr: 'باروكة طويلة جداً — أشقر', basePrice: 684, rating: 4.7, reviews: 35, sold: 47, stock: 42, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'xl038', nameFr: 'Blond Platine Lisse Glamour', nameAr: 'أشقر بلاتيني ناعم جلامور', image: '/images/perruques/extra-long/xl038.jpg', typeFr: 'Perruque Extra Longue — Blond', typeAr: 'باروكة طويلة جداً — أشقر', basePrice: 698, rating: 4.8, reviews: 41, sold: 53, stock: 36, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'xl039', nameFr: 'Blond Duo Lisse Signature', nameAr: 'أشقر ثنائي ناعم مميز', image: '/images/perruques/extra-long/xl039.jpg', typeFr: 'Perruque Extra Longue — Blond', typeAr: 'باروكة طويلة جداً — أشقر', basePrice: 687, rating: 4.6, reviews: 32, sold: 44, stock: 43, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'xl040', nameFr: 'Blond Platine Porté Extra Long', nameAr: 'أشقر بلاتيني مطبق طويل جداً', image: '/images/perruques/extra-long/xl040.jpg', typeFr: 'Perruque Extra Longue — Blond', typeAr: 'باروكة طويلة جداً — أشقر', basePrice: 710, rating: 4.8, reviews: 44, sold: 56, stock: 34, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'xl041', nameFr: 'Blond Platine Porté Élégance', nameAr: 'أشقر بلاتيني مطبق أنيق', image: '/images/perruques/extra-long/xl041.jpg', typeFr: 'Perruque Extra Longue — Blond', typeAr: 'باروكة طويلة جداً — أشقر', basePrice: 705, rating: 4.7, reviews: 38, sold: 50, stock: 38, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'xl042', nameFr: 'Blond Perle Lisse Luxe', nameAr: 'أشقر لؤلؤي ناعم فاخر', image: '/images/perruques/extra-long/xl042.jpg', typeFr: 'Perruque Extra Longue — Blond', typeAr: 'باروكة طويلة جداً — أشقر', basePrice: 700, rating: 4.8, reviews: 43, sold: 55, stock: 35, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'xl043', nameFr: 'Blond Vague Porté Prestige', nameAr: 'أشقر مموج مطبق بريستيج', image: '/images/perruques/extra-long/xl043.jpg', typeFr: 'Perruque Extra Longue — Blond', typeAr: 'باروكة طويلة جداً — أشقر', basePrice: 712, rating: 4.7, reviews: 37, sold: 49, stock: 37, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'xl044', nameFr: 'Blond Vague Porté Volume', nameAr: 'أشقر مموج مطبق كثيف', image: '/images/perruques/extra-long/xl044.jpg', typeFr: 'Perruque Extra Longue — Blond', typeAr: 'باروكة طويلة جداً — أشقر', basePrice: 708, rating: 4.8, reviews: 42, sold: 54, stock: 36, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'xl045', nameFr: 'Blond Vague Porté Glamour', nameAr: 'أشقر مموج مطبق جلامور', image: '/images/perruques/extra-long/xl045.jpg', typeFr: 'Perruque Extra Longue — Blond', typeAr: 'باروكة طويلة جداً — أشقر', basePrice: 715, rating: 4.7, reviews: 39, sold: 51, stock: 35, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'xl046', nameFr: 'Blond Vague Porté Signature', nameAr: 'أشقر مموج مطبق مميز', image: '/images/perruques/extra-long/xl046.jpg', typeFr: 'Perruque Extra Longue — Blond', typeAr: 'باروكة طويلة جداً — أشقر', basePrice: 718, rating: 4.8, reviews: 45, sold: 57, stock: 33, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'xl047', nameFr: 'Blond Lisse Porté Naturel', nameAr: 'أشقر ناعم مطبق طبيعي', image: '/images/perruques/extra-long/xl047.jpg', typeFr: 'Perruque Extra Longue — Blond', typeAr: 'باروكة طويلة جداً — أشقر', basePrice: 702, rating: 4.7, reviews: 36, sold: 48, stock: 39, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'xl048', nameFr: 'Blond Beige Lisse Extra Long', nameAr: 'أشقر بيج ناعم طويل جداً', image: '/images/perruques/extra-long/xl048.jpg', typeFr: 'Perruque Extra Longue — Blond', typeAr: 'باروكة طويلة جداً — أشقر', basePrice: 696, rating: 4.8, reviews: 40, sold: 52, stock: 38, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
];



/* ═══════════════════════════════════════════
   VARIANT OPTIONS (shared)
   ═══════════════════════════════════════════ */

const lengths = ['20 pouces', '22 pouces', '24 pouces', '26 pouces', '28 pouces', '30 pouces'];
const densities = ['120%', '150%', '180%', '220%', '280%'];
const hairTypes = ['Lisses', 'Ondul\u00e9s', 'Cr\u00e9pus', 'Fris\u00e9s'];
const wigCaps = [
  '5\u00d75 Glueless Wig', '13\u00d74 Lace Front Wig', '13\u00d76 Lace Front Wig',
  '2\u00d76 Lace', '6\u00d76 Closure Wig', '7\u00d77 Closure Wig',
  '360\u00b0 Lace', 'Full Lace Wig', 'Silicone M\u00e9dicale', 'Silk M\u00e9dicale', 'Mono M\u00e9dicale',
];
const wigSizes = ['Standard', 'Taille S', 'Taille M', 'Taille L', 'Sur Mesure'];

const priceMap: Record<string, number> = {
  '20 pouces': -160, '22 pouces': -90, '24 pouces': 0, '26 pouces': 90, '28 pouces': 190, '30 pouces': 300,
};
const originalMap: Record<string, number> = {
  '20 pouces': -360, '22 pouces': -200, '24 pouces': 0, '26 pouces': 200, '28 pouces': 420, '30 pouces': 660,
};

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */

export default function PerruquesExtraLong() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get('product');

  const [mainIdx, setMainIdx] = useState(0);
  const [selLength, setSelLength] = useState('24 pouces');
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

  const basePrice = selectedProduct?.basePrice || 660;
  const price = basePrice + (priceMap[selLength] || 0);
  const original = (basePrice + 520) + (originalMap[selLength] || 0);
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
    setSelLength('24 pouces');
    setSelDensity('180%');
    setSelHairType('Ondul\u00e9s');
    setSelCap('13\u00d76 Lace Front Wig');
    setSelSize('Standard');
    setQty(1);
  };

  const backToGrid = () => {
    setSearchParams({});
  };

  /* ───── GRID VIEW ───── */
  if (!selectedProduct) {
    return (
      <div style={{ backgroundColor: 'var(--tb-bg)', fontFamily: "'Inter', sans-serif", minHeight: '100vh' }}>
        {/* Header */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-24 sm:pt-28 pb-3 sm:pb-4">
          <div className="flex items-center gap-2 text-xs mb-2 sm:mb-4" style={{ color: 'var(--tb-text-muted)' }}>
            <button onClick={() => navigate('/')} className="hover:text-[#d4a5a5] transition-colors">Home</button>
            <ChevronRight size={12} />
            <span>Cheveux</span>
            <ChevronRight size={12} />
            <span>Perruques</span>
            <ChevronRight size={12} />
            <span style={{ color: 'var(--tb-text)' }}>Extra Long</span>
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#d4a5a5', marginBottom: '8px' }}>
            {lang === 'fr' ? 'COLLECTION PERRUQUES EXTRA LONGUES \u2014 48 MOD\u00c8LES' : '\u0645\u062c\u0645\u0648\u0639\u0629 \u0627\u0644\u0628\u0627\u0631\u0648\u0643\u0627\u062a \u0627\u0644\u0637\u0648\u064a\u0644\u0629 \u062c\u062f\u0627\u064b \u2014 48 \u0645\u0648\u062f\u064a\u0644'}
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#d4a5a5', lineHeight: 1.15, marginBottom: '8px' }}>
            {lang === 'fr' ? 'Perruques Extra Longues' : '\u0628\u0627\u0631\u0648\u0643\u0627\u062a \u0637\u0648\u064a\u0644\u0629 \u062c\u062f\u0627\u064b'}
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
                        style={{ backgroundColor: 'var(--tb-card)', transition: 'all 0.4s ease' }}
                        onClick={() => openProduct(q.id)}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                      >
                        <div className="relative overflow-hidden flex items-center justify-center" style={{ aspectRatio: '1/1.15', backgroundColor: 'var(--tb-surface)' }}>
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-xs font-semibold z-10" style={{ backgroundColor: 'rgba(255,255,255,0.85)', color: 'var(--tb-text-secondary)', fontSize: '10px', letterSpacing: '0.05em' }}>
                            {String(products.indexOf(q) + 1).padStart(2, '0')}
                          </span>
                          <img src={q.image} alt={lang === 'fr' ? q.nameFr : q.nameAr} className="w-full h-full object-cover sm:object-contain transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                        </div>
                        <div className="p-2 sm:p-4">
                          <h3 className="text-xs sm:text-sm font-medium leading-snug mb-1 sm:mb-2" style={{ fontFamily: "'Inter', sans-serif", color: 'var(--tb-text)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.4 }}>
                            {lang === 'fr' ? q.nameFr : q.nameAr}
                          </h3>
                          <div className="flex items-center justify-between mb-1 sm:mb-2">
                            <span className="text-xs sm:text-base font-semibold" style={{ fontFamily: "'Inter', sans-serif", color: '#d4a5a5' }}>
                              <span className="sm:hidden">{q.basePrice} TND</span>
                              <span className="hidden sm:inline">{lang === 'fr' ? `\u00c0 partir de ${q.basePrice} TND` : `\u0627\u0628\u062a\u062f\u0627\u0621\u064b \u0645\u0646 ${q.basePrice} \u062f.\u062a`}</span>
                            </span>
                          </div>
                          <button className="w-full py-1.5 sm:py-2.5 rounded-lg transition-colors duration-300" style={{ backgroundColor: '#3a1a2a', color: 'var(--tb-card)', fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '10px', letterSpacing: '0.04em', border: 'none', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#d4a5a5'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#3a1a2a'; }}>
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
    `Cette magnifique perruque extra longue de couleur ${catLabel.toLowerCase()} est confectionn\u00e9e avec des cheveux humains Remy de premi\u00e8re qualit\u00e9. Les fibres offrent une douceur soyeuse, une brillance naturelle et un mouvement fluide pour un r\u00e9sultat ultra-r\u00e9aliste.`,
    `La lace front HD transparente assure une int\u00e9gration parfaite et une ligne frontale discr\u00e8te. Densit\u00e9 personnalisable de 130% \u00e0 280%, longueurs disponibles de 20" \u00e0 30".`,
  ] : [
    `\u0628\u0627\u0631\u0648\u0643\u0629 \u0644\u064a\u0633 \u0641\u0631\u0648\u0646\u062a \u0628\u0631\u064a\u0645\u064a\u0648\u0645 ${name} \u2014 \u062c\u0648\u062f\u0629 \u0639\u0627\u0644\u064a\u0629`,
    `\u0647\u0630\u0647 \u0627\u0644\u0628\u0627\u0631\u0648\u0643\u0629 \u0627\u0644\u0637\u0648\u064a\u0644\u0629 \u062c\u062f\u0627\u064b \u0627\u0644\u0631\u0627\u0626\u0639\u0629 \u0628\u0627\u0644\u0644\u0648\u0646 ${catLabel} \u0645\u0635\u0646\u0648\u0639\u0629 \u0645\u0646 \u0634\u0639\u0631 \u0628\u0634\u0631\u064a \u0631\u064a\u0645\u064a \u0641\u0627\u0626\u0642 \u0627\u0644\u062c\u0648\u062f\u0629. \u062a\u0648\u0641\u0631 \u0627\u0644\u0623\u0644\u064a\u0627\u0641 \u0646\u0639\u0648\u0645\u0629 \u062d\u0631\u064a\u0631\u064a\u0629 \u0648\u0644\u0645\u0639\u0627\u0646 \u0637\u0628\u064a\u0639\u064a \u0648\u062d\u0631\u0643\u0629 \u0633\u0644\u0633\u0629 \u0644\u0646\u062a\u064a\u062c\u0629 \u0641\u0627\u0626\u0642\u0629 \u0627\u0644\u0648\u0627\u0642\u0639\u064a\u0629.`,
    `\u064a\u0636\u0645\u0646 \u0627\u0644\u0644\u064a\u0633 \u0641\u0631\u0648\u0646\u062a \u0627\u0644\u0634\u0641\u0627\u0641 HD \u0627\u0646\u062f\u0645\u0627\u062c\u0627\u064b \u0645\u062b\u0627\u0644\u064a\u0627\u064b \u0648\u062e\u0637\u0627\u064b \u0623\u0645\u0627\u0645\u064a\u0627\u064b \u062f\u0642\u064a\u0642\u0627\u064b. \u0643\u062b\u0627\u0641\u0629 \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u062a\u062e\u0635\u064a\u0635 \u0645\u0646 130% \u0625\u0644\u0649 280%\u060c \u0648\u0623\u0637\u0648\u0627\u0644 \u0645\u062a\u0648\u0641\u0631\u0629 \u0645\u0646 20" \u0625\u0644\u0649 30".`,
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
          <button onClick={backToGrid} className="hover:text-[#d4a5a5] transition-colors">Perruques</button>
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
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div ref={imgRef} className="relative flex-1 overflow-hidden cursor-crosshair" style={{ minHeight: '400px', maxHeight: '600px' }} onMouseEnter={() => setZoom(true)} onMouseLeave={() => setZoom(false)} onMouseMove={handleMouseMove}>
              <img src={images[mainIdx].src} alt={images[mainIdx].alt} className="w-full h-full object-contain transition-transform duration-300" style={{ transform: zoom ? `scale(2)` : 'scale(1)', transformOrigin: `${zoomPos.x * 100}% ${zoomPos.y * 100}%` }} />
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
                ? `Perruque Lace Front extra longue de couleur ${catLabel.toLowerCase()} aux longueurs ondul\u00e9es volumineuses. Cheveux humains Remy premium pour un r\u00e9sultat naturel, doux et brillant.`
                : `\u0628\u0627\u0631\u0648\u0643\u0629 \u0644\u064a\u0633 \u0641\u0631\u0648\u0646\u062a \u0637\u0648\u064a\u0644\u0629 \u062c\u062f\u0627\u064b \u0628\u0627\u0644\u0644\u0648\u0646 ${catLabel} \u0628\u0623\u0637\u0648\u0627\u0644 \u0645\u0645\u0648\u062c\u0629 \u0643\u062b\u064a\u0641\u0629. \u0634\u0639\u0631 \u0628\u0634\u0631\u064a \u0631\u064a\u0645\u064a \u0628\u0631\u064a\u0645\u064a\u0648\u0645 \u0644\u0646\u062a\u064a\u062c\u0629 \u0637\u0628\u064a\u0639\u064a\u0629 \u0648\u0646\u0627\u0639\u0645\u0629 \u0648\u0644\u0627\u0645\u0639\u0629.`}
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
