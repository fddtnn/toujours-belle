import { useLocation } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

/* Language + theme toggles for pages that don't render <Navigation>.
   The nav bar only exists on the home page, so on every other route these
   two controls were unreachable. Rendered globally from App, hidden on "/". */
export default function PageControls() {
  const { lang, toggleLang, isRTL } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  if (location.pathname === '/') return null;

  const btn: React.CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--tb-text)',
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    fontSize: '12px',
    letterSpacing: '0.08em',
    padding: '6px 8px',
    display: 'flex',
    alignItems: 'center',
    transition: 'color 0.3s ease',
  };

  return (
    <div
      className="fixed flex items-center rounded-full shadow-lg"
      style={{
        top: '20px',
        [isRTL ? 'left' : 'right']: '20px',
        zIndex: 130,
        gap: '2px',
        padding: '4px 6px',
        backgroundColor: isDark ? 'rgba(26,26,26,0.9)' : 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(12px)',
        border: `1px solid ${isDark ? '#2a2020' : '#f0e0e0'}`,
        flexDirection: isRTL ? 'row-reverse' : 'row',
      }}
    >
      <button
        onClick={toggleLang}
        style={btn}
        onMouseEnter={(e) => { e.currentTarget.style.color = '#d4a5a5'; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--tb-text)'; }}
        aria-label={lang === 'fr' ? 'Passer en arabe' : 'التبديل إلى الفرنسية'}
      >
        {lang === 'fr' ? 'AR' : 'FR'}
      </button>
      <span style={{ width: '1px', height: '16px', backgroundColor: isDark ? '#2a2020' : '#f0e0e0' }} />
      <button
        onClick={toggleTheme}
        style={btn}
        onMouseEnter={(e) => { e.currentTarget.style.color = '#d4a5a5'; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--tb-text)'; }}
        aria-label={lang === 'fr' ? 'Changer de thème' : 'تغيير المظهر'}
      >
        {isDark ? <Sun size={16} /> : <Moon size={16} />}
      </button>
    </div>
  );
}
