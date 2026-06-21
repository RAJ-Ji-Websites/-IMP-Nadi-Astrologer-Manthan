import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Briefcase, MessageSquare, Star, Eye, TrendingUp, Users } from 'lucide-react';

interface Stats {
  blogs: number;
  services: number;
  testimonials: number;
  messages: number;
  unreadMessages: number;
}

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

export default function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [stats, setStats] = useState<Stats>({
    blogs: 0,
    services: 0,
    testimonials: 0,
    messages: 0,
    unreadMessages: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    { label: 'Blog Posts', value: stats.blogs, icon: FileText, color: 'from-blue-500/20 to-blue-600/20', onClick: () => onNavigate('blogs') },
    { label: 'Services', value: stats.services, icon: Briefcase, color: 'from-green-500/20 to-green-600/20', onClick: () => onNavigate('services') },
    { label: 'Testimonials', value: stats.testimonials, icon: Star, color: 'from-yellow-500/20 to-yellow-600/20', onClick: () => onNavigate('testimonials') },
    { label: 'Messages', value: stats.messages, icon: MessageSquare, color: 'from-purple-500/20 to-purple-600/20', badge: stats.unreadMessages > 0 ? stats.unreadMessages : undefined, onClick: () => onNavigate('messages') },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="font-heading text-2xl text-[#F5EBD8] tracking-wide">Dashboard</h1>
        <p className="text-[#A89272] font-body mt-1">Welcome back! Here's your website overview.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={card.onClick}
              className="cursor-pointer"
            >
              <div className={`p-6 rounded-xl bg-gradient-to-br ${card.color} border border-[#C9A84C]/10 hover:border-[#C9A84C]/30 transition-all`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#A89272] text-sm font-body">{card.label}</p>
                    <p className="text-3xl font-heading text-[#F5EBD8] mt-2">{card.value}</p>
                  </div>
                  <div className="relative">
                    <card.icon className="w-8 h-8 text-[#C9A84C]/50" />
                    {card.badge && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {card.badge}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="font-heading text-lg text-[#F5EBD8] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => onNavigate('blogs')}
            className="p-4 bg-[#2D1810] border border-[#C9A84C]/20 rounded-lg text-left hover:border-[#C9A84C]/40 transition-colors"
          >
            <FileText className="w-5 h-5 text-[#C9A84C] mb-2" />
            <p className="text-[#F5EBD8] font-heading">Add New Blog</p>
            <p className="text-[#A89272] text-xs font-body mt-1">Write and publish a new article</p>
          </button>
          <button
            onClick={() => onNavigate('testimonials')}
            className="p-4 bg-[#2D1810] border border-[#C9A84C]/20 rounded-lg text-left hover:border-[#C9A84C]/40 transition-colors"
          >
            <Star className="w-5 h-5 text-[#C9A84C] mb-2" />
            <p className="text-[#F5EBD8] font-heading">Add Testimonial</p>
            <p className="text-[#A89272] text-xs font-body mt-1">Add a new client review</p>
          </button>
          <button
            onClick={() => onNavigate('settings')}
            className="p-4 bg-[#2D1810] border border-[#C9A84C]/20 rounded-lg text-left hover:border-[#C9A84C]/40 transition-colors"
          >
            <TrendingUp className="w-5 h-5 text-[#C9A84C] mb-2" />
            <p className="text-[#F5EBD8] font-heading">Site Settings</p>
            <p className="text-[#A89272] text-xs font-body mt-1">Update website content</p>
          </button>
        </div>
      </div>
    </div>
  );
}