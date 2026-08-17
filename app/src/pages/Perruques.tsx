import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import {
  Star, Heart, ShoppingCart, Minus, Plus, Truck, Shield,
  ChevronRight, Sparkles, Check, Zap, Package, AlertTriangle, ArrowLeft
} from 'lucide-react';
import Footer from '../sections/Footer';

/* ═══════════════════════════════════════════
   PRODUCT DATA — 124 Wigs by Color Category
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
  { id: 'nb001', nameFr: 'Noir Naturel Lisse Luxe', nameAr: 'شعر أسود طبيعي ناعم فاخر', image: '/images/perruques/natural-black/nb001.jpg', typeFr: 'Perruque Longue \u2014 Noir Naturel', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0633\u0648\u062f \u0637\u0628\u064a\u0639\u064a', basePrice: 420, rating: 5, reviews: 12, sold: 18, stock: 50, category: 'natural-black', categoryFr: 'Noir Naturel', categoryAr: '\u0623\u0633\u0648\u062f \u0637\u0628\u064a\u0639\u064a' },
  { id: 'nb002', nameFr: 'Noir Naturel Ondul\xe9 Glamour', nameAr: '\u0634\u0639\u0631 \u0623\u0633\u0648\u062f \u0637\u0628\u064a\u0639\u064a \u0645\u0645\u0648\u062c \u0623\u0646\u064a\u0642', image: '/images/perruques/natural-black/nb002.jpg', typeFr: 'Perruque Longue \u2014 Noir Naturel', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0633\u0648\u062f \u0637\u0628\u064a\u0639\u064a', basePrice: 450, rating: 5, reviews: 15, sold: 23, stock: 60, category: 'natural-black', categoryFr: 'Noir Naturel', categoryAr: '\u0623\u0633\u0648\u062f \u0637\u0628\u064a\u0639\u064a' },
  { id: 'nb003', nameFr: 'Noir Naturel Volume Intense', nameAr: '\u0634\u0639\u0631 \u0623\u0633\u0648\u062f \u0637\u0628\u064a\u0639\u064a \u062d\u062c\u0645 \u0643\u062b\u064a\u0641', image: '/images/perruques/natural-black/nb003.jpg', typeFr: 'Perruque Longue \u2014 Noir Naturel', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0633\u0648\u062f \u0637\u0628\u064a\u0639\u064a', basePrice: 440, rating: 5, reviews: 18, sold: 28, stock: 55, category: 'natural-black', categoryFr: 'Noir Naturel', categoryAr: '\u0623\u0633\u0648\u062f \u0637\u0628\u064a\u0639\u064a' },
  { id: 'jb001', nameFr: 'Jet Black Intense \u2014 Lisse Miroir', nameAr: '\u062c\u064a\u062a \u0628\u0644\u0627\u0643 \u0643\u062b\u064a\u0641 \u2014 \u0646\u0627\u0639\u0645 \u0645\u0631\u0622\u0629', image: '/images/perruques/jet-black/jb001.jpg', typeFr: 'Perruque Longue \u2014 Jet Black', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u062c\u064a\u062a \u0628\u0644\u0627\u0643', basePrice: 430, rating: 5, reviews: 15, sold: 22, stock: 55, category: 'jet-black', categoryFr: 'Jet Black', categoryAr: '\u062c\u064a\u062a \u0628\u0644\u0627\u0643' },
  { id: 'db001', nameFr: 'Ch\xe2tain Fonc\xe9 Lisse \xc9l\xe9gance', nameAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a \u062f\u0627\u0643\u0646 \u0646\u0627\u0639\u0645 \u0623\u0646\u064a\u0642', image: '/images/perruques/dark-brown/db001.jpg', typeFr: 'Perruque Longue \u2014 Ch\xe2tain Fonc\xe9', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0643\u0633\u062a\u0646\u0627\u0626\u064a \u062f\u0627\u0643\u0646', basePrice: 440, rating: 5, reviews: 10, sold: 15, stock: 45, category: 'dark-brown', categoryFr: 'Ch\xe2tain Fonc\xe9', categoryAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a \u062f\u0627\u0643\u0646' },
  { id: 'db002', nameFr: 'Ch\xe2tain Fonc\xe9 Multi-Vues', nameAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a \u062f\u0627\u0643\u0646 \u0645\u062a\u0639\u062f\u062f \u0627\u0644\u0632\u0648\u0627\u064a\u0627', image: '/images/perruques/dark-brown/db002.jpg', typeFr: 'Perruque Longue \u2014 Ch\xe2tain Fonc\xe9', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0643\u0633\u062a\u0646\u0627\u0626\u064a \u062f\u0627\u0643\u0646', basePrice: 460, rating: 4.5, reviews: 12, sold: 18, stock: 50, category: 'dark-brown', categoryFr: 'Ch\xe2tain Fonc\xe9', categoryAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a \u062f\u0627\u0643\u0646' },
  { id: 'db003', nameFr: 'Ch\xe2tain Fonc\xe9 Balayage Chaud', nameAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a \u062f\u0627\u0643\u0646 \u0628\u0627\u0644\u064a\u0627\u062c \u062f\u0627\u0641\u064a', image: '/images/perruques/dark-brown/db003.jpg', typeFr: 'Perruque Longue \u2014 Ch\xe2tain Fonc\xe9', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0643\u0633\u062a\u0646\u0627\u0626\u064a \u062f\u0627\u0643\u0646', basePrice: 470, rating: 5, reviews: 14, sold: 21, stock: 48, category: 'dark-brown', categoryFr: 'Ch\xe2tain Fonc\xe9', categoryAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a \u062f\u0627\u0643\u0646' },
  { id: 'db004', nameFr: 'Ch\xe2tain Fonc\xe9 Ondul\xe9 Volume', nameAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a \u062f\u0627\u0643\u0646 \u0645\u0645\u0648\u062c \u0643\u062b\u064a\u0641', image: '/images/perruques/dark-brown/db004.jpg', typeFr: 'Perruque Longue \u2014 Ch\xe2tain Fonc\xe9', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0643\u0633\u062a\u0646\u0627\u0626\u064a \u062f\u0627\u0643\u0646', basePrice: 450, rating: 4.5, reviews: 16, sold: 24, stock: 52, category: 'dark-brown', categoryFr: 'Ch\xe2tain Fonc\xe9', categoryAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a \u062f\u0627\u0643\u0646' },
  { id: 'db005', nameFr: 'Ch\xe2tain Fonc\xe9 Lisse Premium', nameAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a \u062f\u0627\u0643\u0646 \u0646\u0627\u0639\u0645 \u0628\u0631\u064a\u0645\u064a\u0648\u0645', image: '/images/perruques/dark-brown/db005.jpg', typeFr: 'Perruque Longue \u2014 Ch\xe2tain Fonc\xe9', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0643\u0633\u062a\u0646\u0627\u0626\u064a \u062f\u0627\u0643\u0646', basePrice: 445, rating: 5, reviews: 18, sold: 27, stock: 58, category: 'dark-brown', categoryFr: 'Ch\xe2tain Fonc\xe9', categoryAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a \u062f\u0627\u0643\u0646' },
  { id: 'db006', nameFr: 'Ch\xe2tain Fonc\xe9 Frange Glamour', nameAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a \u062f\u0627\u0643\u0646 \u063a\u0631\u0629 \u0623\u0646\u064a\u0642\u0629', image: '/images/perruques/dark-brown/db006.jpg', typeFr: 'Perruque Longue \u2014 Ch\xe2tain Fonc\xe9', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0643\u0633\u062a\u0646\u0627\u0626\u064a \u062f\u0627\u0643\u0646', basePrice: 460, rating: 4.5, reviews: 20, sold: 30, stock: 54, category: 'dark-brown', categoryFr: 'Ch\xe2tain Fonc\xe9', categoryAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a \u062f\u0627\u0643\u0646' },
  { id: 'db007', nameFr: 'Ch\xe2tain Fonc\xe9 Frange Douce', nameAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a \u062f\u0627\u0643\u0646 \u063a\u0631\u0629 \u0646\u0627\u0639\u0645\u0629', image: '/images/perruques/dark-brown/db007.jpg', typeFr: 'Perruque Longue \u2014 Ch\xe2tain Fonc\xe9', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0643\u0633\u062a\u0646\u0627\u0626\u064a \u062f\u0627\u0643\u0646', basePrice: 455, rating: 5, reviews: 22, sold: 33, stock: 60, category: 'dark-brown', categoryFr: 'Ch\xe2tain Fonc\xe9', categoryAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a \u062f\u0627\u0643\u0646' },
  { id: 'db008', nameFr: 'Ch\xe2tain Fonc\xe9 Vagues Luxe', nameAr: '\u0643ستنائي داكن موجات فاخرة', image: '/images/perruques/dark-brown/db008.jpg', typeFr: 'Perruque Longue \u2014 Ch\xe2tain Fonc\xe9', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0643\u0633\u062a\u0646\u0627\u0626\u064a \u062f\u0627\u0643\u0646', basePrice: 480, rating: 5, reviews: 24, sold: 36, stock: 62, category: 'dark-brown', categoryFr: 'Ch\xe2tain Fonc\xe9', categoryAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a \u062f\u0627\u0643\u0646' },
  { id: 'br001', nameFr: 'Ch\xe2tain Clair Ondul\xe9 Doux', nameAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a \u0641\u0627\u062a\u062d \u0645\u0645\u0648\u062c \u0646\u0627\u0639\u0645', image: '/images/perruques/brown/br001.jpg', typeFr: 'Perruque Longue \u2014 Ch\xe2tain', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0643\u0633\u062a\u0646\u0627\u0626\u064a', basePrice: 460, rating: 5, reviews: 8, sold: 12, stock: 40, category: 'brown', categoryFr: 'Ch\xe2tain', categoryAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a' },
  { id: 'br002', nameFr: 'Ch\xe2tain Balayage Finesse', nameAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a \u0628\u0627\u0644\u064a\u0627\u062c \u062f\u0642\u0629', image: '/images/perruques/brown/br002.jpg', typeFr: 'Perruque Longue \u2014 Ch\xe2tain', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0643\u0633\u062a\u0646\u0627\u0626\u064a', basePrice: 480, rating: 4.5, reviews: 10, sold: 14, stock: 43, category: 'brown', categoryFr: 'Ch\xe2tain', categoryAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a' },
  { id: 'br003', nameFr: 'Ch\xe2tain Miel Volumineux', nameAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a \u0639\u0633\u0644\u064a \u0643\u062b\u064a\u0641', image: '/images/perruques/brown/br003.jpg', typeFr: 'Perruque Longue \u2014 Ch\xe2tain', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0643\u0633\u062a\u0646\u0627\u0626\u064a', basePrice: 470, rating: 5, reviews: 12, sold: 16, stock: 46, category: 'brown', categoryFr: 'Ch\xe2tain', categoryAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a' },
  { id: 'br004', nameFr: 'Ch\xe2tain Lisse Satin\xe9', nameAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a \u0646\u0627\u0639\u0645 \u062d\u0631\u064a\u0631\u064a', image: '/images/perruques/brown/br004.jpg', typeFr: 'Perruque Longue \u2014 Ch\xe2tain', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0643\u0633\u062a\u0646\u0627\u0626\u064a', basePrice: 450, rating: 4.5, reviews: 14, sold: 18, stock: 49, category: 'brown', categoryFr: 'Ch\xe2tain', categoryAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a' },
  { id: 'br005', nameFr: 'Ch\xe2tain M\xe8ches Dor\xe9es', nameAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a \u062e\u0635\u0644 \u0630\u0647\u0628\u064a\u0629', image: '/images/perruques/brown/br005.jpg', typeFr: 'Perruque Longue \u2014 Ch\xe2tain', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0643\u0633\u062a\u0646\u0627\u0626\u064a', basePrice: 490, rating: 5, reviews: 16, sold: 20, stock: 52, category: 'brown', categoryFr: 'Ch\xe2tain', categoryAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a' },
  { id: 'br006', nameFr: 'Ch\xe2tain Blond Doux', nameAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a \u0623\u0634\u0642\u0631 \u0646\u0627\u0639\u0645', image: '/images/perruques/brown/br006.jpg', typeFr: 'Perruque Longue \u2014 Ch\xe2tain', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0643\u0633\u062a\u0646\u0627\u0626\u064a', basePrice: 500, rating: 4.5, reviews: 18, sold: 22, stock: 55, category: 'brown', categoryFr: 'Ch\xe2tain', categoryAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a' },
  { id: 'br007', nameFr: 'Ch\xe2tain Naturel Coiff\xe9', nameAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a \u0637\u0628\u064a\u0639\u064a \u0645\u0646\u0633\u062f\u0644', image: '/images/perruques/brown/br007.jpg', typeFr: 'Perruque Longue \u2014 Ch\xe2tain', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0643\u0633\u062a\u0646\u0627\u0626\u064a', basePrice: 460, rating: 5, reviews: 20, sold: 24, stock: 43, category: 'brown', categoryFr: 'Ch\xe2tain', categoryAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a' },
  { id: 'br008', nameFr: 'Ch\xe2tain Moka Lisse', nameAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a \u0645\u0648\u0643\u0627 \u0646\u0627\u0639\u0645', image: '/images/perruques/brown/br008.jpg', typeFr: 'Perruque Longue \u2014 Ch\xe2tain', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0643\u0633\u062a\u0646\u0627\u0626\u064a', basePrice: 455, rating: 4.5, reviews: 22, sold: 26, stock: 46, category: 'brown', categoryFr: 'Ch\xe2tain', categoryAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a' },
  { id: 'br010', nameFr: 'Ch\xe2tain Dor\xe9 Glamour', nameAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a \u0630\u0647\u0628\u064a \u0623\u0646\u064a\u0642', image: '/images/perruques/brown/br010.jpg', typeFr: 'Perruque Longue \u2014 Ch\xe2tain', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0643\u0633\u062a\u0646\u0627\u0626\u064a', basePrice: 485, rating: 5, reviews: 24, sold: 28, stock: 49, category: 'brown', categoryFr: 'Ch\xe2tain', categoryAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a' },
  { id: 'br011', nameFr: 'Ch\xe2tain Cendr\xe9 \xc9l\xe9gant', nameAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a \u0631\u0645\u0627\u062f\u064a \u0623\u0646\u064a\u0642', image: '/images/perruques/brown/br011.jpg', typeFr: 'Perruque Longue \u2014 Ch\xe2tain', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0643\u0633\u062a\u0646\u0627\u0626\u064a', basePrice: 475, rating: 4.5, reviews: 26, sold: 30, stock: 52, category: 'brown', categoryFr: 'Ch\xe2tain', categoryAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a' },
  { id: 'br012', nameFr: 'Ch\xe2tain Beige Ondul\xe9', nameAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a \u0628\u064a\u062c \u0645\u0645\u0648\u062c', image: '/images/perruques/brown/br012.jpg', typeFr: 'Perruque Longue \u2014 Ch\xe2tain', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0643\u0633\u062a\u0646\u0627\u0626\u064a', basePrice: 490, rating: 5, reviews: 28, sold: 32, stock: 55, category: 'brown', categoryFr: 'Ch\xe2tain', categoryAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a' },
  { id: 'br013', nameFr: 'Ch\xe2tain M\xe8ches Blondes', nameAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a \u062e\u0635\u0644 \u0623\u0634\u0642\u0631', image: '/images/perruques/brown/br013.jpg', typeFr: 'Perruque Longue \u2014 Ch\xe2tain', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0643\u0633\u062a\u0646\u0627\u0626\u064a', basePrice: 495, rating: 4.5, reviews: 30, sold: 34, stock: 40, category: 'brown', categoryFr: 'Ch\xe2tain', categoryAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a' },
  { id: 'br014', nameFr: 'Ch\xe2tain Nude Lisse', nameAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a \u0639\u0627\u0631\u064a \u0646\u0627\u0639\u0645', image: '/images/perruques/brown/br014.jpg', typeFr: 'Perruque Longue \u2014 Ch\xe2tain', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0643\u0633\u062a\u0646\u0627\u0626\u064a', basePrice: 470, rating: 5, reviews: 32, sold: 36, stock: 43, category: 'brown', categoryFr: 'Ch\xe2tain', categoryAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a' },
  { id: 'br015', nameFr: 'Ch\xe2tain Balayage Naturel', nameAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a \u0628الياج طبيعي', image: '/images/perruques/brown/br015.jpg', typeFr: 'Perruque Longue \u2014 Ch\xe2tain', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0643\u0633\u062a\u0646\u0627\u0626\u064a', basePrice: 510, rating: 4.5, reviews: 34, sold: 38, stock: 46, category: 'brown', categoryFr: 'Ch\xe2tain', categoryAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a' },
  { id: 'br016', nameFr: 'Ch\xe2tain Gris\xe9 Premium', nameAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a \u0631مادي بريميوم', image: '/images/perruques/brown/br016.jpg', typeFr: 'Perruque Longue \u2014 Ch\xe2tain', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0643\u0633\u062a\u0646\u0627\u0626\u064a', basePrice: 480, rating: 5, reviews: 36, sold: 40, stock: 49, category: 'brown', categoryFr: 'Ch\xe2tain', categoryAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a' },
  { id: 'br017', nameFr: 'Ch\xe2tain Soleil Vagues', nameAr: '\u0643ستنائي شمسي موجات', image: '/images/perruques/brown/br017.jpg', typeFr: 'Perruque Longue \u2014 Ch\xe2tain', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0643\u0633\u062a\u0646\u0627\u0626\u064a', basePrice: 500, rating: 4.5, reviews: 38, sold: 42, stock: 52, category: 'brown', categoryFr: 'Ch\xe2tain', categoryAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a' },
  { id: 'br018', nameFr: 'Ch\xe2tain Chocolat Intense', nameAr: '\u0643ستنائي شوكولاتة كثيف', image: '/images/perruques/brown/br018.jpg', typeFr: 'Perruque Longue \u2014 Ch\xe2tain', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0643\u0633\u062a\u0646\u0627\u0626\u064a', basePrice: 465, rating: 5, reviews: 40, sold: 44, stock: 55, category: 'brown', categoryFr: 'Ch\xe2tain', categoryAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a' },
  { id: 'br019', nameFr: 'Ch\xe2tain Ros\xe9 Ondul\xe9', nameAr: '\u0643ستنائي وردي مموج', image: '/images/perruques/brown/br019.jpg', typeFr: 'Perruque Longue \u2014 Ch\xe2tain', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0643\u0633\u062a\u0646\u0627\u0626\u064a', basePrice: 505, rating: 4.5, reviews: 42, sold: 46, stock: 58, category: 'brown', categoryFr: 'Ch\xe2tain', categoryAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a' },
  { id: 'br020', nameFr: 'Ch\xe2tain Cr\xe8me Boucl\xe9', nameAr: '\u0643ستنائي كريمي مجعد', image: '/images/perruques/brown/br020.jpg', typeFr: 'Perruque Longue \u2014 Ch\xe2tain', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0643\u0633\u062a\u0646\u0627\u0626\u064a', basePrice: 490, rating: 5, reviews: 44, sold: 48, stock: 42, category: 'brown', categoryFr: 'Ch\xe2tain', categoryAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a' },
  { id: 'br021', nameFr: 'Ch\xe2tain Nacr\xe9 Lisse', nameAr: '\u0643ستنائي لؤلؤي ناعم', image: '/images/perruques/brown/br021.jpg', typeFr: 'Perruque Longue \u2014 Ch\xe2tain', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0643\u0633\u062a\u0646\u0627\u0626\u064a', basePrice: 485, rating: 4.5, reviews: 46, sold: 50, stock: 45, category: 'brown', categoryFr: 'Ch\xe2tain', categoryAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a' },
  { id: 'br022', nameFr: 'Ch\xe2tain Moka Ondul\xe9', nameAr: '\u0643ستنائي موكا مموج', image: '/images/perruques/brown/br022.jpg', typeFr: 'Perruque Longue \u2014 Ch\xe2tain', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0643\u0633\u062a\u0646\u0627\u0626\u064a', basePrice: 475, rating: 5, reviews: 48, sold: 52, stock: 48, category: 'brown', categoryFr: 'Ch\xe2tain', categoryAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a' },
  { id: 'br023', nameFr: 'Ch\xe2tain Caramel Lisse', nameAr: '\u0643ستنائي كراميل ناعم', image: '/images/perruques/brown/br023.jpg', typeFr: 'Perruque Longue \u2014 Ch\xe2tain', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0643\u0633\u062a\u0646\u0627\u0626\u064a', basePrice: 495, rating: 4.5, reviews: 50, sold: 54, stock: 51, category: 'brown', categoryFr: 'Ch\xe2tain', categoryAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a' },
  { id: 'br024', nameFr: 'Ch\xe2tain Toffee Balayage', nameAr: '\u0643ستنائي توفي بالياج', image: '/images/perruques/brown/br024.jpg', typeFr: 'Perruque Longue \u2014 Ch\xe2tain', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0643\u0633\u062a\u0646\u0627\u0626\u064a', basePrice: 510, rating: 5, reviews: 52, sold: 56, stock: 54, category: 'brown', categoryFr: 'Ch\xe2tain', categoryAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a' },
  { id: 'om001', nameFr: 'Ombr\xe9 Blond Glamour', nameAr: '\u0623\u0648\u0645\u0628\u0631\u064a\u0647 \u0623\u0634\u0642\u0631 \u0623\u0646\u064a\u0642', image: '/images/perruques/ombre/om001.jpg', typeFr: 'Perruque Longue \u2014 Ombr\xe9', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0648\u0645\u0628\u0631\u064a\u0647', basePrice: 520, rating: 5, reviews: 20, sold: 30, stock: 35, category: 'ombre', categoryFr: 'Ombr\xe9', categoryAr: '\u0623\u0648\u0645\u0628\u0631\u064a\u0647' },
  { id: 'om002', nameFr: 'Ombr\xe9 Beige Vagues', nameAr: '\u0623\u0648\u0645\u0628\u0631\u064a\u0647 \u0628\u064a\u062c \u0645\u0648\u062c\u0627\u062a', image: '/images/perruques/ombre/om002.jpg', typeFr: 'Perruque Longue \u2014 Ombr\xe9', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0648\u0645\u0628\u0631\u064a\u0647', basePrice: 530, rating: 5, reviews: 25, sold: 35, stock: 40, category: 'ombre', categoryFr: 'Ombr\xe9', categoryAr: '\u0623\u0648\u0645\u0628\u0631\u064a\u0647' },
  { id: 'om003', nameFr: 'Ombr\xe9 Miel Lisse Luxe', nameAr: '\u0623\u0648\u0645\u0628\u0631\u064a\u0647 \u0639\u0633\u0644\u064a \u0646\u0627\u0639\u0645 \u0641\u0627\u062e\u0631', image: '/images/perruques/ombre/om003.jpg', typeFr: 'Perruque Longue \u2014 Ombr\xe9', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0648\u0645\u0628\u0631\u064a\u0647', basePrice: 540, rating: 5, reviews: 30, sold: 40, stock: 45, category: 'ombre', categoryFr: 'Ombr\xe9', categoryAr: '\u0623\u0648\u0645\u0628\u0631\u064a\u0647' },
  { id: 'hl001', nameFr: 'Balayage Ch\xe2tain Caramel', nameAr: '\u0628\u0627\u0644\u064a\u0627\u062c \u0643\u0633\u062a\u0646\u0627\u0626\u064a \u0643\u0631\u0627\u0645\u064a\u0644', image: '/images/highlight/hl001.jpg', typeFr: 'Perruque Longue \u2014 Highlight', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0647\u0627\u064a\u0644\u0627\u064a\u062a', basePrice: 480, rating: 5, reviews: 14, sold: 23, stock: 72, category: 'highlight', categoryFr: 'Highlight', categoryAr: '\u0647\u0627\u064a\u0644\u0627\u064a\u062a' },
  { id: 'hl002', nameFr: 'Blond Balayage Multi-Vues', nameAr: '\u0623\u0634\u0642\u0631 \u0628\u0627\u0644\u064a\u0627\u062c \u0645\u062a\u0639\u062f\u062f \u0627\u0644\u0632\u0648\u0627\u064a\u0627', image: '/images/highlight/hl002.jpg', typeFr: 'Perruque Longue \u2014 Highlight', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0647\u0627\u064a\u0644\u0627\u064a\u062a', basePrice: 520, rating: 5, reviews: 18, sold: 31, stock: 58, category: 'highlight', categoryFr: 'Highlight', categoryAr: '\u0647\u0627\u064a\u0644\u0627\u064a\u062a' },
  { id: 'hl003', nameFr: 'Ch\xe2tain Clair Lisse Premium', nameAr: '\u0643\u0633\u062a\u0646\u0627\u0626\u064a \u0641\u0627\u062a\u062d \u0646\u0627\u0639\u0645 \u0628\u0631\u064a\u0645\u064a\u0648\u0645', image: '/images/highlight/hl003.jpg', typeFr: 'Perruque Longue \u2014 Highlight', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0647\u0627\u064a\u0644\u0627\u064a\u062a', basePrice: 460, rating: 4.5, reviews: 11, sold: 19, stock: 64, category: 'highlight', categoryFr: 'Highlight', categoryAr: '\u0647\u0627\u064a\u0644\u0627\u064a\u062a' },
  { id: 'hl004', nameFr: 'Balayage Caramel Glamour', nameAr: '\u0628\u0627\u0644\u064a\u0627\u062c \u0643\u0631\u0627\u0645\u064a\u0644 \u062c\u0644\u0627\u0645\u0648\u0631', image: '/images/highlight/hl004.jpg', typeFr: 'Perruque Longue \u2014 Highlight', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0647\u0627\u064a\u0644\u0627\u064a\u062a', basePrice: 510, rating: 5, reviews: 16, sold: 27, stock: 61, category: 'highlight', categoryFr: 'Highlight', categoryAr: '\u0647\u0627\u064a\u0644\u0627\u064a\u062a' },
  { id: 'hl005', nameFr: 'Blond Sable Vague Luxe', nameAr: '\u0623\u0634\u0642\u0631 \u0631\u0645\u0644\u064a \u0645\u0648\u062c\u0629 \u0641\u0627\u062e\u0631\u0629', image: '/images/highlight/hl005.jpg', typeFr: 'Perruque Longue \u2014 Highlight', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0647\u0627\u064a\u0644\u0627\u064a\u062a', basePrice: 530, rating: 5, reviews: 20, sold: 35, stock: 48, category: 'highlight', categoryFr: 'Highlight', categoryAr: '\u0647\u0627\u064a\u0644\u0627\u064a\u062a' },
  { id: 'hl006', nameFr: 'Balayage Miel Lace Front', nameAr: '\u0628\u0627\u0644\u064a\u0627\u062c \u0639\u0633\u0644\u064a \u0644\u064a\u0633 \u0641\u0631\u0648\u0646\u062a', image: '/images/highlight/hl006.jpg', typeFr: 'Perruque Longue \u2014 Highlight', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0647\u0627\u064a\u0644\u0627\u064a\u062a', basePrice: 550, rating: 5, reviews: 22, sold: 40, stock: 55, category: 'highlight', categoryFr: 'Highlight', categoryAr: '\u0647\u0627\u064a\u0644\u0627\u064a\u062a' },
  { id: 'hl007', nameFr: 'Blond Beige Luxe Extra-Long', nameAr: '\u0623\u0634\u0642\u0631 \u0628\u064a\u062c \u0641\u0627\u062e\u0631 \u0625\u0636\u0627\u0641\u064a \u0627\u0644\u0637\u0648\u0644', image: '/images/highlight/hl007.jpg', typeFr: 'Perruque Longue \u2014 Highlight', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0647\u0627\u064a\u0644\u0627\u064a\u062a', basePrice: 580, rating: 5, reviews: 25, sold: 42, stock: 38, category: 'highlight', categoryFr: 'Highlight', categoryAr: '\u0647\u0627\u064a\u0644\u0627\u064a\u062a' },
  { id: 'bl001', nameFr: 'Blond Platine Lisse Luxe', nameAr: '\u0634\u0639\u0631 \u0628\u0644\u0627\u062a\u064a\u0646\u064a \u0623\u0634\u0642\u0631 \u0646\u0627\u0639\u0645 \u0641\u0627\u062e\u0631', image: '/images/perruques/blonde/bl001.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 550, rating: 4.5, reviews: 60, sold: 80, stock: 50, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl002', nameFr: 'Blond Dor\u00e9 Ondul\u00e9 Glamour', nameAr: '\u0634\u0639\u0631 \u0630\u0647\u0628\u064a \u0645\u0645\u0648\u062c \u0623\u0646\u064a\u0642', image: '/images/perruques/blonde/bl002.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 520, rating: 5, reviews: 20, sold: 33, stock: 35, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl003', nameFr: 'Blond Miel Vagues Douces', nameAr: '\u0634\u0639\u0631 \u0639\u0633\u0644\u064a \u0645\u0648\u062c\u0627\u062a \u0646\u0627\u0639\u0645\u0629', image: '/images/perruques/blonde/bl003.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 560, rating: 5, reviews: 13, sold: 21, stock: 60, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl004', nameFr: 'Blond Beige Satin\u00e9', nameAr: '\u0634\u0639\u0631 \u0628\u064a\u062c \u062d\u0631\u064a\u0631\u064a', image: '/images/perruques/blonde/bl004.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 500, rating: 5, reviews: 47, sold: 61, stock: 40, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl005', nameFr: 'Blond Cr\u00e8me Balayage', nameAr: '\u0634\u0639\u0631 \u0643\u0631\u064a\u0645\u064a \u0628\u0627\u0644\u064a\u0627\u062c', image: '/images/perruques/blonde/bl005.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 520, rating: 5, reviews: 31, sold: 46, stock: 35, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl006', nameFr: 'Blond Sable Naturel', nameAr: '\u0634\u0639\u0631 \u0631\u0645\u0644\u064a \u0637\u0628\u064a\u0639\u064a', image: '/images/perruques/blonde/bl006.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 540, rating: 5, reviews: 10, sold: 23, stock: 50, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl007', nameFr: 'Blond Ivoire Lisse Premium', nameAr: '\u0634\u0639\u0631 \u0639\u0627\u062c\u064a \u0646\u0627\u0639\u0645 \u0628\u0631\u064a\u0645\u064a\u0648\u0645', image: '/images/perruques/blonde/bl007.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 620, rating: 5, reviews: 14, sold: 20, stock: 55, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl008', nameFr: 'Blond Champagne Boucl\u00e9', nameAr: '\u0634\u0639\u0631 \u0634\u0627\u0645\u0628\u0627\u0646\u064a\u0627 \u0645\u062c\u0639\u062f', image: '/images/perruques/blonde/bl008.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 480, rating: 5, reviews: 34, sold: 41, stock: 45, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl009', nameFr: 'Blond P\u00eache Ondul\u00e9', nameAr: '\u0634\u0639\u0631 \u062e\u0648\u062e\u064a \u0645\u0645\u0648\u062c', image: '/images/perruques/blonde/bl009.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 480, rating: 4.5, reviews: 41, sold: 54, stock: 60, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl010', nameFr: 'Blond Vanille Volume', nameAr: '\u0634\u0639\u0631 \u0641\u0627\u0646\u064a\u0644\u064a\u0627 \u0643\u062b\u064a\u0641', image: '/images/perruques/blonde/bl010.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 550, rating: 4.5, reviews: 12, sold: 27, stock: 50, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl011', nameFr: 'Blond Solaire M\u00e8ches', nameAr: '\u0634\u0639\u0631 \u0634\u0645\u0633\u064a \u062e\u0635\u0644', image: '/images/perruques/blonde/bl011.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 600, rating: 5, reviews: 15, sold: 33, stock: 40, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl012', nameFr: 'Blond Cendr\u00e9 \u00c9l\u00e9gant', nameAr: '\u0634\u0639\u0631 \u0631\u0645\u0627\u062f\u064a \u0623\u0646\u064a\u0642', image: '/images/perruques/blonde/bl012.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 480, rating: 5, reviews: 14, sold: 32, stock: 55, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl013', nameFr: 'Blond Nacr\u00e9 Frange', nameAr: '\u0634\u0639\u0631 \u0644\u0624\u0644\u0624\u064a \u0628\u063a\u0631\u0629', image: '/images/perruques/blonde/bl013.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 620, rating: 5, reviews: 34, sold: 42, stock: 60, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl014', nameFr: 'Blond Ros\u00e9 Balayage', nameAr: '\u0634\u0639\u0631 \u0648\u0631\u062f\u064a \u0628\u0627\u0644\u064a\u0627\u062c', image: '/images/perruques/blonde/bl014.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 500, rating: 4.5, reviews: 21, sold: 40, stock: 50, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl015', nameFr: 'Blond Topaze Lisse', nameAr: '\u0634\u0639\u0631 \u062a\u0648\u0628\u0627\u0632 \u0646\u0627\u0639\u0645', image: '/images/perruques/blonde/bl015.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 540, rating: 5, reviews: 18, sold: 24, stock: 50, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl016', nameFr: 'Blond Cristal Ondul\u00e9', nameAr: '\u0634\u0639\u0631 \u0643\u0631\u064a\u0633\u062a\u0627\u0644\u064a \u0645\u0645\u0648\u062c', image: '/images/perruques/blonde/bl016.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 560, rating: 5, reviews: 14, sold: 29, stock: 45, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl017', nameFr: 'Blond Opale Glamour', nameAr: '\u0634\u0639\u0631 \u0623\u0648\u0628\u0627\u0644 \u062c\u0644\u0627\u0645\u0648\u0631', image: '/images/perruques/blonde/bl017.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 520, rating: 5, reviews: 26, sold: 44, stock: 35, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl018', nameFr: 'Blond Nude Vagues', nameAr: '\u0634\u0639\u0631 \u0639\u0627\u0631\u064a \u0645\u0648\u062c\u0627\u062a', image: '/images/perruques/blonde/bl018.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 600, rating: 4.5, reviews: 43, sold: 60, stock: 35, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl019', nameFr: 'Blond Moka Lisse', nameAr: '\u0634\u0639\u0631 \u0645\u0648\u0643\u0627 \u0646\u0627\u0639\u0645', image: '/images/perruques/blonde/bl019.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 540, rating: 5, reviews: 39, sold: 55, stock: 60, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl020', nameFr: 'Blond Poudr\u00e9 Volume', nameAr: '\u0634\u0639\u0631 \u0628\u0648\u062f\u0631\u0629 \u0643\u062b\u064a\u0641', image: '/images/perruques/blonde/bl020.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 520, rating: 4.5, reviews: 34, sold: 47, stock: 40, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl022', nameFr: 'Blond Caramel Ondul\u00e9', nameAr: '\u0634\u0639\u0631 \u0643\u0631\u0627\u0645\u064a\u0644 \u0645\u0645\u0648\u062c', image: '/images/perruques/blonde/bl022.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 500, rating: 5, reviews: 39, sold: 56, stock: 45, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl023', nameFr: 'Blond Lin Naturel', nameAr: '\u0634\u0639\u0631 \u0643\u062a\u0627\u0646\u064a \u0637\u0628\u064a\u0639\u064a', image: '/images/perruques/blonde/bl023.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 520, rating: 4.5, reviews: 30, sold: 47, stock: 55, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl024', nameFr: 'Blond Marfil Lisse', nameAr: '\u0634\u0639\u0631 \u0645\u0631\u0645\u0631 \u0646\u0627\u0639\u0645', image: '/images/perruques/blonde/bl024.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 580, rating: 4.5, reviews: 49, sold: 57, stock: 50, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl025', nameFr: 'Blond Toffee Boucl\u00e9', nameAr: '\u0634\u0639\u0631 \u062a\u0648\u0641\u064a \u0645\u062c\u0639\u062f', image: '/images/perruques/blonde/bl025.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 540, rating: 5, reviews: 14, sold: 21, stock: 40, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl026', nameFr: 'Blond Satin Frange', nameAr: '\u0634\u0639\u0631 \u0633\u0627\u062a\u0627\u0646 \u0628\u063a\u0631\u0629', image: '/images/perruques/blonde/bl026.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 560, rating: 5, reviews: 33, sold: 48, stock: 35, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl027', nameFr: 'Blond Aube Balayage', nameAr: '\u0634\u0639\u0631 \u0634\u0631\u0648\u0642 \u0628\u0627\u0644\u064a\u0627\u062c', image: '/images/perruques/blonde/bl027.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 620, rating: 5, reviews: 18, sold: 37, stock: 50, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl028', nameFr: 'Blond \u00c9cru Ondul\u00e9', nameAr: '\u0634\u0639\u0631 \u062e\u0627\u0645\u064a \u0645\u0645\u0648\u062c', image: '/images/perruques/blonde/bl028.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 600, rating: 4.5, reviews: 57, sold: 72, stock: 35, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl058', nameFr: 'Blond Perle Lisse Luxe', nameAr: '\u0634\u0639\u0631 \u0644\u0624\u0644\u0624\u064a \u0646\u0627\u0639\u0645 \u0641\u0627\u062e\u0631', image: '/images/perruques/blonde/bl058.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 600, rating: 5, reviews: 39, sold: 55, stock: 40, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl059', nameFr: 'Blond Dor\u00e9 Clair', nameAr: '\u0634\u0639\u0631 \u0630\u0647\u0628\u064a \u0641\u0627\u062a\u062d', image: '/images/perruques/blonde/bl059.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 600, rating: 5, reviews: 35, sold: 49, stock: 55, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl060', nameFr: 'Blond Beige Volumineux', nameAr: '\u0634\u0639\u0631 \u0628\u064a\u062c \u0643\u062b\u064a\u0641', image: '/images/perruques/blonde/bl060.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 620, rating: 4.5, reviews: 32, sold: 46, stock: 45, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl061', nameFr: 'Blond Gris\u00e9 Balayage', nameAr: '\u0634\u0639\u0631 \u0631\u0645\u0627\u062f\u064a \u0628\u0627\u0644\u064a\u0627\u062c', image: '/images/perruques/blonde/bl061.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 580, rating: 4.5, reviews: 58, sold: 63, stock: 60, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl062', nameFr: 'Blond Miel Intense', nameAr: '\u0634\u0639\u0631 \u0639\u0633\u0644\u064a \u0643\u062b\u064a\u0641', image: '/images/perruques/blonde/bl062.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 620, rating: 5, reviews: 13, sold: 28, stock: 60, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl064', nameFr: 'Blond Cr\u00e8me Ondul\u00e9', nameAr: '\u0634\u0639\u0631 \u0643\u0631\u064a\u0645\u064a \u0645\u0645\u0648\u062c', image: '/images/perruques/blonde/bl064.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 600, rating: 5, reviews: 36, sold: 54, stock: 55, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl065', nameFr: 'Blond Naturel Lisse', nameAr: '\u0634\u0639\u0631 \u0637\u0628\u064a\u0639\u064a \u0623\u0634\u0642\u0631 \u0646\u0627\u0639\u0645', image: '/images/perruques/blonde/bl065.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 560, rating: 4.5, reviews: 60, sold: 68, stock: 40, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl066', nameFr: 'Blond Soleil M\u00e8ches Dor\u00e9es', nameAr: '\u0634\u0639\u0631 \u0634\u0645\u0633\u064a \u062e\u0635\u0644 \u0630\u0647\u0628\u064a\u0629', image: '/images/perruques/blonde/bl066.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 600, rating: 4.5, reviews: 53, sold: 65, stock: 60, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl067', nameFr: 'Blond Cendr\u00e9 Volume', nameAr: '\u0634\u0639\u0631 \u0631\u0645\u0627\u062f\u064a \u0643\u062b\u064a\u0641', image: '/images/perruques/blonde/bl067.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 550, rating: 4.5, reviews: 49, sold: 60, stock: 35, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl068', nameFr: 'Blond P\u00eache Lisse', nameAr: '\u0634\u0639\u0631 \u062e\u0648\u062e\u064a \u0646\u0627\u0639\u0645', image: '/images/perruques/blonde/bl068.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 500, rating: 4.5, reviews: 25, sold: 38, stock: 40, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl069', nameFr: 'Blond Champagne Balayage', nameAr: '\u0634\u0639\u0631 \u0634\u0627\u0645\u0628\u0627\u0646\u064a\u0627 \u0628\u0627\u0644\u064a\u0627\u062c', image: '/images/perruques/blonde/bl069.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 620, rating: 4.5, reviews: 15, sold: 32, stock: 60, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl070', nameFr: 'Blond Vanille Frange', nameAr: '\u0634\u0639\u0631 \u0641\u0627\u0646\u064a\u0644\u064a\u0627 \u0628\u063a\u0631\u0629', image: '/images/perruques/blonde/bl070.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 580, rating: 4.5, reviews: 25, sold: 39, stock: 55, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl071', nameFr: 'Blond Sable Ondul\u00e9', nameAr: '\u0634\u0639\u0631 \u0631\u0645\u0644\u064a \u0645\u0645\u0648\u062c', image: '/images/perruques/blonde/bl071.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 620, rating: 4.5, reviews: 15, sold: 23, stock: 35, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl072', nameFr: 'Blond Ivoire Glamour', nameAr: '\u0634\u0639\u0631 \u0639\u0627\u062c\u064a \u062c\u0644\u0627\u0645\u0648\u0631', image: '/images/perruques/blonde/bl072.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 540, rating: 4.5, reviews: 20, sold: 32, stock: 55, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl073', nameFr: 'Blond Nacr\u00e9 Vagues', nameAr: '\u0634\u0639\u0631 \u0644\u0624\u0644\u0624\u064a \u0645\u0648\u062c\u0627\u062a', image: '/images/perruques/blonde/bl073.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 540, rating: 5, reviews: 20, sold: 40, stock: 60, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl074', nameFr: 'Blond Ros\u00e9 Lisse', nameAr: '\u0634\u0639\u0631 \u0648\u0631\u062f\u064a \u0646\u0627\u0639\u0645', image: '/images/perruques/blonde/bl074.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 550, rating: 5, reviews: 19, sold: 30, stock: 35, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl075', nameFr: 'Blond Cristal Volume', nameAr: '\u0634\u0639\u0631 \u0643\u0631\u064a\u0633\u062a\u0627\u0644\u064a \u0643\u062b\u064a\u0641', image: '/images/perruques/blonde/bl075.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 550, rating: 5, reviews: 37, sold: 54, stock: 55, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl076', nameFr: 'Blond Opale Lisse', nameAr: '\u0634\u0639\u0631 \u0623\u0648\u0628\u0627\u0644 \u0646\u0627\u0639\u0645', image: '/images/perruques/blonde/bl076.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 520, rating: 4.5, reviews: 20, sold: 33, stock: 50, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl077', nameFr: 'Blond Nude Balayage', nameAr: '\u0634\u0639\u0631 \u0639\u0627\u0631\u064a \u0628\u0627\u0644\u064a\u0627\u062c', image: '/images/perruques/blonde/bl077.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 480, rating: 4.5, reviews: 13, sold: 27, stock: 50, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl078', nameFr: 'Blond Moka Ondul\u00e9', nameAr: '\u0634\u0639\u0631 \u0645\u0648\u0643\u0627 \u0645\u0645\u0648\u062c', image: '/images/perruques/blonde/bl078.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 520, rating: 4.5, reviews: 20, sold: 30, stock: 60, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl079', nameFr: 'Blond Platine Glamour', nameAr: '\u0634\u0639\u0631 \u0628\u0644\u0627\u062a\u064a\u0646\u064a \u062c\u0644\u0627\u0645\u0648\u0631', image: '/images/perruques/blonde/bl079.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 620, rating: 4.5, reviews: 34, sold: 39, stock: 45, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl080', nameFr: 'Blond Dor\u00e9 Vagues Luxe', nameAr: '\u0634\u0639\u0631 \u0630\u0647\u0628\u064a \u0645\u0648\u062c\u0627\u062a \u0641\u0627\u062e\u0631\u0629', image: '/images/perruques/blonde/bl080.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 620, rating: 5, reviews: 23, sold: 41, stock: 40, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl029', nameFr: 'Blond Polaire Ondul\u00e9', nameAr: '\u0634\u0639\u0631 \u0642\u0637\u0628\u064a \u0623\u0634\u0642\u0631 \u0645\u0645\u0648\u062c', image: '/images/perruques/blonde/bl029.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 540, rating: 4.5, reviews: 17, sold: 33, stock: 55, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl030', nameFr: 'Blond Dune Lisse', nameAr: '\u0634\u0639\u0631 \u0643\u062b\u064a\u0641 \u0623\u0634\u0642\u0631 \u0646\u0627\u0639\u0645', image: '/images/perruques/blonde/bl030.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 520, rating: 5, reviews: 8, sold: 21, stock: 45, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl031', nameFr: 'Blond Festif Miel', nameAr: '\u0634\u0639\u0631 \u0639\u0633\u0644\u064a \u0627\u062d\u062a\u0641\u0627\u0644\u064a', image: '/images/perruques/blonde/bl031.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 520, rating: 5, reviews: 33, sold: 46, stock: 60, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl032', nameFr: 'Blond Nude \u00c9l\u00e9gant', nameAr: '\u0634\u0639\u0631 \u0639\u0627\u0631\u064a \u0623\u0646\u064a\u0642', image: '/images/perruques/blonde/bl032.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 620, rating: 4.5, reviews: 17, sold: 32, stock: 55, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl033', nameFr: 'Blond Ivoire Doux', nameAr: '\u0634\u0639\u0631 \u0639\u0627\u062c\u064a \u0646\u0627\u0639\u0645', image: '/images/perruques/blonde/bl033.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 600, rating: 5, reviews: 15, sold: 21, stock: 35, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl034', nameFr: 'Blond Perle Frange', nameAr: '\u0634\u0639\u0631 \u0644\u0624\u0644\u0624\u064a \u0628\u063a\u0631\u0629', image: '/images/perruques/blonde/bl034.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 480, rating: 5, reviews: 49, sold: 64, stock: 55, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl035', nameFr: 'Blond Naturel Glamour', nameAr: '\u0634\u0639\u0631 \u0637\u0628\u064a\u0639\u064a \u0623\u0634\u0642\u0631 \u062c\u0644\u0627\u0645\u0648\u0631', image: '/images/perruques/blonde/bl035.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 520, rating: 5, reviews: 38, sold: 58, stock: 35, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl036', nameFr: 'Blond Solaire Lisse', nameAr: '\u0634\u0639\u0631 \u0634\u0645\u0633\u064a \u0646\u0627\u0639\u0645', image: '/images/perruques/blonde/bl036.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 480, rating: 5, reviews: 34, sold: 43, stock: 60, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl037', nameFr: 'Blond Cr\u00e8me Boucl\u00e9', nameAr: '\u0634\u0639\u0631 \u0643\u0631\u064a\u0645\u064a \u0645\u062c\u0639\u062f', image: '/images/perruques/blonde/bl037.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 550, rating: 5, reviews: 59, sold: 75, stock: 35, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl038', nameFr: 'Blond Beige Balayage', nameAr: '\u0634\u0639\u0631 \u0628\u064a\u062c \u0628\u0627\u0644\u064a\u0627\u062c', image: '/images/perruques/blonde/bl038.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 620, rating: 4.5, reviews: 58, sold: 64, stock: 45, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl039', nameFr: 'Blond Platine \u00c9l\u00e9gant', nameAr: '\u0634\u0639\u0631 \u0628\u0644\u0627\u062a\u064a\u0646\u064a \u0623\u0646\u064a\u0642', image: '/images/perruques/blonde/bl039.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 480, rating: 5, reviews: 58, sold: 63, stock: 40, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl040', nameFr: 'Blond Noisette Vagues', nameAr: '\u0634\u0639\u0631 \u0628\u0646\u062f\u0642\u064a \u0645\u0648\u062c\u0627\u062a', image: '/images/perruques/blonde/bl040.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 480, rating: 5, reviews: 33, sold: 48, stock: 55, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl041', nameFr: 'Blond Champagne Lisse', nameAr: '\u0634\u0639\u0631 \u0634\u0627\u0645\u0628\u0627\u0646\u064a\u0627 \u0646\u0627\u0639\u0645', image: '/images/perruques/blonde/bl041.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 550, rating: 5, reviews: 8, sold: 23, stock: 35, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl042', nameFr: 'Blond Vanille Luxe', nameAr: '\u0634\u0639\u0631 \u0641\u0627\u0646\u064a\u0644\u064a\u0627 \u0641\u0627\u062e\u0631', image: '/images/perruques/blonde/bl042.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 560, rating: 4.5, reviews: 29, sold: 42, stock: 50, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl043', nameFr: 'Blond Topaze Ondul\u00e9', nameAr: '\u0634\u0639\u0631 \u062a\u0648\u0628\u0627\u0632 \u0645\u0645\u0648\u062c', image: '/images/perruques/blonde/bl043.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 480, rating: 5, reviews: 42, sold: 49, stock: 50, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl044', nameFr: 'Blond Ros\u00e9 Lumi\u00e8re', nameAr: '\u0634\u0639\u0631 \u0648\u0631\u062f\u064a \u0644\u0627\u0645\u0639', image: '/images/perruques/blonde/bl044.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 480, rating: 5, reviews: 28, sold: 35, stock: 35, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl045', nameFr: 'Blond Marbre Lisse', nameAr: '\u0634\u0639\u0631 \u0631\u062e\u0627\u0645\u064a \u0646\u0627\u0639\u0645', image: '/images/perruques/blonde/bl045.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 600, rating: 4.5, reviews: 13, sold: 32, stock: 50, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl046', nameFr: 'Blond Dor\u00e9 Intense', nameAr: '\u0634\u0639\u0631 \u0630\u0647\u0628\u064a \u0643\u062b\u064a\u0641', image: '/images/perruques/blonde/bl046.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 500, rating: 5, reviews: 22, sold: 29, stock: 40, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl047', nameFr: 'Blond Gris\u00e9 Chic', nameAr: '\u0634\u0639\u0631 \u0631\u0645\u0627\u062f\u064a \u0623\u0646\u064a\u0642', image: '/images/perruques/blonde/bl047.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 580, rating: 4.5, reviews: 52, sold: 70, stock: 60, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl048', nameFr: 'Blond Cendr\u00e9 Glamour', nameAr: '\u0634\u0639\u0631 \u0631\u0645\u0627\u062f\u064a \u062c\u0644\u0627\u0645\u0648\u0631', image: '/images/perruques/blonde/bl048.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 520, rating: 5, reviews: 38, sold: 46, stock: 55, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl049', nameFr: 'Blond Satin Luxe', nameAr: '\u0634\u0639\u0631 \u0633\u0627\u062a\u0627\u0646 \u0641\u0627\u062e\u0631', image: '/images/perruques/blonde/bl049.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 560, rating: 4.5, reviews: 50, sold: 68, stock: 50, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl050', nameFr: 'Blond Caramel Lisse', nameAr: '\u0634\u0639\u0631 \u0643\u0631\u0627\u0645\u064a\u0644 \u0646\u0627\u0639\u0645', image: '/images/perruques/blonde/bl050.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 500, rating: 4.5, reviews: 27, sold: 43, stock: 45, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl051', nameFr: 'Blond Opale Ondul\u00e9', nameAr: '\u0634\u0639\u0631 \u0623\u0648\u0628\u0627\u0644 \u0645\u0645\u0648\u062c', image: '/images/perruques/blonde/bl051.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 580, rating: 5, reviews: 46, sold: 53, stock: 55, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl052', nameFr: 'Blond Nacr\u00e9 Doux', nameAr: '\u0634\u0639\u0631 \u0644\u0624\u0644\u0624\u064a \u0646\u0627\u0639\u0645', image: '/images/perruques/blonde/bl052.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 480, rating: 5, reviews: 13, sold: 32, stock: 60, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl053', nameFr: 'Blond Cristal Lisse', nameAr: '\u0634\u0639\u0631 \u0643\u0631\u064a\u0633\u062a\u0627\u0644\u064a \u0646\u0627\u0639\u0645', image: '/images/perruques/blonde/bl053.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 520, rating: 4.5, reviews: 47, sold: 67, stock: 55, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl054', nameFr: 'Blond Sable \u00c9l\u00e9gant', nameAr: '\u0634\u0639\u0631 \u0631\u0645\u0644\u064a \u0623\u0646\u064a\u0642', image: '/images/perruques/blonde/bl054.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 560, rating: 5, reviews: 46, sold: 55, stock: 55, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl055', nameFr: 'Blond Moka Glamour', nameAr: '\u0634\u0639\u0631 \u0645\u0648\u0643\u0627 \u062c\u0644\u0627\u0645\u0648\u0631', image: '/images/perruques/blonde/bl055.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 580, rating: 4.5, reviews: 33, sold: 39, stock: 45, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl056', nameFr: 'Blond Toffee Vagues', nameAr: '\u0634\u0639\u0631 \u062a\u0648\u0641\u064a \u0645\u0648\u062c\u0627\u062a', image: '/images/perruques/blonde/bl056.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 600, rating: 5, reviews: 30, sold: 42, stock: 60, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl057', nameFr: 'Blond Miel Premium', nameAr: '\u0634\u0639\u0631 \u0639\u0633\u0644\u064a \u0628\u0631\u064a\u0645\u064a\u0648\u0645', image: '/images/perruques/blonde/bl057.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 560, rating: 4.5, reviews: 52, sold: 66, stock: 55, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
  { id: 'bl063', nameFr: 'Blond Solaire \u00c9clat', nameAr: '\u0634\u0639\u0631 \u0634\u0645\u0633\u064a \u0644\u0627\u0645\u0639', image: '/images/perruques/blonde/bl063.jpg', typeFr: 'Perruque Longue \u2014 Blond', typeAr: '\u0628\u0627\u0631\u0648\u0643\u0629 \u0637\u0648\u064a\u0644\u0629 \u2014 \u0623\u0634\u0642\u0631', basePrice: 580, rating: 4.5, reviews: 13, sold: 26, stock: 50, category: 'blonde', categoryFr: 'Blond', categoryAr: '\u0623\u0634\u0642\u0631' },
];

/* ═══════════════════════════════════════════
   VARIANT OPTIONS (shared)
   ═══════════════════════════════════════════ */

