import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocalAuth } from "@/hooks/useLocalAuth";
import { isGoogleEnabled } from "@/lib/supabase";
import { useLanguage } from "@/context/LanguageContext";
import { X, Mail, ArrowRight, User, KeyRound } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/* Google's own four-colour G. Inlined rather than hotlinked so the card does
   not call out to a third party just to draw a button. */
function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { lang, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { sendOtp, verifyOtp, isLoading, lastOtp, signInWithGoogle, isConfigured } = useLocalAuth();
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

  /* Escape closes, and the page behind must not scroll while this is up. */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") termsOpen ? setTermsOpen(false) : onClose(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [isOpen, onClose, termsOpen]);

  if (!isOpen) return null;

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.includes("@")) {
      setError(lang === "fr" ? "Veuillez entrer un email valide" : "يرجى إدخال بريد إلكتروني صالح");
      return;
    }
    const res = await sendOtp(email);
    if (!res.success) { setError(res.message); return; }
    setStep("otp");
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (otp.length !== 6) {
      setError(lang === "fr" ? "Veuillez entrer le code à 6 chiffres" : "يرجى إدخال الرمز المكون من 6 أرقام");
      return;
    }
    const result = await verifyOtp(email, otp, name || undefined, emailNewsOffers);
    if (result.success) { onClose(); return; }
    setError(result.message || (lang === "fr" ? "Code invalide ou expiré" : "رمز غير صالح أو منتهي الصلاحية"));
  };

  const goPrivacy = () => { onClose(); navigate("/privacy"); };

  const t = {
    welcome: lang === "fr" ? "Bienvenue" : "أهلاً بكِ",
    signIn: lang === "fr" ? "Se connecter" : "تسجيل الدخول",
    signInOrCreate: lang === "fr" ? "Connectez-vous pour suivre vos commandes" : "سجّلي الدخول لمتابعة طلباتكِ",
    continueWith: lang === "fr" ? "Continuer avec" : "المتابعة باستخدام",
    notConfigured: lang === "fr"
      ? "La connexion n'est pas encore activée sur ce site. Écrivez-nous sur WhatsApp en attendant."
      : "تسجيل الدخول غير مفعّل بعد على الموقع. راسلينا على واتساب لين ما يجهز.",
    or: lang === "fr" ? "OU" : "أو",
    emailPlaceholder: lang === "fr" ? "Adresse email" : "البريد الإلكتروني",
    emailNewsOffers: lang === "fr" ? "M'envoyer des nouvelles et des offres" : "أرسلي لي الأخبار والعروض",
    agreeTerms: lang === "fr" ? "En continuant, vous acceptez nos" : "بالمتابعة، فإنكِ توافقين على",
    termsOfService: lang === "fr" ? "conditions de service" : "شروط الخدمة",
    privacyPolicy: lang === "fr" ? "Politique de confidentialité" : "سياسة الخصوصية",
    submit: lang === "fr" ? "Continuer" : "متابعة",
    noPassword: lang === "fr"
      ? "Pas de mot de passe : nous vous envoyons un code à 6 chiffres."
      : "بدون كلمة مرور: نرسل لكِ رمزاً من 6 أرقام.",
    enterOtp: lang === "fr" ? "Entrez le code" : "أدخلي الرمز",
    otpSent: lang === "fr" ? "Code envoyé à" : "تم إرسال الرمز إلى",
    firstTime: lang === "fr" ? "Première visite ?" : "زيارة أولى؟",
    namePlaceholder: lang === "fr" ? "Prénom" : "الاسم الأول",
    createAccount: lang === "fr" ? "Créez votre compte" : "أنشئي حسابكِ",
    enterName: lang === "fr" ? "Entrez votre prénom pour créer votre compte" : "أدخلي اسمكِ لإنشاء حسابكِ",
    verify: lang === "fr" ? "Vérifier" : "تحقق",
    back: lang === "fr" ? "Retour" : "رجوع",
    close: lang === "fr" ? "Fermer" : "إغلاق",
  };

  const fieldStyle: React.CSSProperties = {
    width: "100%",
    padding: "15px 46px",
    borderRadius: "14px",
    border: "1px solid var(--glass-border)",
    backgroundColor: "var(--tb-field-bg)",
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
    color: "var(--tb-text)",
    outline: "none",
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={onClose}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(20, 14, 14, 0.52)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
      />

      {/* Card */}
      <div
        className="tb-login-card relative w-full max-w-[420px] max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={t.signIn}
      >
        <button
          onClick={onClose}
          className="absolute top-4 flex items-center justify-center transition-colors"
          style={{
            [isRTL ? "left" : "right"]: "16px",
            width: "44px", height: "44px", borderRadius: "50%",
            background: "none", border: "none", cursor: "pointer", color: "var(--tb-text)",
          }}
          aria-label={t.close}
        >
          <X size={18} />
        </button>

        <div className="px-8 pt-10 pb-8">
          {/* Mark + title */}
          <div className="text-center">
            <img
              src="/images/tb-logo.png"
              alt="Toujours Belle"
              className="tb-logo-adapt"
              style={{ height: "78px", width: "auto", objectFit: "contain", margin: "0 auto 14px" }}
            />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 500, color: "var(--tb-text)", lineHeight: 1.15 }}>
              {step === "otp" ? t.enterOtp : t.welcome}
            </h2>
            <p className="mt-2" style={{ fontFamily: "'Inter', sans-serif", fontSize: "13.5px", color: "var(--tb-text-secondary)" }}>
              {step === "otp" ? `${t.otpSent} ${email}` : t.signInOrCreate}
            </p>
          </div>

          {step === "email" ? (
            <form onSubmit={handleSendOtp} className="mt-7 space-y-4">
              <div className="relative">
                <Mail
                  size={17}
                  color="var(--tb-accent-text)"
                  className="absolute top-1/2 -translate-y-1/2"
                  style={{ [isRTL ? "right" : "left"]: "16px" }}
                />
                <input
                  ref={inputRef}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  aria-label={t.emailPlaceholder}
                  required
                  style={fieldStyle}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 transition-opacity duration-200 hover:opacity-90 disabled:opacity-50"
                style={{
                  padding: "16px 24px", borderRadius: "100px",
                  backgroundColor: "var(--tb-text)", color: "var(--tb-bg)",
                  fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 500,
                  border: "none", cursor: "pointer",
                }}
              >
                {isLoading ? (
                  <span className="animate-spin w-5 h-5 border-2 rounded-full" style={{ borderColor: "var(--tb-bg)", borderTopColor: "transparent" }} />
                ) : (
                  <>
                    {t.submit}
                    <ArrowRight size={17} style={{ transform: isRTL ? "rotate(180deg)" : undefined }} />
                  </>
                )}
              </button>

              {isGoogleEnabled && (
                <>
                  <div className="flex items-center gap-4 pt-1">
                    <div className="flex-1 h-px" style={{ backgroundColor: "var(--glass-border)" }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", letterSpacing: "0.1em", color: "var(--tb-text-muted)" }}>{t.or}</span>
                    <div className="flex-1 h-px" style={{ backgroundColor: "var(--glass-border)" }} />
                  </div>

                  <button
                    type="button"
                    onClick={async () => {
                      setError("");
                      const res = await signInWithGoogle();
                      if (!res.success) setError(res.message);
                    }}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 transition-opacity duration-200 hover:opacity-85 disabled:opacity-50"
                    style={{
                      padding: "14px 24px", borderRadius: "100px",
                      backgroundColor: "var(--tb-field-bg)", color: "var(--tb-text)",
                      fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 500,
                      border: "1px solid var(--glass-border)", cursor: "pointer",
                    }}
                  >
                    <GoogleMark />
                    {t.continueWith} Google
                  </button>
                </>
              )}

              {!isConfigured && (
                <p
                  className="text-center"
                  style={{
                    fontFamily: "'Inter', sans-serif", fontSize: "12.5px", lineHeight: 1.6,
                    color: "var(--tb-accent-text)", backgroundColor: "var(--tb-surface)",
                    border: "1px solid var(--glass-border)", borderRadius: "14px", padding: "12px 14px",
                  }}
                >
                  {t.notConfigured}
                </p>
              )}

              <label className="flex items-start gap-3 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={emailNewsOffers}
                  onChange={(e) => setEmailNewsOffers(e.target.checked)}
                  className="mt-0.5 accent-[#d4a5a5]"
                  style={{ width: "16px", height: "16px" }}
                />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "var(--tb-text-secondary)", lineHeight: 1.5 }}>
                  {t.emailNewsOffers}
                </span>
              </label>

              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11.5px", color: "var(--tb-text-muted)", lineHeight: 1.65 }}>
                {t.agreeTerms}{" "}
                <button
                  type="button"
                  onClick={() => setTermsOpen(true)}
                  className="underline hover:text-[#d4a5a5] transition-colors"
                  style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: "11.5px", color: "inherit" }}
                >
                  {t.termsOfService}
                </button>{" "}
                &{" "}
                <button
                  type="button"
                  onClick={goPrivacy}
                  className="underline hover:text-[#d4a5a5] transition-colors"
                  style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: "11.5px", color: "inherit" }}
                >
                  {t.privacyPolicy}
                </button>
              </p>

              {error && (
                <p className="text-center" style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#e05252" }}>
                  {error}
                </p>
              )}

              <p className="text-center pt-1" style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "var(--tb-text-muted)" }}>
                <KeyRound size={12} className="inline-block align-[-1px] mr-1.5" />
                {t.noPassword}
              </p>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="mt-7 space-y-4">
              {lastOtp && (
                <div className="rounded-2xl p-4 text-center" style={{ backgroundColor: "var(--tb-surface)", border: "1px solid var(--glass-border)" }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "var(--tb-text-secondary)", marginBottom: "4px" }}>
                    {lang === "fr" ? "Votre code (démo)" : "رمزكِ (تجريبي)"}
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "28px", fontWeight: 700, color: "var(--tb-accent-text)", letterSpacing: "0.3em" }}>
                    {lastOtp}
                  </p>
                </div>
              )}

              <input
                type="text"
                inputMode="numeric"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="------"
                aria-label={t.enterOtp}
                maxLength={6}
                required
                className="w-full text-center tracking-[0.5em]"
                style={{ ...fieldStyle, padding: "15px 16px", fontSize: "22px", fontWeight: 600 }}
              />

              <div className="rounded-2xl p-4" style={{ backgroundColor: "var(--tb-surface)", border: "1px solid var(--glass-border)" }}>
                <p className="flex items-center gap-2 mb-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: "var(--tb-accent-text)" }}>
                  <User size={14} />
                  {t.firstTime} {t.createAccount}
                </p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  aria-label={t.namePlaceholder}
                  style={{ ...fieldStyle, padding: "12px 16px", borderRadius: "12px" }}
                />
                <p className="mt-2" style={{ fontFamily: "'Inter', sans-serif", fontSize: "11.5px", color: "var(--tb-text-muted)" }}>
                  {t.enterName}
                </p>
              </div>

              {error && (
                <p className="text-center" style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#e05252" }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 transition-opacity duration-200 hover:opacity-90 disabled:opacity-50"
                style={{
                  padding: "16px 24px", borderRadius: "100px",
                  backgroundColor: "var(--tb-text)", color: "var(--tb-bg)",
                  fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 500,
                  border: "none", cursor: "pointer",
                }}
              >
                {isLoading ? (
                  <span className="animate-spin w-5 h-5 border-2 rounded-full" style={{ borderColor: "var(--tb-bg)", borderTopColor: "transparent" }} />
                ) : (
                  <>
                    {name ? `${t.verify} & ${t.createAccount}` : t.verify}
                    <ArrowRight size={17} style={{ transform: isRTL ? "rotate(180deg)" : undefined }} />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep("email")}
                className="w-full transition-opacity hover:opacity-80"
                style={{
                  padding: "13px 24px", borderRadius: "100px",
                  backgroundColor: "transparent", color: "var(--tb-text-secondary)",
                  fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 500,
                  border: "1px solid var(--glass-border)", cursor: "pointer",
                }}
              >
                {t.back}
              </button>
            </form>
          )}
        </div>

        <div className="px-8 py-4 text-center" style={{ borderTop: "1px solid var(--glass-border)" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "var(--tb-text-muted)" }}>
            www.toujours-belle.com
          </p>
        </div>
      </div>

      {/* Terms of Service */}
      {termsOpen && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            backgroundColor: "rgba(20,14,14,0.62)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "16px",
          }}
          onClick={() => setTermsOpen(false)}
        >
          <div
            className="tb-login-card"
            style={{
              position: "relative", maxWidth: "700px", width: "100%", maxHeight: "85vh",
              overflow: "hidden", display: "flex", flexDirection: "column",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid var(--glass-border)", flexShrink: 0 }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 500, color: "var(--tb-text)" }}>
                CONDITIONS GÉNÉRALES DE VENTE – TOUJOURS BELLE
              </h3>
              <button
                onClick={() => setTermsOpen(false)}
                aria-label={t.close}
                style={{
                  width: "44px", height: "44px", borderRadius: "50%",
                  backgroundColor: "transparent", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}
              >
                <X size={18} color="var(--tb-text)" />
              </button>
            </div>

            <div style={{ padding: "24px 28px", overflowY: "auto", flex: 1 }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "var(--tb-text-secondary)", lineHeight: 1.8 }}>
                <p style={{ marginBottom: "12px" }}><strong style={{ color: "var(--tb-text)" }}>Validation de la commande :</strong> Chaque cliente est tenue de vérifier attentivement tous les détails de sa commande avant validation.</p>
                <p style={{ marginBottom: "12px" }}><strong style={{ color: "var(--tb-text)" }}>Commandes personnalisées :</strong> Les commandes personnalisées ne peuvent être ni annulées, ni remboursées, ni échangées après confirmation.</p>
                <p style={{ marginBottom: "12px" }}><strong style={{ color: "var(--tb-text)" }}>Paiement échelonné :</strong> Tous les montants déjà versés sont définitivement acquis et non remboursables.</p>
                <p style={{ marginBottom: "12px" }}><strong style={{ color: "var(--tb-text)" }}>Couleurs et caractéristiques :</strong> De légères différences de couleur peuvent apparaître en raison de l'éclairage ou des paramètres d'affichage des écrans. Cela ne constitue pas un défaut du produit.</p>
                <p style={{ marginBottom: "12px" }}><strong style={{ color: "var(--tb-text)" }}>Retours et échanges :</strong> Aucun retour ou échange n'est accepté pour des raisons de préférence personnelle (couleur, longueur, densité ou apparence). Toute réclamation doit être effectuée dans un délai maximum de 24 heures après réception, avec photos justificatives.</p>
                <p style={{ marginBottom: "12px" }}><strong style={{ color: "var(--tb-text)" }}>Utilisation et entretien :</strong> Toujours Belle décline toute responsabilité en cas de mauvaise utilisation, mauvais entretien, utilisation de produits inadaptés, coloration ou traitements chimiques non appropriés.</p>
                <p style={{ marginBottom: "12px" }}><strong style={{ color: "var(--tb-text)" }}>Acompte :</strong> L'acompte ou le premier versement est définitif et non remboursable, quelle qu'en soit la raison.</p>
                <p><strong style={{ color: "var(--tb-text)" }}>Acceptation :</strong> Toute validation de commande, paiement d'acompte ou signature électronique vaut acceptation pleine et entière des présentes conditions générales de vente.</p>
              </div>
            </div>

            <div className="px-6 py-4 flex justify-end" style={{ borderTop: "1px solid var(--glass-border)", flexShrink: 0 }}>
              <button
                onClick={() => setTermsOpen(false)}
                style={{
                  padding: "12px 28px", borderRadius: "100px",
                  backgroundColor: "var(--tb-text)", color: "var(--tb-bg)",
                  fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 500,
                  border: "none", cursor: "pointer",
                }}
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
