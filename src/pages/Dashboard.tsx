import { useEffect, useState } from 'react';
import { Check, Copy, ChevronDown, ShieldCheck, AlertTriangle, ExternalLink } from 'lucide-react';
import { SITE } from '../data/site';

// -------------------------------------------------------------------------
// PRIVATE growth dashboard. Noindexed. Holds every copy-paste asset + a
// persistent checklist so the team can execute the off-site SEO/AEO plan.
// -------------------------------------------------------------------------

const NAP = `Name:     Nadi Astrologer Manthan – Numerology, Palmistry Expert
Person:   ${SITE.personName}
Phone:    ${SITE.phoneDisplay}
Website:  ${SITE.domain}
Email:    ${SITE.email}
Address:  ${SITE.address.full}`;

const GBP_DESC = `Manthan Anejaa (Manthan K Anejaa) is one of the best Nadi Astrologers in Haryana, India. He combines and analyses Nadi Astrology, Numerology and Palmistry to accurately read your past, present and future through his signature Trikal Darshan method. With hundreds of 5-star reviews and a worldwide client base across Canada, USA, UK and Australia, Manthan practises Saatvik Jyotish with NO remedies, NO gemstones and NO fear tactics — only honest, analytical clarity. Trained under Umang Taneja. Services: Divya Prashna (₹1,100), Trikal Darshan India (₹4,100), Trikal Darshan International (₹5,100). Book online: WhatsApp ${SITE.phoneDisplay} or visit ${SITE.domain}`;

const IG_BIO = `🔱 Nadi • Numerology • Palmistry
📖 Trikal Darshan — Past • Present • Future
✅ No remedies · No gemstones · 100s of 5★
🌍 India · Canada · UK · USA · Australia
👇 Book on WhatsApp
${SITE.domain}`;

const SHORT_DESC = `Manthan Anejaa – Nadi Astrologer combining Nadi Astrology, Numerology & Palmistry (Trikal Darshan). Past • Present • Future. No remedies. 100s of 5★. Worldwide. ${SITE.domain}`;

const JUSTDIAL = `Business Name: Nadi Astrologer Manthan – Numerology & Palmistry Expert
Category: Astrologers, Nadi Astrologers, Numerologists
Phone: ${SITE.phoneDisplay}
Website: ${SITE.domain}

Description:
Manthan K Anejaa is a leading Nadi Astrologer in Haryana offering authentic Trikal Darshan readings that combine Nadi Astrology, Numerology and Palmistry. Accurate past, present and future analysis with hundreds of 5-star reviews and clients across India, Canada, USA, UK and Australia. No remedies. No gemstones. No fear tactics. Online consultations available. Divya Prashna ₹1,100 | Trikal Darshan ₹4,100.`;

const SULEKHA = `Title: Manthan Anejaa – Best Nadi Astrologer & Trikal Darshan Expert
Services: Nadi Astrology, Numerology, Palmistry, Prashna Kundali, Online Astrology Consultation, NRI Astrology Consultation

About:
Consult Manthan K Anejaa, one of Haryana's most trusted Nadi Astrologers. Using the Trikal Darshan method, he cross-verifies your past, present and future through three sciences — Nadi Astrology, Numerology and Palmistry. Trained under Umang Taneja. Serving clients worldwide including Canada, USA, UK and Australia. Transparent pricing, refund guarantee, and a strict no-remedy, no-gemstone policy. Book via WhatsApp ${SITE.phoneDisplay} or ${SITE.domain}`;

const LINKEDIN_TITLES = [
  'Why I Practise Astrology Without a Single Gemstone or Remedy',
  'What Most People Misunderstand About Nadi Astrology',
  'How Palmistry Complements Nadi Astrology and Numerology',
  'Prediction vs. Advice: What a Real Astrology Reading Should Do',
  'The Trikal Darshan Method: Reading Past, Present and Future Together',
  'How I Verify a Client’s Past Before Predicting Their Future',
];