const lengths = ['14 pouces', '16 pouces', '18 pouces', '20 pouces', '22 pouces', '24 pouces', '26 pouces', '28 pouces', '30 pouces'];
const densities = ['120%', '150%', '180%', '220%', '280%'];
const hairTypes = ['Lisses', 'Ondul\xe9s', 'Cr\xe9pus', 'Fris\xe9s'];
const wigCaps = [
  '5\u00d75 Glueless Wig', '13\u00d74 Lace Front Wig', '13\u00d76 Lace Front Wig',
  '2\u00d76 Lace', '6\u00d76 Closure Wig', '7\u00d77 Closure Wig',
  '360\u00b0 Lace', 'Full Lace Wig', 'Silicone M\xe9dicale', 'Silk M\xe9dicale', 'Mono M\xe9dicale',
];
const wigSizes = ['Standard', 'Taille S', 'Taille M', 'Taille L', 'Sur Mesure'];

const priceMap: Record<string, number> = {
  '14 pouces': -200, '16 pouces': -150, '18 pouces': -100, '20 pouces': -50,
  '22 pouces': 0, '24 pouces': 50, '26 pouces': 130, '28 pouces': 230, '30 pouces': 340,
};
const originalMap: Record<string, number> = {
  '14 pouces': -500, '16 pouces': -420, '18 pouces': -300, '20 pouces': -150,
  '22 pouces': 0, '24 pouces': 180, '26 pouces': 380, '28 pouces': 600, '30 pouces': 860,
};

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */

