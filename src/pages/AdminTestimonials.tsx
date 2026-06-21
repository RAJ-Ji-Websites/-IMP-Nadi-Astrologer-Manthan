import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Star, Check, X } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  review: string;
  service_type: string;
  is_approved: boolean;
}

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rating: 5,
    review: '',
    service_type: '',
    is_approved: true
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      setTestimonials(data);
    } catch (err) {
      console.error('Failed to fetch testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const testimonialData = {
        ...formData,
        id: editingTestimonial?.id
      };

      if (editingTestimonial) {
        await fetch('/api/testimonials', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(testimonialData)
        });
      } else {
        await fetch('/api/testimonials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...testimonialData, sort_order: testimonials.length + 1 })
        });
      }

      setShowEditor(false);
      setEditingTestimonial(null);
      setFormData({ name: '', location: '', rating: 5, review: '', service_type: '', is_approved: true });
      fetchTestimonials();
    } catch (err) {
      console.error('Failed to save testimonial:', err);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      location: testimonial.location || '',
      rating: testimonial.rating,
      review: testimonial.review,
      service_type: testimonial.service_type || '',
      is_approved: testimonial.is_approved
    });
    setShowEditor(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      await fetch('/api/testimonials', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      fetchTestimonials();
    } catch (err) {
      console.error('Failed to delete testimonial:', err);
    }
  };

  const toggleApproval = async (testimonial: Testimonial) => {
    try {
      await fetch('/api/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: testimonial.id, is_approved: !testimonial.is_approved })
      });
      fetchTestimonials();
    } catch (err) {
      console.error('Failed to update:', err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-heading text-2xl text-[#F5EBD8]">Testimonials</h1>
          <p className="text-[#A89272] font-body text-sm mt-1">Manage client reviews</p>
        </div>
        <button
          onClick={() => { setShowEditor(true); setEditingTestimonial(null); setFormData({ name: '', location: '', rating: 5, review: '', service_type: '', is_approved: true }); }}
          className="flex items-center gap-2 px-4 py-2 bg-[#C9A84C] text-[#1A0A0A] font-heading text-sm rounded-lg hover:bg-[#DFC07A]"
        >
          <Plus className="w-4 h-4" />
          Add Review
        </button>
      </div>

      {showEditor && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg bg-[#2D1810] rounded-xl border border-[#C9A84C]/20">
            <div className="p-4 border-b border-[#C9A84C]/10">
              <h2 className="font-heading text-xl text-[#F5EBD8]">{editingTestimonial ? 'Edit' : 'Add'} Review</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#A89272] text-sm mb-2">Name *</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 bg-[#1A0A0A] border border-[#C9A84C]/20 rounded-lg text-[#F5EBD8]" required />
                </div>
                <div>
                  <label className="block text-[#A89272] text-sm mb-2">Location</label>
                  <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="Delhi, India" className="w-full px-4 py-3 bg-[#1A0A0A] border border-[#C9A84C]/20 rounded-lg text-[#F5EBD8]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#A89272] text-sm mb-2">Rating</label>
                  <select value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })} className="w-full px-4 py-3 bg-[#1A0A0A] border border-[#C9A84C]/20 rounded-lg text-[#F5EBD8]">
                    {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[#A89272] text-sm mb-2">Service</label>
                  <input type="text" value={formData.service_type} onChange={(e) => setFormData({ ...formData, service_type: e.target.value })} placeholder="Trikal Darshan" className="w-full px-4 py-3 bg-[#1A0A0A] border border-[#C9A84C]/20 rounded-lg text-[#F5EBD8]" />
                </div>
              </div>
              <div>
                <label className="block text-[#A89272] text-sm mb-2">Review *</label>
                <textarea value={formData.review} onChange={(e) => setFormData({ ...formData, review: e.target.value })} rows={4} className="w-full px-4 py-3 bg-[#1A0A0A] border border-[#C9A84C]/20 rounded-lg text-[#F5EBD8]" required />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={formData.is_approved} onChange={(e) => setFormData({ ...formData, is_approved: e.target.checked })} className="w-5 h-5 rounded" />
                <span className="text-[#F5EBD8] text-sm">Approved (visible on website)</span>
              </label>
              <div className="flex gap-4">
                <button type="button" onClick={() => setShowEditor(false)} className="flex-1 py-3 border border-[#C9A84C]/30 text-[#A89272] rounded-lg">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-[#C9A84C] text-[#1A0A0A] rounded-lg">Save</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center h-64"><div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="space-y-3">
          {testimonials.map((t) => (
            <div key={t.id} className={`p-4 bg-[#2D1810] border rounded-lg ${t.is_approved ? 'border-[#C9A84C]/10' : 'border-yellow-500/20'}`}>
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading text-[#F5EBD8]">{t.name}</h3>
                    <div className="flex">{[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 text-[#C9A84C] fill-[#C9A84C]" />)}</div>
                  </div>
                  <p className="text-[#A89272] text-sm">{t.location} • {t.service_type}</p>
                  <p className="text-[#A89272]/70 text-sm mt-2">{t.review}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => toggleApproval(t)} className={`p-2 ${t.is_approved ? 'text-green-400' : 'text-yellow-400'}`}>
                    {t.is_approved ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                  </button>
                  <button onClick={() => handleEdit(t)} className="p-2 text-[#A89272] hover:text-[#C9A84C]"><Edit className="w-5 h-5" /></button>
                  <button onClick={() => handleDelete(t.id)} className="p-2 text-[#A89272] hover:text-red-400"><Trash2 className="w-5 h-5" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}