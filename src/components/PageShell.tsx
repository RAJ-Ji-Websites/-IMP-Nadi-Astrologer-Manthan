import { Link } from 'react-router-dom';
import { MessageCircle, Instagram, ArrowLeft } from 'lucide-react';
import { SITE } from '../data/site';

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen relative">
      <div className="site-background" />
      <div className="site-overlay" />
      <div className="relative z-10">
        {/* Slim nav */}
        <header className="border-b border-[#C9A84C]/10 bg-[#1A0A0A]/80 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl text-[#C9A84C]">ॐ</span>
              <span className="font-heading font-semibold text-sm sm:text-base text-[#F5EBD8] tracking-[0.1em]">SAATVIK JYOTISH</span>
            </Link>
            <a
              href={`${SITE.whatsapp}?text=Hi%20Manthan%2C%20I%20would%20like%20to%20book%20a%20Nadi%20Astrology%20consultation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] text-white font-heading font-semibold text-xs sm:text-sm hover:brightness-110 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Book on WhatsApp</span>
              <span className="sm:hidden">Book</span>
            </a>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">{children}</main>

        {/* Footer */}
        <footer className="border-t border-[#C9A84C]/10 py-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <Link to="/" className="inline-flex items-center gap-2 text-[#C9A84C] hover:text-[#DFC07A] transition-colors text-sm font-body mb-6">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <p className="text-[#A89272] text-sm font-body mb-4 leading-relaxed">{SITE.definition}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="text-[#F5EBD8] hover:text-[#C9A84C] transition-colors font-body">
                WhatsApp: {SITE.phoneDisplay}
              </a>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[#F5EBD8] hover:text-[#C9A84C] transition-colors font-body">
                <Instagram className="w-4 h-4" /> {SITE.instagramHandle}
              </a>
            </div>
            <p className="text-[#A89272]/60 text-xs font-body mt-6">
              © {new Date().getFullYear()} {SITE.personName} · {SITE.brand} · {SITE.address.full}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
