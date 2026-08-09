import { useEffect, useState, useCallback, useRef } from 'react';
import { Routes, Route } from 'react-router';
import './App.css';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';

import AnnouncementBar from './components/AnnouncementBar';
import TrustBar from './components/TrustBar';
import Navigation from './components/Navigation';
import CartDrawer from './components/CartDrawer';
import WhatsAppButton from './components/WhatsAppButton';
import BackToTop from './components/BackToTop';
import Hero from './sections/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import HairTypes from './sections/HairTypes';
import PromoBanner from './components/PromoBanner';
import ColorSelection from './sections/ColorSelection';
import About from './sections/About';
import ProductSection from './sections/ProductSection';
import TrustStrip from './components/TrustStrip';
import Testimonials from './sections/Testimonials';
import Haircare from './sections/Haircare';
import Footer from './sections/Footer';
import FAQ from './pages/FAQ';
import Conditions from './pages/Conditions';
import Login from "./pages/Login"
import LoginModal from './components/LoginModal';
import NotFound from "./pages/NotFound"
import VirtualHairTryOn from './hair-tryon/VirtualHairTryOn';
import Rewards from './pages/Rewards';
import Wedding from './pages/Wedding';
import Privacy from './pages/Privacy';
import EGiftCards from './pages/EGiftCards';
import Perruques from './pages/Perruques';
import PerruquesMiLong from './pages/PerruquesMiLong';
import PerruquesLong from './pages/PerruquesLong';

gsap.registerPlugin(ScrollTrigger);

interface CartItem {
  type: string;
  color: string;
  length: string;
  quantity: number;
  price: number;
}

function HomePage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [productType, setProductType] = useState<string | undefined>(undefined);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
    return () => { lenis.destroy(); lenisRef.current = null; };
  }, []);

  const handleAddToCart = useCallback((item: CartItem) => { setCartItems((prev) => [...prev, item]); }, []);
  const handleRemoveFromCart = useCallback((index: number) => { setCartItems((prev) => prev.filter((_, i) => i !== index)); }, []);
  const handleSelectType = useCallback((type: string) => { setProductType(type); setTimeout(() => { document.querySelector('#product')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }, []);
  const cartCount = cartItems.length;

  return (
    <>
      <AnnouncementBar />
      <TrustBar />
      <div style={{ height: '76px' }} />
      <Navigation cartCount={cartCount} onCartClick={() => setCartOpen(true)} onLoginClick={() => setLoginOpen(true)} />

      <main>
        <Hero />
        <FeaturedProducts />
        <HairTypes onSelectType={handleSelectType} />
        <PromoBanner />
        <ColorSelection />
        <TrustStrip />
        <About />
        <ProductSection onAddToCart={handleAddToCart} initialType={productType} />
        <Testimonials />
        <Haircare />
        <Footer />
      </main>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} items={cartItems} onRemove={handleRemoveFromCart} onLoginClick={() => setLoginOpen(true)} />
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
      <BackToTop />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/conditions" element={<Conditions />} />
        <Route path="/try-on" element={<VirtualHairTryOn />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/wedding" element={<Wedding />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/e-gift-cards" element={<EGiftCards />} />
        <Route path="/perruques" element={<Perruques />} />
        <Route path="/perruques-mi-long" element={<PerruquesMiLong />} />
        <Route path="/perruques-long" element={<PerruquesLong />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <WhatsAppButton />
    </LanguageProvider>
    </ThemeProvider>
  );
}
