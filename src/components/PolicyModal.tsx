import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Shield, RotateCcw } from 'lucide-react';

export type PolicyType = 'terms' | 'privacy' | 'refund';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  policyType: PolicyType;
}

const policyConfig = {
  terms: {
    title: 'Terms & Conditions',
    icon: FileText,
    lastUpdated: '02-06-2026',
    content: `
      <p class="intro">Welcome to <strong>Manthan Speaks</strong>. By accessing our website, booking a consultation, or using our services, you agree to these Terms & Conditions.</p>
      
      <h3>1. Services</h3>
      <p>Manthan Speaks provides online consultations related to Astrology, Numerology, Palmistry, Spiritual Guidance, Personal Development, and Predictive Readings through digital communication platforms.</p>
      
      <h3>2. Eligibility</h3>
      <p>You must be at least 18 years old to use our services. Minors may only access consultations with parental or guardian consent.</p>
      
      <h3>3. Purpose of Consultations</h3>
      <p>Our services are intended for personal insight, self-reflection, spiritual guidance, and entertainment purposes only. Any predictions or guidance provided are based on traditional practices and professional interpretation and should not be considered guaranteed outcomes.</p>
      
      <h3>4. No Professional Advice</h3>
      <p>Our consultations do not replace medical, psychological, legal, financial, investment, or tax advice. Please consult qualified professionals for such matters.</p>
      
      <h3>5. No Guarantee of Results</h3>
      <p>We make no guarantees regarding the accuracy of predictions or future outcomes. All decisions made based on consultations are solely the client's responsibility.</p>
      
      <h3>6. Booking & Payment</h3>
      <ul>
        <li>Full payment may be required before appointment confirmation.</li>
        <li>Prices may change without prior notice.</li>
        <li>Appointments are confirmed only after payment verification.</li>
      </ul>
      
      <h3>7. Cancellation & Rescheduling</h3>
      <ul>
        <li>Rescheduling requests must be made at least 24 hours before the appointment.</li>
        <li>Late requests may not be accommodated.</li>
        <li>Missed appointments without notice may result in loss of the consultation fee.</li>
      </ul>
      
      <h3>8. Refund Policy</h3>
      <p>Due to the personalized nature of our services, all payments are generally non-refundable. Refunds, if any, are granted solely at our discretion. No refunds are available after a consultation has been completed.</p>
      
      <h3>9. Client Responsibilities</h3>
      <p>Clients agree to provide accurate information, attend appointments on time, communicate respectfully, and not record consultations without prior written permission.</p>
      
      <h3>10. Confidentiality</h3>
      <p>Client information will be kept confidential except where disclosure is required by law, necessary to protect legal rights, or authorized by the client.</p>
      
      <h3>11. Intellectual Property</h3>
      <p>All website content, reports, readings, logos, graphics, videos, and materials remain the property of Manthan Speaks and may not be copied or reproduced without written permission.</p>
      
      <h3>12. Limitation of Liability</h3>
      <p>Manthan Speaks shall not be liable for any losses, damages, decisions, or consequences arising from the use of our services. Clients remain solely responsible for their actions and decisions.</p>
      
      <h3>13. Prohibited Conduct</h3>
      <p>Users must not misuse the website, attempt unauthorized access, provide false information, or engage in abusive or unlawful behavior. We reserve the right to refuse service when necessary.</p>
      
      <h3>14. Privacy</h3>
      <p>Use of our services is also subject to our Privacy Policy.</p>
      
      <h3>15. Force Majeure</h3>
      <p>We are not responsible for delays or service interruptions caused by circumstances beyond our reasonable control, including technical failures, internet outages, natural disasters, or government actions.</p>
      
      <h3>16. Changes to Terms</h3>
      <p>We may update these Terms & Conditions at any time. Continued use of our services constitutes acceptance of any changes.</p>
      
      <h3>17. Governing Law</h3>
      <p>These Terms shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in <strong>Nilokheri, Haryana</strong>.</p>
      
      <h3>18. Contact Us</h3>
      <p><strong>Manthan Speaks</strong></p>
      <p>Email: <a href="mailto:manthananeja@gmail.com">manthananeja@gmail.com</a></p>
      <p>Phone/WhatsApp: <a href="https://wa.me/917206382574">+91 7206382574</a></p>
      <p>Website: <a href="https://saatvikjyotish.com" target="_blank" rel="noopener noreferrer">saatvikjyotish.com</a></p>
    `
  },
  privacy: {
    title: 'Privacy Policy',
    icon: Shield,
    lastUpdated: '02-06-2026',
    content: `
      <p class="intro">At <strong>Manthan Speaks</strong>, we respect your privacy and are committed to protecting your personal information.</p>
      
      <h3>Information We Collect</h3>
      <p>We may collect:</p>
      <ul>
        <li>Name</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>Date, time, and place of birth</li>
        <li>Information shared during consultations</li>
        <li>Basic website usage data (cookies, IP address, browser information)</li>
      </ul>
      
      <h3>How We Use Your Information</h3>
      <p>We use your information to:</p>
      <ul>
        <li>Provide astrology, numerology, and palmistry consultations</li>
        <li>Schedule appointments</li>
        <li>Process payments</li>
        <li>Communicate with you regarding our services</li>
        <li>Improve our website and customer experience</li>
      </ul>
      
      <h3>Data Protection</h3>
      <p>We take reasonable measures to protect your personal information and do not sell, rent, or share your data with third parties except where required by law or for essential service operations (such as payment processing).</p>
      
      <h3>Confidentiality</h3>
      <p>All consultation details and personal information shared with us are kept confidential and used solely for providing our services.</p>
      
      <h3>Cookies</h3>
      <p>Our website may use cookies to improve functionality and user experience. You may disable cookies through your browser settings.</p>
      
      <h3>Third-Party Services</h3>
      <p>Payments and certain website functions may be handled by trusted third-party providers, who have their own privacy policies.</p>
      
      <h3>Your Rights</h3>
      <p>You may request access, correction, or deletion of your personal information by contacting us.</p>
      
      <h3>Disclaimer</h3>
      <p>Astrology, numerology, and palmistry services are provided for guidance, self-reflection, and entertainment purposes only. No predictions or outcomes are guaranteed.</p>
      
      <h3>Contact Us</h3>
      <p><strong>Manthan Speaks</strong></p>
      <p>Email: <a href="mailto:manthananeja@gmail.com">manthananeja@gmail.com</a></p>
      <p>Phone: <a href="https://wa.me/917206382574">+91 7206382574</a></p>
      <p>Website: <a href="https://saatvikjyotish.com" target="_blank" rel="noopener noreferrer">saatvikjyotish.com</a></p>
    `
  },
  refund: {
    title: 'Refund & Cancellation Policy',
    icon: RotateCcw,
    lastUpdated: '02-06-2026',
    content: `
      <p class="intro">At <strong>Manthan Speaks</strong>, every consultation is personalized and time is reserved specifically for each client.</p>
      
      <h3>Cancellation & Rescheduling</h3>
      <ul>
        <li>Appointments may be rescheduled if requested at least <strong>24 hours</strong> before the scheduled consultation.</li>
        <li>Rescheduling requests made less than 24 hours before the appointment may not be accommodated.</li>
      </ul>
      
      <h3>Refunds</h3>
      <ul>
        <li>All consultation fees are <strong>non-refundable</strong> once the booking is confirmed.</li>
        <li>No refunds will be issued after a consultation has been completed.</li>
        <li>If a consultation cannot be provided by Manthan Speaks due to unforeseen circumstances, a full refund or rescheduling option will be offered.</li>
      </ul>
      
      <h3>No-Shows</h3>
      <p>Failure to attend a scheduled appointment without prior notice will be considered a no-show, and no refund will be provided.</p>
      
      <div class="policy-agreement">
        <p>By booking a consultation, you agree to this Refund & Cancellation Policy.</p>
      </div>
    `
  }
};

