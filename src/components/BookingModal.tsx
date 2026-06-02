import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone, Clock, IndianRupee, CheckCircle } from 'lucide-react';

export type ServiceType = 'divya-prashna' | 'trikal-indian' | 'trikal-foreign';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceType;
}

const serviceConfig = {
  'divya-prashna': {
    name: 'Divya Prashna',
    price: '₹1,100',
    duration: '15 minutes',
    highlights: ['Single Question Answer', 'Quick Guidance', 'Email/Chat Response'],
    whatsappMessage: 'Hi Manthan, I would like to book a Divya Prashna consultation (₹1,100 - 15 min). Please guide me regarding available slots and payment.'
  },
  'trikal-indian': {
    name: 'Trikal Darshan (Indian Client)',
    price: '₹4,100',
    duration: '30 minutes',
    highlights: ['Nadi + Numerology + Palmistry', 'Video Consultation', 'Recording Provided'],
    whatsappMessage: 'Hi Manthan, I would like to book a Trikal Darshan consultation for Indian clients (₹4,100 - 30 min). Please guide me regarding available slots and payment.'
  },
  'trikal-foreign': {
    name: 'Trikal Darshan (Foreign Client)',
    price: '₹5,100',
    duration: '30 minutes',
    highlights: ['Nadi + Numerology + Palmistry', 'Video Consultation', 'Recording Provided', 'International Scheduling'],
    whatsappMessage: 'Hi Manthan, I would like to book a Trikal Darshan consultation for international clients (₹5,100 - 30 min). Please guide me regarding available slots and payment.'
  }
};

export default function BookingModal({ isOpen, onClose, service }: BookingModalProps) {
  const config = serviceConfig[service];

  // Handle ESC key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  const handleWhatsApp = () => {
    const encodedMessage = encodeURIComponent(config.whatsappMessage);
    window.open(`https://wa.me/917206382574?text=${encodedMessage}`, '_blank');
    onClose();
  };

  const handleCall = () => {
    window.open('tel:+917206382574', '_self');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1 
              }}
              className="relative w-full max-w-md my-8"
            >
              {/* Glass Card */}
              <div className="relative overflow-hidden rounded-2xl border border-[#C9A84C]/30 bg-gradient-to-br from-[#2D1810]/98 via-[#371C12]/95 to-[#1A0A0A]/98 backdrop-blur-xl shadow-2xl shadow-black/50">
                {/* Gold Glow Border Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-50" style={{
                  background: 'linear-gradient(135deg, rgba(201,168,76,0.2) 0%, transparent 50%, rgba(201,168,76,0.1) 100%)'
                }} />

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full text-[#A89272] hover:text-[#F5EBD8] hover:bg-[#C9A84C]/10 transition-all duration-300"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Content */}
                <div className="relative p-6 sm:p-8">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      <span className="inline-block px-4 py-1.5 mb-3 text-xs font-medium tracking-[0.15em] uppercase text-[#C9A84C] bg-[#C9A84C]/10 rounded-full border border-[#C9A84C]/20 font-heading">
                        {config.name}
                      </span>
                    </motion.div>
                    
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25, duration: 0.4 }}
                      className="font-heading text-xl sm:text-2xl text-[#F5EBD8] mb-4 tracking-wide"
                    >
                      Book Your Consultation
                    </motion.h2>

                    {/* Price & Duration */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="flex items-center justify-center gap-6 mb-4"
                    >
                      <div className="flex items-center gap-2">
                        <IndianRupee className="w-5 h-5 text-[#C9A84C]" />
                        <span className="font-heading text-2xl text-[#C9A84C]">{config.price.replace('₹', '')}</span>
                      </div>
                      <div className="w-px h-6 bg-[#C9A84C]/30" />
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#A89272]" />
                        <span className="text-[#A89272] font-body">{config.duration}</span>
                      </div>
                    </motion.div>

                    {/* Highlights */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.4 }}
                      className="flex flex-wrap justify-center gap-2 mb-6"
                    >
                      {config.highlights.map((highlight, i) => (
                        <span key={i} className="inline-flex items-center gap-1 px-3 py-1 text-xs text-[#A89272] bg-[#2D1810] rounded-full border border-[#C9A84C]/10">
                          <CheckCircle className="w-3 h-3 text-[#22C55E]" />
                          {highlight}
                        </span>
                      ))}
                    </motion.div>
                  </div>

                  {/* Booking Options */}
                  <div className="space-y-3">
                    {/* WhatsApp Button - Primary */}
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                      whileHover={{ y: -2, scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={handleWhatsApp}
                      className="w-full group relative overflow-hidden rounded-xl border-2 border-[#22C55E]/40 bg-gradient-to-r from-[#22C55E]/20 to-[#16A34A]/20 p-4 text-left transition-all duration-300 hover:border-[#22C55E] hover:shadow-lg hover:shadow-[#22C55E]/20"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#22C55E]/20 flex items-center justify-center group-hover:bg-[#22C55E]/30 transition-colors">
                          <MessageCircle className="w-6 h-6 text-[#22C55E]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-heading text-base text-[#F5EBD8] mb-1 tracking-wide">
                            Book via WhatsApp
                          </h3>
                          <p className="text-xs text-[#A89272] font-body">
                            Quick response • Instant confirmation
                          </p>
                        </div>
                        <div className="flex-shrink-0 px-3 py-1 text-xs font-medium text-[#22C55E] bg-[#22C55E]/10 rounded-full">
                          Recommended
                        </div>
                      </div>
                    </motion.button>

                    {/* Call Button - Secondary */}
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45, duration: 0.4 }}
                      whileHover={{ y: -2, scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={handleCall}
                      className="w-full group relative overflow-hidden rounded-xl border border-[#C9A84C]/30 bg-gradient-to-r from-[#2D1810]/50 to-[#371C12]/50 p-4 text-left transition-all duration-300 hover:border-[#C9A84C]/50 hover:bg-[#2D1810]/80"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#C9A84C]/10 flex items-center justify-center group-hover:bg-[#C9A84C]/20 transition-colors">
                          <Phone className="w-5 h-5 text-[#C9A84C]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-heading text-base text-[#F5EBD8] mb-1 tracking-wide">
                            Call to Book
                          </h3>
                          <p className="text-xs text-[#A89272] font-body">
                            +91 7206382574
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  </div>

                  {/* Footer Note */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="mt-6 text-center"
                  >
                    <div className="flex items-center justify-center gap-2 text-xs text-[#A89272]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                      <span>Limited slots available • Response within 2 hours</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
