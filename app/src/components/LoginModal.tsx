import { useState, useRef, useEffect } from "react";
import { useLocalAuth } from "@/hooks/useLocalAuth";
import { useLanguage } from "@/context/LanguageContext";
import { X, Mail, ArrowRight, User } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { lang } = useLanguage();
  const { sendOtp, verifyOtp, isLoading, lastOtp } = useLocalAuth();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [emailNewsOffers, setEmailNewsOffers] = useState(false);
  const [step, setStep] = useState<"email" | "otp" | "register">("email");
  const [error, setError] = useState("");
  const [termsOpen, setTermsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setStep("email");
      setEmail("");
      setOtp("");
      setName("");
      setError("");
      inputRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.includes("@")) {
      setError(lang === "fr" ? "Veuillez entrer un email valide" : "يرجى إدخال بريد إلكتروني صالح");
      return;
    }
    try {
      await sendOtp(email);
      // For demo: check if we need registration (no name field yet from server check)
      // Show OTP step - the verify will handle both login and registration
      setStep("otp");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erreur";
      setError(message);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (otp.length !== 6) {
      setError(lang === "fr" ? "Veuillez entrer le code à 6 chiffres" : "يرجى إدخال الرمز المكون من 6 أرقام");
      return;
    }
    try {
      const result = await verifyOtp(email, otp, name || undefined, emailNewsOffers);
      if (result.success) {
        onClose();
      } else {
        setError(lang === "fr" ? "Code invalide ou expiré" : "رمز غير صالح أو منتهي الصلاحية");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erreur";
      setError(message);
    }
  };

  const t = {
    signIn: lang === "fr" ? "Se connecter" : "تسجيل الدخول",
    signInOrCreate: lang === "fr" ? "Se connecter ou créer un compte" : "تسجيل الدخول أو إنشاء حساب",
    continueWith: lang === "fr" ? "Continuer avec" : "المتابعة باستخدام",
    or: lang === "fr" ? "ou" : "أو",
    email: lang === "fr" ? "Email" : "البريد الإلكتروني",
    emailPlaceholder: lang === "fr" ? "votre@email.com" : "بريدك@email.com",
    emailNewsOffers: lang === "fr" ? "M'envoyer des nouvelles et des offres" : "أرسلي لي الأخبار والعروض",
    agreeTerms: lang === "fr" ? "En continuant, vous acceptez nos" : "بالمتابعة، فإنك توافق على",
    termsOfService: lang === "fr" ? "conditions de service" : "شروط الخدمة",
    privacyPolicy: lang === "fr" ? "Politique de confidentialité" : "سياسة الخصوصية",
    submit: lang === "fr" ? "Continuer" : "متابعة",
    enterOtp: lang === "fr" ? "Entrez le code de vérification" : "أدخلي رمز التحقق",
    otpSent: lang === "fr" ? "Un code a été envoyé à" : "تم إرسال رمز إلى",
    newAccount: lang === "fr" ? "Nouveau compte" : "حساب جديد",
    yourName: lang === "fr" ? "Votre prénom" : "اسمكِ",
    namePlaceholder: lang === "fr" ? "Prénom" : "الاسم الأول",
    welcomeBack: lang === "fr" ? "Content de vous revoir !" : "سعداء بعودتكِ!",
    createAccount: lang === "fr" ? "Créez votre compte" : "أنشئي حسابكِ",
    firstTime: lang === "fr" ? "Première visite ?" : "زيارة أولى؟",
    enterName: lang === "fr" ? "Entrez votre prénom pour créer votre compte" : "أدخلي اسمكِ لإنشاء حسابكِ",
    verify: lang === "fr" ? "Vérifier" : "تحقق",
    back: lang === "fr" ? "Retour" : "رجوع",
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-[420px] mx-4 rounded-2xl overflow-hidden shadow-2xl"
        style={{ backgroundColor: "#ffffff" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-[#f0e0e0] transition-colors"
          aria-label="Close"
        >
          <X size={18} color="#1a1a1a" />
        </button>

        {/* Header */}
        <div className="text-center pt-10 pb-6 px-8" style={{ backgroundColor: "#faf6f4" }}>
          <p className="flex items-center justify-center mb-3">
            <img src="/images/tb-logo.png" alt="Toujours Belle" style={{ height: '130px', width: 'auto', objectFit: 'contain' }} />
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 500, color: '#1a1a1a', lineHeight: 1.2 }}>
            {step === "otp" ? t.enterOtp : t.signIn}
          </h2>
          <p className="mt-2" style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#8a8a8a' }}>
            {step === "otp" ? `${t.otpSent} ${email}` : t.signInOrCreate}
          </p>
        </div>

        {/* Body */}
        <div className="px-8 py-6">
          {step === "email" ? (
            <form onSubmit={handleSendOtp} className="space-y-5">
              {/* Continue with shop button (placeholder) */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 transition-all duration-200 opacity-60 cursor-not-allowed"
                style={{
                  padding: "14px 24px",
                  borderRadius: "8px",
                  backgroundColor: "#d4a5a5",
                  color: "#ffffff",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  fontWeight: 500,
                  border: "none",
                }}
                disabled
                title="Coming soon"
              >
                {t.continueWith} Toujours Belle
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px" style={{ backgroundColor: '#e0d0d0' }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#8a8a8a' }}>{t.or}</span>
                <div className="flex-1 h-px" style={{ backgroundColor: '#e0d0d0' }} />
              </div>

              {/* Email input */}
              <div className="relative">
                <Mail size={16} color="#c8adad" className="absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  ref={inputRef}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  required
                  className="w-full rounded-lg"
                  style={{
                    padding: "14px 48px 14px 44px",
                    border: "1px solid #e0d0d0",
                    backgroundColor: "#faf6f4",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    color: "#1a1a1a",
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:bg-[#d4a5a5] hover:text-white transition-all duration-200 disabled:opacity-50"
                  style={{ color: '#1a1a1a' }}
                >
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* Newsletter checkbox */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailNewsOffers}
                  onChange={(e) => setEmailNewsOffers(e.target.checked)}
                  className="mt-0.5 accent-[#d4a5a5]"
                />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#6b6b6b", lineHeight: 1.5 }}>
                  {t.emailNewsOffers}
                </span>
              </label>

              {/* Terms */}
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#8a8a8a", lineHeight: 1.6 }}>
                {t.agreeTerms}{" "}
                <button
                  type="button"
                  onClick={() => setTermsOpen(true)}
                  className="underline hover:text-[#d4a5a5] transition-colors"
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'inherit' }}
                >
                  {t.termsOfService}
                </button>{" "}
                &{" "}
                <a href="/privacy" className="underline hover:text-[#d4a5a5] transition-colors">
                  {t.privacyPolicy}
                </a>
              </p>

              {/* Error */}
              {error && (
                <p className="text-center" style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#e74c3c" }}>
                  {error}
                </p>
              )}
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              {/* OTP Code Display (demo mode) */}
              {lastOtp && (
                <div className="rounded-lg p-4 text-center" style={{ backgroundColor: '#d4a5a5', border: '1px solid #c49393' }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#ffffff', marginBottom: '4px', opacity: 0.9 }}>
                    {lang === "fr" ? "Votre code (démo)" : "رمزكِ (تجريبي)"}
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '28px', fontWeight: 700, color: '#ffffff', letterSpacing: '0.3em' }}>
                    {lastOtp}
                  </p>
                </div>
              )}

              {/* Name field for new accounts */}
              <div className="rounded-lg p-4" style={{ backgroundColor: '#faf6f4', border: '1px solid #f0e0e0' }}>
                <p className="flex items-center gap-2 mb-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#d4a5a5' }}>
                  <User size={14} />
                  {t.firstTime} {t.createAccount}
                </p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  className="w-full rounded-lg"
                  style={{
                    padding: "12px 16px",
                    border: "1px solid #e0d0d0",
                    backgroundColor: "#ffffff",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    color: "#1a1a1a",
                    outline: "none",
                  }}
                />
                <p className="mt-2" style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#8a8a8a' }}>
                  {t.enterName}
                </p>
              </div>

              {/* OTP input */}
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="123456"
                maxLength={6}
                required
                className="w-full text-center rounded-lg tracking-[0.5em]"
                style={{
                  padding: "14px 16px",
                  border: "1px solid #e0d0d0",
                  backgroundColor: "#faf6f4",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#1a1a1a",
                  outline: "none",
                }}
              />

              {/* Error */}
              {error && (
                <p className="text-center" style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#e74c3c" }}>
                  {error}
                </p>
              )}

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep("email")}
                  className="flex-1 transition-all duration-200 hover:opacity-80"
                  style={{
                    padding: "14px 24px",
                    borderRadius: "8px",
                    backgroundColor: "transparent",
                    color: "#1a1a1a",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    fontWeight: 500,
                    border: "1px solid #e0d0d0",
                    cursor: "pointer",
                  }}
                >
                  {t.back}
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-[2] flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 disabled:opacity-50"
                  style={{
                    padding: "14px 24px",
                    borderRadius: "8px",
                    backgroundColor: "#1a1a1a",
                    color: "#ffffff",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    fontWeight: 500,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {isLoading ? (
                    <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <>
                      {name ? `${t.verify} & ${t.createAccount}` : t.verify}
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-4 text-center" style={{ borderTop: "1px solid #f0e0e0" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#c8adad" }}>
            www.toujours-belle.com
          </p>
        </div>
      </div>

      {/* Terms of Service Popup Modal */}
      {termsOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '16px',
          }}
          onClick={() => setTermsOpen(false)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '700px',
              width: '100%',
              maxHeight: '85vh',
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #f0e0e0', flexShrink: 0 }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 500, color: '#1a1a1a' }}>
                CONDITIONS GÉNÉRALES DE VENTE – TOUJOURS BELLE
              </h3>
              <button
                onClick={() => setTermsOpen(false)}
                style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  backgroundColor: '#faf6f4', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <X size={16} color="#1a1a1a" />
              </button>
            </div>

            {/* Content */}
            <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#5a5a5a', lineHeight: 1.8 }}>
                <p style={{ marginBottom: '12px' }}><strong style={{ color: '#1a1a1a' }}>Validation de la commande :</strong> Chaque cliente est tenue de vérifier attentivement tous les détails de sa commande avant validation.</p>
                <p style={{ marginBottom: '12px' }}><strong style={{ color: '#1a1a1a' }}>Commandes personnalisées :</strong> Les commandes personnalisées ne peuvent être ni annulées, ni remboursées, ni échangées après confirmation.</p>
                <p style={{ marginBottom: '12px' }}><strong style={{ color: '#1a1a1a' }}>Paiement échelonné :</strong> Tous les montants déjà versés sont définitivement acquis et non remboursables.</p>
                <p style={{ marginBottom: '12px' }}><strong style={{ color: '#1a1a1a' }}>Couleurs et caractéristiques :</strong> De légères différences de couleur peuvent apparaître en raison de l'éclairage ou des paramètres d'affichage des écrans. Cela ne constitue pas un défaut du produit.</p>
                <p style={{ marginBottom: '12px' }}><strong style={{ color: '#1a1a1a' }}>Retours et échanges :</strong> Aucun retour ou échange n'est accepté pour des raisons de préférence personnelle (couleur, longueur, densité ou apparence). Toute réclamation doit être effectuée dans un délai maximum de 24 heures après réception, avec photos justificatives.</p>
                <p style={{ marginBottom: '12px' }}><strong style={{ color: '#1a1a1a' }}>Utilisation et entretien :</strong> Toujours Belle décline toute responsabilité en cas de mauvaise utilisation, mauvais entretien, utilisation de produits inadaptés, coloration ou traitements chimiques non appropriés.</p>
                <p style={{ marginBottom: '12px' }}><strong style={{ color: '#1a1a1a' }}>Acompte :</strong> L'acompte ou le premier versement est définitif et non remboursable, quelle qu'en soit la raison.</p>
                <p><strong style={{ color: '#1a1a1a' }}>Acceptation :</strong> Toute validation de commande, paiement d'acompte ou signature électronique vaut acceptation pleine et entière des présentes conditions générales de vente.</p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 flex justify-end" style={{ borderTop: '1px solid #f0e0e0', flexShrink: 0 }}>
              <button
                onClick={() => setTermsOpen(false)}
                style={{
                  padding: '10px 28px', borderRadius: '8px',
                  backgroundColor: '#1a1a1a', color: '#ffffff',
                  fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500,
                  border: 'none', cursor: 'pointer',
                }}
              >
                {lang === 'fr' ? 'Fermer' : 'إغلاق'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
        