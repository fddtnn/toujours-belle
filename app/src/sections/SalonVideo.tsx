import { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

/* Portrait salon film.

   Deliberately costs nothing on first paint: the <video> carries
   preload="none" and only a 35KB poster is fetched, so the 1MB file is not
   touched until the visitor presses play. It also pauses itself when scrolled
   out of view rather than running in a hidden tab. */
export default function SalonVideo() {
  const { t, isRTL } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [started, setStarted] = useState(false);

  const toggle = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      setStarted(true);
      v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      v.pause();
      setPlaying(false);
    }
  }, []);

  const toggleSound = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  /* Stop playback once the frame is mostly out of view - no point decoding
     frames nobody is looking at.

     Keyed off intersectionRatio rather than isIntersecting: the latter stays
     true while even one pixel overlaps, so the video kept playing all the way
     off the screen. Also pauses when the tab itself is hidden. */
  useEffect(() => {
    const frame = frameRef.current;
    const pause = () => {
      const v = videoRef.current;
      if (v && !v.paused) { v.pause(); setPlaying(false); }
    };

    let io: IntersectionObserver | undefined;
    if (frame && typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        ([entry]) => { if (entry.intersectionRatio < 0.25) pause(); },
        { threshold: [0, 0.25, 0.5] }
      );
      io.observe(frame);
    }

    const onHide = () => { if (document.hidden) pause(); };
    document.addEventListener('visibilitychange', onHide);
    return () => {
      io?.disconnect();
      document.removeEventListener('visibilitychange', onHide);
    };
  }, []);

  return (
    <section
      id="salon-video"
      className="relative w-full"
      style={{ backgroundColor: 'var(--tb-bg)', padding: 'clamp(56px, 8vw, 104px) 0' }}
    >
      <div
        className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center"
        style={{ gap: 'clamp(32px, 5vw, 72px)', flexDirection: isRTL ? 'row-reverse' : undefined }}
      >
        {/* Copy */}
        <div className="flex-1 w-full" style={{ textAlign: isRTL ? 'right' : 'left' }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '11px',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'var(--tb-accent-text)', marginBottom: '14px',
            }}
          >
            {t({ fr: 'DANS NOTRE SALON', ar: 'داخل صالوننا' })}
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif", fontWeight: 400,
              fontSize: 'clamp(1.9rem, 3.6vw, 2.9rem)', lineHeight: 1.15,
              color: 'var(--tb-text)', marginBottom: '18px',
            }}
          >
            {t({ fr: 'Chaque pièce, posée à la main', ar: 'كل قطعة، تُركَّب يدوياً' })}
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif", fontSize: '16px', lineHeight: 1.7,
              color: 'var(--tb-text-secondary)', maxWidth: '46ch',
              marginInline: isRTL ? '0 0' : '0 0',
            }}
          >
            {t({
              fr: "De la sélection de la mèche au dernier ajustement, tout se fait ici. Regardez la pose, puis choisissez la vôtre.",
              ar: 'من اختيار الخصلة إلى آخر لمسة، كل شي يصير هنا. شوفي التركيب، وبعدها اختاري قطعتك.',
            })}
          </p>

          <a
            href="#product"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#product')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-block transition-colors duration-300"
            style={{
              marginTop: '30px', backgroundColor: 'var(--tb-text)', color: 'var(--tb-bg)',
              borderRadius: '100px', padding: '14px 34px',
              fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '13px',
              letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#d4a5a5'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--tb-text)'; }}
          >
            {t({ fr: 'Voir la collection', ar: 'شوفي المجموعة' })}
          </a>
        </div>

        {/* Player */}
        <div
          ref={frameRef}
          className="relative shrink-0 w-full"
          style={{ maxWidth: '340px', aspectRatio: '9 / 16' }}
        >
          <button
            type="button"
            onClick={toggle}
            aria-label={playing
              ? t({ fr: 'Mettre la vidéo en pause', ar: 'إيقاف الفيديو مؤقتاً' })
              : t({ fr: 'Lire la vidéo du salon', ar: 'تشغيل فيديو الصالون' })}
            className="group absolute inset-0 w-full h-full overflow-hidden cursor-pointer"
            style={{
              borderRadius: '22px', border: '1px solid var(--tb-border)',
              backgroundColor: 'var(--tb-surface)', padding: 0,
              boxShadow: '0 18px 50px rgba(0,0,0,0.12)',
            }}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              poster="/images/salon-video-poster.jpg"
              preload="none"
              playsInline
              muted
              loop
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            >
              <source src="/videos/salon.mp4" type="video/mp4" />
            </video>

            {/* Readability scrim, only while idle */}
            <span
              aria-hidden="true"
              className="absolute inset-0 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.05) 45%, transparent 100%)',
                opacity: playing ? 0 : 1,
              }}
            />

            {/* Play / pause */}
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 flex items-center justify-center transition-all duration-300"
              style={{
                width: '62px', height: '62px', borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgba(255,255,255,0.92)',
                boxShadow: '0 6px 22px rgba(0,0,0,0.18)',
                opacity: playing ? 0 : 1,
              }}
            >
              <Play size={22} fill="#1a1a1a" color="#1a1a1a" style={{ marginLeft: '3px' }} />
            </span>

            {/* Pause affordance on hover once running */}
            {playing && (
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{
                  width: '54px', height: '54px', borderRadius: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: 'rgba(255,255,255,0.88)',
                }}
              >
                <Pause size={20} fill="#1a1a1a" color="#1a1a1a" />
              </span>
            )}
          </button>

          {/* Sound, only meaningful once playback has begun */}
          {started && (
            <button
              type="button"
              onClick={toggleSound}
              aria-label={muted
                ? t({ fr: 'Activer le son', ar: 'تشغيل الصوت' })
                : t({ fr: 'Couper le son', ar: 'كتم الصوت' })}
              className="absolute flex items-center justify-center cursor-pointer transition-colors duration-200"
              style={{
                bottom: '14px', [isRTL ? 'left' : 'right']: '14px',
                width: '40px', height: '40px', borderRadius: '50%',
                backgroundColor: 'rgba(0,0,0,0.5)', border: 'none', zIndex: 2,
              }}
            >
              {muted ? <VolumeX size={17} color="#fff" /> : <Volume2 size={17} color="#fff" />}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
