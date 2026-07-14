import { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
  canonical: string;
  schema?: object;
  breadcrumb?: { name: string; url: string }[];
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

// Injects per-page title, meta, canonical and JSON-LD. All page-scoped tags are
// tagged data-seo so they can be cleaned up on route change (SPA safe).
export default function Seo({ title, description, canonical, schema, breadcrumb }: SeoProps) {
  useEffect(() => {
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'twitter:title', title);
    setMeta('property', 'twitter:description', description);

    // Canonical
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonical;

    // Clean previous page-scoped JSON-LD
    document.head.querySelectorAll('script[data-seo="page"]').forEach((n) => n.remove());

    const graph: object[] = [];
    if (schema) graph.push(schema);
    if (breadcrumb && breadcrumb.length) {
      graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumb.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: b.name,
          item: b.url,
        })),
      });
    }
    if (graph.length) {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.setAttribute('data-seo', 'page');
      s.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
      document.head.appendChild(s);
    }

    window.scrollTo(0, 0);
  }, [title, description, canonical, schema, breadcrumb]);

  return null;
}
