import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  is_published: boolean;
  published_at: string;
  created_at?: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs?published=true');
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...new Set(blogs.map(b => b.category).filter(Boolean))];
  const filteredBlogs = selectedCategory === 'all' 
    ? blogs 
    : blogs.filter(b => b.category === selectedCategory);

  return (
    <div className="min-h-screen relative">
      <div className="site-background" />
      <div className="site-overlay" />
      
      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#C9A84C] text-sm font-body uppercase tracking-[0.2em] mb-4"
            >
              Insights & Wisdom
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F5EBD8] mb-4 tracking-wide"
            >
              Blog & <span className="gold-gradient">Articles</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#A89272] text-lg max-w-2xl mx-auto font-body"
            >
              Explore insights on Nadi Astrology, Numerology, Palmistry, and spiritual guidance
            </motion.p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-body text-sm transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#C9A84C] text-[#1A0A0A]'
                    : 'bg-[#2D1810] text-[#A89272] border border-[#C9A84C]/20 hover:border-[#C9A84C]/40'
                }`}
              >
                {cat === 'all' ? 'All Posts' : cat}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-20 text-[#A89272] font-body">
              No blog posts found.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={`/blog/${blog.slug}`}
                    className="block group"
                  >
                    <div className="bg-[#2D1810] border border-[#C9A84C]/10 rounded-xl overflow-hidden hover:border-[#C9A84C]/30 transition-all hover:shadow-xl hover:shadow-[#C9A84C]/5">
                      {/* Placeholder Image */}
                      <div className="aspect-video bg-gradient-to-br from-[#371C12] to-[#1A0A0A] flex items-center justify-center">
                        <span className="text-4xl text-[#C9A84C]/30">ॐ</span>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-xs text-[#A89272] mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(blog.published_at).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </span>
                          <span className="px-2 py-0.5 bg-[#C9A84C]/10 text-[#C9A84C] rounded-full">
                            {blog.category}
                          </span>
                        </div>
                        
                        <h2 className="font-heading text-lg text-[#F5EBD8] mb-2 group-hover:text-[#C9A84C] transition-colors line-clamp-2">
                          {blog.title}
                        </h2>
                        
                        <p className="text-[#A89272] text-sm font-body line-clamp-3 mb-4">
                          {blog.excerpt}
                        </p>
                        
                        <div className="flex items-center gap-1 text-[#C9A84C] text-sm font-body">
                          Read More
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}