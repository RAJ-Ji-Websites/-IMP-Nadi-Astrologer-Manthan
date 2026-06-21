import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Tag, Share2 } from 'lucide-react';

interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  meta_title: string;
  meta_description: string;
  published_at: string;
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const res = await fetch(`/api/blogs?slug=${slug}`);
      if (!res.ok) {
        setNotFound(true);
        return;
      }
      const data = await res.json();
      setBlog(data);
    } catch (err) {
      console.error('Failed to fetch blog:', err);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1A0A0A] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !blog) {
    return (
      <div className="min-h-screen bg-[#1A0A0A] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl text-[#F5EBD8] mb-4">Blog Not Found</h1>
          <Link to="/blog" className="text-[#C9A84C] hover:underline">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <div className="site-background" />
      <div className="site-overlay" />
      
      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Back Link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[#A89272] hover:text-[#C9A84C] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <article>
            {/* Header */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center gap-4 text-sm text-[#A89272] mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(blog.published_at).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </span>
                <span className="px-3 py-1 bg-[#C9A84C]/10 text-[#C9A84C] rounded-full text-xs">
                  {blog.category}
                </span>
              </div>
              
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F5EBD8] leading-tight">
                {blog.title}
              </h1>
            </motion.header>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="prose prose-lg prose-invert max-w-none"
            >
              <div 
                className="blog-content text-[#A89272] font-body leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </motion.div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-[#C9A84C]/10">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="w-4 h-4 text-[#A89272]" />
                  {blog.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-[#2D1810] text-[#A89272] text-sm rounded-full border border-[#C9A84C]/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share */}
            <div className="mt-8 flex items-center gap-4">
              <span className="text-[#A89272] text-sm">Share:</span>
              <button
                onClick={() => {
                  navigator.share?.({
                    title: blog.title,
                    url: window.location.href
                  }) || navigator.clipboard.writeText(window.location.href);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#2D1810] border border-[#C9A84C]/20 rounded-lg text-[#A89272] hover:text-[#C9A84C] hover:border-[#C9A84C]/40 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share Article
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}