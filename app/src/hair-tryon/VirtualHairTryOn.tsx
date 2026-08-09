import { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { hairstyles, categories, type Hairstyle } from './hairstyles';
import { hairColors, getColorFilter, type HairColor } from './colorUtils';
import {
  Camera, Upload, Download, RotateCcw, Sparkles,
  Droplets, AlertCircle, ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router';

/* ─── HELPERS ─── */
function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const s = document.createElement('script');
    s.src = src; s.crossOrigin = 'anonymous';
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(s);
  });
}

/* ─── COMPONENT ─── */
export default function VirtualHairTryOn() {
  const { lang } = useLanguage();

  /* Refs */
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const hairImgRef = useRef<HTMLImageElement | null>(null);
  const uploadedImgRef = useRef<HTMLImageElement | null>(null);
  const rafRef = useRef<number>(0);
  const landmarksRef = useRef<any>(null);
  const faceMeshRef = useRef<any>(null);

  /* State */
  const [mode, setMode] = useState<'camera' | 'upload'>('camera');
  const [isStreaming, setIsStreaming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadStep, setLoadStep] = useState('');
  const [error, setError] = useState('');
  const [noFace, setNoFace] = useState(false);
  const [selectedHair, setSelectedHair] = useState<Hairstyle>(hairstyles[2]);
  const [selectedColor, setSelectedColor] = useState<HairColor>(hairColors[0]);
  const [activeCategory, setActiveCategory] = useState('long');
  const [hasUpload, setHasUpload] = useState(false);

  /* ─── Load hair image ─── */
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => { hairImgRef.current = img; };
    img.src = selectedHair.image;
  }, [selectedHair]);

  /* ─── Init MediaPipe FaceMesh ─── */
  const initFaceMesh = useCallback(async () => {
    if (faceMeshRef.current) return;
    setLoadStep(lang === 'fr' ? 'Chargement MediaPipe...' : 'جاري تحميل MediaPipe...');

    try {
      await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js');
      await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js');

      const fm = new (window as any).FaceMesh({
        locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
      });

      fm.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      fm.onResults((results: any) => {
        if (results.multiFaceLandmarks?.length > 0) {
          landmarksRef.current = results.multiFaceLandmarks[0];
          setNoFace(false);
        } else {
          landmarksRef.current = null;
          setNoFace(true);
        }
      });

      faceMeshRef.current = fm;
    } catch (e) {
      console.error('MediaPipe init failed:', e);
      throw e;
    }
  }, [lang]);

  /* ─── Render loop ─── */
  const renderLoop = useCallback(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;

    // Clear canvas (transparent — video/image shows through behind)
    ctx.clearRect(0, 0, cw, ch);

    // In upload mode, draw the image as background
    if (mode === 'upload' && uploadedImgRef.current) {
      const img = uploadedImgRef.current;
      const scale = Math.max(cw / img.width, ch / img.height);
      const dx = (cw - img.width * scale) / 2;
      const dy = (ch - img.height * scale) / 2;
      ctx.drawImage(img, dx, dy, img.width * scale, img.height * scale);
    }

    // Mirror canvas drawing in camera mode to match CSS-mirrored video
    ctx.save();
    if (mode === 'camera') {
      ctx.translate(cw, 0);
      ctx.scale(-1, 1);
    }

    // Draw hair overlay
    const lm = landmarksRef.current;
    if (lm && hairImgRef.current?.complete) {
      drawHair(ctx, lm, cw, ch);
    }

    ctx.restore();

    rafRef.current = requestAnimationFrame(renderLoop);
  }, [mode, isStreaming]);

  /* ─── Draw hair on canvas ─── */
  const drawHair = (ctx: CanvasRenderingContext2D, lm: any[], cw: number, ch: number) => {
    const hair = hairImgRef.current!;
    const forehead = lm[10];
    const leftT = lm[234];
    const rightT = lm[454];

    const cx = ((leftT.x + rightT.x) / 2) * cw;
    const hw = Math.abs(rightT.x - leftT.x) * cw;
    const scale = (hw * 2.5 * selectedHair.scale) / hair.width;
    const dw = hair.width * scale;
    const dh = hair.height * scale;
    const tilt = Math.atan2((rightT.y - leftT.y) * ch, (rightT.x - leftT.x) * cw);

    const drawX = cx - dw / 2;
    const drawY = forehead.y * ch - dh * 0.35 + selectedHair.offsetY * dh;

    ctx.save();
    ctx.translate(cx, forehead.y * ch);
    ctx.rotate(tilt * 0.3);
    ctx.translate(-cx, -forehead.y * ch);

    if (selectedColor.hex !== '#0a0a0a') {
      ctx.filter = getColorFilter(selectedColor.hex);
    }
    ctx.globalAlpha = 0.9;
    ctx.drawImage(hair, drawX, drawY, dw, dh);
    ctx.globalAlpha = 1;
    ctx.filter = 'none';
    ctx.restore();
  };

  /* ─── Start camera (raw getUserMedia, not MediaPipe Camera) ─── */
  const startCamera = useCallback(async () => {
    setLoading(true);
    setError('');
    setLoadStep(lang === 'fr' ? 'Accès à la caméra...' : 'الوصول إلى الكاميرا...');

    try {
      // Raw getUserMedia first
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' }
      });
      streamRef.current = stream;

      const video = videoRef.current;
      if (!video) throw new Error('No video element');

      video.srcObject = stream;
      await video.play();

      setIsStreaming(true);
      setMode('camera');

      // Start render loop immediately
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(renderLoop);

      // Then init FaceMesh in background
      setLoadStep(lang === 'fr' ? 'Chargement IA...' : 'جاري تحميل الذكاء الاصطناعي...');
      await initFaceMesh();

      // Start sending frames to FaceMesh
      const sendFrames = async () => {
        if (!faceMeshRef.current || !video || video.paused) return;
        try {
          await faceMeshRef.current.send({ image: video });
        } catch (e) { /* silent */ }
        setTimeout(sendFrames, 100); // ~10 FPS for detection is enough
      };
      sendFrames();

    } catch (e: any) {
      console.error('Camera error:', e);
      setError(
        e.name === 'NotAllowedError'
          ? (lang === 'fr' ? 'Accès caméra refusé. Autorisez la caméra dans votre navigateur.' : 'تم رفض الوصول إلى الكاميرا.')
          : (lang === 'fr' ? 'Impossible d\'accéder à la caméra.' : 'تعذر الوصول إلى الكاميرا.')
      );
    } finally {
      setLoading(false);
      setLoadStep('');
    }
  }, [lang, initFaceMesh, renderLoop]);

  /* ─── Stop camera ─── */
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setIsStreaming(false);
    landmarksRef.current = null;
  }, []);

  /* ─── Start render loop when mode changes ─── */
  useEffect(() => {
    if (mode === 'upload' && hasUpload) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(renderLoop);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mode, hasUpload, renderLoop]);

  /* ─── Photo Upload ─── */
  const handleUpload = useCallback(async (file: File) => {
    setLoading(true);
    setError('');

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;

      const img = new Image();
      img.onload = async () => {
        uploadedImgRef.current = img;
        setHasUpload(true);
        setMode('upload');
        stopCamera();

        // Detect face on uploaded image
        try {
          await initFaceMesh();
          if (faceMeshRef.current) {
            await faceMeshRef.current.send({ image: img });
          }
        } catch (e) { console.error('Face detection on upload:', e); }

        setLoading(false);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }, [initFaceMesh, stopCamera]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith('image/')) handleUpload(file);
  }, [handleUpload]);

  /* ─── Download ─── */
  const download = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `toujours-belle-tryon-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, []);

  /* ─── Reset ─── */
  const resetAll = useCallback(() => {
    stopCamera();
    setHasUpload(false);
    uploadedImgRef.current = null;
    landmarksRef.current = null;
    setMode('camera');
    setError('');
    setNoFace(false);
  }, [stopCamera]);

  /* Cleanup */
  useEffect(() => {
    return () => { stopCamera(); };
  }, [stopCamera]);

  const filtered = hairstyles.filter(h => h.category === activeCategory);

  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: '#0f0f0f', color: '#faf6f4' }}>
      {/* Back to Home */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 m-4 text-sm transition-colors hover:text-[#d4a5a5]"
        style={{ color: '#8a8a8a' }}
      >
        <ArrowLeft size={18} />
        {lang === 'fr' ? "Retour à l'accueil" : 'العودة إلى الرئيسية'}
      </button>
      {/* Header */}
      <div className="text-center px-4" style={{ padding: '10px 0 25px' }}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles size={18} color="#d4a5a5" />
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#d4a5a5' }}>
            {lang === 'fr' ? 'ESSAYAGE VIRTUEL IA OFFERT' : 'تجربة افتراضية بالذكاء الاصطناعي'}
          </p>
        </div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 400, fontSize: 'clamp(1.8rem,4vw,2.8rem)', lineHeight: 1.15, marginBottom: '8px' }}>
          {lang === 'fr' ? 'Essayage Virtuel de Cheveux' : 'تجربة الشعر الافتراضية'}
        </h1>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '14px', color: '#8a8a8a', maxWidth: '500px', margin: '0 auto' }}>
          {lang === 'fr' ? 'Essayez différentes coupes et couleurs en temps réel.' : 'جربي مختلف القصات والألوان في الوقت الفعلي.'}
        </p>
      </div>

      {/* Main */}
      <div className="max-w-[1200px] mx-auto px-4 flex flex-col lg:flex-row gap-5" style={{ paddingBottom: '50px' }}>

        {/* LEFT — Preview */}
        <div className="w-full lg:w-[55%] flex flex-col gap-3">
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{ backgroundColor: '#1a1a1a', boxShadow: '0 8px 40px rgba(0,0,0,0.4)', aspectRatio: '4/3' }}
            onDragOver={e => e.preventDefault()}
            onDrop={onDrop}
          >
            {/* Video: visible with mirror effect so user sees their face */}
            <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" style={{ transform: 'scaleX(-1)' }} playsInline muted autoPlay />

            {/* Canvas: hair overlay drawn on top (transparent where no hair) */}
            <canvas ref={canvasRef} width={640} height={480} className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 2 }} />

            {/* Loading */}
            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ backgroundColor: 'rgba(15,15,15,0.88)' }}>
                <div className="w-10 h-10 rounded-full border-[3px] border-t-transparent animate-spin mb-3" style={{ borderColor: '#d4a5a5', borderTopColor: 'transparent' }} />
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '13px', color: '#8a8a8a' }}>{loadStep}</p>
              </div>
            )}

            {/* No face */}
            {noFace && (isStreaming || hasUpload) && !loading && (
              <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(26,26,26,0.92)', border: '1px solid #3a3a3a' }}>
                <AlertCircle size={14} color="#d4a5a5" />
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '11px', color: '#faf6f4' }}>
                  {lang === 'fr' ? 'Aucun visage — centrez votre visage' : 'لا يوجد وجه في المنتصف'}
                </span>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6" style={{ backgroundColor: 'rgba(15,15,15,0.92)' }}>
                <AlertCircle size={28} color="#c41e3a" className="mb-2" />
                <p className="text-center mb-4" style={{ fontFamily: "'Inter',sans-serif", fontSize: '14px', color: '#faf6f4' }}>{error}</p>
                <button
                  onClick={() => { setError(''); setMode('upload'); fileInputRef.current?.click(); }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full"
                  style={{ backgroundColor: '#d4a5a5', color: '#1a1a1a', fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: '13px', border: 'none', cursor: 'pointer' }}
                >
                  <Upload size={15} />
                  {lang === 'fr' ? 'Utiliser une Photo' : 'استخدمي صورة'}
                </button>
              </div>
            )}

            {/* Placeholder */}
            {!isStreaming && !hasUpload && !loading && !error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <Camera size={36} color="#3a3a3a" />
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '13px', color: '#6b6b6b' }}>
                  {lang === 'fr' ? 'Activez la caméra ou uploadez une photo' : 'شغّلي الكاميرا أو ارفعي صورة'}
                </p>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={isStreaming ? stopCamera : startCamera}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full"
              style={{ backgroundColor: isStreaming ? '#c41e3a' : '#d4a5a5', color: '#1a1a1a', fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: '12px', border: 'none', cursor: 'pointer' }}
            >
              <Camera size={14} />
              {isStreaming ? (lang === 'fr' ? 'Arrêter' : 'إيقاف') : (lang === 'fr' ? 'Démarrer Caméra' : 'تشغيل الكاميرا')}
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full"
              style={{ backgroundColor: '#1a1a1a', color: '#faf6f4', fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: '12px', border: '1px solid #3a3a3a', cursor: 'pointer' }}
            >
              <Upload size={14} />
              {lang === 'fr' ? 'Upload Photo' : 'رفع صورة'}
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleUpload(f); }} />

            {(isStreaming || hasUpload) && (
              <button onClick={download} className="flex items-center gap-2 px-4 py-2.5 rounded-full" style={{ backgroundColor: '#1a1a1a', color: '#faf6f4', fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: '12px', border: '1px solid #3a3a3a', cursor: 'pointer' }}>
                <Download size={14} />
                {lang === 'fr' ? 'Télécharger' : 'تحميل'}
              </button>
            )}

            <button onClick={resetAll} className="flex items-center gap-2 px-4 py-2.5 rounded-full" style={{ backgroundColor: 'transparent', color: '#6b6b6b', fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: '12px', border: '1px solid #2a2a2a', cursor: 'pointer' }}>
              <RotateCcw size={13} />
              {lang === 'fr' ? 'Réinitialiser' : 'إعادة'}
            </button>
          </div>
        </div>

        {/* RIGHT — Catalog */}
        <div className="w-full lg:w-[45%] flex flex-col gap-4">
          {/* Category tabs */}
          <div>
            <p className="mb-2" style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6b6b' }}>
              {lang === 'fr' ? 'COUPES' : 'القصات'}
            </p>
            <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
              {categories.map(cat => (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                  className="px-3 py-1.5 rounded-full whitespace-nowrap"
                  style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: '12px', backgroundColor: activeCategory === cat.id ? '#d4a5a5' : '#1a1a1a', color: activeCategory === cat.id ? '#1a1a1a' : '#8a8a8a', border: 'none', cursor: 'pointer' }}>
                  {lang === 'fr' ? cat.labelFr : cat.labelAr}
                </button>
              ))}
            </div>
          </div>

          {/* Hairstyle grid */}
          <div className="grid grid-cols-3 gap-2">
            {filtered.map(hs => (
              <button key={hs.id} onClick={() => setSelectedHair(hs)}
                className="relative rounded-xl overflow-hidden"
                style={{ aspectRatio: '3/4', border: selectedHair.id === hs.id ? '2px solid #d4a5a5' : '2px solid transparent', padding: 0, background: '#1a1a1a', cursor: 'pointer' }}>
                <img src={hs.image} alt="" className="w-full h-full object-cover"
                  style={{ filter: selectedColor.hex !== '#0a0a0a' ? getColorFilter(selectedColor.hex) : 'none' }} loading="lazy" />
                <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5" style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.7),transparent)' }}>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: '10px', color: '#faf6f4', textAlign: 'center' }}>
                    {lang === 'fr' ? hs.nameFr : hs.nameAr}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Color picker */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Droplets size={13} color="#d4a5a5" />
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6b6b' }}>
                {lang === 'fr' ? 'COULEUR' : 'اللون'}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {hairColors.map(c => (
                <button key={c.hex} onClick={() => setSelectedColor(c)} className="flex flex-col items-center gap-1" style={{ background: 'none', border: 'none', cursor: 'pointer', transform: selectedColor.hex === c.hex ? 'scale(1.12)' : 'scale(1)' }} title={lang === 'fr' ? c.nameFr : c.nameAr}>
                  <div className="rounded-full" style={{ width: '32px', height: '32px', backgroundColor: c.hex, boxShadow: selectedColor.hex === c.hex ? '0 0 0 3px #d4a5a5,0 0 0 5px #0f0f0f' : '0 2px 6px rgba(0,0,0,0.3)' }} />
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '8px', color: selectedColor.hex === c.hex ? '#faf6f4' : '#6b6b6b' }}>{lang === 'fr' ? c.nameFr : c.nameAr}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active selection */}
          <div className="rounded-xl p-3 flex items-center gap-3" style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }}>
            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
              <img src={selectedHair.image} alt="" className="w-full h-full object-cover" style={{ filter: selectedColor.hex !== '#0a0a0a' ? getColorFilter(selectedColor.hex) : 'none' }} />
            </div>
            <div>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: '13px', color: '#faf6f4' }}>{lang === 'fr' ? selectedHair.nameFr : selectedHair.nameAr}</p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '11px', color: '#8a8a8a' }}>{lang === 'fr' ? selectedColor.nameFr : selectedColor.nameAr}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
