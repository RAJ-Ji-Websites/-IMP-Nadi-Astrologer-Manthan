import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Clock, MessageCircle, Check, Shield } from 'lucide-react';
import './PricingCard.css';

interface PricingCardProps {
  name: string;
  price: string;
  duration: string;
  questions: string;
  features: string[];
  popular?: boolean;
  onBookClick: () => void;
}

export default function PricingCard({ 
  name, 
  price, 
  duration, 
  questions, 
  features, 
  popular = false, 
  onBookClick
}: PricingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mouse position for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring animation for parallax
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), springConfig);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`pricing-card-mystical ${popular ? 'popular' : ''}`}
    >
      {/* Animated Background Layers */}
      <div className="light-dust" />
      <div className="energy-field" />
      <div className="inner-glow" />
      
      {/* Golden Particles */}
      <div className="particles-layer">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="particle" />
        ))}
      </div>
      
      {/* Sacred Geometry */}
      <div className="sacred-geometry">
        <svg viewBox="0 0 200 200" preserveAspectRatio="none">
          {/* Sri Yantra-inspired lines */}
          <path className="geometry-line" d="M100 20 L180 150 L20 150 Z" />
          <path className="geometry-line" d="M100 40 L160 140 L40 140 Z" />
          <path className="geometry-line" d="M100 60 L140 130 L60 130 Z" />
          {/* Lotus petal curves */}
          <path className="geometry-line" d="M100 100 Q130 70 160 100" />
          <path className="geometry-line" d="M100 100 Q70 70 40 100" />
          <path className="geometry-line" d="M100 100 Q130 130 160 100" />
          <path className="geometry-line" d="M100 100 Q70 130 40 100" />
        </svg>
      </div>
      
      {/* Price Glow Area */}
      <div className="price-glow" />
      
      {/* MOST POPULAR Badge - Fixed positioning */}
      {popular && (
        <div className="popular-badge-container">
          <span className="popular-badge">
            Most Popular
          </span>
        </div>
      )}
      
      {/* Content */}
      <div className="card-content">
        <h3 className="font-heading text-lg sm:text-xl font-semibold text-[#F5EBD8] mb-3 sm:mb-4 tracking-wide relative z-10 leading-tight">
          {name}
        </h3>
        
        <div className="font-heading text-3xl sm:text-4xl font-semibold text-gold-gradient mb-4 sm:mb-6 relative z-10">
          {price}
        </div>

        <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-sm font-body relative z-10">
          <div className="flex items-center gap-2 text-[#A89272]">
            <Clock className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2 text-[#A89272]">
            <MessageCircle className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
            <span>{questions}</span>
          </div>
        </div>

        <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 relative z-10">
          {features.map((feature, i) => (
            <div key={i} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#22C55E] flex-shrink-0 mt-0.5" />
              <span className="text-sm text-[#A89272] font-body leading-snug">{feature}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onBookClick}
          className={`block w-full text-center relative z-10 ${
            popular ? 'btn-animated' : 'btn-animated-outline'
          }`}
        >
          <span>Book Now</span>
        </button>

        <div className="mt-4 flex items-center justify-center gap-1 text-xs text-[#A89272] font-body relative z-10">
          <Shield className="w-3 h-3" />
          <span>100% Refund Guarantee</span>
        </div>
      </div>
    </motion.div>
  );
}
