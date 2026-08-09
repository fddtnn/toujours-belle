import { useLanguage } from '../context/LanguageContext';
import { X, Trash2 } from 'lucide-react';

interface CartItem {
  type: string;
  color: string;
  length: string;
  quantity: number;
  price: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (index: number) => void;
  onLoginClick?: () => void;
}

const hairTypeNames: Record<string, { fr: string; ar: string }> = {
  straight: { fr: 'Lisses', ar: 'الناعم' },
  wavy: { fr: 'Ondul\u00e9s', ar: 'المموج' },
  curly: { fr: 'Boucl\u00e9s', ar: 'المجعد' },
  kinky: { fr: 'Cr\u00e9pus', ar: 'الأفرو' },
};

export default function CartDrawer({ isOpen, onClose, items, onRemove, onLoginClick }: CartDrawerProps) {
  const { lang, isRTL } = useLanguage();

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[200] bg-black/20 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 ${isRTL ? 'left-0' : 'right-0'} h-full w-full max-w-md bg-white shadow-xl z-[201] transition-transform duration-300 ${
          isOpen
            ? 'translate-x-0'
            : isRTL
              ? '-translate-x-full'
              : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div
            className="flex items-center justify-between p-6"
            style={{ borderBottom: '1px solid var(--tb-border)' }}
          >
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 400,
                fontSize: '1.5rem',
                color: 'var(--tb-text)',
              }}
            >
              {lang === 'fr' ? 'Votre Panier' : 'سلتكِ'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[var(--tb-border)] rounded-full transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-6">
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '20px',
                    color: 'var(--tb-text)',
                    marginBottom: '24px',
                  }}
                >
                  {lang === 'fr' ? 'Votre panier est vide' : 'سلتكِ فارغة'}
                </p>
                <button
                  onClick={onClose}
                  className="w-full transition-all duration-200 hover:opacity-90"
                  style={{
                    padding: '16px 24px',
                    backgroundColor: '#3a3a3a',
                    color: '#ffffff',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    fontWeight: 400,
                    border: 'none',
                    cursor: 'pointer',
                    letterSpacing: '0.02em',
                  }}
                >
                  {lang === 'fr' ? 'Continuer les achats' : 'مواصلة التسوق'}
                </button>
                <div className="mt-8">
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--tb-text)', marginBottom: '4px' }}>
                    {lang === 'fr' ? 'Vous avez un compte ?' : 'لديكِ حساب؟'}
                  </p>
                  <button
                    onClick={() => { onClose(); onLoginClick?.(); }}
                    className="hover:text-[#d4a5a5] transition-colors duration-200"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '15px',
                      color: 'var(--tb-text)',
                      textDecoration: 'underline',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {lang === 'fr' ? 'Connectez-vous' : 'سجلي الدخول'}
                  </button>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--tb-text)' }}>
                    {' '}
                    {lang === 'fr' ? 'pour payer plus vite.' : 'للدفع بشكل أسرع.'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item, idx) => {
                  const typeName = hairTypeNames[item.type] || { fr: item.type, ar: item.type };
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-4 rounded-lg"
                      style={{ backgroundColor: 'var(--tb-bg)' }}
                    >
                      <div
                        className="w-16 h-16 rounded-lg flex-shrink-0"
                        style={{
                          background: 'linear-gradient(135deg, #d4a5a5 0%, var(--tb-border) 100%)',
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 500,
                            fontSize: '14px',
                            color: 'var(--tb-text)',
                          }}
                        >
                          {lang === 'fr' ? `Cheveux ${typeName.fr}` : `شعر ${typeName.ar}`}
                        </p>
                        <p
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '12px',
                            color: 'var(--tb-text-muted)',
                          }}
                        >
                          {item.color} — {item.length} — x{item.quantity}
                        </p>
                        <p
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 500,
                            fontSize: '14px',
                            color: '#d4a5a5',
                          }}
                        >
                          {item.price} TND
                        </p>
                      </div>
                      <button
                        onClick={() => onRemove(idx)}
                        className="p-2 hover:text-red-500 transition-colors"
                        style={{ color: 'var(--tb-text-muted)' }}
                        aria-label="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div
              className="p-6"
              style={{ borderTop: '1px solid var(--tb-border)' }}
            >
              <div
                className="flex justify-between mb-4"
                style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: '16px',
                    color: 'var(--tb-text)',
                  }}
                >
                  {lang === 'fr' ? 'Total' : 'المجموع'}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: '16px',
                    color: '#d4a5a5',
                  }}
                >
                  {total} TND
                </span>
              </div>
              <button
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--tb-text)',
                  color: 'var(--tb-bg)',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: '14px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#d4a5a5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--tb-text)';
                }}
              >
                {lang === 'fr' ? 'Commander' : 'اطلبي الآن'}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