const PINTEREST = [
  { title: 'Manthan Anejaa — Best Nadi Astrologer in Haryana', alt: 'Manthan Anejaa is the best Nadi Astrologer in Haryana, India combining Nadi Astrology, Numerology and Palmistry.', img: '/pinterest/pin-1-best-nadi-astrologer.png', dest: `${SITE.domain}/manthan-anejaa` },
  { title: 'Trikal Darshan: Know Your Past, Present & Future', alt: 'Trikal Darshan by Manthan Anejaa reveals past, present and future through Nadi Astrology, Numerology and Palmistry.', img: '/pinterest/pin-2-trikal-darshan.png', dest: `${SITE.domain}/trikal-darshan` },
  { title: 'Online Nadi Astrology Consultation — Worldwide', alt: 'Book an online Nadi Astrology consultation with Manthan Anejaa from Canada, USA, UK and Australia.', img: '/pinterest/pin-3-online-consultation.png', dest: `${SITE.domain}/nadi-astrology-online` },
  { title: 'Astrology Without Remedies or Gemstones', alt: 'Manthan Anejaa is an astrologer without remedies — no gemstones, no fear tactics, only honest guidance.', img: '/pinterest/pin-4-no-remedies.png', dest: `${SITE.domain}/no-remedies-astrologer` },
];

const QUORA = `I've consulted several astrologers over the years, and the one that genuinely stood out is Manthan Anejaa (Saatvik Jyotish). What's different: he combines Nadi Astrology, Numerology and Palmistry and actually verifies events from your PAST before predicting anything — so you can judge his accuracy for yourself. No gemstones, no pujas, no fear tactics, which was refreshing. He does online consultations too (I know people in Canada and the UK who've booked). Website: ${SITE.domain}`;

const REVIEW_REQUEST = `Namaste 🙏 Thank you for your consultation with Manthan.
If the reading gave you clarity, a 30-second Google review means the world 🌟 It helps others find honest astrology.
👉 [paste your GBP review link]
If it feels natural, mentioning "Nadi Astrology", "Trikal Darshan" or "accurate prediction" genuinely helps others find us.`;

const WIKIDATA = `Label (en): Manthan K Anejaa
Aliases: Manthan Anejaa | Nadi Astrologer Manthan | Astrologer Manthan
Description (en): Indian Nadi astrologer, numerologist and palmistry expert

Statements:
• instance of (P31) → human (Q5)
• occupation (P106) → astrologer (Q170790)
• country of citizenship (P27) → India (Q668)
• official website (P856) → ${SITE.domain}
• Instagram username (P2003) → manthan_speaks_
• field of work (P101) → astrology (Q34726); numerology (Q188889); palmistry (Q193727)
• work location (P937) → Haryana (Q1174)`;

