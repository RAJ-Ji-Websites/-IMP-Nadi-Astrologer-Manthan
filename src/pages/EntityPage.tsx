import { useLocation, Link, Navigate } from 'react-router-dom';
import { MessageCircle, ArrowRight, Check } from 'lucide-react';
import PageShell from '../components/PageShell';
import Seo from '../components/Seo';
import { SITE } from '../data/site';
import { ENTITY_PAGES, pageBySlug } from '../data/pages';

export default function EntityPage() {
  // Routes are static paths (e.g. /manthan-anejaa), so derive the slug from
  // the pathname rather than useParams (which needs a :slug route segment).
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\/+/, '').replace(/\/+$/, '');
  const page = slug ? pageBySlug(slug) : undefined;
  if (!page) return <Navigate to="/" replace />;

  const canonical = `${SITE.domain}/${page.slug}`;
  const others = ENTITY_PAGES.filter((p) => p.slug !== page.slug);

  const schema = {
    '@type': 'Article',
    headline: page.h1,
    description: page.description,
    author: { '@type': 'Person', name: SITE.personName, '@id': `${SITE.domain}/#manthan` },
    publisher: { '@type': 'Organization', name: SITE.brand, '@id': `${SITE.domain}/#business` },
    mainEntityOfPage: canonical,
    dateModified: SITE.lastUpdated,
    datePublished: SITE.lastUpdated,
    about: { '@id': `${SITE.domain}/#manthan` },
    mentions: SITE.disciplines.map((d) => ({ '@type': 'Thing', name: d })),
    ...(page.faqs.length
      ? {
          isPartOf: {
            '@type': 'FAQPage',
            mainEntity: page.faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          },
        }
      : {}),
  };

  const faqSchema = page.faqs.length
    ? {
        '@type': 'FAQPage',
        mainEntity: page.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : undefined;

  return (
    <PageShell>
      <Seo
        title={page.title}
        description={page.description}
        canonical={canonical}
        schema={faqSchema ? ({ '@type': 'Collection', hasPart: [schema, faqSchema] } as object) : schema}
        breadcrumb={[
          { name: 'Home', url: SITE.domain },
          { name: page.navLabel, url: canonical },
        ]}
      />

      {/* Breadcrumb */}
      <nav className="text-xs font-body text-[#A89272] mb-6">
        <Link to="/" className="hover:text-[#C9A84C]">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[#F5EBD8]">{page.navLabel}</span>
      </nav>

      <article>
        <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#F5EBD8] mb-5 tracking-wide leading-tight">
          {page.h1}
        </h1>

        {/* Answer-first block — the paragraph AI engines extract */}
        <div className="rounded-lg bg-[#2D1810] border-l-4 border-[#C9A84C] p-5 sm:p-6 mb-8">
          <p className="text-[#F5EBD8] font-body text-base sm:text-lg leading-relaxed">{page.answer}</p>
        </div>

        {/* Sections */}
        {page.sections.map((s, i) => (
          <section key={i} className="mb-8">
            <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#F5EBD8] mb-3 tracking-wide">{s.heading}</h2>
            {s.paras.map((p, j) => (
              <p key={j} className="text-[#A89272] font-body text-base sm:text-lg leading-relaxed mb-3">{p}</p>
            ))}
          </section>
        ))}

        {/* CTA */}
        <div className="rounded-lg bg-gradient-to-br from-[#2D1810] to-[#241212] border border-[#C9A84C]/20 p-6 my-10 text-center">
          <p className="font-heading text-lg text-[#F5EBD8] mb-1 tracking-wide">Book a Reading with Manthan Anejaa</p>
          <p className="text-[#A89272] font-body text-sm mb-5">{SITE.positioning}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`${SITE.whatsapp}?text=Hi%20Manthan%2C%20I%20would%20like%20to%20book%20a%20Nadi%20Astrology%20consultation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#25D366] text-white font-heading font-semibold text-sm hover:brightness-110 transition-all"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp · {SITE.phoneDisplay}
            </a>
            <Link
              to="/#services"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-[#C9A84C]/40 text-[#F5EBD8] font-heading font-semibold text-sm hover:bg-[#C9A84C]/10 transition-all"
            >
              View Pricing <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* FAQs */}
        {page.faqs.length > 0 && (
          <section className="mb-10">
            <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#F5EBD8] mb-4 tracking-wide">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {page.faqs.map((f, i) => (
                <div key={i} className="rounded-lg bg-[#2D1810] border border-[#C9A84C]/15 p-5">
                  <h3 className="font-heading text-base font-medium text-[#F5EBD8] mb-2 flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-1" /> {f.q}
                  </h3>
                  <p className="text-[#A89272] font-body text-sm sm:text-base leading-relaxed pl-6">{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Internal links to sibling entity pages */}
        <section className="border-t border-[#C9A84C]/10 pt-8">
          <h2 className="font-heading text-lg font-semibold text-[#F5EBD8] mb-4 tracking-wide">Explore More</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                to={`/${o.slug}`}
                className="flex items-center justify-between gap-3 rounded-lg bg-[#2D1810] border border-[#C9A84C]/15 px-4 py-3 hover:border-[#C9A84C]/40 transition-all group"
              >
                <span className="text-[#F5EBD8] font-body text-sm">{o.navLabel}</span>
                <ArrowRight className="w-4 h-4 text-[#C9A84C] group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </section>

        <p className="text-[#A89272]/50 text-xs font-body mt-8">
          Last updated: {SITE.lastUpdated} · Author: {SITE.personName}, {SITE.role}
        </p>
      </article>
    </PageShell>
  );
}
