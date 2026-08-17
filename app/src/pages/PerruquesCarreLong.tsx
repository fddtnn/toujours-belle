import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import {
  Star, Heart, Minus, Plus, Truck, Shield,
  ChevronRight, Sparkles, Check, Zap, Package, AlertTriangle, ArrowLeft
} from 'lucide-react';
import Footer from '../sections/Footer';

/* ═══════════════════════════════════════════
   PRODUCT DATA — 338 Carré Long Wigs by Color Category
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
  { id: 'cl001', nameFr: 'Noir Naturel Lisse Frange Glamour', nameAr: 'أسود طبيعي ناعم غرة جلامور', image: '/images/perruques/carre-long/cl001.jpg', typeFr: 'Perruque Carré Long — Noir Naturel', typeAr: 'باروكة كاريه طويل — أسود طبيعي', basePrice: 332, rating: 4.5, reviews: 31, sold: 27, stock: 51, category: 'natural-black', categoryFr: 'Noir Naturel', categoryAr: 'أسود طبيعي' },
  { id: 'cl002', nameFr: 'Noir Naturel Lisse Prestige', nameAr: 'أسود طبيعي ناعم بريستيج', image: '/images/perruques/carre-long/cl002.jpg', typeFr: 'Perruque Carré Long — Noir Naturel', typeAr: 'باروكة كاريه طويل — أسود طبيعي', basePrice: 339, rating: 4.8, reviews: 42, sold: 40, stock: 40, category: 'natural-black', categoryFr: 'Noir Naturel', categoryAr: 'أسود طبيعي' },
  { id: 'cl003', nameFr: 'Noir Naturel Vague Intense', nameAr: 'أسود طبيعي مموج كثيف', image: '/images/perruques/carre-long/cl003.jpg', typeFr: 'Perruque Carré Long — Noir Naturel', typeAr: 'باروكة كاريه طويل — أسود طبيعي', basePrice: 346, rating: 4.4, reviews: 53, sold: 53, stock: 57, category: 'natural-black', categoryFr: 'Noir Naturel', categoryAr: 'أسود طبيعي' },
  { id: 'cl004', nameFr: 'Noir Naturel Lisse Naturel', nameAr: 'أسود طبيعي ناعم طبيعي', image: '/images/perruques/carre-long/cl004.jpg', typeFr: 'Perruque Carré Long — Noir Naturel', typeAr: 'باروكة كاريه طويل — أسود طبيعي', basePrice: 353, rating: 4.7, reviews: 26, sold: 20, stock: 46, category: 'natural-black', categoryFr: 'Noir Naturel', categoryAr: 'أسود طبيعي' },
  { id: 'cl005', nameFr: 'Noir Naturel Lisse Volume', nameAr: 'أسود طبيعي ناعم كثيف', image: '/images/perruques/carre-long/cl005.jpg', typeFr: 'Perruque Carré Long — Noir Naturel', typeAr: 'باروكة كاريه طويل — أسود طبيعي', basePrice: 360, rating: 4.3, reviews: 37, sold: 33, stock: 35, category: 'natural-black', categoryFr: 'Noir Naturel', categoryAr: 'أسود طبيعي' },
  { id: 'cl006', nameFr: 'Noir Naturel Lisse Frange Éclat', nameAr: 'أسود طبيعي ناعم غرة لمعان', image: '/images/perruques/carre-long/cl006.jpg', typeFr: 'Perruque Carré Long — Noir Naturel', typeAr: 'باروكة كاريه طويل — أسود طبيعي', basePrice: 367, rating: 4.6, reviews: 48, sold: 46, stock: 52, category: 'natural-black', categoryFr: 'Noir Naturel', categoryAr: 'أسود طبيعي' },
  { id: 'cl007', nameFr: 'Noir Naturel Lisse Frange Glamour', nameAr: 'أسود طبيعي ناعم غرة جلامور', image: '/images/perruques/carre-long/cl007.jpg', typeFr: 'Perruque Carré Long — Noir Naturel', typeAr: 'باروكة كاريه طويل — أسود طبيعي', basePrice: 374, rating: 4.2, reviews: 21, sold: 59, stock: 41, category: 'natural-black', categoryFr: 'Noir Naturel', categoryAr: 'أسود طبيعي' },
  { id: 'cl008', nameFr: 'Noir Naturel Lisse Prestige', nameAr: 'أسود طبيعي ناعم بريستيج', image: '/images/perruques/carre-long/cl008.jpg', typeFr: 'Perruque Carré Long — Noir Naturel', typeAr: 'باروكة كاريه طويل — أسود طبيعي', basePrice: 381, rating: 4.5, reviews: 32, sold: 26, stock: 58, category: 'natural-black', categoryFr: 'Noir Naturel', categoryAr: 'أسود طبيعي' },
  { id: 'cl009', nameFr: 'Noir Naturel Vague Intense', nameAr: 'أسود طبيعي مموج كثيف', image: '/images/perruques/carre-long/cl009.jpg', typeFr: 'Perruque Carré Long — Noir Naturel', typeAr: 'باروكة كاريه طويل — أسود طبيعي', basePrice: 328, rating: 4.8, reviews: 43, sold: 39, stock: 47, category: 'natural-black', categoryFr: 'Noir Naturel', categoryAr: 'أسود طبيعي' },
  { id: 'cl010', nameFr: 'Noir Naturel Vague Naturel', nameAr: 'أسود طبيعي مموج طبيعي', image: '/images/perruques/carre-long/cl010.jpg', typeFr: 'Perruque Carré Long — Noir Naturel', typeAr: 'باروكة كاريه طويل — أسود طبيعي', basePrice: 335, rating: 4.4, reviews: 54, sold: 52, stock: 36, category: 'natural-black', categoryFr: 'Noir Naturel', categoryAr: 'أسود طبيعي' },
  { id: 'cl011', nameFr: 'Noir Naturel Lisse Volume', nameAr: 'أسود طبيعي ناعم كثيف', image: '/images/perruques/carre-long/cl011.jpg', typeFr: 'Perruque Carré Long — Noir Naturel', typeAr: 'باروكة كاريه طويل — أسود طبيعي', basePrice: 342, rating: 4.7, reviews: 27, sold: 19, stock: 53, category: 'natural-black', categoryFr: 'Noir Naturel', categoryAr: 'أسود طبيعي' },
  { id: 'cl012', nameFr: 'Noir Naturel Lisse Éclat', nameAr: 'أسود طبيعي ناعم لمعان', image: '/images/perruques/carre-long/cl012.jpg', typeFr: 'Perruque Carré Long — Noir Naturel', typeAr: 'باروكة كاريه طويل — أسود طبيعي', basePrice: 349, rating: 4.3, reviews: 38, sold: 32, stock: 42, category: 'natural-black', categoryFr: 'Noir Naturel', categoryAr: 'أسود طبيعي' },
  { id: 'cl013', nameFr: 'Noir Naturel Lisse Glamour', nameAr: 'أسود طبيعي ناعم جلامور', image: '/images/perruques/carre-long/cl013.jpg', typeFr: 'Perruque Carré Long — Noir Naturel', typeAr: 'باروكة كاريه طويل — أسود طبيعي', basePrice: 356, rating: 4.6, reviews: 49, sold: 45, stock: 59, category: 'natural-black', categoryFr: 'Noir Naturel', categoryAr: 'أسود طبيعي' },
  { id: 'cl014', nameFr: 'Noir Naturel Lisse Prestige', nameAr: 'أسود طبيعي ناعم بريستيج', image: '/images/perruques/carre-long/cl014.jpg', typeFr: 'Perruque Carré Long — Noir Naturel', typeAr: 'باروكة كاريه طويل — أسود طبيعي', basePrice: 363, rating: 4.2, reviews: 22, sold: 58, stock: 48, category: 'natural-black', categoryFr: 'Noir Naturel', categoryAr: 'أسود طبيعي' },
  { id: 'cl015', nameFr: 'Noir Naturel Lisse Intense', nameAr: 'أسود طبيعي ناعم كثيف', image: '/images/perruques/carre-long/cl015.jpg', typeFr: 'Perruque Carré Long — Noir Naturel', typeAr: 'باروكة كاريه طويل — أسود طبيعي', basePrice: 370, rating: 4.5, reviews: 33, sold: 25, stock: 37, category: 'natural-black', categoryFr: 'Noir Naturel', categoryAr: 'أسود طبيعي' },
  { id: 'cl016', nameFr: 'Noir Naturel Lisse Naturel', nameAr: 'أسود طبيعي ناعم طبيعي', image: '/images/perruques/carre-long/cl016.jpg', typeFr: 'Perruque Carré Long — Noir Naturel', typeAr: 'باروكة كاريه طويل — أسود طبيعي', basePrice: 377, rating: 4.8, reviews: 44, sold: 38, stock: 54, category: 'natural-black', categoryFr: 'Noir Naturel', categoryAr: 'أسود طبيعي' },
  { id: 'cl017', nameFr: 'Noir Naturel Lisse Frange Volume', nameAr: 'أسود طبيعي ناعم غرة كثيف', image: '/images/perruques/carre-long/cl017.jpg', typeFr: 'Perruque Carré Long — Noir Naturel', typeAr: 'باروكة كاريه طويل — أسود طبيعي', basePrice: 384, rating: 4.4, reviews: 55, sold: 51, stock: 43, category: 'natural-black', categoryFr: 'Noir Naturel', categoryAr: 'أسود طبيعي' },
  { id: 'cl018', nameFr: 'Noir Naturel Vague Éclat', nameAr: 'أسود طبيعي مموج لمعان', image: '/images/perruques/carre-long/cl018.jpg', typeFr: 'Perruque Carré Long — Noir Naturel', typeAr: 'باروكة كاريه طويل — أسود طبيعي', basePrice: 331, rating: 4.7, reviews: 28, sold: 18, stock: 60, category: 'natural-black', categoryFr: 'Noir Naturel', categoryAr: 'أسود طبيعي' },
  { id: 'cl019', nameFr: 'Châtain Foncé Vague Naturel', nameAr: 'كستنائي داكن مموج طبيعي', image: '/images/perruques/carre-long/cl019.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 353, rating: 4.3, reviews: 39, sold: 31, stock: 49, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl020', nameFr: 'Châtain Foncé Lisse Volume', nameAr: 'كستنائي داكن ناعم كثيف', image: '/images/perruques/carre-long/cl020.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 360, rating: 4.6, reviews: 50, sold: 44, stock: 38, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl021', nameFr: 'Châtain Foncé Vague Éclat', nameAr: 'كستنائي داكن مموج لمعان', image: '/images/perruques/carre-long/cl021.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 367, rating: 4.2, reviews: 23, sold: 57, stock: 55, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl022', nameFr: 'Châtain Foncé Lisse Glamour', nameAr: 'كستنائي داكن ناعم جلامور', image: '/images/perruques/carre-long/cl022.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 374, rating: 4.5, reviews: 34, sold: 24, stock: 44, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl023', nameFr: 'Châtain Foncé Vague Prestige', nameAr: 'كستنائي داكن مموج بريستيج', image: '/images/perruques/carre-long/cl023.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 381, rating: 4.8, reviews: 45, sold: 37, stock: 61, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl024', nameFr: 'Châtain Foncé Vague Intense', nameAr: 'كستنائي داكن مموج كثيف', image: '/images/perruques/carre-long/cl024.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 388, rating: 4.4, reviews: 56, sold: 50, stock: 50, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl025', nameFr: 'Châtain Foncé Lisse Naturel', nameAr: 'كستنائي داكن ناعم طبيعي', image: '/images/perruques/carre-long/cl025.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 395, rating: 4.7, reviews: 29, sold: 17, stock: 39, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl026', nameFr: 'Châtain Foncé Vague Frange Volume', nameAr: 'كستنائي داكن مموج غرة كثيف', image: '/images/perruques/carre-long/cl026.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 342, rating: 4.3, reviews: 40, sold: 30, stock: 56, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl027', nameFr: 'Châtain Foncé Lisse Éclat', nameAr: 'كستنائي داكن ناعم لمعان', image: '/images/perruques/carre-long/cl027.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 349, rating: 4.6, reviews: 51, sold: 43, stock: 45, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl028', nameFr: 'Châtain Foncé Lisse Glamour', nameAr: 'كستنائي داكن ناعم جلامور', image: '/images/perruques/carre-long/cl028.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 356, rating: 4.2, reviews: 24, sold: 56, stock: 34, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl029', nameFr: 'Châtain Foncé Lisse Prestige', nameAr: 'كستنائي داكن ناعم بريستيج', image: '/images/perruques/carre-long/cl029.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 363, rating: 4.5, reviews: 35, sold: 23, stock: 51, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl030', nameFr: 'Châtain Foncé Lisse Intense', nameAr: 'كستنائي داكن ناعم كثيف', image: '/images/perruques/carre-long/cl030.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 370, rating: 4.8, reviews: 46, sold: 36, stock: 40, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl031', nameFr: 'Châtain Foncé Lisse Naturel', nameAr: 'كستنائي داكن ناعم طبيعي', image: '/images/perruques/carre-long/cl031.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 377, rating: 4.4, reviews: 57, sold: 49, stock: 57, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl032', nameFr: 'Châtain Foncé Lisse Volume', nameAr: 'كستنائي داكن ناعم كثيف', image: '/images/perruques/carre-long/cl032.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 384, rating: 4.7, reviews: 30, sold: 16, stock: 46, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl033', nameFr: 'Châtain Foncé Lisse Éclat', nameAr: 'كستنائي داكن ناعم لمعان', image: '/images/perruques/carre-long/cl033.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 391, rating: 4.3, reviews: 41, sold: 29, stock: 35, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl034', nameFr: 'Châtain Foncé Lisse Glamour', nameAr: 'كستنائي داكن ناعم جلامور', image: '/images/perruques/carre-long/cl034.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 398, rating: 4.6, reviews: 52, sold: 42, stock: 52, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl035', nameFr: 'Châtain Foncé Lisse Prestige', nameAr: 'كستنائي داكن ناعم بريستيج', image: '/images/perruques/carre-long/cl035.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 345, rating: 4.2, reviews: 25, sold: 55, stock: 41, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl036', nameFr: 'Châtain Foncé Lisse Intense', nameAr: 'كستنائي داكن ناعم كثيف', image: '/images/perruques/carre-long/cl036.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 352, rating: 4.5, reviews: 36, sold: 22, stock: 58, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl037', nameFr: 'Châtain Foncé Lisse Naturel', nameAr: 'كستنائي داكن ناعم طبيعي', image: '/images/perruques/carre-long/cl037.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 359, rating: 4.8, reviews: 47, sold: 35, stock: 47, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl038', nameFr: 'Châtain Foncé Lisse Volume', nameAr: 'كستنائي داكن ناعم كثيف', image: '/images/perruques/carre-long/cl038.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 366, rating: 4.4, reviews: 20, sold: 48, stock: 36, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl039', nameFr: 'Châtain Foncé Lisse Éclat', nameAr: 'كستنائي داكن ناعم لمعان', image: '/images/perruques/carre-long/cl039.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 373, rating: 4.7, reviews: 31, sold: 15, stock: 53, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl040', nameFr: 'Châtain Foncé Lisse Glamour', nameAr: 'كستنائي داكن ناعم جلامور', image: '/images/perruques/carre-long/cl040.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 380, rating: 4.3, reviews: 42, sold: 28, stock: 42, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl041', nameFr: 'Châtain Foncé Lisse Prestige', nameAr: 'كستنائي داكن ناعم بريستيج', image: '/images/perruques/carre-long/cl041.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 387, rating: 4.6, reviews: 53, sold: 41, stock: 59, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl042', nameFr: 'Châtain Foncé Lisse Intense', nameAr: 'كستنائي داكن ناعم كثيف', image: '/images/perruques/carre-long/cl042.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 394, rating: 4.2, reviews: 26, sold: 54, stock: 48, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl043', nameFr: 'Châtain Foncé Vague Naturel', nameAr: 'كستنائي داكن مموج طبيعي', image: '/images/perruques/carre-long/cl043.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 341, rating: 4.5, reviews: 37, sold: 21, stock: 37, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl044', nameFr: 'Châtain Foncé Lisse Frange Volume', nameAr: 'كستنائي داكن ناعم غرة كثيف', image: '/images/perruques/carre-long/cl044.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 348, rating: 4.8, reviews: 48, sold: 34, stock: 54, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl045', nameFr: 'Châtain Foncé Lisse Éclat', nameAr: 'كستنائي داكن ناعم لمعان', image: '/images/perruques/carre-long/cl045.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 355, rating: 4.4, reviews: 21, sold: 47, stock: 43, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl046', nameFr: 'Châtain Foncé Lisse Frange Glamour', nameAr: 'كستنائي داكن ناعم غرة جلامور', image: '/images/perruques/carre-long/cl046.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 362, rating: 4.7, reviews: 32, sold: 14, stock: 60, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl047', nameFr: 'Châtain Foncé Lisse Frange Prestige', nameAr: 'كستنائي داكن ناعم غرة بريستيج', image: '/images/perruques/carre-long/cl047.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 369, rating: 4.3, reviews: 43, sold: 27, stock: 49, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl048', nameFr: 'Châtain Foncé Lisse Frange Intense', nameAr: 'كستنائي داكن ناعم غرة كثيف', image: '/images/perruques/carre-long/cl048.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 376, rating: 4.6, reviews: 54, sold: 40, stock: 38, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl049', nameFr: 'Châtain Foncé Lisse Naturel', nameAr: 'كستنائي داكن ناعم طبيعي', image: '/images/perruques/carre-long/cl049.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 383, rating: 4.2, reviews: 27, sold: 53, stock: 55, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl050', nameFr: 'Châtain Foncé Lisse Volume', nameAr: 'كستنائي داكن ناعم كثيف', image: '/images/perruques/carre-long/cl050.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 390, rating: 4.5, reviews: 38, sold: 20, stock: 44, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl051', nameFr: 'Châtain Foncé Lisse Frange Éclat', nameAr: 'كستنائي داكن ناعم غرة لمعان', image: '/images/perruques/carre-long/cl051.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 397, rating: 4.8, reviews: 49, sold: 33, stock: 61, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl052', nameFr: 'Châtain Foncé Lisse Glamour', nameAr: 'كستنائي داكن ناعم جلامور', image: '/images/perruques/carre-long/cl052.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 344, rating: 4.4, reviews: 22, sold: 46, stock: 50, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl053', nameFr: 'Châtain Foncé Vague Prestige', nameAr: 'كستنائي داكن مموج بريستيج', image: '/images/perruques/carre-long/cl053.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 351, rating: 4.7, reviews: 33, sold: 59, stock: 39, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl054', nameFr: 'Châtain Foncé Lisse Intense', nameAr: 'كستنائي داكن ناعم كثيف', image: '/images/perruques/carre-long/cl054.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 358, rating: 4.3, reviews: 44, sold: 26, stock: 56, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl055', nameFr: 'Châtain Foncé Lisse Naturel', nameAr: 'كستنائي داكن ناعم طبيعي', image: '/images/perruques/carre-long/cl055.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 365, rating: 4.6, reviews: 55, sold: 39, stock: 45, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl056', nameFr: 'Châtain Foncé Lisse Volume', nameAr: 'كستنائي داكن ناعم كثيف', image: '/images/perruques/carre-long/cl056.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 372, rating: 4.2, reviews: 28, sold: 52, stock: 34, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl057', nameFr: 'Châtain Foncé Vague Éclat', nameAr: 'كستنائي داكن مموج لمعان', image: '/images/perruques/carre-long/cl057.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 379, rating: 4.5, reviews: 39, sold: 19, stock: 51, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl058', nameFr: 'Châtain Foncé Lisse Glamour', nameAr: 'كستنائي داكن ناعم جلامور', image: '/images/perruques/carre-long/cl058.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 386, rating: 4.8, reviews: 50, sold: 32, stock: 40, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl059', nameFr: 'Châtain Foncé Vague Prestige', nameAr: 'كستنائي داكن مموج بريستيج', image: '/images/perruques/carre-long/cl059.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 393, rating: 4.4, reviews: 23, sold: 45, stock: 57, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl060', nameFr: 'Châtain Foncé Lisse Intense', nameAr: 'كستنائي داكن ناعم كثيف', image: '/images/perruques/carre-long/cl060.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 340, rating: 4.7, reviews: 34, sold: 58, stock: 46, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl061', nameFr: 'Châtain Foncé Lisse Naturel', nameAr: 'كستنائي داكن ناعم طبيعي', image: '/images/perruques/carre-long/cl061.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 347, rating: 4.3, reviews: 45, sold: 25, stock: 35, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl062', nameFr: 'Châtain Foncé Lisse Volume', nameAr: 'كستنائي داكن ناعم كثيف', image: '/images/perruques/carre-long/cl062.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 354, rating: 4.6, reviews: 56, sold: 38, stock: 52, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl063', nameFr: 'Châtain Foncé Lisse Éclat', nameAr: 'كستنائي داكن ناعم لمعان', image: '/images/perruques/carre-long/cl063.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 361, rating: 4.2, reviews: 29, sold: 51, stock: 41, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl064', nameFr: 'Châtain Foncé Lisse Glamour', nameAr: 'كستنائي داكن ناعم جلامور', image: '/images/perruques/carre-long/cl064.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 368, rating: 4.5, reviews: 40, sold: 18, stock: 58, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl065', nameFr: 'Châtain Foncé Lisse Prestige', nameAr: 'كستنائي داكن ناعم بريستيج', image: '/images/perruques/carre-long/cl065.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 375, rating: 4.8, reviews: 51, sold: 31, stock: 47, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl066', nameFr: 'Châtain Foncé Lisse Intense', nameAr: 'كستنائي داكن ناعم كثيف', image: '/images/perruques/carre-long/cl066.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 382, rating: 4.4, reviews: 24, sold: 44, stock: 36, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl067', nameFr: 'Châtain Foncé Vague Naturel', nameAr: 'كستنائي داكن مموج طبيعي', image: '/images/perruques/carre-long/cl067.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 389, rating: 4.7, reviews: 35, sold: 57, stock: 53, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl068', nameFr: 'Châtain Foncé Lisse Volume', nameAr: 'كستنائي داكن ناعم كثيف', image: '/images/perruques/carre-long/cl068.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 396, rating: 4.3, reviews: 46, sold: 24, stock: 42, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl069', nameFr: 'Châtain Foncé Lisse Éclat', nameAr: 'كستنائي داكن ناعم لمعان', image: '/images/perruques/carre-long/cl069.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 343, rating: 4.6, reviews: 57, sold: 37, stock: 59, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl070', nameFr: 'Châtain Foncé Lisse Glamour', nameAr: 'كستنائي داكن ناعم جلامور', image: '/images/perruques/carre-long/cl070.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 350, rating: 4.2, reviews: 30, sold: 50, stock: 48, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl071', nameFr: 'Châtain Foncé Lisse Frange Prestige', nameAr: 'كستنائي داكن ناعم غرة بريستيج', image: '/images/perruques/carre-long/cl071.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 357, rating: 4.5, reviews: 41, sold: 17, stock: 37, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl072', nameFr: 'Châtain Foncé Lisse Intense', nameAr: 'كستنائي داكن ناعم كثيف', image: '/images/perruques/carre-long/cl072.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 364, rating: 4.8, reviews: 52, sold: 30, stock: 54, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl073', nameFr: 'Châtain Foncé Lisse Naturel', nameAr: 'كستنائي داكن ناعم طبيعي', image: '/images/perruques/carre-long/cl073.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 371, rating: 4.4, reviews: 25, sold: 43, stock: 43, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl074', nameFr: 'Châtain Foncé Vague Volume', nameAr: 'كستنائي داكن مموج كثيف', image: '/images/perruques/carre-long/cl074.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 378, rating: 4.7, reviews: 36, sold: 56, stock: 60, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl075', nameFr: 'Châtain Foncé Vague Éclat', nameAr: 'كستنائي داكن مموج لمعان', image: '/images/perruques/carre-long/cl075.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 385, rating: 4.3, reviews: 47, sold: 23, stock: 49, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl076', nameFr: 'Châtain Foncé Vague Glamour', nameAr: 'كستنائي داكن مموج جلامور', image: '/images/perruques/carre-long/cl076.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 392, rating: 4.6, reviews: 20, sold: 36, stock: 38, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl077', nameFr: 'Châtain Foncé Lisse Frange Prestige', nameAr: 'كستنائي داكن ناعم غرة بريستيج', image: '/images/perruques/carre-long/cl077.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 399, rating: 4.2, reviews: 31, sold: 49, stock: 55, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl078', nameFr: 'Châtain Foncé Lisse Intense', nameAr: 'كستنائي داكن ناعم كثيف', image: '/images/perruques/carre-long/cl078.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 346, rating: 4.5, reviews: 42, sold: 16, stock: 44, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl079', nameFr: 'Châtain Foncé Lisse Naturel', nameAr: 'كستنائي داكن ناعم طبيعي', image: '/images/perruques/carre-long/cl079.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 353, rating: 4.8, reviews: 53, sold: 29, stock: 61, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl080', nameFr: 'Châtain Foncé Lisse Volume', nameAr: 'كستنائي داكن ناعم كثيف', image: '/images/perruques/carre-long/cl080.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 360, rating: 4.4, reviews: 26, sold: 42, stock: 50, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl081', nameFr: 'Châtain Foncé Lisse Éclat', nameAr: 'كستنائي داكن ناعم لمعان', image: '/images/perruques/carre-long/cl081.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 367, rating: 4.7, reviews: 37, sold: 55, stock: 39, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl082', nameFr: 'Châtain Foncé Vague Glamour', nameAr: 'كستنائي داكن مموج جلامور', image: '/images/perruques/carre-long/cl082.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 374, rating: 4.3, reviews: 48, sold: 22, stock: 56, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl083', nameFr: 'Châtain Foncé Vague Frange Prestige', nameAr: 'كستنائي داكن مموج غرة بريستيج', image: '/images/perruques/carre-long/cl083.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 381, rating: 4.6, reviews: 21, sold: 35, stock: 45, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl084', nameFr: 'Châtain Foncé Lisse Frange Intense', nameAr: 'كستنائي داكن ناعم غرة كثيف', image: '/images/perruques/carre-long/cl084.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 388, rating: 4.2, reviews: 32, sold: 48, stock: 34, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl085', nameFr: 'Châtain Foncé Vague Naturel', nameAr: 'كستنائي داكن مموج طبيعي', image: '/images/perruques/carre-long/cl085.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 395, rating: 4.5, reviews: 43, sold: 15, stock: 51, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl086', nameFr: 'Châtain Foncé Lisse Frange Volume', nameAr: 'كستنائي داكن ناعم غرة كثيف', image: '/images/perruques/carre-long/cl086.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 342, rating: 4.8, reviews: 54, sold: 28, stock: 40, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl087', nameFr: 'Châtain Foncé Lisse Éclat', nameAr: 'كستنائي داكن ناعم لمعان', image: '/images/perruques/carre-long/cl087.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 349, rating: 4.4, reviews: 27, sold: 41, stock: 57, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl088', nameFr: 'Châtain Foncé Vague Glamour', nameAr: 'كستنائي داكن مموج جلامور', image: '/images/perruques/carre-long/cl088.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 356, rating: 4.7, reviews: 38, sold: 54, stock: 46, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl089', nameFr: 'Châtain Foncé Lisse Prestige', nameAr: 'كستنائي داكن ناعم بريستيج', image: '/images/perruques/carre-long/cl089.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 363, rating: 4.3, reviews: 49, sold: 21, stock: 35, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl090', nameFr: 'Châtain Foncé Lisse Frange Intense', nameAr: 'كستنائي داكن ناعم غرة كثيف', image: '/images/perruques/carre-long/cl090.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 370, rating: 4.6, reviews: 22, sold: 34, stock: 52, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl091', nameFr: 'Châtain Foncé Vague Naturel', nameAr: 'كستنائي داكن مموج طبيعي', image: '/images/perruques/carre-long/cl091.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 377, rating: 4.2, reviews: 33, sold: 47, stock: 41, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl092', nameFr: 'Châtain Foncé Vague Volume', nameAr: 'كستنائي داكن مموج كثيف', image: '/images/perruques/carre-long/cl092.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 384, rating: 4.5, reviews: 44, sold: 14, stock: 58, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl093', nameFr: 'Châtain Foncé Vague Éclat', nameAr: 'كستنائي داكن مموج لمعان', image: '/images/perruques/carre-long/cl093.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 391, rating: 4.8, reviews: 55, sold: 27, stock: 47, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl094', nameFr: 'Châtain Foncé Lisse Frange Glamour', nameAr: 'كستنائي داكن ناعم غرة جلامور', image: '/images/perruques/carre-long/cl094.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 398, rating: 4.4, reviews: 28, sold: 40, stock: 36, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl095', nameFr: 'Châtain Foncé Lisse Frange Prestige', nameAr: 'كستنائي داكن ناعم غرة بريستيج', image: '/images/perruques/carre-long/cl095.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 345, rating: 4.7, reviews: 39, sold: 53, stock: 53, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl096', nameFr: 'Châtain Foncé Lisse Frange Intense', nameAr: 'كستنائي داكن ناعم غرة كثيف', image: '/images/perruques/carre-long/cl096.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 352, rating: 4.3, reviews: 50, sold: 20, stock: 42, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl097', nameFr: 'Châtain Foncé Lisse Naturel', nameAr: 'كستنائي داكن ناعم طبيعي', image: '/images/perruques/carre-long/cl097.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 359, rating: 4.6, reviews: 23, sold: 33, stock: 59, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl098', nameFr: 'Châtain Foncé Lisse Volume', nameAr: 'كستنائي داكن ناعم كثيف', image: '/images/perruques/carre-long/cl098.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 366, rating: 4.2, reviews: 34, sold: 46, stock: 48, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl099', nameFr: 'Châtain Foncé Lisse Frange Éclat', nameAr: 'كستنائي داكن ناعم غرة لمعان', image: '/images/perruques/carre-long/cl099.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 373, rating: 4.5, reviews: 45, sold: 59, stock: 37, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl100', nameFr: 'Châtain Foncé Lisse Frange Glamour', nameAr: 'كستنائي داكن ناعم غرة جلامور', image: '/images/perruques/carre-long/cl100.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 380, rating: 4.8, reviews: 56, sold: 26, stock: 54, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl101', nameFr: 'Châtain Foncé Vague Frange Prestige', nameAr: 'كستنائي داكن مموج غرة بريستيج', image: '/images/perruques/carre-long/cl101.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 387, rating: 4.4, reviews: 29, sold: 39, stock: 43, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl102', nameFr: 'Châtain Foncé Lisse Frange Intense', nameAr: 'كستنائي داكن ناعم غرة كثيف', image: '/images/perruques/carre-long/cl102.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 394, rating: 4.7, reviews: 40, sold: 52, stock: 60, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl103', nameFr: 'Châtain Foncé Lisse Naturel', nameAr: 'كستنائي داكن ناعم طبيعي', image: '/images/perruques/carre-long/cl103.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 341, rating: 4.3, reviews: 51, sold: 19, stock: 49, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl104', nameFr: 'Châtain Foncé Lisse Volume', nameAr: 'كستنائي داكن ناعم كثيف', image: '/images/perruques/carre-long/cl104.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 348, rating: 4.6, reviews: 24, sold: 32, stock: 38, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl105', nameFr: 'Châtain Foncé Lisse Frange Éclat', nameAr: 'كستنائي داكن ناعم غرة لمعان', image: '/images/perruques/carre-long/cl105.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 355, rating: 4.2, reviews: 35, sold: 45, stock: 55, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl106', nameFr: 'Châtain Foncé Vague Glamour', nameAr: 'كستنائي داكن مموج جلامور', image: '/images/perruques/carre-long/cl106.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 362, rating: 4.5, reviews: 46, sold: 58, stock: 44, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl107', nameFr: 'Châtain Foncé Vague Prestige', nameAr: 'كستنائي داكن مموج بريستيج', image: '/images/perruques/carre-long/cl107.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 369, rating: 4.8, reviews: 57, sold: 25, stock: 61, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl108', nameFr: 'Châtain Foncé Lisse Intense', nameAr: 'كستنائي داكن ناعم كثيف', image: '/images/perruques/carre-long/cl108.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 376, rating: 4.4, reviews: 30, sold: 38, stock: 50, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl109', nameFr: 'Châtain Foncé Lisse Naturel', nameAr: 'كستنائي داكن ناعم طبيعي', image: '/images/perruques/carre-long/cl109.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 383, rating: 4.7, reviews: 41, sold: 51, stock: 39, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl110', nameFr: 'Châtain Foncé Vague Frange Volume', nameAr: 'كستنائي داكن مموج غرة كثيف', image: '/images/perruques/carre-long/cl110.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 390, rating: 4.3, reviews: 52, sold: 18, stock: 56, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl111', nameFr: 'Châtain Foncé Lisse Éclat', nameAr: 'كستنائي داكن ناعم لمعان', image: '/images/perruques/carre-long/cl111.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 397, rating: 4.6, reviews: 25, sold: 31, stock: 45, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl112', nameFr: 'Châtain Foncé Lisse Glamour', nameAr: 'كستنائي داكن ناعم جلامور', image: '/images/perruques/carre-long/cl112.jpg', typeFr: 'Perruque Carré Long — Châtain Foncé', typeAr: 'باروكة كاريه طويل — كستنائي داكن', basePrice: 344, rating: 4.2, reviews: 36, sold: 44, stock: 34, category: 'dark-brown', categoryFr: 'Châtain Foncé', categoryAr: 'كستنائي داكن' },
  { id: 'cl113', nameFr: 'Châtain Vague Intense', nameAr: 'كستنائي مموج كثيف', image: '/images/perruques/carre-long/cl113.jpg', typeFr: 'Perruque Carré Long — Châtain', typeAr: 'باروكة كاريه طويل — كستنائي', basePrice: 366, rating: 4.5, reviews: 47, sold: 57, stock: 51, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'cl114', nameFr: 'Châtain Vague Naturel', nameAr: 'كستنائي مموج طبيعي', image: '/images/perruques/carre-long/cl114.jpg', typeFr: 'Perruque Carré Long — Châtain', typeAr: 'باروكة كاريه طويل — كستنائي', basePrice: 373, rating: 4.8, reviews: 20, sold: 24, stock: 40, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'cl115', nameFr: 'Châtain Vague Frange Volume', nameAr: 'كستنائي مموج غرة كثيف', image: '/images/perruques/carre-long/cl115.jpg', typeFr: 'Perruque Carré Long — Châtain', typeAr: 'باروكة كاريه طويل — كستنائي', basePrice: 380, rating: 4.4, reviews: 31, sold: 37, stock: 57, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'cl116', nameFr: 'Châtain Vague Frange Éclat', nameAr: 'كستنائي مموج غرة لمعان', image: '/images/perruques/carre-long/cl116.jpg', typeFr: 'Perruque Carré Long — Châtain', typeAr: 'باروكة كاريه طويل — كستنائي', basePrice: 387, rating: 4.7, reviews: 42, sold: 50, stock: 46, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'cl117', nameFr: 'Châtain Vague Glamour', nameAr: 'كستنائي مموج جلامور', image: '/images/perruques/carre-long/cl117.jpg', typeFr: 'Perruque Carré Long — Châtain', typeAr: 'باروكة كاريه طويل — كستنائي', basePrice: 394, rating: 4.3, reviews: 53, sold: 17, stock: 35, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'cl118', nameFr: 'Châtain Vague Frange Prestige', nameAr: 'كستنائي مموج غرة بريستيج', image: '/images/perruques/carre-long/cl118.jpg', typeFr: 'Perruque Carré Long — Châtain', typeAr: 'باروكة كاريه طويل — كستنائي', basePrice: 401, rating: 4.6, reviews: 26, sold: 30, stock: 52, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'cl119', nameFr: 'Châtain Vague Intense', nameAr: 'كستنائي مموج كثيف', image: '/images/perruques/carre-long/cl119.jpg', typeFr: 'Perruque Carré Long — Châtain', typeAr: 'باروكة كاريه طويل — كستنائي', basePrice: 408, rating: 4.2, reviews: 37, sold: 43, stock: 41, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'cl120', nameFr: 'Châtain Vague Naturel', nameAr: 'كستنائي مموج طبيعي', image: '/images/perruques/carre-long/cl120.jpg', typeFr: 'Perruque Carré Long — Châtain', typeAr: 'باروكة كاريه طويل — كستنائي', basePrice: 355, rating: 4.5, reviews: 48, sold: 56, stock: 58, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'cl121', nameFr: 'Châtain Vague Frange Volume', nameAr: 'كستنائي مموج غرة كثيف', image: '/images/perruques/carre-long/cl121.jpg', typeFr: 'Perruque Carré Long — Châtain', typeAr: 'باروكة كاريه طويل — كستنائي', basePrice: 362, rating: 4.8, reviews: 21, sold: 23, stock: 47, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'cl122', nameFr: 'Châtain Vague Frange Éclat', nameAr: 'كستنائي مموج غرة لمعان', image: '/images/perruques/carre-long/cl122.jpg', typeFr: 'Perruque Carré Long — Châtain', typeAr: 'باروكة كاريه طويل — كستنائي', basePrice: 369, rating: 4.4, reviews: 32, sold: 36, stock: 36, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'cl123', nameFr: 'Châtain Vague Frange Glamour', nameAr: 'كستنائي مموج غرة جلامور', image: '/images/perruques/carre-long/cl123.jpg', typeFr: 'Perruque Carré Long — Châtain', typeAr: 'باروكة كاريه طويل — كستنائي', basePrice: 376, rating: 4.7, reviews: 43, sold: 49, stock: 53, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'cl124', nameFr: 'Châtain Lisse Prestige', nameAr: 'كستنائي ناعم بريستيج', image: '/images/perruques/carre-long/cl124.jpg', typeFr: 'Perruque Carré Long — Châtain', typeAr: 'باروكة كاريه طويل — كستنائي', basePrice: 383, rating: 4.3, reviews: 54, sold: 16, stock: 42, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'cl125', nameFr: 'Châtain Lisse Intense', nameAr: 'كستنائي ناعم كثيف', image: '/images/perruques/carre-long/cl125.jpg', typeFr: 'Perruque Carré Long — Châtain', typeAr: 'باروكة كاريه طويل — كستنائي', basePrice: 390, rating: 4.6, reviews: 27, sold: 29, stock: 59, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'cl126', nameFr: 'Châtain Vague Naturel', nameAr: 'كستنائي مموج طبيعي', image: '/images/perruques/carre-long/cl126.jpg', typeFr: 'Perruque Carré Long — Châtain', typeAr: 'باروكة كاريه طويل — كستنائي', basePrice: 397, rating: 4.2, reviews: 38, sold: 42, stock: 48, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'cl127', nameFr: 'Châtain Lisse Volume', nameAr: 'كستنائي ناعم كثيف', image: '/images/perruques/carre-long/cl127.jpg', typeFr: 'Perruque Carré Long — Châtain', typeAr: 'باروكة كاريه طويل — كستنائي', basePrice: 404, rating: 4.5, reviews: 49, sold: 55, stock: 37, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'cl128', nameFr: 'Châtain Lisse Frange Éclat', nameAr: 'كستنائي ناعم غرة لمعان', image: '/images/perruques/carre-long/cl128.jpg', typeFr: 'Perruque Carré Long — Châtain', typeAr: 'باروكة كاريه طويل — كستنائي', basePrice: 411, rating: 4.8, reviews: 22, sold: 22, stock: 54, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'cl129', nameFr: 'Châtain Lisse Glamour', nameAr: 'كستنائي ناعم جلامور', image: '/images/perruques/carre-long/cl129.jpg', typeFr: 'Perruque Carré Long — Châtain', typeAr: 'باروكة كاريه طويل — كستنائي', basePrice: 358, rating: 4.4, reviews: 33, sold: 35, stock: 43, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'cl130', nameFr: 'Châtain Lisse Prestige', nameAr: 'كستنائي ناعم بريستيج', image: '/images/perruques/carre-long/cl130.jpg', typeFr: 'Perruque Carré Long — Châtain', typeAr: 'باروكة كاريه طويل — كستنائي', basePrice: 365, rating: 4.7, reviews: 44, sold: 48, stock: 60, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'cl131', nameFr: 'Châtain Vague Intense', nameAr: 'كستنائي مموج كثيف', image: '/images/perruques/carre-long/cl131.jpg', typeFr: 'Perruque Carré Long — Châtain', typeAr: 'باروكة كاريه طويل — كستنائي', basePrice: 372, rating: 4.3, reviews: 55, sold: 15, stock: 49, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'cl132', nameFr: 'Châtain Vague Frange Naturel', nameAr: 'كستنائي مموج غرة طبيعي', image: '/images/perruques/carre-long/cl132.jpg', typeFr: 'Perruque Carré Long — Châtain', typeAr: 'باروكة كاريه طويل — كستنائي', basePrice: 379, rating: 4.6, reviews: 28, sold: 28, stock: 38, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'cl133', nameFr: 'Châtain Vague Volume', nameAr: 'كستنائي مموج كثيف', image: '/images/perruques/carre-long/cl133.jpg', typeFr: 'Perruque Carré Long — Châtain', typeAr: 'باروكة كاريه طويل — كستنائي', basePrice: 386, rating: 4.2, reviews: 39, sold: 41, stock: 55, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'cl134', nameFr: 'Châtain Vague Éclat', nameAr: 'كستنائي مموج لمعان', image: '/images/perruques/carre-long/cl134.jpg', typeFr: 'Perruque Carré Long — Châtain', typeAr: 'باروكة كاريه طويل — كستنائي', basePrice: 393, rating: 4.5, reviews: 50, sold: 54, stock: 44, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'cl135', nameFr: 'Châtain Vague Glamour', nameAr: 'كستنائي مموج جلامور', image: '/images/perruques/carre-long/cl135.jpg', typeFr: 'Perruque Carré Long — Châtain', typeAr: 'باروكة كاريه طويل — كستنائي', basePrice: 400, rating: 4.8, reviews: 23, sold: 21, stock: 61, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'cl136', nameFr: 'Châtain Lisse Prestige', nameAr: 'كستنائي ناعم بريستيج', image: '/images/perruques/carre-long/cl136.jpg', typeFr: 'Perruque Carré Long — Châtain', typeAr: 'باروكة كاريه طويل — كستنائي', basePrice: 407, rating: 4.4, reviews: 34, sold: 34, stock: 50, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'cl137', nameFr: 'Châtain Lisse Intense', nameAr: 'كستنائي ناعم كثيف', image: '/images/perruques/carre-long/cl137.jpg', typeFr: 'Perruque Carré Long — Châtain', typeAr: 'باروكة كاريه طويل — كستنائي', basePrice: 414, rating: 4.7, reviews: 45, sold: 47, stock: 39, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'cl138', nameFr: 'Châtain Vague Naturel', nameAr: 'كستنائي مموج طبيعي', image: '/images/perruques/carre-long/cl138.jpg', typeFr: 'Perruque Carré Long — Châtain', typeAr: 'باروكة كاريه طويل — كستنائي', basePrice: 361, rating: 4.3, reviews: 56, sold: 14, stock: 56, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'cl139', nameFr: 'Châtain Vague Volume', nameAr: 'كستنائي مموج كثيف', image: '/images/perruques/carre-long/cl139.jpg', typeFr: 'Perruque Carré Long — Châtain', typeAr: 'باروكة كاريه طويل — كستنائي', basePrice: 368, rating: 4.6, reviews: 29, sold: 27, stock: 45, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'cl140', nameFr: 'Châtain Lisse Éclat', nameAr: 'كستنائي ناعم لمعان', image: '/images/perruques/carre-long/cl140.jpg', typeFr: 'Perruque Carré Long — Châtain', typeAr: 'باروكة كاريه طويل — كستنائي', basePrice: 375, rating: 4.2, reviews: 40, sold: 40, stock: 34, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'cl141', nameFr: 'Châtain Lisse Glamour', nameAr: 'كستنائي ناعم جلامور', image: '/images/perruques/carre-long/cl141.jpg', typeFr: 'Perruque Carré Long — Châtain', typeAr: 'باروكة كاريه طويل — كستنائي', basePrice: 382, rating: 4.5, reviews: 51, sold: 53, stock: 51, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'cl142', nameFr: 'Châtain Vague Prestige', nameAr: 'كستنائي مموج بريستيج', image: '/images/perruques/carre-long/cl142.jpg', typeFr: 'Perruque Carré Long — Châtain', typeAr: 'باروكة كاريه طويل — كستنائي', basePrice: 389, rating: 4.8, reviews: 24, sold: 20, stock: 40, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'cl143', nameFr: 'Châtain Vague Intense', nameAr: 'كستنائي مموج كثيف', image: '/images/perruques/carre-long/cl143.jpg', typeFr: 'Perruque Carré Long — Châtain', typeAr: 'باروكة كاريه طويل — كستنائي', basePrice: 396, rating: 4.4, reviews: 35, sold: 33, stock: 57, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'cl144', nameFr: 'Châtain Vague Naturel', nameAr: 'كستنائي مموج طبيعي', image: '/images/perruques/carre-long/cl144.jpg', typeFr: 'Perruque Carré Long — Châtain', typeAr: 'باروكة كاريه طويل — كستنائي', basePrice: 403, rating: 4.7, reviews: 46, sold: 46, stock: 46, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'cl145', nameFr: 'Châtain Vague Volume', nameAr: 'كستنائي مموج كثيف', image: '/images/perruques/carre-long/cl145.jpg', typeFr: 'Perruque Carré Long — Châtain', typeAr: 'باروكة كاريه طويل — كستنائي', basePrice: 410, rating: 4.3, reviews: 57, sold: 59, stock: 35, category: 'brown', categoryFr: 'Châtain', categoryAr: 'كستنائي' },
  { id: 'cl146', nameFr: 'Cuivré Lisse Élégance', nameAr: 'نحاسي ناعم أنيق', image: '/images/perruques/carre-long/cl146.jpg', typeFr: 'Perruque Carré Long — Rouge', typeAr: 'باروكة كاريه طويل — أحمر', basePrice: 367, rating: 4.6, reviews: 30, sold: 26, stock: 52, category: 'red', categoryFr: 'Rouge', categoryAr: 'أحمر' },
  { id: 'cl147', nameFr: 'Cuivré Lisse Premium', nameAr: 'نحاسي ناعم بريميوم', image: '/images/perruques/carre-long/cl147.jpg', typeFr: 'Perruque Carré Long — Rouge', typeAr: 'باروكة كاريه طويل — أحمر', basePrice: 374, rating: 4.2, reviews: 41, sold: 39, stock: 41, category: 'red', categoryFr: 'Rouge', categoryAr: 'أحمر' },
  { id: 'cl148', nameFr: 'Balayage Lisse Premium', nameAr: 'بالياج ناعم بريميوم', image: '/images/perruques/carre-long/cl148.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 401, rating: 4.5, reviews: 52, sold: 52, stock: 58, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl149', nameFr: 'Balayage Vague Frange Signature', nameAr: 'بالياج مموج غرة مميز', image: '/images/perruques/carre-long/cl149.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 408, rating: 4.8, reviews: 25, sold: 19, stock: 47, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl150', nameFr: 'Balayage Lisse Soyeux', nameAr: 'بالياج ناعم حريري', image: '/images/perruques/carre-long/cl150.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 415, rating: 4.4, reviews: 36, sold: 32, stock: 36, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl151', nameFr: 'Balayage Lisse Douceur', nameAr: 'بالياج ناعم نعومة', image: '/images/perruques/carre-long/cl151.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 422, rating: 4.7, reviews: 47, sold: 45, stock: 53, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl152', nameFr: 'Balayage Lisse Luxe', nameAr: 'بالياج ناعم فاخر', image: '/images/perruques/carre-long/cl152.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 429, rating: 4.3, reviews: 20, sold: 58, stock: 42, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl153', nameFr: 'Balayage Vague Élégance', nameAr: 'بالياج مموج أنيق', image: '/images/perruques/carre-long/cl153.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 436, rating: 4.6, reviews: 31, sold: 25, stock: 59, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl154', nameFr: 'Balayage Vague Frange Premium', nameAr: 'بالياج مموج غرة بريميوم', image: '/images/perruques/carre-long/cl154.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 443, rating: 4.2, reviews: 42, sold: 38, stock: 48, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl155', nameFr: 'Balayage Vague Frange Signature', nameAr: 'بالياج مموج غرة مميز', image: '/images/perruques/carre-long/cl155.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 390, rating: 4.5, reviews: 53, sold: 51, stock: 37, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl156', nameFr: 'Balayage Lisse Soyeux', nameAr: 'بالياج ناعم حريري', image: '/images/perruques/carre-long/cl156.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 397, rating: 4.8, reviews: 26, sold: 18, stock: 54, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl157', nameFr: 'Balayage Lisse Douceur', nameAr: 'بالياج ناعم نعومة', image: '/images/perruques/carre-long/cl157.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 404, rating: 4.4, reviews: 37, sold: 31, stock: 43, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl158', nameFr: 'Balayage Lisse Luxe', nameAr: 'بالياج ناعم فاخر', image: '/images/perruques/carre-long/cl158.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 411, rating: 4.7, reviews: 48, sold: 44, stock: 60, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl159', nameFr: 'Balayage Lisse Élégance', nameAr: 'بالياج ناعم أنيق', image: '/images/perruques/carre-long/cl159.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 418, rating: 4.3, reviews: 21, sold: 57, stock: 49, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl160', nameFr: 'Balayage Lisse Premium', nameAr: 'بالياج ناعم بريميوم', image: '/images/perruques/carre-long/cl160.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 425, rating: 4.6, reviews: 32, sold: 24, stock: 38, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl161', nameFr: 'Balayage Lisse Signature', nameAr: 'بالياج ناعم مميز', image: '/images/perruques/carre-long/cl161.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 432, rating: 4.2, reviews: 43, sold: 37, stock: 55, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl162', nameFr: 'Balayage Lisse Soyeux', nameAr: 'بالياج ناعم حريري', image: '/images/perruques/carre-long/cl162.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 439, rating: 4.5, reviews: 54, sold: 50, stock: 44, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl163', nameFr: 'Balayage Lisse Douceur', nameAr: 'بالياج ناعم نعومة', image: '/images/perruques/carre-long/cl163.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 386, rating: 4.8, reviews: 27, sold: 17, stock: 61, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl164', nameFr: 'Balayage Lisse Frange Luxe', nameAr: 'بالياج ناعم غرة فاخر', image: '/images/perruques/carre-long/cl164.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 393, rating: 4.4, reviews: 38, sold: 30, stock: 50, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl165', nameFr: 'Balayage Vague Élégance', nameAr: 'بالياج مموج أنيق', image: '/images/perruques/carre-long/cl165.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 400, rating: 4.7, reviews: 49, sold: 43, stock: 39, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl166', nameFr: 'Balayage Lisse Premium', nameAr: 'بالياج ناعم بريميوم', image: '/images/perruques/carre-long/cl166.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 407, rating: 4.3, reviews: 22, sold: 56, stock: 56, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl167', nameFr: 'Balayage Lisse Signature', nameAr: 'بالياج ناعم مميز', image: '/images/perruques/carre-long/cl167.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 414, rating: 4.6, reviews: 33, sold: 23, stock: 45, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl168', nameFr: 'Balayage Lisse Frange Soyeux', nameAr: 'بالياج ناعم غرة حريري', image: '/images/perruques/carre-long/cl168.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 421, rating: 4.2, reviews: 44, sold: 36, stock: 34, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl169', nameFr: 'Balayage Vague Douceur', nameAr: 'بالياج مموج نعومة', image: '/images/perruques/carre-long/cl169.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 428, rating: 4.5, reviews: 55, sold: 49, stock: 51, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl170', nameFr: 'Balayage Lisse Luxe', nameAr: 'بالياج ناعم فاخر', image: '/images/perruques/carre-long/cl170.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 435, rating: 4.8, reviews: 28, sold: 16, stock: 40, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl171', nameFr: 'Balayage Lisse Élégance', nameAr: 'بالياج ناعم أنيق', image: '/images/perruques/carre-long/cl171.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 442, rating: 4.4, reviews: 39, sold: 29, stock: 57, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl172', nameFr: 'Balayage Lisse Frange Premium', nameAr: 'بالياج ناعم غرة بريميوم', image: '/images/perruques/carre-long/cl172.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 389, rating: 4.7, reviews: 50, sold: 42, stock: 46, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl173', nameFr: 'Balayage Lisse Frange Signature', nameAr: 'بالياج ناعم غرة مميز', image: '/images/perruques/carre-long/cl173.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 396, rating: 4.3, reviews: 23, sold: 55, stock: 35, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl174', nameFr: 'Balayage Vague Soyeux', nameAr: 'بالياج مموج حريري', image: '/images/perruques/carre-long/cl174.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 403, rating: 4.6, reviews: 34, sold: 22, stock: 52, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl175', nameFr: 'Balayage Lisse Frange Douceur', nameAr: 'بالياج ناعم غرة نعومة', image: '/images/perruques/carre-long/cl175.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 410, rating: 4.2, reviews: 45, sold: 35, stock: 41, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl176', nameFr: 'Balayage Vague Frange Luxe', nameAr: 'بالياج مموج غرة فاخر', image: '/images/perruques/carre-long/cl176.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 417, rating: 4.5, reviews: 56, sold: 48, stock: 58, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl177', nameFr: 'Balayage Lisse Élégance', nameAr: 'بالياج ناعم أنيق', image: '/images/perruques/carre-long/cl177.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 424, rating: 4.8, reviews: 29, sold: 15, stock: 47, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl178', nameFr: 'Balayage Lisse Premium', nameAr: 'بالياج ناعم بريميوم', image: '/images/perruques/carre-long/cl178.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 431, rating: 4.4, reviews: 40, sold: 28, stock: 36, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl179', nameFr: 'Balayage Lisse Signature', nameAr: 'بالياج ناعم مميز', image: '/images/perruques/carre-long/cl179.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 438, rating: 4.7, reviews: 51, sold: 41, stock: 53, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl180', nameFr: 'Balayage Lisse Soyeux', nameAr: 'بالياج ناعم حريري', image: '/images/perruques/carre-long/cl180.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 385, rating: 4.3, reviews: 24, sold: 54, stock: 42, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl181', nameFr: 'Balayage Lisse Douceur', nameAr: 'بالياج ناعم نعومة', image: '/images/perruques/carre-long/cl181.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 392, rating: 4.6, reviews: 35, sold: 21, stock: 59, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl182', nameFr: 'Balayage Lisse Luxe', nameAr: 'بالياج ناعم فاخر', image: '/images/perruques/carre-long/cl182.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 399, rating: 4.2, reviews: 46, sold: 34, stock: 48, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl183', nameFr: 'Balayage Lisse Élégance', nameAr: 'بالياج ناعم أنيق', image: '/images/perruques/carre-long/cl183.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 406, rating: 4.5, reviews: 57, sold: 47, stock: 37, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl184', nameFr: 'Balayage Lisse Premium', nameAr: 'بالياج ناعم بريميوم', image: '/images/perruques/carre-long/cl184.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 413, rating: 4.8, reviews: 30, sold: 14, stock: 54, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl185', nameFr: 'Balayage Lisse Signature', nameAr: 'بالياج ناعم مميز', image: '/images/perruques/carre-long/cl185.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 420, rating: 4.4, reviews: 41, sold: 27, stock: 43, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl186', nameFr: 'Balayage Lisse Soyeux', nameAr: 'بالياج ناعم حريري', image: '/images/perruques/carre-long/cl186.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 427, rating: 4.7, reviews: 52, sold: 40, stock: 60, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl187', nameFr: 'Balayage Lisse Douceur', nameAr: 'بالياج ناعم نعومة', image: '/images/perruques/carre-long/cl187.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 434, rating: 4.3, reviews: 25, sold: 53, stock: 49, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl188', nameFr: 'Balayage Lisse Luxe', nameAr: 'بالياج ناعم فاخر', image: '/images/perruques/carre-long/cl188.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 441, rating: 4.6, reviews: 36, sold: 20, stock: 38, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl189', nameFr: 'Balayage Lisse Élégance', nameAr: 'بالياج ناعم أنيق', image: '/images/perruques/carre-long/cl189.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 388, rating: 4.2, reviews: 47, sold: 33, stock: 55, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl190', nameFr: 'Balayage Vague Premium', nameAr: 'بالياج مموج بريميوم', image: '/images/perruques/carre-long/cl190.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 395, rating: 4.5, reviews: 20, sold: 46, stock: 44, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl191', nameFr: 'Balayage Vague Signature', nameAr: 'بالياج مموج مميز', image: '/images/perruques/carre-long/cl191.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 402, rating: 4.8, reviews: 31, sold: 59, stock: 61, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl192', nameFr: 'Balayage Vague Soyeux', nameAr: 'بالياج مموج حريري', image: '/images/perruques/carre-long/cl192.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 409, rating: 4.4, reviews: 42, sold: 26, stock: 50, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl193', nameFr: 'Balayage Vague Douceur', nameAr: 'بالياج مموج نعومة', image: '/images/perruques/carre-long/cl193.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 416, rating: 4.7, reviews: 53, sold: 39, stock: 39, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl194', nameFr: 'Balayage Vague Luxe', nameAr: 'بالياج مموج فاخر', image: '/images/perruques/carre-long/cl194.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 423, rating: 4.3, reviews: 26, sold: 52, stock: 56, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl195', nameFr: 'Balayage Lisse Élégance', nameAr: 'بالياج ناعم أنيق', image: '/images/perruques/carre-long/cl195.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 430, rating: 4.6, reviews: 37, sold: 19, stock: 45, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl196', nameFr: 'Balayage Lisse Premium', nameAr: 'بالياج ناعم بريميوم', image: '/images/perruques/carre-long/cl196.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 437, rating: 4.2, reviews: 48, sold: 32, stock: 34, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl197', nameFr: 'Balayage Lisse Signature', nameAr: 'بالياج ناعم مميز', image: '/images/perruques/carre-long/cl197.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 444, rating: 4.5, reviews: 21, sold: 45, stock: 51, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl198', nameFr: 'Balayage Lisse Soyeux', nameAr: 'بالياج ناعم حريري', image: '/images/perruques/carre-long/cl198.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 391, rating: 4.8, reviews: 32, sold: 58, stock: 40, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl199', nameFr: 'Balayage Vague Douceur', nameAr: 'بالياج مموج نعومة', image: '/images/perruques/carre-long/cl199.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 398, rating: 4.4, reviews: 43, sold: 25, stock: 57, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl200', nameFr: 'Balayage Vague Luxe', nameAr: 'بالياج مموج فاخر', image: '/images/perruques/carre-long/cl200.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 405, rating: 4.7, reviews: 54, sold: 38, stock: 46, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl201', nameFr: 'Balayage Lisse Élégance', nameAr: 'بالياج ناعم أنيق', image: '/images/perruques/carre-long/cl201.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 412, rating: 4.3, reviews: 27, sold: 51, stock: 35, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl202', nameFr: 'Balayage Lisse Premium', nameAr: 'بالياج ناعم بريميوم', image: '/images/perruques/carre-long/cl202.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 419, rating: 4.6, reviews: 38, sold: 18, stock: 52, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl203', nameFr: 'Balayage Lisse Signature', nameAr: 'بالياج ناعم مميز', image: '/images/perruques/carre-long/cl203.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 426, rating: 4.2, reviews: 49, sold: 31, stock: 41, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl204', nameFr: 'Balayage Lisse Soyeux', nameAr: 'بالياج ناعم حريري', image: '/images/perruques/carre-long/cl204.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 433, rating: 4.5, reviews: 22, sold: 44, stock: 58, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl205', nameFr: 'Balayage Lisse Frange Douceur', nameAr: 'بالياج ناعم غرة نعومة', image: '/images/perruques/carre-long/cl205.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 440, rating: 4.8, reviews: 33, sold: 57, stock: 47, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl206', nameFr: 'Balayage Lisse Luxe', nameAr: 'بالياج ناعم فاخر', image: '/images/perruques/carre-long/cl206.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 387, rating: 4.4, reviews: 44, sold: 24, stock: 36, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl207', nameFr: 'Balayage Lisse Élégance', nameAr: 'بالياج ناعم أنيق', image: '/images/perruques/carre-long/cl207.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 394, rating: 4.7, reviews: 55, sold: 37, stock: 53, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl208', nameFr: 'Balayage Lisse Premium', nameAr: 'بالياج ناعم بريميوم', image: '/images/perruques/carre-long/cl208.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 401, rating: 4.3, reviews: 28, sold: 50, stock: 42, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl209', nameFr: 'Balayage Vague Frange Signature', nameAr: 'بالياج مموج غرة مميز', image: '/images/perruques/carre-long/cl209.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 408, rating: 4.6, reviews: 39, sold: 17, stock: 59, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl210', nameFr: 'Balayage Vague Soyeux', nameAr: 'بالياج مموج حريري', image: '/images/perruques/carre-long/cl210.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 415, rating: 4.2, reviews: 50, sold: 30, stock: 48, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl211', nameFr: 'Balayage Vague Douceur', nameAr: 'بالياج مموج نعومة', image: '/images/perruques/carre-long/cl211.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 422, rating: 4.5, reviews: 23, sold: 43, stock: 37, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl212', nameFr: 'Balayage Vague Luxe', nameAr: 'بالياج مموج فاخر', image: '/images/perruques/carre-long/cl212.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 429, rating: 4.8, reviews: 34, sold: 56, stock: 54, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl213', nameFr: 'Balayage Vague Frange Élégance', nameAr: 'بالياج مموج غرة أنيق', image: '/images/perruques/carre-long/cl213.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 436, rating: 4.4, reviews: 45, sold: 23, stock: 43, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl214', nameFr: 'Balayage Vague Frange Premium', nameAr: 'بالياج مموج غرة بريميوم', image: '/images/perruques/carre-long/cl214.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 443, rating: 4.7, reviews: 56, sold: 36, stock: 60, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl215', nameFr: 'Balayage Vague Signature', nameAr: 'بالياج مموج مميز', image: '/images/perruques/carre-long/cl215.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 390, rating: 4.3, reviews: 29, sold: 49, stock: 49, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl216', nameFr: 'Balayage Vague Soyeux', nameAr: 'بالياج مموج حريري', image: '/images/perruques/carre-long/cl216.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 397, rating: 4.6, reviews: 40, sold: 16, stock: 38, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl217', nameFr: 'Balayage Vague Douceur', nameAr: 'بالياج مموج نعومة', image: '/images/perruques/carre-long/cl217.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 404, rating: 4.2, reviews: 51, sold: 29, stock: 55, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl218', nameFr: 'Balayage Lisse Luxe', nameAr: 'بالياج ناعم فاخر', image: '/images/perruques/carre-long/cl218.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 411, rating: 4.5, reviews: 24, sold: 42, stock: 44, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl219', nameFr: 'Balayage Lisse Élégance', nameAr: 'بالياج ناعم أنيق', image: '/images/perruques/carre-long/cl219.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 418, rating: 4.8, reviews: 35, sold: 55, stock: 61, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl220', nameFr: 'Balayage Lisse Premium', nameAr: 'بالياج ناعم بريميوم', image: '/images/perruques/carre-long/cl220.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 425, rating: 4.4, reviews: 46, sold: 22, stock: 50, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl221', nameFr: 'Balayage Vague Frange Signature', nameAr: 'بالياج مموج غرة مميز', image: '/images/perruques/carre-long/cl221.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 432, rating: 4.7, reviews: 57, sold: 35, stock: 39, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl222', nameFr: 'Balayage Lisse Soyeux', nameAr: 'بالياج ناعم حريري', image: '/images/perruques/carre-long/cl222.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 439, rating: 4.3, reviews: 30, sold: 48, stock: 56, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl223', nameFr: 'Balayage Vague Douceur', nameAr: 'بالياج مموج نعومة', image: '/images/perruques/carre-long/cl223.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 386, rating: 4.6, reviews: 41, sold: 15, stock: 45, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl224', nameFr: 'Balayage Lisse Frange Luxe', nameAr: 'بالياج ناعم غرة فاخر', image: '/images/perruques/carre-long/cl224.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 393, rating: 4.2, reviews: 52, sold: 28, stock: 34, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl225', nameFr: 'Balayage Lisse Élégance', nameAr: 'بالياج ناعم أنيق', image: '/images/perruques/carre-long/cl225.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 400, rating: 4.5, reviews: 25, sold: 41, stock: 51, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl226', nameFr: 'Balayage Lisse Premium', nameAr: 'بالياج ناعم بريميوم', image: '/images/perruques/carre-long/cl226.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 407, rating: 4.8, reviews: 36, sold: 54, stock: 40, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl227', nameFr: 'Balayage Vague Frange Signature', nameAr: 'بالياج مموج غرة مميز', image: '/images/perruques/carre-long/cl227.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 414, rating: 4.4, reviews: 47, sold: 21, stock: 57, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl228', nameFr: 'Balayage Lisse Soyeux', nameAr: 'بالياج ناعم حريري', image: '/images/perruques/carre-long/cl228.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 421, rating: 4.7, reviews: 20, sold: 34, stock: 46, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl229', nameFr: 'Balayage Vague Douceur', nameAr: 'بالياج مموج نعومة', image: '/images/perruques/carre-long/cl229.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 428, rating: 4.3, reviews: 31, sold: 47, stock: 35, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl230', nameFr: 'Balayage Lisse Luxe', nameAr: 'بالياج ناعم فاخر', image: '/images/perruques/carre-long/cl230.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 435, rating: 4.6, reviews: 42, sold: 14, stock: 52, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl231', nameFr: 'Balayage Lisse Élégance', nameAr: 'بالياج ناعم أنيق', image: '/images/perruques/carre-long/cl231.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 442, rating: 4.2, reviews: 53, sold: 27, stock: 41, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl232', nameFr: 'Balayage Lisse Frange Premium', nameAr: 'بالياج ناعم غرة بريميوم', image: '/images/perruques/carre-long/cl232.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 389, rating: 4.5, reviews: 26, sold: 40, stock: 58, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl233', nameFr: 'Balayage Lisse Signature', nameAr: 'بالياج ناعم مميز', image: '/images/perruques/carre-long/cl233.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 396, rating: 4.8, reviews: 37, sold: 53, stock: 47, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl234', nameFr: 'Balayage Lisse Soyeux', nameAr: 'بالياج ناعم حريري', image: '/images/perruques/carre-long/cl234.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 403, rating: 4.4, reviews: 48, sold: 20, stock: 36, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl235', nameFr: 'Balayage Lisse Douceur', nameAr: 'بالياج ناعم نعومة', image: '/images/perruques/carre-long/cl235.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 410, rating: 4.7, reviews: 21, sold: 33, stock: 53, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl236', nameFr: 'Balayage Lisse Luxe', nameAr: 'بالياج ناعم فاخر', image: '/images/perruques/carre-long/cl236.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 417, rating: 4.3, reviews: 32, sold: 46, stock: 42, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl237', nameFr: 'Balayage Lisse Élégance', nameAr: 'بالياج ناعم أنيق', image: '/images/perruques/carre-long/cl237.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 424, rating: 4.6, reviews: 43, sold: 59, stock: 59, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl238', nameFr: 'Balayage Lisse Premium', nameAr: 'بالياج ناعم بريميوم', image: '/images/perruques/carre-long/cl238.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 431, rating: 4.2, reviews: 54, sold: 26, stock: 48, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl239', nameFr: 'Balayage Lisse Signature', nameAr: 'بالياج ناعم مميز', image: '/images/perruques/carre-long/cl239.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 438, rating: 4.5, reviews: 27, sold: 39, stock: 37, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl240', nameFr: 'Balayage Lisse Soyeux', nameAr: 'بالياج ناعم حريري', image: '/images/perruques/carre-long/cl240.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 385, rating: 4.8, reviews: 38, sold: 52, stock: 54, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl241', nameFr: 'Balayage Vague Douceur', nameAr: 'بالياج مموج نعومة', image: '/images/perruques/carre-long/cl241.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 392, rating: 4.4, reviews: 49, sold: 19, stock: 43, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl242', nameFr: 'Balayage Vague Luxe', nameAr: 'بالياج مموج فاخر', image: '/images/perruques/carre-long/cl242.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 399, rating: 4.7, reviews: 22, sold: 32, stock: 60, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl243', nameFr: 'Balayage Lisse Élégance', nameAr: 'بالياج ناعم أنيق', image: '/images/perruques/carre-long/cl243.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 406, rating: 4.3, reviews: 33, sold: 45, stock: 49, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl244', nameFr: 'Balayage Lisse Premium', nameAr: 'بالياج ناعم بريميوم', image: '/images/perruques/carre-long/cl244.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 413, rating: 4.6, reviews: 44, sold: 58, stock: 38, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl245', nameFr: 'Balayage Lisse Signature', nameAr: 'بالياج ناعم مميز', image: '/images/perruques/carre-long/cl245.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 420, rating: 4.2, reviews: 55, sold: 25, stock: 55, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl246', nameFr: 'Balayage Lisse Soyeux', nameAr: 'بالياج ناعم حريري', image: '/images/perruques/carre-long/cl246.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 427, rating: 4.5, reviews: 28, sold: 38, stock: 44, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl247', nameFr: 'Balayage Lisse Douceur', nameAr: 'بالياج ناعم نعومة', image: '/images/perruques/carre-long/cl247.jpg', typeFr: 'Perruque Carré Long — Highlight', typeAr: 'باروكة كاريه طويل — هايلايت', basePrice: 434, rating: 4.8, reviews: 39, sold: 51, stock: 61, category: 'highlight', categoryFr: 'Highlight', categoryAr: 'هايلايت' },
  { id: 'cl248', nameFr: 'Blond Lisse Soyeux', nameAr: 'أشقر ناعم حريري', image: '/images/perruques/carre-long/cl248.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 461, rating: 4.4, reviews: 50, sold: 18, stock: 50, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl249', nameFr: 'Blond Lisse Douceur', nameAr: 'أشقر ناعم نعومة', image: '/images/perruques/carre-long/cl249.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 408, rating: 4.7, reviews: 23, sold: 31, stock: 39, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl250', nameFr: 'Blond Lisse Luxe', nameAr: 'أشقر ناعم فاخر', image: '/images/perruques/carre-long/cl250.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 415, rating: 4.3, reviews: 34, sold: 44, stock: 56, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl251', nameFr: 'Blond Vague Élégance', nameAr: 'أشقر مموج أنيق', image: '/images/perruques/carre-long/cl251.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 422, rating: 4.6, reviews: 45, sold: 57, stock: 45, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl252', nameFr: 'Blond Lisse Premium', nameAr: 'أشقر ناعم بريميوم', image: '/images/perruques/carre-long/cl252.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 429, rating: 4.2, reviews: 56, sold: 24, stock: 34, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl253', nameFr: 'Blond Lisse Signature', nameAr: 'أشقر ناعم مميز', image: '/images/perruques/carre-long/cl253.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 436, rating: 4.5, reviews: 29, sold: 37, stock: 51, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl254', nameFr: 'Blond Lisse Soyeux', nameAr: 'أشقر ناعم حريري', image: '/images/perruques/carre-long/cl254.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 443, rating: 4.8, reviews: 40, sold: 50, stock: 40, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl255', nameFr: 'Blond Lisse Douceur', nameAr: 'أشقر ناعم نعومة', image: '/images/perruques/carre-long/cl255.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 450, rating: 4.4, reviews: 51, sold: 17, stock: 57, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl256', nameFr: 'Blond Lisse Luxe', nameAr: 'أشقر ناعم فاخر', image: '/images/perruques/carre-long/cl256.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 457, rating: 4.7, reviews: 24, sold: 30, stock: 46, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl257', nameFr: 'Blond Vague Élégance', nameAr: 'أشقر مموج أنيق', image: '/images/perruques/carre-long/cl257.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 464, rating: 4.3, reviews: 35, sold: 43, stock: 35, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl258', nameFr: 'Blond Vague Premium', nameAr: 'أشقر مموج بريميوم', image: '/images/perruques/carre-long/cl258.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 411, rating: 4.6, reviews: 46, sold: 56, stock: 52, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl259', nameFr: 'Blond Vague Signature', nameAr: 'أشقر مموج مميز', image: '/images/perruques/carre-long/cl259.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 418, rating: 4.2, reviews: 57, sold: 23, stock: 41, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl260', nameFr: 'Blond Lisse Soyeux', nameAr: 'أشقر ناعم حريري', image: '/images/perruques/carre-long/cl260.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 425, rating: 4.5, reviews: 30, sold: 36, stock: 58, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl261', nameFr: 'Blond Vague Frange Douceur', nameAr: 'أشقر مموج غرة نعومة', image: '/images/perruques/carre-long/cl261.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 432, rating: 4.8, reviews: 41, sold: 49, stock: 47, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl262', nameFr: 'Blond Vague Luxe', nameAr: 'أشقر مموج فاخر', image: '/images/perruques/carre-long/cl262.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 439, rating: 4.4, reviews: 52, sold: 16, stock: 36, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl263', nameFr: 'Blond Lisse Frange Élégance', nameAr: 'أشقر ناعم غرة أنيق', image: '/images/perruques/carre-long/cl263.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 446, rating: 4.7, reviews: 25, sold: 29, stock: 53, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl264', nameFr: 'Blond Vague Premium', nameAr: 'أشقر مموج بريميوم', image: '/images/perruques/carre-long/cl264.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 453, rating: 4.3, reviews: 36, sold: 42, stock: 42, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl265', nameFr: 'Blond Vague Signature', nameAr: 'أشقر مموج مميز', image: '/images/perruques/carre-long/cl265.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 460, rating: 4.6, reviews: 47, sold: 55, stock: 59, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl266', nameFr: 'Blond Vague Soyeux', nameAr: 'أشقر مموج حريري', image: '/images/perruques/carre-long/cl266.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 407, rating: 4.2, reviews: 20, sold: 22, stock: 48, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl267', nameFr: 'Blond Lisse Douceur', nameAr: 'أشقر ناعم نعومة', image: '/images/perruques/carre-long/cl267.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 414, rating: 4.5, reviews: 31, sold: 35, stock: 37, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl268', nameFr: 'Blond Lisse Luxe', nameAr: 'أشقر ناعم فاخر', image: '/images/perruques/carre-long/cl268.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 421, rating: 4.8, reviews: 42, sold: 48, stock: 54, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl269', nameFr: 'Blond Lisse Élégance', nameAr: 'أشقر ناعم أنيق', image: '/images/perruques/carre-long/cl269.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 428, rating: 4.4, reviews: 53, sold: 15, stock: 43, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl270', nameFr: 'Blond Frisé Premium', nameAr: 'أشقر مجعد بريميوم', image: '/images/perruques/carre-long/cl270.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 435, rating: 4.7, reviews: 26, sold: 28, stock: 60, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl271', nameFr: 'Blond Frisé Signature', nameAr: 'أشقر مجعد مميز', image: '/images/perruques/carre-long/cl271.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 442, rating: 4.3, reviews: 37, sold: 41, stock: 49, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl272', nameFr: 'Blond Frisé Soyeux', nameAr: 'أشقر مجعد حريري', image: '/images/perruques/carre-long/cl272.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 449, rating: 4.6, reviews: 48, sold: 54, stock: 38, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl273', nameFr: 'Blond Frisé Douceur', nameAr: 'أشقر مجعد نعومة', image: '/images/perruques/carre-long/cl273.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 456, rating: 4.2, reviews: 21, sold: 21, stock: 55, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl274', nameFr: 'Blond Lisse Luxe', nameAr: 'أشقر ناعم فاخر', image: '/images/perruques/carre-long/cl274.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 463, rating: 4.5, reviews: 32, sold: 34, stock: 44, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl275', nameFr: 'Blond Vague Élégance', nameAr: 'أشقر مموج أنيق', image: '/images/perruques/carre-long/cl275.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 410, rating: 4.8, reviews: 43, sold: 47, stock: 61, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl276', nameFr: 'Blond Vague Premium', nameAr: 'أشقر مموج بريميوم', image: '/images/perruques/carre-long/cl276.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 417, rating: 4.4, reviews: 54, sold: 14, stock: 50, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl277', nameFr: 'Blond Vague Signature', nameAr: 'أشقر مموج مميز', image: '/images/perruques/carre-long/cl277.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 424, rating: 4.7, reviews: 27, sold: 27, stock: 39, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl278', nameFr: 'Blond Vague Frange Soyeux', nameAr: 'أشقر مموج غرة حريري', image: '/images/perruques/carre-long/cl278.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 431, rating: 4.3, reviews: 38, sold: 40, stock: 56, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl279', nameFr: 'Blond Vague Douceur', nameAr: 'أشقر مموج نعومة', image: '/images/perruques/carre-long/cl279.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 438, rating: 4.6, reviews: 49, sold: 53, stock: 45, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl280', nameFr: 'Blond Lisse Luxe', nameAr: 'أشقر ناعم فاخر', image: '/images/perruques/carre-long/cl280.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 445, rating: 4.2, reviews: 22, sold: 20, stock: 34, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl281', nameFr: 'Blond Lisse Élégance', nameAr: 'أشقر ناعم أنيق', image: '/images/perruques/carre-long/cl281.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 452, rating: 4.5, reviews: 33, sold: 33, stock: 51, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl282', nameFr: 'Blond Lisse Frange Premium', nameAr: 'أشقر ناعم غرة بريميوم', image: '/images/perruques/carre-long/cl282.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 459, rating: 4.8, reviews: 44, sold: 46, stock: 40, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl283', nameFr: 'Blond Lisse Signature', nameAr: 'أشقر ناعم مميز', image: '/images/perruques/carre-long/cl283.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 406, rating: 4.4, reviews: 55, sold: 59, stock: 57, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl284', nameFr: 'Blond Vague Frange Soyeux', nameAr: 'أشقر مموج غرة حريري', image: '/images/perruques/carre-long/cl284.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 413, rating: 4.7, reviews: 28, sold: 26, stock: 46, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl285', nameFr: 'Blond Vague Frange Douceur', nameAr: 'أشقر مموج غرة نعومة', image: '/images/perruques/carre-long/cl285.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 420, rating: 4.3, reviews: 39, sold: 39, stock: 35, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl286', nameFr: 'Blond Vague Luxe', nameAr: 'أشقر مموج فاخر', image: '/images/perruques/carre-long/cl286.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 427, rating: 4.6, reviews: 50, sold: 52, stock: 52, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl287', nameFr: 'Blond Vague Élégance', nameAr: 'أشقر مموج أنيق', image: '/images/perruques/carre-long/cl287.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 434, rating: 4.2, reviews: 23, sold: 19, stock: 41, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl288', nameFr: 'Blond Lisse Premium', nameAr: 'أشقر ناعم بريميوم', image: '/images/perruques/carre-long/cl288.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 441, rating: 4.5, reviews: 34, sold: 32, stock: 58, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl289', nameFr: 'Blond Lisse Signature', nameAr: 'أشقر ناعم مميز', image: '/images/perruques/carre-long/cl289.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 448, rating: 4.8, reviews: 45, sold: 45, stock: 47, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl290', nameFr: 'Blond Vague Soyeux', nameAr: 'أشقر مموج حريري', image: '/images/perruques/carre-long/cl290.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 455, rating: 4.4, reviews: 56, sold: 58, stock: 36, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl291', nameFr: 'Blond Vague Douceur', nameAr: 'أشقر مموج نعومة', image: '/images/perruques/carre-long/cl291.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 462, rating: 4.7, reviews: 29, sold: 25, stock: 53, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl292', nameFr: 'Blond Vague Frange Luxe', nameAr: 'أشقر مموج غرة فاخر', image: '/images/perruques/carre-long/cl292.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 409, rating: 4.3, reviews: 40, sold: 38, stock: 42, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl293', nameFr: 'Blond Lisse Frange Élégance', nameAr: 'أشقر ناعم غرة أنيق', image: '/images/perruques/carre-long/cl293.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 416, rating: 4.6, reviews: 51, sold: 51, stock: 59, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl294', nameFr: 'Blond Vague Frange Premium', nameAr: 'أشقر مموج غرة بريميوم', image: '/images/perruques/carre-long/cl294.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 423, rating: 4.2, reviews: 24, sold: 18, stock: 48, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl295', nameFr: 'Blond Vague Signature', nameAr: 'أشقر مموج مميز', image: '/images/perruques/carre-long/cl295.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 430, rating: 4.5, reviews: 35, sold: 31, stock: 37, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl296', nameFr: 'Blond Vague Soyeux', nameAr: 'أشقر مموج حريري', image: '/images/perruques/carre-long/cl296.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 437, rating: 4.8, reviews: 46, sold: 44, stock: 54, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl297', nameFr: 'Blond Vague Douceur', nameAr: 'أشقر مموج نعومة', image: '/images/perruques/carre-long/cl297.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 444, rating: 4.4, reviews: 57, sold: 57, stock: 43, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl298', nameFr: 'Blond Vague Luxe', nameAr: 'أشقر مموج فاخر', image: '/images/perruques/carre-long/cl298.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 451, rating: 4.7, reviews: 30, sold: 24, stock: 60, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl299', nameFr: 'Blond Lisse Élégance', nameAr: 'أشقر ناعم أنيق', image: '/images/perruques/carre-long/cl299.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 458, rating: 4.3, reviews: 41, sold: 37, stock: 49, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl300', nameFr: 'Blond Vague Premium', nameAr: 'أشقر مموج بريميوم', image: '/images/perruques/carre-long/cl300.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 405, rating: 4.6, reviews: 52, sold: 50, stock: 38, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl301', nameFr: 'Blond Vague Signature', nameAr: 'أشقر مموج مميز', image: '/images/perruques/carre-long/cl301.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 412, rating: 4.2, reviews: 25, sold: 17, stock: 55, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl302', nameFr: 'Blond Vague Soyeux', nameAr: 'أشقر مموج حريري', image: '/images/perruques/carre-long/cl302.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 419, rating: 4.5, reviews: 36, sold: 30, stock: 44, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl303', nameFr: 'Blond Vague Douceur', nameAr: 'أشقر مموج نعومة', image: '/images/perruques/carre-long/cl303.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 426, rating: 4.8, reviews: 47, sold: 43, stock: 61, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl304', nameFr: 'Blond Vague Luxe', nameAr: 'أشقر مموج فاخر', image: '/images/perruques/carre-long/cl304.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 433, rating: 4.4, reviews: 20, sold: 56, stock: 50, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl305', nameFr: 'Blond Vague Élégance', nameAr: 'أشقر مموج أنيق', image: '/images/perruques/carre-long/cl305.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 440, rating: 4.7, reviews: 31, sold: 23, stock: 39, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl306', nameFr: 'Blond Vague Frange Premium', nameAr: 'أشقر مموج غرة بريميوم', image: '/images/perruques/carre-long/cl306.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 447, rating: 4.3, reviews: 42, sold: 36, stock: 56, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl307', nameFr: 'Blond Vague Signature', nameAr: 'أشقر مموج مميز', image: '/images/perruques/carre-long/cl307.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 454, rating: 4.6, reviews: 53, sold: 49, stock: 45, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl308', nameFr: 'Blond Lisse Soyeux', nameAr: 'أشقر ناعم حريري', image: '/images/perruques/carre-long/cl308.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 461, rating: 4.2, reviews: 26, sold: 16, stock: 34, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl309', nameFr: 'Blond Lisse Douceur', nameAr: 'أشقر ناعم نعومة', image: '/images/perruques/carre-long/cl309.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 408, rating: 4.5, reviews: 37, sold: 29, stock: 51, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl310', nameFr: 'Blond Lisse Luxe', nameAr: 'أشقر ناعم فاخر', image: '/images/perruques/carre-long/cl310.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 415, rating: 4.8, reviews: 48, sold: 42, stock: 40, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl311', nameFr: 'Blond Lisse Frange Élégance', nameAr: 'أشقر ناعم غرة أنيق', image: '/images/perruques/carre-long/cl311.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 422, rating: 4.4, reviews: 21, sold: 55, stock: 57, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl312', nameFr: 'Blond Lisse Frange Premium', nameAr: 'أشقر ناعم غرة بريميوم', image: '/images/perruques/carre-long/cl312.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 429, rating: 4.7, reviews: 32, sold: 22, stock: 46, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl313', nameFr: 'Blond Lisse Signature', nameAr: 'أشقر ناعم مميز', image: '/images/perruques/carre-long/cl313.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 436, rating: 4.3, reviews: 43, sold: 35, stock: 35, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl314', nameFr: 'Blond Lisse Soyeux', nameAr: 'أشقر ناعم حريري', image: '/images/perruques/carre-long/cl314.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 443, rating: 4.6, reviews: 54, sold: 48, stock: 52, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl315', nameFr: 'Blond Lisse Frange Douceur', nameAr: 'أشقر ناعم غرة نعومة', image: '/images/perruques/carre-long/cl315.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 450, rating: 4.2, reviews: 27, sold: 15, stock: 41, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl316', nameFr: 'Blond Lisse Luxe', nameAr: 'أشقر ناعم فاخر', image: '/images/perruques/carre-long/cl316.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 457, rating: 4.5, reviews: 38, sold: 28, stock: 58, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl317', nameFr: 'Blond Lisse Frange Élégance', nameAr: 'أشقر ناعم غرة أنيق', image: '/images/perruques/carre-long/cl317.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 464, rating: 4.8, reviews: 49, sold: 41, stock: 47, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl318', nameFr: 'Blond Lisse Frange Premium', nameAr: 'أشقر ناعم غرة بريميوم', image: '/images/perruques/carre-long/cl318.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 411, rating: 4.4, reviews: 22, sold: 54, stock: 36, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl319', nameFr: 'Blond Vague Frange Signature', nameAr: 'أشقر مموج غرة مميز', image: '/images/perruques/carre-long/cl319.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 418, rating: 4.7, reviews: 33, sold: 21, stock: 53, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl320', nameFr: 'Blond Lisse Soyeux', nameAr: 'أشقر ناعم حريري', image: '/images/perruques/carre-long/cl320.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 425, rating: 4.3, reviews: 44, sold: 34, stock: 42, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl321', nameFr: 'Blond Lisse Douceur', nameAr: 'أشقر ناعم نعومة', image: '/images/perruques/carre-long/cl321.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 432, rating: 4.6, reviews: 55, sold: 47, stock: 59, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl322', nameFr: 'Blond Lisse Luxe', nameAr: 'أشقر ناعم فاخر', image: '/images/perruques/carre-long/cl322.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 439, rating: 4.2, reviews: 28, sold: 14, stock: 48, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl323', nameFr: 'Blond Lisse Élégance', nameAr: 'أشقر ناعم أنيق', image: '/images/perruques/carre-long/cl323.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 446, rating: 4.5, reviews: 39, sold: 27, stock: 37, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl324', nameFr: 'Blond Lisse Frange Premium', nameAr: 'أشقر ناعم غرة بريميوم', image: '/images/perruques/carre-long/cl324.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 453, rating: 4.8, reviews: 50, sold: 40, stock: 54, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl325', nameFr: 'Blond Vague Signature', nameAr: 'أشقر مموج مميز', image: '/images/perruques/carre-long/cl325.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 460, rating: 4.4, reviews: 23, sold: 53, stock: 43, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl326', nameFr: 'Blond Vague Soyeux', nameAr: 'أشقر مموج حريري', image: '/images/perruques/carre-long/cl326.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 407, rating: 4.7, reviews: 34, sold: 20, stock: 60, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl327', nameFr: 'Blond Vague Douceur', nameAr: 'أشقر مموج نعومة', image: '/images/perruques/carre-long/cl327.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 414, rating: 4.3, reviews: 45, sold: 33, stock: 49, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl328', nameFr: 'Blond Vague Luxe', nameAr: 'أشقر مموج فاخر', image: '/images/perruques/carre-long/cl328.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 421, rating: 4.6, reviews: 56, sold: 46, stock: 38, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl329', nameFr: 'Blond Lisse Élégance', nameAr: 'أشقر ناعم أنيق', image: '/images/perruques/carre-long/cl329.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 428, rating: 4.2, reviews: 29, sold: 59, stock: 55, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl330', nameFr: 'Blond Lisse Premium', nameAr: 'أشقر ناعم بريميوم', image: '/images/perruques/carre-long/cl330.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 435, rating: 4.5, reviews: 40, sold: 26, stock: 44, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl331', nameFr: 'Blond Lisse Signature', nameAr: 'أشقر ناعم مميز', image: '/images/perruques/carre-long/cl331.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 442, rating: 4.8, reviews: 51, sold: 39, stock: 61, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl332', nameFr: 'Blond Vague Soyeux', nameAr: 'أشقر مموج حريري', image: '/images/perruques/carre-long/cl332.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 449, rating: 4.4, reviews: 24, sold: 52, stock: 50, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl333', nameFr: 'Blond Vague Douceur', nameAr: 'أشقر مموج نعومة', image: '/images/perruques/carre-long/cl333.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 456, rating: 4.7, reviews: 35, sold: 19, stock: 39, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl334', nameFr: 'Blond Vague Luxe', nameAr: 'أشقر مموج فاخر', image: '/images/perruques/carre-long/cl334.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 463, rating: 4.3, reviews: 46, sold: 32, stock: 56, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl335', nameFr: 'Blond Lisse Élégance', nameAr: 'أشقر ناعم أنيق', image: '/images/perruques/carre-long/cl335.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 410, rating: 4.6, reviews: 57, sold: 45, stock: 45, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl336', nameFr: 'Blond Lisse Premium', nameAr: 'أشقر ناعم بريميوم', image: '/images/perruques/carre-long/cl336.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 417, rating: 4.2, reviews: 30, sold: 58, stock: 34, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl337', nameFr: 'Blond Vague Signature', nameAr: 'أشقر مموج مميز', image: '/images/perruques/carre-long/cl337.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 424, rating: 4.5, reviews: 41, sold: 25, stock: 51, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
  { id: 'cl338', nameFr: 'Blond Vague Soyeux', nameAr: 'أشقر مموج حريري', image: '/images/perruques/carre-long/cl338.jpg', typeFr: 'Perruque Carré Long — Blond', typeAr: 'باروكة كاريه طويل — أشقر', basePrice: 431, rating: 4.8, reviews: 52, sold: 38, stock: 40, category: 'blonde', categoryFr: 'Blond', categoryAr: 'أشقر' },
];



/* ═══════════════════════════════════════════
   VARIANT OPTIONS (shared)
   ═══════════════════════════════════════════ */