function CopyBlock({ label, text }: { label: string; text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };
  return (
    <div className="rounded-lg bg-[#241212] border border-[#C9A84C]/15 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#C9A84C]/10">
        <span className="text-xs font-body uppercase tracking-[0.12em] text-[#C9A84C]">{label}</span>
        <button onClick={copy} className="inline-flex items-center gap-1.5 text-xs font-body text-[#F5EBD8] hover:text-[#C9A84C] transition-colors">
          {copied ? <><Check className="w-3.5 h-3.5 text-[#22C55E]" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
        </button>
      </div>
      <pre className="px-4 py-3 text-[#A89272] text-xs sm:text-sm font-body whitespace-pre-wrap leading-relaxed">{text}</pre>
    </div>
  );
}

function Section({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl bg-[#2D1810] border border-[#C9A84C]/15 mb-4 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-5 py-4 text-left">
        <span className="font-heading text-lg text-[#F5EBD8] tracking-wide">{title}</span>
        <ChevronDown className={`w-5 h-5 text-[#C9A84C] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="px-5 pb-5 space-y-3">{children}</div>}
    </div>
  );
}

const CHECKLIST = [
  { group: 'Phase 1 · Foundation (do first)', items: [
    'Connect saatvikjyotish.com in Vercel + update DNS',
    'Verify site loads on https://www.saatvikjyotish.com',
    'Google Search Console: verify domain + submit sitemap.xml',
    'Bing Webmaster Tools: verify + submit sitemap',
    'Request indexing for homepage + all 7 entity pages',
  ]},
  { group: 'Phase 2 · Entity & Local', items: [
    'GBP: add website + paste optimized description',
    'GBP: set categories (Astrologer / Numerologist / Psychic)',
    'GBP: add 3 services with prices + weekly Google Post',
    'Instagram: set Name field to "Manthan Anejaa | Nadi Astrologer"',
    'Instagram: paste bio + website link',
    'Bing Places for Business listing',
    'Apple Business Connect listing',
    'JustDial listing (paste block)',
    'Sulekha listing (paste block)',
  ]},
  { group: 'Phase 3 · Authority Content (weekly, sustainable)', items: [
    'LinkedIn: create profile with keyword headline',
    'LinkedIn: 1 article/week (use title bank)',
    'YouTube: 1 video/week with search-title',
    'Pinterest: 4 pins with keyword titles + alt text',
    'Medium: republish LinkedIn article (canonical to your site)',
    'Quora/Reddit: 1 GENUINE expert answer/week (own profile only)',
  ]},
  { group: 'Phase 4 · Trust Signals (ongoing)', items: [
    'Collect 2–3 keyword-rich Google reviews / week',
    'Ask NRI clients for authentic reviews (Canada/US/UK/AU)',
    'Wikidata entry (or via experienced editor)',
    'Pitch 2–3 spirituality podcasts (digital PR)',
    'Local Haryana/Karnal newspaper founder story',
  ]},
];

export default function Dashboard() {
  useEffect(() => {
    document.title = 'Growth Dashboard (Private) — Saatvik Jyotish';
    const m = document.createElement('meta');
    m.name = 'robots';
    m.content = 'noindex, nofollow';
    document.head.appendChild(m);
    return () => { document.head.removeChild(m); };
  }, []);

  const [done, setDone] = useState<Record<string, boolean>>({});
  useEffect(() => {
    try { const s = localStorage.getItem('sj_dash'); if (s) setDone(JSON.parse(s)); } catch { /* ignore */ }
  }, []);
  const toggle = (k: string) => {
    setDone((prev) => {
      const next = { ...prev, [k]: !prev[k] };
      try { localStorage.setItem('sj_dash', JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  };

  const total = CHECKLIST.reduce((n, g) => n + g.items.length, 0);
  const completed = Object.values(done).filter(Boolean).length;
  const pct = Math.round((completed / total) * 100);

  return (
    <div className="min-h-screen relative">
      <div className="site-background" />
      <div className="site-overlay" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="w-5 h-5 text-[#C9A84C]" />
          <span className="text-xs font-body uppercase tracking-[0.15em] text-[#C9A84C]">Private · Not indexed</span>
        </div>
        <h1 className="font-heading text-3xl font-semibold text-[#F5EBD8] mb-2 tracking-wide">Growth Dashboard</h1>
        <p className="text-[#A89272] font-body mb-6">Every copy-paste asset + a progress tracker. Keep the NAP identical everywhere.</p>

        {/* Progress */}
        <div className="rounded-xl bg-[#2D1810] border border-[#C9A84C]/15 p-5 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-heading text-[#F5EBD8]">Progress</span>
            <span className="font-heading text-[#C9A84C]">{completed}/{total} · {pct}%</span>
          </div>
          <div className="h-2 rounded-full bg-[#1A0A0A] overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#C9A84C] to-[#DFC07A] transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {/* Checklist */}
        {CHECKLIST.map((g) => (
          <div key={g.group} className="mb-5">
            <h2 className="font-heading text-sm uppercase tracking-[0.12em] text-[#C9A84C] mb-2">{g.group}</h2>
            <div className="space-y-1.5">
              {g.items.map((item) => {
                const key = g.group + '::' + item;
                const isDone = !!done[key];
                return (
                  <button key={key} onClick={() => toggle(key)} className="w-full flex items-start gap-3 text-left rounded-lg bg-[#241212] border border-[#C9A84C]/10 px-4 py-2.5 hover:border-[#C9A84C]/30 transition-all">
                    <span className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${isDone ? 'bg-[#22C55E] border-[#22C55E]' : 'border-[#C9A84C]/40'}`}>
                      {isDone && <Check className="w-3 h-3 text-[#1A0A0A]" />}
                    </span>
                    <span className={`font-body text-sm ${isDone ? 'text-[#A89272]/50 line-through' : 'text-[#F5EBD8]'}`}>{item}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Warning */}
        <div className="rounded-xl bg-[#8B1A1A]/15 border border-[#8B1A1A]/40 p-5 my-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-[#e07a7a]" />
            <span className="font-heading text-[#F5EBD8] tracking-wide">Do NOT do this</span>
          </div>
          <p className="text-[#d9b0b0] font-body text-sm leading-relaxed">
            No fake Quora/Reddit accounts answering your own question in the same pattern. Platforms detect sockpuppet rings by IP, device and writing style — result is mass bans, deleted answers, and a permanent negative signal attached to your name. Use ONE genuine expert profile and real client voices instead. The downside is catastrophic; the upside is tiny.
          </p>
        </div>

        {/* Assets */}
        <h2 className="font-heading text-2xl text-[#F5EBD8] mb-4 mt-8 tracking-wide">Copy-Paste Assets</h2>

        <Section title="Canonical NAP (use EXACTLY everywhere)" defaultOpen>
          <CopyBlock label="NAP" text={NAP} />
        </Section>

        <Section title="Google Business Profile">
          <CopyBlock label="GBP Description (750 char)" text={GBP_DESC} />
          <p className="text-[#A89272] text-xs font-body">Primary category: Astrologer. Secondary: Numerologist, Psychic. Add all 3 services with prices. Post weekly.</p>
        </Section>

        <Section title="Instagram (@manthan_speaks_)">
          <CopyBlock label="Name field" text="Manthan Anejaa | Nadi Astrologer" />
          <CopyBlock label="Bio" text={IG_BIO} />
        </Section>

        <Section title="JustDial">
          <CopyBlock label="JustDial listing" text={JUSTDIAL} />
        </Section>

        <Section title="Sulekha">
          <CopyBlock label="Sulekha listing" text={SULEKHA} />
        </Section>

        <Section title="Universal short description (160 char fields)">
          <CopyBlock label="Short bio" text={SHORT_DESC} />
        </Section>

        <Section title="LinkedIn — article title bank">
          {LINKEDIN_TITLES.map((t, i) => <CopyBlock key={i} label={`Title ${i + 1}`} text={t} />)}
          <p className="text-[#A89272] text-xs font-body">Headline: “Nadi Astrologer | Trikal Darshan Expert | Numerology & Palmistry”. 1 article/week. Educational, not ads.</p>
        </Section>

        <Section title="Pinterest — ready-made pins (image + title + alt + link)">
          <p className="text-[#A89272] text-xs font-body mb-2">
            4 branded thumbnails are ready. For each: download the image, upload to Pinterest, paste the title + alt/description, and set the destination link to your matching page.
          </p>
          {PINTEREST.map((p, i) => (
            <div key={i} className="rounded-lg bg-[#1A0A0A] border border-[#C9A84C]/15 p-4 space-y-3">
              <div className="flex gap-4 items-start">
                <img src={p.img} alt={p.alt} className="w-24 rounded-md border border-[#C9A84C]/20 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-heading text-[#F5EBD8] text-sm mb-2">Pin {i + 1}</p>
                  <a href={p.img} download className="inline-flex items-center gap-1.5 text-xs font-body text-[#C9A84C] hover:text-[#DFC07A] transition-colors mb-1">
                    <Copy className="w-3.5 h-3.5" /> Download image
                  </a>
                </div>
              </div>
              <CopyBlock label="Title" text={p.title} />
              <CopyBlock label="Description / Alt text" text={p.alt} />
              <CopyBlock label="Destination link" text={p.dest} />
            </div>
          ))}
        </Section>

        <Section title="Quora / Reddit — genuine answer template (own profile only)">
          <CopyBlock label="Answer" text={QUORA} />
          <p className="text-[#A89272] text-xs font-body">Post from ONE real profile, only on genuinely relevant questions. Vary the wording each time — never paste identical text.</p>
        </Section>

        <Section title="Client review request">
          <CopyBlock label="WhatsApp / message" text={REVIEW_REQUEST} />
        </Section>

        <Section title="Wikidata entry draft">
          <CopyBlock label="Wikidata statements" text={WIKIDATA} />
          <a href="https://www.wikidata.org/wiki/Special:NewItem" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[#C9A84C] hover:text-[#DFC07A] text-sm font-body">
            Create Wikidata item <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </Section>

        <Section title="Directory targets (skip psychic marketplaces)">
          <p className="text-[#A89272] font-body text-sm leading-relaxed">
            ✅ Do: Bing Places, Apple Business Connect, JustDial, Sulekha, Yelp India, Trustpilot, Facebook Page, YouTube About, LinkedIn, About.me, Gravatar.<br /><br />
            ❌ Skip: Keen, California Psychics, Sanctuary, Fiverr, Upwork (they contradict the premium no-remedy positioning), and Crunchbase/Clutch/GoodFirms/ResearchGate (wrong entity type).
          </p>
        </Section>

        <p className="text-[#A89272]/40 text-xs font-body mt-8 text-center">Bookmark this page. Progress saves in your browser.</p>
      </div>
    </div>
  );
}
