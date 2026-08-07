import { useParams, Link, Navigate } from 'react-router-dom';
import { MessageCircle, ArrowRight, Check, Clock } from 'lucide-react';
import PageShell from '../components/PageShell';
import Seo from '../components/Seo';
import { SITE } from '../data/site';
import { BLOG_POSTS, blogBySlug } from '../data/blog';

export default function ArticlePost() {
  const { slug } = useParams();
  const post = slug ? blogBySlug(slug) : undefined;
  if (!post) return <Navigate to="/articles" replace />;

  const canonical = `${SITE.domain}/articles/${post.slug}`;
  const others = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 4);

  const articleSchema = {
    '@type': 'BlogPosting',
    headline: post.h1,
    description: post.metaDescription,
    author: { '@type': 'Person', name: SITE.personName, '@id': `${SITE.domain}/#manthan` },
    publisher: { '@type': 'Organization', name: SITE.brand, '@id': `${SITE.domain}/#business` },
    mainEntityOfPage: canonical,
    datePublished: SITE.lastUpdated,
    dateModified: SITE.lastUpdated,
    keywords: post.keywords.join(', '),
    about: { '@id': `${SITE.domain}/#manthan` },
  };

  const faqSchema = post.faqs.length
    ? {
        '@type': 'FAQPage',
        mainEntity: post.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : undefined;

  return (
    <PageShell>
      <Seo
        title={post.title}
        description={post.metaDescription}
        canonical={canonical}
        schema={faqSchema ? ({ '@type': 'Collection', hasPart: [articleSchema, faqSchema] } as object) : articleSchema}
        breadcrumb={[
          { name: 'Home', url: SITE.domain },
          { name: 'Articles', url: `${SITE.domain}/articles` },
          { name: post.h1, url: canonical },
        ]}
      />

      <nav className="text-xs font-body text-[#A89272] mb-6">
        <Link to="/" className="hover:text-[#C9A84C]">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/articles" className="hover:text-[#C9A84C]">Articles</Link>
        <span className="mx-2">/</span>
        <span className="text-[#F5EBD8]">{post.h1}</span>
      </nav>

      <article>
        <div className="flex items-center gap-3 text-xs font-body text-[#C9A84C] mb-3">
          <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
          <span>·</span>
          <span>By {SITE.personName}</span>
        </div>

        <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#F5EBD8] mb-5 tracking-wide leading-tight">
          {post.h1}
        </h1>

        {/* Answer-first block */}
        <div className="rounded-lg bg-[#2D1810] border-l-4 border-[#C9A84C] p-5 sm:p-6 mb-8">
          <p className="text-[#F5EBD8] font-body text-base sm:text-lg leading-relaxed">{post.answer}</p>
        </div>

        {post.sections.map((s, i) => (
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

        {post.faqs.length > 0 && (
          <section className="mb-10">
            <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#F5EBD8] mb-4 tracking-wide">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {post.faqs.map((f, i) => (
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

        {/* Related posts */}
        <section className="border-t border-[#C9A84C]/10 pt-8">
          <h2 className="font-heading text-lg font-semibold text-[#F5EBD8] mb-4 tracking-wide">Read Next</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                to={`/articles/${o.slug}`}
                className="flex items-center justify-between gap-3 rounded-lg bg-[#2D1810] border border-[#C9A84C]/15 px-4 py-3 hover:border-[#C9A84C]/40 transition-all group"
              >
                <span className="text-[#F5EBD8] font-body text-sm">{o.h1}</span>
                <ArrowRight className="w-4 h-4 text-[#C9A84C] group-hover:translate-x-1 transition-transform flex-shrink-0" />
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
