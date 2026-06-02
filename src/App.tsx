import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Star,
  Globe,
  GraduationCap,
  RefreshCcw,
  Instagram,
  Clock,
  FileText,
  Hand,
  Check,
  AlertTriangle,
  Shield,
  MessageCircle,
  ArrowRight,
  Award
} from 'lucide-react';
import GoogleReviews from './components/GoogleReviews';
import BookingModal, { ServiceType } from './components/BookingModal';
import PricingCard from './components/PricingCard';
import PolicyModal, { PolicyType } from './components/PolicyModal';



// Animation variants
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

// Counter component
function Counter({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// Navigation
function Navbar({ onBookClick }: { onBookClick: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Trikal Darshan', href: '#services' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: easeOutExpo }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#1A0A0A]/95 backdrop-blur-xl border-b border-[#C9A84C]/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 sm:gap-3">
              <span className="text-xl sm:text-2xl lg:text-3xl text-[#C9A84C]">ॐ</span>
              <span className="font-heading font-semibold text-sm sm:text-lg lg:text-xl text-[#F5EBD8] tracking-[0.08em] sm:tracking-[0.1em]">SAATVIK JYOTISH</span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[#A89272] hover:text-[#F5EBD8] transition-colors text-sm font-body tracking-wide"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-luxury-book"
              >
                <span>Book Appointment</span>
                <div className="particles">
                  <div className="particle"></div>
                  <div className="particle"></div>
                  <div className="particle"></div>
                  <div className="particle"></div>
                  <div className="particle"></div>
                </div>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-1.5 sm:p-2 text-[#F5EBD8]"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#1A0A0E]/98 backdrop-blur-xl"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex items-center justify-between">
                <a href="#" className="flex items-center gap-3">
                  <span className="text-2xl text-[#C9A84C]">ॐ</span>
                  <span className="font-heading font-semibold text-lg text-[#F5EBD8] tracking-[0.1em]">SAATVIK JYOTISH</span>
                </a>
                <button onClick={() => setIsOpen(false)} className="p-2 text-[#F5EBD8]">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 flex flex-col justify-center gap-8">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="font-heading text-2xl font-medium text-[#F5EBD8] hover:text-[#C9A84C] transition-colors tracking-wider"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onBookClick();
                }}
                className="btn-luxury-book w-full"
              >
                <span>Book Appointment</span>
                <div className="particles">
                  <div className="particle"></div>
                  <div className="particle"></div>
                  <div className="particle"></div>
                  <div className="particle"></div>
                  <div className="particle"></div>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Hero Section
function Hero({ onBookClick }: { onBookClick: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative min-h-screen flex items-center pt-20 lg:pt-0 overflow-hidden">
      {/* Hero Background Image - z-0 (bottom layer) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: 'url(/hero-bg.jpg)' }}
      />
      {/* Gradient overlays - z-10 (middle layer) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A0A0A]/95 via-[#1A0A0A]/80 to-[#1A0A0A]/60 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A0A] via-transparent to-[#1A0A0A]/30 z-10" />
      {/* Content - z-20 (top layer) */}
      <div className="relative z-20 max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-8 items-center">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="order-2 lg:order-1 pt-8 lg:pt-0"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10 mb-4 sm:mb-6">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#C9A84C] animate-pulse" />
              <span className="text-[10px] sm:text-xs font-body text-[#C9A84C] uppercase tracking-[0.15em] sm:tracking-[0.2em]">Nadi Astrologer Manthan Anejaa</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="font-heading text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-semibold leading-[1.1] mb-4 sm:mb-6 tracking-wide">
              <span className="text-[#F5EBD8] block">Three Sciences.</span>
              <span className="gold-gradient block">One Truth.</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-[#A89272] text-lg sm:text-xl lg:text-2xl mb-2 font-body italic">
              Nadi × Numerology × Palmistry
            </motion.p>

            <motion.p variants={fadeInUp} className="text-[#A89272]/80 text-sm sm:text-base lg:text-lg max-w-xl mb-6 sm:mb-8 font-body leading-relaxed">
              Manthan K Anejaa offers authentic Nadi Astrology consultations with no remedies, 
              no fear tactics, and no gemstones. Experience Saatvik Jyotish - precise analytical 
              readings cross-verified through three ancient sciences. When all three agree, 
              it's not prediction—it's certainty.
            </motion.p>

            {/* Trust Pills */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
              <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#2D1810] border border-[#C9A84C]/20">
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C9A84C] fill-[#C9A84C]" />
                <span className="text-xs sm:text-sm font-body text-[#F5EBD8]">170+ Reviews</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40">
                <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C9A84C]" />
                <span className="text-xs sm:text-sm font-body text-[#F5EBD8] font-semibold">Trikal Darshan Foreign Client 🇨🇦 🇬🇧 🇦🇺</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#2D1810] border border-[#C9A84C]/20">
                <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C9A84C]" />
                <span className="text-xs sm:text-sm font-body text-[#F5EBD8]">Student of Umang Taneja</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#2D1810] border border-[#C9A84C]/20">
                <RefreshCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C9A84C]" />
                <span className="text-xs sm:text-sm font-body text-[#F5EBD8]">Refund Guarantee</span>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeInUp}>
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-luxury-book"
              >
                <span>Book Appointment</span>
                <ArrowRight className="w-4 h-4" />
                <div className="particles">
                  <div className="particle"></div>
                  <div className="particle"></div>
                  <div className="particle"></div>
                  <div className="particle"></div>
                  <div className="particle"></div>
                </div>
              </button>
            </motion.div>
          </motion.div>

          {/* Right Content - Triangle Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: easeOutExpo }}
            className="order-1 lg:order-2 relative flex justify-center py-4 sm:py-0"
          >
            <div className="triangle-frame">
              {/* Triangle SVG - Enlarged for better composition */}
              <svg className="triangle-svg" viewBox="0 0 420 400">
                <polygon 
                  points="210,25 35,360 385,360" 
                  className="triangle-line"
                />
              </svg>

              {/* Center DP - Photo - ENLARGED & PERFECTLY CENTERED */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[35%] w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-[4px] border-[#C9A84C] z-20 shadow-[0_0_50px_rgba(201,168,76,0.25),0_0_100px_rgba(201,168,76,0.1),inset_0_0_30px_rgba(0,0,0,0.3)] transition-all duration-500 hover:scale-105 hover:shadow-[0_0_60px_rgba(201,168,76,0.35)]">
                <img 
                  src="/dp.jpg" 
                  alt="Manthan K Anejaa"
                  className="w-full h-full object-cover [image-rendering:-webkit-optimize-contrast]"
                />
              </div>

              {/* Top Vertex - Astrology */}
              <div className="luxury-vertex" style={{ top: '12px', left: '50%', transform: 'translateX(-50%)' }}>
                <div className="vertex-box">
                  <span className="vertex-text">Astrology</span>
                </div>
                <div className="vertex-glow" />
              </div>

              {/* Bottom Left Vertex - Numerology */}
              <div className="luxury-vertex" style={{ bottom: '12px', left: '12px' }}>
                <div className="vertex-box">
                  <span className="vertex-text">Numerology</span>
                </div>
                <div className="vertex-glow" />
              </div>

              {/* Bottom Right Vertex - Palmistry */}
              <div className="luxury-vertex" style={{ bottom: '12px', right: '12px' }}>
                <div className="vertex-box">
                  <span className="vertex-text">Palmistry</span>
                </div>
                <div className="vertex-glow" />
              </div>

              {/* Stats Badge - Floating Right - CLOSER TO TRIANGLE */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 }}
                className="absolute top-1/2 right-4 sm:right-8 -translate-y-1/2 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg bg-[#2D1810]/95 border border-[#C9A84C]/40 backdrop-blur-md shadow-xl z-30"
              >
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C9A84C] fill-[#C9A84C]" />
                  <span className="font-heading font-semibold text-sm sm:text-base text-[#F5EBD8]">5.0</span>
                </div>
              </motion.div>

              {/* Followers Badge - Floating Left - CLOSER TO TRIANGLE */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 }}
                className="absolute top-1/2 left-4 sm:left-8 -translate-y-1/2 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg bg-[#2D1810]/95 border border-[#C9A84C]/30 backdrop-blur-md shadow-xl z-30"
              >
                <div className="text-center">
                  <span className="font-heading font-semibold text-sm sm:text-base text-[#F5EBD8]">26K+</span>
                  <p className="text-[7px] sm:text-[8px] text-[#A89272] uppercase tracking-[0.15em] mt-0.5">Followers</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Services Section
function Services({ onBookClick }: { onBookClick: (service: ServiceType) => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      name: 'Divya Prashna',
      price: '₹1,100',
      duration: '15 minutes',
      questions: '1 specific question',
      features: ['Single focused query', 'Nadi-based answer', 'Quick clarity'],
      popular: false,
      serviceType: 'divya-prashna' as ServiceType
    },
    {
      name: 'Trikal Darshan Foreign Client 🇨🇦 🇬🇧 🇦🇺',
      price: '₹5,100',
      duration: '30 minutes',
      questions: 'Complete life overview',
      features: ['Past verification', 'Present analysis', 'Future roadmap', 'Trikal Darshan cross-check'],
      popular: true,
      serviceType: 'trikal-foreign' as ServiceType
    },
    {
      name: 'Trikal Darshan 🇮🇳',
      price: '₹4,100',
      duration: '30 minutes',
      questions: 'Complete life overview',
      features: ['Past verification', 'Present analysis', 'Future roadmap', 'Trikal Darshan cross-check'],
      popular: false,
      serviceType: 'trikal-indian' as ServiceType
    }
  ];

  return (
    <section id="services" ref={ref} className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.p variants={fadeInUp} className="text-[#C9A84C] text-sm font-body uppercase tracking-[0.2em] mb-4">
            Consultations
          </motion.p>
          <motion.h2 variants={fadeInUp} className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#F5EBD8] mb-4 tracking-wide">
            Choose Your <span className="gold-gradient">Reading</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-[#A89272] text-lg max-w-2xl mx-auto font-body italic">
            All sessions include the Trikal Darshan analysis. No hidden costs. No upselling.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-start"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              variants={fadeInUp}
              className={service.popular ? 'md:-mt-4' : ''}
            >
              <PricingCard
                name={service.name}
                price={service.price}
                duration={service.duration}
                questions={service.questions}
                features={service.features}
                popular={service.popular}
                onBookClick={() => onBookClick(service.serviceType)}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

// About Section
function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-12 sm:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: easeOutExpo }}
          >
            <div className="relative">
              <div className="aspect-[4/5] rounded-lg overflow-hidden border border-[#C9A84C]/20 shadow-2xl shadow-black/30">
                <img 
                  src="/manthan-about.jpg" 
                  alt="Manthan K Anejaa"
                  className="w-full h-full object-cover [image-rendering:-webkit-optimize-contrast]"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-[#1A0A0A] via-[#1A0A0A]/80 to-transparent">
                  <p className="font-heading text-xl sm:text-2xl font-semibold text-[#F5EBD8] tracking-wide">Manthan K Anejaa</p>
                  <p className="text-[#C9A84C] font-body italic text-sm sm:text-base">Trikal Darshan Astrologer</p>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-3 sm:-bottom-4 -right-3 sm:-right-4 w-24 sm:w-32 h-24 sm:h-32 border border-[#C9A84C]/20 rounded-lg -z-10" />
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.p variants={fadeInUp} className="text-[#C9A84C] text-xs sm:text-sm font-body uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-3 sm:mb-4">
              About
            </motion.p>
            <motion.h2 variants={fadeInUp} className="font-heading text-xl sm:text-2xl lg:text-4xl font-semibold text-[#F5EBD8] mb-4 sm:mb-6 tracking-wide">
              Clarity Over Belief
            </motion.h2>
            <motion.div variants={fadeInUp} className="space-y-3 sm:space-y-4 text-[#A89272] mb-6 sm:mb-8 font-body text-base sm:text-lg leading-relaxed">
              <p>
                Manthan Anejaa, also known as Manthan K Anejaa, is trained under <span className="text-[#F5EBD8] font-medium">Umang Taneja</span>, 
                India's foremost authority on Nadi Astrology and the pioneer of Saatvik Jyotish.
              </p>
              <p>
                My approach strips away the theatricality that plagues modern astrology. No fear-mongering. 
                No selling hope through gemstones. Just systematic analysis using three validated sciences.
              </p>
              <p>
                Every reading is a forensic investigation into your life's blueprint—verifiable, 
                logical, and refreshingly honest.
              </p>
            </motion.div>

            {/* USP Box */}
            <motion.div variants={fadeInUp} className="p-6 rounded-lg bg-[#2D1810] border border-[#C9A84C]/20 mb-8">
              <p className="font-heading text-sm font-semibold text-[#A89272] uppercase tracking-[0.15em] mb-4">
                The Manthan Difference
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['No remedies', 'No gemstones', 'No fear tactics', 'Only truth'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#22C55E]" />
                    <span className="text-[#F5EBD8] text-sm font-body">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-8">
              <div>
                <p className="font-heading text-3xl font-semibold text-[#C9A84C]">
                  <Counter end={170} suffix="+" />
                </p>
                <p className="text-sm text-[#A89272] font-body">Verified Reviews</p>
              </div>
              <div>
                <p className="font-heading text-3xl font-semibold text-[#C9A84C]">
                  <Counter end={26} suffix="K+" />
                </p>
                <p className="text-sm text-[#A89272] font-body">Instagram Audience</p>
              </div>
              <div>
                <p className="font-heading text-3xl font-semibold text-[#C9A84C]">Global</p>
                <p className="text-sm text-[#A89272] font-body">Client Base</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Guru Section
function Guru() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="vedic-card overflow-hidden"
        >
          <div className="grid lg:grid-cols-2">
            <div className="p-8 lg:p-12">
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A84C]/10 mb-6">
                <Award className="w-4 h-4 text-[#C9A84C]" />
                <span className="text-xs font-body text-[#C9A84C] uppercase tracking-[0.15em]">Mentor & Guide</span>
              </motion.div>
              <motion.h3 variants={fadeInUp} className="font-heading text-2xl lg:text-3xl font-semibold text-[#F5EBD8] mb-4 tracking-wide">
                Umang Taneja
              </motion.h3>
              <motion.p variants={fadeInUp} className="font-body italic text-[#C9A84C] text-lg mb-6">
                The authority who exposed astrology scams across India
              </motion.p>
              <motion.div variants={fadeInUp} className="space-y-4 text-[#A89272] font-body">
                <p>
                  Under his mentorship, I learned to separate genuine astrological science 
                  from commercial exploitation. His relentless campaign against fraudulent 
                  practices shaped my commitment to analytical integrity.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Pioneer of scientific Nadi methodology</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Exposed 1000+ fake astrologers</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Author of 10+ research books</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">30+ years of verified accuracy</span>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="relative min-h-[300px] lg:min-h-0 overflow-hidden">
              <img 
                src="/umang-taneja.jpg" 
                alt="Umang Taneja"
                className="absolute inset-0 w-full h-full object-cover [image-rendering:-webkit-optimize-contrast]"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#2D1810]/50" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Reviews Section - Elfsight Google Reviews Widget
function Reviews() {
  useEffect(() => {
    // Load Elfsight script
    const script = document.createElement('script');
    script.src = 'https://elfsightcdn.com/platform.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="reviews" className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#C9A84C] text-sm font-body uppercase tracking-[0.2em] mb-4">Testimonials</p>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#F5EBD8] mb-4 tracking-wide">
            Verified <span className="gold-gradient">Accuracy</span>
          </h2>
        </div>
        {/* Elfsight Google Reviews Widget */}
        <div className="elfsight-app-1b2fa237-19e0-4e69-8f80-4fab810beea0" data-elfsight-app-lazy></div>
      </div>
    </section>
  );
}

// Fraud Alert Section
function FraudAlert() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scams = [
    { icon: AlertTriangle, title: 'Fake Dosha Creation', desc: 'Inventing problems that don\'t exist to sell expensive pujas' },
    { icon: AlertTriangle, title: 'Gemstone Peddling', desc: 'Selling worthless stones as "remedies" with huge markups' },
    { icon: AlertTriangle, title: 'Fear Tactics', desc: 'Creating anxiety about fake curses or bad omens' },
    { icon: AlertTriangle, title: 'Generic Predictions', desc: 'Vague statements that apply to anyone (Barnum effect)' },
    { icon: AlertTriangle, title: 'Destiny Change Claims', desc: 'Promising to alter your fate through expensive rituals' }
  ];

  return (
    <section ref={ref} className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B1A1A]/20 border border-[#8B1A1A]/30 mb-6">
              <AlertTriangle className="w-4 h-4 text-[#8B1A1A]" />
              <span className="text-sm font-body text-[#8B1A1A] uppercase tracking-[0.15em]">Consumer Alert</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#F5EBD8] mb-4 tracking-wide">
              Industry Scams to <span className="text-[#8B1A1A]">Avoid</span>
            </h2>
            <p className="text-[#A89272] text-lg max-w-2xl mx-auto font-body italic">
              The astrological industry is plagued by exploitation. Know the red flags.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {scams.map((scam, index) => (
              <div key={index} className="red-card p-5">
                <div className="flex items-start gap-3">
                  <scam.icon className="w-5 h-5 text-[#8B1A1A] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading font-semibold text-[#F5EBD8] text-sm mb-1 tracking-wide">{scam.title}</h4>
                    <p className="text-[#A89272] text-xs font-body">{scam.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center">
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-[#2D1810] border border-[#22C55E]/30">
              <Check className="w-6 h-6 text-[#22C55E]" />
              <span className="font-heading font-semibold text-lg text-[#F5EBD8] tracking-wide">
                Manthan does <span className="text-[#22C55E]">NONE</span> of this.
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Sticky Bottom Booking Button (mobile only, shows on scroll)
function StickyBookButton({ onClick }: { onClick: () => void }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 400px on mobile
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="sticky-book-btn"
    >
      <div className="sticky-book-btn-inner">
        <div className="sticky-book-text">
          <div className="sticky-book-label">
            <span className="sticky-book-pulse"></span>
            Filling Fast
          </div>
          <div className="sticky-book-title">Book Your Reading Now</div>
        </div>
        <button
          onClick={onClick}
          className="sticky-book-cta"
        >
          <span>Book Appointment</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

// WhatsApp Floating Button
function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/917206382574"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-50 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl shadow-[#25D366]/40 hover:scale-110 transition-transform overflow-hidden"
    >
      {/* WhatsApp Logo SVG */}
      <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-9 sm:h-9" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      {/* Pulse animation ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
    </a>
  );
}

// Instagram Widget Section
function InstagramWidget() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#C9A84C] text-sm font-body uppercase tracking-[0.2em] mb-4">Follow Us</p>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#F5EBD8] mb-4 tracking-wide">
            Instagram Feed
          </h2>
        </div>
        {/* Elfsight Instagram Feed */}
        <div className="elfsight-app-717e7843-1e05-4d4f-827c-06f899dcc1bf" data-elfsight-app-lazy></div>
      </div>
    </section>
  );
}

// Floating Book Appointment Button (desktop)
function FloatingBookButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="btn-luxury-book"
    >
      <span>Book Appointment</span>
      <ArrowRight className="w-4 h-4" />
      <div className="particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
    </button>
  );
}

// Footer
interface FooterProps {
  onOpenPolicy: (type: PolicyType) => void;
}

function Footer({ onOpenPolicy }: FooterProps) {
  return (
    <footer className="py-12 lg:py-16 border-t border-[#C9A84C]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl text-[#C9A84C]">ॐ</span>
              <span className="font-heading font-semibold text-xl text-[#F5EBD8] tracking-[0.1em]">SAATVIK JYOTISH</span>
            </div>
            <p className="text-[#A89272] text-sm mb-4 font-body">
              Nadi Astrologer Manthan K Anejaa - India's leading Trikal Darshan expert. Authentic Nadi Astrology, Numerology & Palmistry readings with 170+ verified reviews.
            </p>
            <div className="flex items-center gap-3 mb-4">
              <a
                href="https://instagram.com/manthan_speaks_"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#2D1810] border border-[#C9A84C]/20 flex items-center justify-center text-[#A89272] hover:text-[#C9A84C] hover:border-[#C9A84C]/40 transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            {/* Business Address */}
            <div className="text-[#A89272]/70 text-xs font-body leading-relaxed">
              <p className="font-medium text-[#A89272] mb-1">Business Address:</p>
              <p>E-17 VARDNO-5, ARYA S/O: Chander Mohan</p>
              <p>Sadan, Near NEEL NAGAR, Nilokheri</p>
              <p>Nilokheri Township (45/1), PO: Nilokheri</p>
              <p>DIST: Karnal, Haryana – 132117</p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-[#F5EBD8] mb-4 tracking-wide">Services</h4>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-[#A89272] text-sm hover:text-[#C9A84C] transition-colors font-body">
                  Divya Prashna
                </a>
              </li>
              <li>
                <a href="#services" className="text-[#A89272] text-sm hover:text-[#C9A84C] transition-colors font-body">
                  Trikal Darshan India
                </a>
              </li>
              <li>
                <a href="#services" className="text-[#A89272] text-sm hover:text-[#C9A84C] transition-colors font-body">
                  Trikal Darshan International
                </a>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-semibold text-[#F5EBD8] mb-4 tracking-wide">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-[#A89272] text-sm hover:text-[#C9A84C] transition-colors font-body">
                  About
                </a>
              </li>
              <li>
                <a href="#services" className="text-[#A89272] text-sm hover:text-[#C9A84C] transition-colors font-body">
                  The Trikal Darshan Method
                </a>
              </li>
              <li>
                <a href="#reviews" className="text-[#A89272] text-sm hover:text-[#C9A84C] transition-colors font-body">
                  Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading font-semibold text-[#F5EBD8] mb-4 tracking-wide">Legal</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => onOpenPolicy('terms')}
                  className="policy-link font-body"
                >
                  Terms and Conditions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenPolicy('privacy')}
                  className="policy-link font-body"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenPolicy('refund')}
                  className="policy-link font-body"
                >
                  Refund Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#C9A84C]/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#A89272]/60 text-xs font-body">
              © {new Date().getFullYear()} Manthan K Anejaa. All rights reserved.
            </p>
            <p className="text-[#A89272]/60 text-xs text-center sm:text-right font-body">
              Disclaimer: Astrology is for guidance only. Not a substitute for professional advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main App
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceType>('trikal-indian');
  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyType>('terms');

  const openBookingModal = (service: ServiceType) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsModalOpen(false);
  };

  const openPolicyModal = (type: PolicyType) => {
    setSelectedPolicy(type);
    setPolicyModalOpen(true);
  };

  const closePolicyModal = () => {
    setPolicyModalOpen(false);
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="site-background" />
      <div className="site-overlay" />
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar onBookClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} />
        <main className="pb-16 sm:pb-20 lg:pb-0">
          <Hero onBookClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} />
          <Services onBookClick={openBookingModal} />
          <Reviews />
          <InstagramWidget />
          <About />
          <Guru />
          <FraudAlert />
        </main>
        <Footer onOpenPolicy={openPolicyModal} />
        <FloatingBookButton onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} />
        <WhatsAppButton />
        <StickyBookButton onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} />
      </div>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={closeBookingModal} 
        service={selectedService}
      />

      {/* Policy Modal */}
      <PolicyModal
        isOpen={policyModalOpen}
        onClose={closePolicyModal}
        policyType={selectedPolicy}
      />
    </div>
  );
}

export default App;