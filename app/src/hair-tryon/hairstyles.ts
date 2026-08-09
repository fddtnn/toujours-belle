export interface Hairstyle {
  id: string;
  nameFr: string;
  nameAr: string;
  category: 'short' | 'medium' | 'long' | 'curly' | 'straight' | 'updo';
  image: string;
  scale: number;    // default scale factor
  offsetY: number;  // vertical offset percentage (-1 = up, 1 = down)
}

export const categories: { id: string; labelFr: string; labelAr: string }[] = [
  { id: 'short', labelFr: 'Court', labelAr: 'قصير' },
  { id: 'medium', labelFr: 'Mi-Long', labelAr: 'متوسط' },
  { id: 'long', labelFr: 'Long', labelAr: 'طويل' },
  { id: 'curly', labelFr: 'Bouclé', labelAr: 'مجعد' },
  { id: 'straight', labelFr: 'Lisse', labelAr: 'ناعم' },
  { id: 'updo', labelFr: 'Attaché', labelAr: 'مربوط' },
];

export const hairstyles: Hairstyle[] = [
  {
    id: 'short-black',
    nameFr: 'Pixie Court',
    nameAr: 'بيكسي قصير',
    category: 'short',
    image: '/images/hairstyles/short-black.png',
    scale: 1.0,
    offsetY: -0.05,
  },
  {
    id: 'medium-wavy',
    nameFr: 'Wavy Bob',
    nameAr: 'بوب مموج',
    category: 'medium',
    image: '/images/hairstyles/medium-wavy.png',
    scale: 1.05,
    offsetY: -0.02,
  },
  {
    id: 'long-straight',
    nameFr: 'Long Lisse',
    nameAr: 'طويل ناعم',
    category: 'long',
    image: '/images/hairstyles/long-straight.png',
    scale: 1.15,
    offsetY: -0.08,
  },
  {
    id: 'long-waves',
    nameFr: 'Longs Boucles',
    nameAr: 'طويل مجعد',
    category: 'long',
    image: '/images/hairstyles/long-waves.png',
    scale: 1.12,
    offsetY: -0.06,
  },
  {
    id: 'curly-afro',
    nameFr: 'Afro Bouclé',
    nameAr: 'أفرو مجعد',
    category: 'curly',
    image: '/images/hairstyles/curly-afro.png',
    scale: 1.0,
    offsetY: 0.0,
  },
  {
    id: 'curly-bob',
    nameFr: 'Bob Bouclé',
    nameAr: 'بوب مجعد',
    category: 'curly',
    image: '/images/hairstyles/curly-bob.png',
    scale: 1.02,
    offsetY: -0.02,
  },
  {
    id: 'ponytail',
    nameFr: 'Queue-de-Cheval',
    nameAr: 'ذيل الحصان',
    category: 'updo',
    image: '/images/hairstyles/ponytail.png',
    scale: 1.05,
    offsetY: -0.04,
  },
  {
    id: 'braids',
    nameFr: 'Tresses',
    nameAr: 'ضفائر',
    category: 'updo',
    image: '/images/hairstyles/braids.png',
    scale: 1.1,
    offsetY: -0.06,
  },
  {
    id: 'blonde-wavy',
    nameFr: 'Blond Luxe Vague',
    nameAr: 'أشقر فاخر مموج',
    category: 'long',
    image: '/images/hairstyles/blonde-wavy.png',
    scale: 1.2,
    offsetY: -0.1,
  },
];