export default function Perruques() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get('product');

  const [mainIdx, setMainIdx] = useState(0);
  const [selLength, setSelLength] = useState('22 pouces');
  const [selDensity, setSelDensity] = useState('180%');
  const [selHairType, setSelHairType] = useState('Ondul\xe9s');
  const [selCap, setSelCap] = useState('13\u00d76 Lace Front Wig');
  const [selSize, setSelSize] = useState('Standard');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0.5, y: 0.5 });
  const imgRef = useRef<HTMLDivElement>(null);

  const selectedProduct = products.find(p => p.id === selectedId);

  const basePrice = selectedProduct?.basePrice || 520;
  const price = basePrice + (priceMap[selLength] || 0);
  const original = (basePrice + 500) + (originalMap[selLength] || 0);
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
    setSelLength('22 pouces');
    setSelDensity('180%');
    setSelHairType('Ondul\xe9s');
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
            <span style={{ color: 'var(--tb-text)' }}>Long</span>
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#d4a5a5', marginBottom: '8px' }}>
            {lang === 'fr' ? 'COLLECTION PERRUQUES LONGUES \u2014 124 MOD\u00c8LES' : '\u0645جموعة الباروكات الطويلة \u2014 124 موديل'}
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#d4a5a5', lineHeight: 1.15, marginBottom: '8px' }}>
            {lang === 'fr' ? 'Perruques Longues' : '\u0628اروكات طويلة'}
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
                    {products.filter(q => q.category === p.category).map((q, qIdx) => (
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
    { label: lang === 'fr' ? 'Longueur' : '\u0627\u0644\u0637\u0648\u0644', value: '14" \u2013 30"' },
    { label: lang === 'fr' ? 'Couleur' : '\u0627\u0644\u0644\u0648\u0646', value: catLabel },
    { label: lang === 'fr' ? 'Racines' : '\u0627\u0644\u062c\u0630\u0648\u0631', value: lang === 'fr' ? 'Fondues Naturelles' : '\u062c\u0630\u0648\u0631 \u0645\u062a\u062f\u0631\u062c\u0629 \u0637\u0628\u064a\u0639\u064a\u0629' },
    { label: lang === 'fr' ? 'Lace' : '\u0627\u0644\u0644\u064a\u0633', value: 'HD Transparent Lace Front' },
    { label: lang === 'fr' ? 'Texture' : '\u0627\u0644\u0645\u0644\u0645\u0633', value: lang === 'fr' ? 'Souples Volumineuses' : '\u0646\u0627\u0639\u0645\u0629 \u0643\u062b\u064a\u0641\u0629' },
    { label: lang === 'fr' ? 'Poids' : '\u0627\u0644\u0648\u0632\u0646', value: '170g \u2013 280g' },
  ];

  const descBlocks = lang === 'fr' ? [
    `Perruque Lace Front Premium ${name} \u2014 Qualit\u00e9 Haut de Gamme`,
    `Cette magnifique perruque de couleur ${catLabel.toLowerCase()} est confectionn\u00e9e avec des cheveux humains Remy de premi\u00e8re qualit\u00e9. Les fibres offrent une douceur soyeuse, une brillance naturelle et un mouvement fluide pour un r\u00e9sultat ultra-r\u00e9aliste.`,
    `La lace front HD transparente assure une int\u00e9gration parfaite et une ligne frontale discr\u00e8te. Densit\u00e9 personnalisable de 130% \u00e0 280%, longueurs disponibles de 14" \u00e0 30".`,
  ] : [
    `\u0628\u0627\u0631\u0648\u0643\u0629 \u0644\u064a\u0633 \u0641\u0631\u0648\u0646\u062a \u0628\u0631\u064a\u0645\u064a\u0648\u0645 ${name} \u2014 \u062c\u0648\u062f\u0629 \u0639\u0627\u0644\u064a\u0629`,
    `\u0647\u0630\u0647 \u0627\u0644\u0628\u0627\u0631\u0648\u0643\u0629 \u0627\u0644\u0631\u0627\u0626\u0639\u0629 \u0628\u0627\u0644\u0644\u0648\u0646 ${catLabel} \u0645\u0635\u0646\u0648\u0639\u0629 \u0645\u0646 \u0634\u0639\u0631 \u0628\u0634\u0631\u064a \u0631\u064a\u0645\u064a \u0641\u0627\u0626\u0642 \u0627\u0644\u062c\u0648\u062f\u0629. \u062a\u0648\u0641\u0631 \u0627\u0644\u0623\u0644\u064a\u0627\u0641 \u0646\u0639\u0648\u0645\u0629 \u062d\u0631\u064a\u0631\u064a\u0629 \u0648\u0644\u0645\u0639\u0627\u0646 \u0637\u0628\u064a\u0639\u064a \u0648\u062d\u0631\u0643\u0629 \u0633\u0644\u0633\u0629 \u0644\u0646\u062a\u064a\u062c\u0629 \u0641\u0627\u0626\u0642\u0629 \u0627\u0644\u0648\u0627\u0642\u0639\u064a\u0629.`,
    `\u064a\u0636\u0645\u0646 \u0627\u0644\u0644\u064a\u0633 \u0641\u0631\u0648\u0646\u062a \u0627\u0644\u0634\u0641\u0627\u0641 HD \u0627\u0646\u062f\u0645\u0627\u062c\u0627\u064b \u0645\u062b\u0627\u0644\u064a\u0627\u064b \u0648\u062e\u0637\u0627\u064b \u0623\u0645\u0627\u0645\u064a\u0627\u064b \u062f\u0642\u064a\u0642\u0627\u064b. \u0643\u062b\u0627\u0641\u0629 \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u062a\u062e\u0635\u064a\u0635 \u0645\u0646 130% \u0625\u0644\u0649 280%\u060c \u0648\u0623\u0637\u0648\u0627\u0644 \u0645\u062a\u0648\u0641\u0631\u0629 \u0645\u0646 14" \u0625\u0644\u0649 30".`,
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
                ? `Perruque Lace Front de couleur ${catLabel.toLowerCase()} aux longueurs ondul\u00e9es volumineuses. Cheveux humains Remy premium pour un r\u00e9sultat naturel, doux et brillant.`
                : `\u0628\u0627\u0631\u0648\u0643\u0629 \u0644\u064a\u0633 \u0641\u0631\u0648\u0646\u062a \u0628\u0627\u0644\u0644\u0648\u0646 ${catLabel} \u0628\u0623\u0637\u0648\u0627\u0644 \u0645\u0645\u0648\u062c\u0629 \u0643\u062b\u064a\u0641\u0629. \u0634\u0639\u0631 \u0628\u0634\u0631\u064a \u0631\u064a\u0645\u064a \u0628\u0631\u064a\u0645\u064a\u0648\u0645 \u0644\u0646\u062a\u064a\u062c\u0629 \u0637\u0628\u064a\u0639\u064a\u0629 \u0648\u0646\u0627\u0639\u0645\u0629 \u0648\u0644\u0627\u0645\u0639\u0629.`}
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
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="flex items-center border" style={{ borderColor: 'var(--tb-border)' }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-3 hover:" style={{ color: 'var(--tb-text)' }}><Minus size={16} /></button>
                <span className="px-4 py-3 text-sm font-medium min-w-[48px] text-center" style={{ borderLeft: '1px solid var(--tb-border)', borderRight: '1px solid var(--tb-border)' }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-3 py-3 hover:" style={{ color: 'var(--tb-text)' }}><Plus size={16} /></button>
              </div>
              <button onClick={handleAdd} className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-all hover:opacity-90" style={{ backgroundColor: added ? '#4a7c59' : '#c44', color: 'var(--tb-card)' }}>
                <ShoppingCart size={18} />
                {added ? (lang === 'fr' ? 'Ajout\u00e9 !' : '\u062a\u0645\u062a \u0627\u0644\u0625\u0636\u0627\u0641\u0629!') : t.addCart}
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium border transition-all hover:" style={{ borderColor: '#c44', color: '#c44' }}>{t.buyNow}</button>
              <button className="p-3 border transition-all hover:" style={{ borderColor: 'var(--tb-border)', color: '#888' }}><Heart size={20} /></button>
            </div>

            {/* Trust */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { icon: <Truck size={18} color="#d4a5a5" />, text: t.shipping },
                { icon: <Shield size={18} color="#d4a5a5" />, text: t.guarantee },
                { icon: <Package size={18} color="#d4a5a5" />, text: `${selectedProduct.stock} ${t.stock}` },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-1.5 p-3 rounded-lg" style={{ backgroundColor: 'var(--tb-bg)' }}>
                  {item.icon}
                  <span className="text-xs" style={{ color: '#5a5a5a' }}>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-base font-semibold mb-3" style={{ color: 'var(--tb-text)' }}>{t.descTitle}</h3>
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--tb-bg)', border: '1px solid #f0e8e8' }}>
                {descBlocks.map((block, i) => (
                  <p key={i} className="text-sm leading-relaxed mb-3" style={{ color: 'var(--tb-text-secondary)' }}>
                    {i === 0 ? <strong>{block}</strong> : block}
                  </p>
                ))}
                <ul className="space-y-1.5">
                  {aiItems.map((item, i) => (
                    <li key={i} className="text-sm flex items-start gap-2" style={{ color: '#5a5a5a' }}>
                      <Check size={14} color="#d4a5a5" className="mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Product Specs */}
            <div className="mb-5">
              <h3 className="text-base font-semibold mb-3" style={{ color: 'var(--tb-text)' }}>{t.info}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {specs.map((s, i) => (
                  <div key={i} className="flex gap-2 text-sm py-1">
                    <span style={{ color: '#888' }}>{s.label}:</span>
                    <span style={{ color: 'var(--tb-text)', fontWeight: 500 }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Summary */}
            <div className="p-4 rounded-lg mb-6" style={{ backgroundColor: '#f8f4f0', border: '1px solid #e8e0e0' }}>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} color="#d4a5a5" />
                <h3 className="text-sm font-semibold" style={{ color: 'var(--tb-text)' }}>{t.aiTitle}</h3>
              </div>
              <ul className="space-y-2">
                {aiItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#5a5a5a' }}>
                    <Check size={14} color="#d4a5a5" className="mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Important Note */}
            <div className="flex items-start gap-3 p-4 rounded-lg" style={{ backgroundColor: '#fff8e6', border: '1px solid #ffe0a0' }}>
              <AlertTriangle size={18} color="#c48800" className="flex-shrink-0 mt-0.5" />
              <p className="text-sm" style={{ color: '#8a6b00' }}>{colorNote}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Add to Cart */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-3 flex gap-2" style={{ backgroundColor: 'var(--tb-card)', borderTop: '1px solid #eee', zIndex: 50 }}>
        <button className="flex-1 py-3 border text-sm font-medium" style={{ borderColor: '#c44', color: '#c44' }}>{t.buyNow}</button>
        <button onClick={handleAdd} className="flex-1 py-3 text-sm font-medium transition-all" style={{ backgroundColor: added ? '#4a7c59' : '#c44', color: 'var(--tb-card)' }}>
          {added ? '\u2713' : t.addCart}
        </button>
      </div>

      {/* Back link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 lg:pb-8">
        <button onClick={backToGrid} className="text-sm hover:text-[#d4a5a5] transition-colors" style={{ color: 'var(--tb-text-muted)', textDecoration: 'underline' }}>
          &larr; {t.back}
        </button>
      </div>

      <Footer />
    </div>
  );
}
