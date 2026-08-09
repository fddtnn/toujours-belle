/**
 * Color utilities for hair tinting using CSS filter transforms.
 * Converts a target hex color into hue-rotate + saturate + brightness filters
 * that can be applied to a hair overlay image.
 */

export interface HairColor {
  nameFr: string;
  nameAr: string;
  hex: string;
}

export const hairColors: HairColor[] = [
  { nameFr: 'Noir', nameAr: 'أسود', hex: '#0a0a0a' },
  { nameFr: 'Châtain Foncé', nameAr: 'بني غامق', hex: '#2d1a0e' },
  { nameFr: 'Châtain Clair', nameAr: 'بني فاتح', hex: '#6b4423' },
  { nameFr: 'Blond Doré', nameAr: 'أشقر ذهبي', hex: '#d4a76a' },
  { nameFr: 'Blond Platine', nameAr: 'أشقر بلاتيني', hex: '#f5e6c8' },
  { nameFr: 'Roux', nameAr: 'أحمر', hex: '#cc4422' },
  { nameFr: 'Auburn', nameAr: 'أوبورن', hex: '#722f37' },
  { nameFr: 'Gris Argent', nameAr: 'رمادي فضي', hex: '#b8b8b8' },
  { nameFr: 'Rose Pastel', nameAr: 'وردي باستيل', hex: '#f5c6c6' },
  { nameFr: 'Bleu', nameAr: 'أزرق', hex: '#4169e1' },
  { nameFr: 'Violet', nameAr: 'بنفسجي', hex: '#6b3fa0' },
  { nameFr: 'Blanc', nameAr: 'أبيض', hex: '#f0f0f0' },
];

/**
 * Convert hex to HSL
 */
function hexToHsl(hex: string): [number, number, number] {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return [h * 360, s * 100, l * 100];
}

/**
 * Generate CSS filter string to tint a hair image toward the target color.
 * Uses the difference between the target hue and a neutral brown base (~25°)
 * to compute hue-rotate, then adjusts saturation and brightness.
 */
export function getColorFilter(hex: string): string {
  const [h, s, l] = hexToHsl(hex);

  // Base hair images are typically dark brown/black (~25° hue)
  const baseHue = 25;
  let hueRotate = h - baseHue;
  if (hueRotate > 180) hueRotate -= 360;
  if (hueRotate < -180) hueRotate += 360;

  // Saturation boost: colorful targets need more saturation
  const satBoost = Math.max(0, (s - 30) * 1.5);

  // Brightness: light colors need brightness, dark colors need darkness
  const brightness = l / 50; // normalize around 1.0

  // For very dark colors (black), reduce brightness and saturation
  if (l < 15) {
    return `brightness(${0.3 + brightness * 0.5}) saturate(0.3)`;
  }

  // For very light colors (white/platinum)
  if (l > 85) {
    return `brightness(${brightness}) saturate(0.1) hue-rotate(${hueRotate}deg)`;
  }

  return `hue-rotate(${hueRotate}deg) saturate(${1 + satBoost / 100}) brightness(${brightness})`;
}

/**
 * Get a CSS background gradient for a color swatch
 */
export function getColorSwatchStyle(hex: string): React.CSSProperties {
  return {
    backgroundColor: hex,
    boxShadow: `inset 0 0 0 1px rgba(0,0,0,0.1)`,
  };
}
