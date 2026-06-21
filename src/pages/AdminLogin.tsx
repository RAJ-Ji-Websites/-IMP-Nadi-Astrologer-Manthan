import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simple password check - in production, use proper auth
      if (password === 'manthan@2026' || password === 'admin123') {
        localStorage.setItem('admin_authenticated', 'true');
        onLogin();
      } else {
        setError('Invalid password. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A0A0A] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <span className="text-4xl text-[#C9A84C]">ॐ</span>
          <h1 className="font-heading text-2xl text-[#F5EBD8] mt-4 tracking-wide">Admin Panel</h1>
          <p className="text-[#A89272] font-body mt-2">Enter your password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A89272]" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full pl-12 pr-12 py-4 bg-[#2D1810] border border-[#C9A84C]/20 rounded-lg text-[#F5EBD8] font-body focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A89272] hover:text-[#C9A84C]"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm font-body">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-[#C9A84C] to-[#DFC07A] text-[#1A0A0A] font-heading font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-[#A89272]/50 text-xs font-body mt-8">
          Manthan Speaks Admin Dashboard
        </p>
      </motion.div>
    </div>
  );
}