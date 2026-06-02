import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react';

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// Sample Instagram posts data - showing engagement stats
const instagramPosts = [
  { id: 1, likes: '2.4k', comments: '89' },
  { id: 2, likes: '1.8k', comments: '56' },
  { id: 3, likes: '3.1k', comments: '124' },
  { id: 4, likes: '2.9k', comments: '98' },
  { id: 5, likes: '4.2k', comments: '156' },
  { id: 6, likes: '1.5k', comments: '45' },
];

export default function InstagramFeed() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 lg:py-24 bg-[#1A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10 mb-6">
            <Instagram className="w-4 h-4 text-[#C9A84C]" />
            <span className="text-xs font-body text-[#C9A84C] uppercase tracking-[0.2em]">@manthan_speaks_</span>
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#F5EBD8] mb-4 tracking-wide">
            Follow on <span className="gold-gradient">Instagram</span>
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-[#A89272] text-lg max-w-2xl mx-auto font-body">
            Daily insights, predictions, and astrological wisdom. Join 26K+ followers.
          </motion.p>
        </motion.div>

        {/* Instagram Grid */}
        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {instagramPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href="https://instagram.com/manthan_speaks_"
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeInUp}
              className="group relative aspect-square bg-gradient-to-br from-[#2D1810] via-[#371C12] to-[#1A0A0A] rounded-lg overflow-hidden border border-[#C9A84C]/10 hover:border-[#C9A84C]/40 transition-all duration-300"
            >
              {/* Mystical Pattern Background */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 30% 30%, rgba(201, 168, 76, 0.3) 0%, transparent 50%),
                                    radial-gradient(circle at 70% 70%, rgba(139, 26, 26, 0.3) 0%, transparent 50%)`
                }} />
              </div>
              
              {/* Instagram Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <Instagram className="w-10 h-10 text-[#C9A84C]/40 group-hover:text-[#C9A84C]/60 transition-colors duration-300" />
                  <div className="absolute inset-0 blur-xl bg-[#C9A84C]/20 rounded-full" />
                </div>
              </div>
              
              {/* Hover Overlay with Stats */}
              <div className="absolute inset-0 bg-[#1A0A0A]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2 text-[#F5EBD8]">
                  <Heart className="w-5 h-5 fill-[#C9A84C] text-[#C9A84C]" />
                  <span className="text-sm font-body font-medium">{post.likes}</span>
                </div>
                <div className="flex items-center gap-2 text-[#F5EBD8]">
                  <MessageCircle className="w-5 h-5 text-[#C9A84C]" />
                  <span className="text-sm font-body font-medium">{post.comments}</span>
                </div>
              </div>

              {/* Top Right External Link */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ExternalLink className="w-4 h-4 text-[#F5EBD8]/70" />
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Follow Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-10 text-center"
        >
          <a
            href="https://instagram.com/manthan_speaks_"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-heading font-medium border border-[#C9A84C]/30 text-[#F5EBD8] hover:border-[#C9A84C]/60 hover:bg-[#C9A84C]/5 transition-all tracking-wide"
          >
            <Instagram className="w-5 h-5" />
            Follow @manthan_speaks_
          </a>
        </motion.div>
      </div>
    </section>
  );
}