const lengths = ['8 pouces', '10 pouces', '12 pouces', '14 pouces'];
const densities = ['120%', '150%', '180%', '220%', '280%'];
const hairTypes = ['Lisses', 'Ondul\u00e9s', 'Cr\u00e9pus', 'Fris\u00e9s'];
const wigCaps = [
  '5\u00d75 Glueless Wig', '13\u00d74 Lace Front Wig', '13\u00d76 Lace Front Wig',
  '2\u00d76 Lace', '6\u00d76 Closure Wig', '7\u00d77 Closure Wig',
  '360\u00b0 Lace', 'Full Lace Wig', 'Silicone M\u00e9dicale', 'Silk M\u00e9dicale', 'Mono M\u00e9dicale',
];
const wigSizes = ['Standard', 'Taille S', 'Taille M', 'Taille L', 'Sur Mesure'];

const priceMap: Record<string, number> = {
  '8 pouces': -80, '10 pouces': -40, '12 pouces': 0, '14 pouces': 60,
};
const originalMap: Record<string, number> = {
  '8 pouces': -200, '10 pouces': -100, '12 pouces': 0, '14 pouces': 140,
};

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */

export default function PerruquesCarreLong() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get('product');

  const [mainIdx, setMainIdx] = useState(0);
  const [selLength, setSelLength] = useState('12 pouces');
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

  const basePrice = selectedProduct?.basePrice || 380;
  const price = basePrice + (priceMap[selLength] || 0);
  const original = (basePrice + 330) + (originalMap[selLength] || 0);
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
    setSelLength('12 pouces');
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
            <span style={{ color: 'var(--tb-text)' }}>Carré Long</span>
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#d4a5a5', marginBottom: '8px' }}>
            {lang === 'fr' ? 'COLLECTION PERRUQUES CARR\u00c9 LONG \u2014 338 MOD\u00c8LES' : '\u0645\u062c\u0645\u0648\u0639\u0629 \u0628\u0627\u0631\u0648\u0643\u0627\u062a \u0627\u0644\u0643\u0627\u0631\u064a\u0647 \u0627\u0644\u0637\u0648\u064a\u0644 \u2014 338 \u0645\u0648\u062f\u064a\u0644'}
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#d4a5a5', lineHeight: 1.15, marginBottom: '8px' }}>
            {lang === 'fr' ? 'Perruques Carr\u00e9 Long' : '\u0628\u0627\u0631\u0648\u0643\u0627\u062a \u0643\u0627\u0631\u064a\u0647 \u0637\u0648\u064a\u0644'}
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
    `Ce magnifique carré long de couleur ${catLabel.toLowerCase()} est confectionn\u00e9e avec des cheveux humains Remy de premi\u00e8re qualit\u00e9. Les fibres offrent une douceur soyeuse, une brillance naturelle et un mouvement fluide pour un r\u00e9sultat ultra-r\u00e9aliste.`,
    `La lace front HD transparente assure une int\u00e9gration parfaite et une ligne frontale discr\u00e8te. Densit\u00e9 personnalisable de 130% \u00e0 280%, longueurs disponibles de 8" \u00e0 14".`,
  ] : [
    `\u0628\u0627\u0631\u0648\u0643\u0629 \u0644\u064a\u0633 \u0641\u0631\u0648\u0646\u062a \u0628\u0631\u064a\u0645\u064a\u0648\u0645 ${name} \u2014 \u062c\u0648\u062f\u0629 \u0639\u0627\u0644\u064a\u0629`,
    `\u0628\u0627\u0631\u0648\u0643\u0629 \u0627\u0644\u0643\u0627\u0631\u064a\u0647 \u0627\u0644\u0637\u0648\u064a\u0644 \u0627\u0644\u0631\u0627\u0626\u0639\u0629 \u0628\u0627\u0644\u0644\u0648\u0646 ${catLabel} \u0645\u0635\u0646\u0648\u0639\u0629 \u0645\u0646 \u0634\u0639\u0631 \u0628\u0634\u0631\u064a \u0631\u064a\u0645\u064a \u0641\u0627\u0626\u0642 \u0627\u0644\u062c\u0648\u062f\u0629. \u062a\u0648\u0641\u0631 \u0627\u0644\u0623\u0644\u064a\u0627\u0641 \u0646\u0639\u0648\u0645\u0629 \u062d\u0631\u064a\u0631\u064a\u0629 \u0648\u0644\u0645\u0639\u0627\u0646 \u0637\u0628\u064a\u0639\u064a \u0648\u062d\u0631\u0643\u0629 \u0633\u0644\u0633\u0629 \u0644\u0646\u062a\u064a\u062c\u0629 \u0641\u0627\u0626\u0642\u0629 \u0627\u0644\u0648\u0627\u0642\u0639\u064a\u0629.`,
    `\u064a\u0636\u0645\u0646 \u0627\u0644\u0644\u064a\u0633 \u0641\u0631\u0648\u0646\u062a \u0627\u0644\u0634\u0641\u0627\u0641 HD \u0627\u0646\u062f\u0645\u0627\u062c\u0627\u064b \u0645\u062b\u0627\u0644\u064a\u0627\u064b \u0648\u062e\u0637\u0627\u064b \u0623\u0645\u0627\u0645\u064a\u0627\u064b \u062f\u0642\u064a\u0642\u0627\u064b. \u0643\u062b\u0627\u0641\u0629 \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u062a\u062e\u0635\u064a\u0635 \u0645\u0646 130% \u0625\u0644\u0649 280%\u060c \u0648\u0623\u0637\u0648\u0627\u0644 \u0645\u062a\u0648\u0641\u0631\u0629 \u0645\u0646 8" \u0625\u0644\u0649 14".`,
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
                ? `Perruque Lace Front carré long de couleur ${catLabel.toLowerCase()} aux longueurs ondul\u00e9es volumineuses. Cheveux humains Remy premium pour un r\u00e9sultat naturel, doux et brillant.`
                : `\u0628\u0627\u0631\u0648\u0643\u0629 \u0644\u064a\u0633 \u0641\u0631\u0648\u0646\u062a \u0643\u0627\u0631\u064a\u0647 \u0637\u0648\u064a\u0644 \u0628\u0627\u0644\u0644\u0648\u0646 ${catLabel} \u0628\u0623\u0637\u0648\u0627\u0644 \u0645\u0645\u0648\u062c\u0629 \u0643\u062b\u064a\u0641\u0629. \u0634\u0639\u0631 \u0628\u0634\u0631\u064a \u0631\u064a\u0645\u064a \u0628\u0631\u064a\u0645\u064a\u0648\u0645 \u0644\u0646\u062a\u064a\u062c\u0629 \u0637\u0628\u064a\u0639\u064a\u0629 \u0648\u0646\u0627\u0639\u0645\u0629 \u0648\u0644\u0627\u0645\u0639\u0629.`}
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
