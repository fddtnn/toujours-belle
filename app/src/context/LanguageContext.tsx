import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type Lang = 'fr' | 'ar';

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (obj: { fr: string; ar: string }) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'fr',
  toggleLang: () => {},
  t: (obj) => obj.fr,
  isRTL: false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('fr');

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === 'fr' ? 'ar' : 'fr';
      document.documentElement.lang = next;
      document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
      return next;
    });
  }, []);

  const t = useCallback(
    (obj: { fr: string; ar: string }) => {
      return obj[lang];
    },
    [lang]
  );

  const isRTL = lang === 'ar';

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