export default function PolicyModal({ isOpen, onClose, policyType }: PolicyModalProps) {
  const config = policyConfig[policyType];
  const IconComponent = config.icon;

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
              className="relative w-full max-w-2xl my-8 max-h-[90vh] overflow-hidden"
            >
              {/* Glass Card */}
              <div className="relative overflow-hidden rounded-2xl border border-[#C9A84C]/30 bg-gradient-to-br from-[#2D1810]/98 via-[#371C12]/95 to-[#1A0A0A]/98 backdrop-blur-xl shadow-2xl shadow-black/50">
                {/* Gold Glow Border Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-50" style={{
                  background: 'linear-gradient(135deg, rgba(201,168,76,0.2) 0%, transparent 50%, rgba(201,168,76,0.1) 100%)'
                }} />

                {/* Header */}
                <div className="relative border-b border-[#C9A84C]/20 px-6 py-4 sm:px-8 sm:py-5">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-[#C9A84C]" />
                    </div>
                    <h2 className="font-heading text-xl sm:text-2xl text-[#F5EBD8] tracking-wide">
                      {config.title}
                    </h2>
                  </div>
                  
                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 sm:top-5 sm:right-6 p-2 rounded-full text-[#A89272] hover:text-[#F5EBD8] hover:bg-[#C9A84C]/10 transition-all duration-300"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="relative px-6 py-6 sm:px-8 sm:py-8 overflow-y-auto max-h-[calc(90vh-120px)]">
                  <div 
                    className="policy-content font-body text-[#A89272] text-sm sm:text-base leading-relaxed space-y-4"
                    dangerouslySetInnerHTML={{ __html: config.content }}
                  />
                  
                  {/* Footer */}
                  <div className="mt-8 pt-6 border-t border-[#C9A84C]/10">
                    <p className="text-xs text-[#A89272]/60 text-center">
                      Last Updated: {config.lastUpdated || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
