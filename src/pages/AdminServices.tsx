import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, GripVertical, Star, StarOff } from 'lucide-react';

interface Service {
  id: number;
  name: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  is_popular: boolean;
  is_active: boolean;
  sort_order: number;
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    duration: '',
    description: '',
    features: '',
    is_popular: false,
    is_active: true
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error('Failed to fetch services:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const serviceData = {
        ...formData,
        features: formData.features.split('\n').filter(f => f.trim()),
        id: editingService?.id
      };

      if (editingService) {
        await fetch('/api/services', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(serviceData)
        });
      } else {
        await fetch('/api/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...serviceData, sort_order: services.length + 1 })
        });
      }

      setShowEditor(false);
      setEditingService(null);
      setFormData({ name: '', price: '', duration: '', description: '', features: '', is_popular: false, is_active: true });
      fetchServices();
    } catch (err) {
      console.error('Failed to save service:', err);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      price: service.price,
      duration: service.duration,
      description: service.description,
      features: (service.features || []).join('\n'),
      is_popular: service.is_popular,
      is_active: service.is_active
    });
    setShowEditor(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      await fetch('/api/services', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      fetchServices();
    } catch (err) {
      console.error('Failed to delete service:', err);
    }
  };

  const togglePopular = async (service: Service) => {
    try {
      await fetch('/api/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: service.id, is_popular: !service.is_popular })
      });
      fetchServices();
    } catch (err) {
      console.error('Failed to update service:', err);
    }
  };

  const toggleActive = async (service: Service) => {
    try {
      await fetch('/api/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: service.id, is_active: !service.is_active })
      });
      fetchServices();
    } catch (err) {
      console.error('Failed to update service:', err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-heading text-2xl text-[#F5EBD8]">Services</h1>
          <p className="text-[#A89272] font-body text-sm mt-1">Manage your consultation services</p>
        </div>
        <button
          onClick={() => { setShowEditor(true); setEditingService(null); setFormData({ name: '', price: '', duration: '', description: '', features: '', is_popular: false, is_active: true }); }}
          className="flex items-center gap-2 px-4 py-2 bg-[#C9A84C] text-[#1A0A0A] font-heading text-sm rounded-lg hover:bg-[#DFC07A] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      </div>

      {/* Editor Modal */}
      {showEditor && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg bg-[#2D1810] rounded-xl border border-[#C9A84C]/20 max-h-[90vh] overflow-auto"
          >
            <div className="p-4 border-b border-[#C9A84C]/10">
              <h2 className="font-heading text-xl text-[#F5EBD8]">
                {editingService ? 'Edit Service' : 'New Service'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-[#A89272] font-body text-sm mb-2">Service Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-[#1A0A0A] border border-[#C9A84C]/20 rounded-lg text-[#F5EBD8] font-body"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#A89272] font-body text-sm mb-2">Price *</label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="₹4,100"
                    className="w-full px-4 py-3 bg-[#1A0A0A] border border-[#C9A84C]/20 rounded-lg text-[#F5EBD8] font-body"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#A89272] font-body text-sm mb-2">Duration *</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="30 minutes"
                    className="w-full px-4 py-3 bg-[#1A0A0A] border border-[#C9A84C]/20 rounded-lg text-[#F5EBD8] font-body"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#A89272] font-body text-sm mb-2">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Complete life overview"
                  className="w-full px-4 py-3 bg-[#1A0A0A] border border-[#C9A84C]/20 rounded-lg text-[#F5EBD8] font-body"
                />
              </div>

              <div>
                <label className="block text-[#A89272] font-body text-sm mb-2">Features (one per line)</label>
                <textarea
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  rows={4}
                  placeholder="Past verification&#10;Present analysis&#10;Future roadmap"
                  className="w-full px-4 py-3 bg-[#1A0A0A] border border-[#C9A84C]/20 rounded-lg text-[#F5EBD8] font-body"
                />
              </div>

              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_popular}
                    onChange={(e) => setFormData({ ...formData, is_popular: e.target.checked })}
                    className="w-5 h-5 rounded border-[#C9A84C]/30 bg-[#1A0A0A] text-[#C9A84C]"
                  />
                  <span className="text-[#F5EBD8] font-body text-sm">Mark as Popular</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-5 h-5 rounded border-[#C9A84C]/30 bg-[#1A0A0A] text-[#C9A84C]"
                  />
                  <span className="text-[#F5EBD8] font-body text-sm">Active</span>
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditor(false)}
                  className="flex-1 py-3 border border-[#C9A84C]/30 text-[#A89272] font-heading rounded-lg hover:bg-[#C9A84C]/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#C9A84C] text-[#1A0A0A] font-heading rounded-lg hover:bg-[#DFC07A]"
                >
                  {editingService ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Services List */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-3">
          {services.map((service) => (
            <div
              key={service.id}
              className={`p-4 bg-[#2D1810] border rounded-lg ${service.is_active ? 'border-[#C9A84C]/10' : 'border-red-500/20 opacity-60'}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GripVertical className="w-5 h-5 text-[#A89272]/50" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading text-lg text-[#F5EBD8]">{service.name}</h3>
                      {service.is_popular && (
                        <span className="px-2 py-0.5 bg-[#C9A84C]/20 text-[#C9A84C] text-xs rounded-full font-body">Popular</span>
                      )}
                    </div>
                    <p className="text-[#C9A84C] font-heading">{service.price} • {service.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => togglePopular(service)}
                    className={`p-2 transition-colors ${service.is_popular ? 'text-[#C9A84C]' : 'text-[#A89272] hover:text-[#C9A84C]'}`}
                    title={service.is_popular ? 'Remove Popular' : 'Mark Popular'}
                  >
                    {service.is_popular ? <Star className="w-5 h-5 fill-current" /> : <StarOff className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => handleEdit(service)}
                    className="p-2 text-[#A89272] hover:text-[#C9A84C]"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="p-2 text-[#A89272] hover:text-red-400"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}