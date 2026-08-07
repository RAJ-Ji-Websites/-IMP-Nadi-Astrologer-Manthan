import { Link } from 'react-router-dom';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';
import PageShell from '../components/PageShell';
import Seo from '../components/Seo';
import { SITE } from '../data/site';
import { BLOG_POSTS } from '../data/blog';

export default function ArticlesIndex() {
  const canonical = `${SITE.domain}/articles`;

  const schema = {
    '@type': 'Blog',
    '@id': `${SITE.domain}/articles`,
    name: 'Saatvik Jyotish Blog — Nadi Astrology, Numerology & Palmistry',
    description:
      'Honest astrology insights by Manthan Anejaa — Nadi Astrology, Numerology and Palmistry, without remedies or fear.',
    publisher: { '@id': `${SITE.domain}/#business` },
    blogPost: BLOG_POSTS.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.h1,
      url: `${SITE.domain}/articles/${p.slug}`,
      datePublished: SITE.lastUpdated,
      author: { '@type': 'Person', name: SITE.personName },
    })),
  };

  return (
    <PageShell>
      <Seo
        title="Blog — Honest Nadi Astrology Insights by Manthan Anejaa | Saatvik Jyotish"
        description="Read honest astrology insights by Manthan Anejaa — the best Nadi Astrologer in Haryana. Guides on Nadi Astrology, Numerology, Palmistry, and astrology without remedies."
        canonical={canonical}
        schema={schema}
        breadcrumb={[
          { name: 'Home', url: SITE.domain },
          { name: 'Articles', url: canonical },
        ]}
      />

      <nav className="text-xs font-body text-[#A89272] mb-6">
        <Link to="/" className="hover:text-[#C9A84C]">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[#F5EBD8]">Articles</span>
      </nav>

      <header className="mb-10">
        <div className="flex items-center gap-2 text-[#C9A84C] mb-3">
          <BookOpen className="w-5 h-5" />
          <span className="text-xs font-body uppercase tracking-[0.15em]">Saatvik Jyotish Blog</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-[#F5EBD8] mb-3 tracking-wide leading-tight">
          Honest Astrology Insights
        </h1>
        <p className="text-[#A89272] font-body text-base sm:text-lg leading-relaxed max-w-2xl">
          Guides on Nadi Astrology, Numerology and Palmistry by Manthan Anejaa — the honest astrologer.
          No remedies. No gemstones. No fear. Only clarity.
        </p>
      </header>

      <div className="space-y-4">
        {BLOG_POSTS.map((p) => (
          <Link
            key={p.slug}
            to={`/articles/${p.slug}`}
            className="block rounded-xl bg-[#2D1810] border border-[#C9A84C]/15 p-6 hover:border-[#C9A84C]/40 transition-all group"
          >
            <div className="flex items-center gap-3 text-xs font-body text-[#C9A84C] mb-2">
              <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {p.readTime}</span>
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#F5EBD8] mb-2 tracking-wide group-hover:text-[#DFC07A] transition-colors">
              {p.h1}
            </h2>
            <p className="text-[#A89272] font-body text-sm sm:text-base leading-relaxed mb-3">{p.excerpt}</p>
            <span className="inline-flex items-center gap-2 text-[#C9A84C] font-body text-sm">
              Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
