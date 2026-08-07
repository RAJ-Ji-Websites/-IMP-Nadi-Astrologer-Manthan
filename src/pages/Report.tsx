import { useEffect } from 'react';
import {
  Globe, Search, Bot, FileText, Youtube, Music2, BarChart3,
  Instagram, CheckCircle2, ShieldCheck, ArrowUpRight,
} from 'lucide-react';

// Private, visual "Month 1 Report" — short & scannable. Screen-share with client.

interface Item { icon: React.ElementType; title: string; points: string[]; links?: { label: string; href: string }[]; }

const SECTIONS: Item[] = [
  {
    icon: Globe,
    title: 'Premium Website — Live',
    points: [
      'Brand-new website on your own domain saatvikjyotish.com',
      'Mobile-friendly + fast (images 20MB → 1MB)',
      'Services, pricing & WhatsApp booking built-in',
    ],
    links: [{ label: 'saatvikjyotish.com', href: 'https://www.saatvikjyotish.com' }],
  },
  {
    icon: Search,
    title: 'Google SEO Setup',
    points: [
      'Sitemap, meta tags, location (Haryana) tags added',
      'Linked website to your Google Business Profile',
      'Ready to rank for “Nadi Astrologer”, “best astrologer Haryana”',
    ],
  },
  {
    icon: Bot,
    title: 'AI Search Optimization',
    points: [
      'Optimized for ChatGPT, Gemini & Google AI',
      '7 dedicated pages (About, Trikal Darshan, Pricing, etc.)',
      'Goal: AI recommends you by name + services',
    ],
  },
  {
    icon: FileText,
    title: '5 SEO Blog Articles',
    points: [
      'Targeting: best nadi astrologer, best astrologer in Haryana',
      'Plus: Manthan K Anejaa, Saatvik Jyotish brand searches',
      'Each written to rank + get cited by AI',
    ],
    links: [{ label: 'View Articles', href: 'https://www.saatvikjyotish.com/articles' }],
  },
  {
    icon: Youtube,
    title: 'YouTube Channel — New',
    points: [
      'Created brand-new YouTube channel',
      'Scheduled 15 top-performing Shorts from Instagram',
      'Builds authority + ranks inside Google search',
    ],
  },
  {
    icon: Music2,
    title: 'TikTok Channel — New',
    points: [
      'Created brand-new TikTok account',
      'Same 15 top-performing videos scheduled',
      'Expands reach to a fresh audience',
    ],
  },
  {
    icon: Instagram,
    title: 'Instagram Content Strategy',
    points: [
      'Built a full content strategy — 2 clear lanes:',
      'BROAD audience → reach & new followers',
      'NICHE audience → high-intent consultation bookings',
    ],
  },
  {
    icon: BarChart3,
    title: 'Website Tracking Installed',
    points: [
      'Vercel Analytics → visitors, views, traffic sources',
      'Microsoft Clarity → heatmaps + session recordings',
      'We now see exactly how visitors behave',
    ],
  },
];

const NEXT = [
  'Publish the 7 client-story reels (scripts ready)',
  'Google rankings start showing (SEO takes 2–3 months)',
  'Track DMs & bookings from each reel',
  'Scale what converts best',
];

export default function Report() {
  useEffect(() => {
    document.title = 'Month 1 Report — Saatvik Jyotish';
    const m = document.createElement('meta');
    m.name = 'robots';
    m.content = 'noindex, nofollow';
    document.head.appendChild(m);
    return () => { document.head.removeChild(m); };
  }, []);

  return (
    <div className="min-h-screen relative">
      <div className="site-background" />
      <div className="site-overlay" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-10">

        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="w-5 h-5 text-[#C9A84C]" />
          <span className="text-xs font-body uppercase tracking-[0.15em] text-[#C9A84C]">Private Report</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-[#F5EBD8] tracking-wide">
          Month 1 — <span style={{ color: '#C9A84C' }}>Work Done</span>
        </h1>
        <p className="text-[#A89272] font-body mt-2 mb-6">Saatvik Jyotish · Manthan K Anejaa</p>

        {/* Foundation banner */}
        <div className="rounded-xl bg-[#2D1810] border border-[#C9A84C]/25 p-5 mb-6">
          <p className="text-[#F5EBD8] font-body text-sm sm:text-base leading-relaxed">
            <span className="text-[#C9A84C] font-semibold">Month 1 = Foundation.</span> Website, Google + AI
            presence, content system & tracking — all built. Month 2 onward = visible growth.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          {SECTIONS.map((s) => (
            <div key={s.title} className="rounded-xl bg-[#2D1810] border border-[#C9A84C]/15 p-5">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-9 h-9 rounded-lg bg-[#C9A84C]/15 border border-[#C9A84C]/30 flex items-center justify-center">
                  <s.icon className="w-4.5 h-4.5 text-[#C9A84C]" />
                </span>
                <h2 className="font-heading text-base text-[#F5EBD8] tracking-wide leading-tight">{s.title}</h2>
              </div>
              <ul className="space-y-1.5">
                {s.points.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-[#A89272] font-body text-[13px] leading-snug">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A84C] flex-shrink-0 mt-0.5" /> {p}
                  </li>
                ))}
              </ul>
              {s.links && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-body text-[#C9A84C] hover:text-[#DFC07A] transition-colors">
                      {l.label} <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Snapshot numbers */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          {[
            { n: '12+', l: 'SEO / AI Pages' },
            { n: '3', l: 'New Channels' },
            { n: '2', l: 'Tracking Tools' },
          ].map((x) => (
            <div key={x.l} className="rounded-xl bg-[#241212] border border-[#C9A84C]/15 p-4 text-center">
              <div className="font-heading text-2xl sm:text-3xl" style={{ color: '#C9A84C' }}>{x.n}</div>
              <div className="text-[#A89272] font-body text-[11px] mt-1 leading-tight">{x.l}</div>
            </div>
          ))}
        </div>

        {/* Coming next */}
        <div className="rounded-xl bg-[#2D1810] border border-[#C9A84C]/20 p-5 mt-6">
          <h2 className="font-heading text-lg text-[#F5EBD8] mb-3 tracking-wide">Coming Next →</h2>
          <ul className="space-y-2">
            {NEXT.map((n, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[#A89272] font-body text-sm">
                <span style={{ color: '#C9A84C' }} className="font-semibold">{i + 1}.</span> {n}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-[#A89272]/40 text-xs font-body mt-8 text-center">
          Private report · Saatvik Jyotish growth
        </p>
      </div>
    </div>
  );
}
