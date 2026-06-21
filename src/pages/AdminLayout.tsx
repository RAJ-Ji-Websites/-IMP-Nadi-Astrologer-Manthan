import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, FileText, Briefcase, Star, MessageSquare, Settings, 
  LogOut, Menu, X, ChevronRight, ExternalLink 
} from 'lucide-react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AdminBlogs from './AdminBlogs';
import AdminServices from './AdminServices';
import AdminTestimonials from './AdminTestimonials';
import AdminMessages from './AdminMessages';
import AdminSettings from './AdminSettings';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'blogs', label: 'Blog Posts', icon: FileText },
  { id: 'services', label: 'Services', icon: Briefcase },
  { id: 'testimonials', label: 'Testimonials', icon: Star },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'settings', label: 'Site Settings', icon: Settings },
];

export default function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('admin_authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <AdminDashboard onNavigate={setCurrentPage} />;
      case 'blogs':
        return <AdminBlogs />;
      case 'services':
        return <AdminServices />;
      case 'testimonials':
        return <AdminTestimonials />;
      case 'messages':
        return <AdminMessages />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminDashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#1A0A0A] flex">
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col bg-[#2D1810] border-r border-[#C9A84C]/10 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-4 border-b border-[#C9A84C]/10">
          <div className="flex items-center gap-3">
            <span className="text-2xl text-[#C9A84C]">ॐ</span>
            {sidebarOpen && <span className="font-heading text-lg text-[#F5EBD8]">Admin</span>}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === item.id 
                  ? 'bg-[#C9A84C]/20 text-[#C9A84C]' 
                  : 'text-[#A89272] hover:bg-[#C9A84C]/10 hover:text-[#F5EBD8]'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-body text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-[#C9A84C]/10 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#A89272] hover:bg-[#C9A84C]/10 hover:text-[#F5EBD8] transition-colors"
          >
            <ExternalLink className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="font-body text-sm">View Site</span>}
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="font-body text-sm">Logout</span>}
          </button>
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute top-20 -right-3 w-6 h-6 bg-[#C9A84C] text-[#1A0A0A] rounded-full flex items-center justify-center"
        >
          <ChevronRight className={`w-4 h-4 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
        </button>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#2D1810] border-b border-[#C9A84C]/10 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl text-[#C9A84C]">ॐ</span>
            <span className="font-heading text-lg text-[#F5EBD8]">Admin Panel</span>
          </div>
          <button onClick={() => setMobileMenuOpen(true)} className="text-[#F5EBD8]">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-[60] bg-[#1A0A0A]/95 backdrop-blur-xl"
          >
            <div className="p-4 flex justify-between items-center border-b border-[#C9A84C]/10">
              <span className="font-heading text-lg text-[#F5EBD8]">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-[#F5EBD8]">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="p-4 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    currentPage === item.id 
                      ? 'bg-[#C9A84C]/20 text-[#C9A84C]' 
                      : 'text-[#A89272] hover:bg-[#C9A84C]/10 hover:text-[#F5EBD8]'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-body">{item.label}</span>
                </button>
              ))}
              <hr className="border-[#C9A84C]/10 my-4" />
              <a
                href="/"
                target="_blank"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#A89272] hover:bg-[#C9A84C]/10"
              >
                <ExternalLink className="w-5 h-5" />
                <span className="font-body">View Site</span>
              </a>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-body">Logout</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 lg:pt-0 pt-16 overflow-auto">
        {renderPage()}
      </main>
    </div>
  );
}