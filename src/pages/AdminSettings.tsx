import { useState, useEffect } from 'react';
import { Save, Loader2 } from 'lucide-react';

interface Settings {
  [key: string]: string;
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/site-settings');
      const data = await res.json();
      setSettings(data);
    } catch (err) {
      console.error('Failed to fetch settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/site-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings })
      });
      alert('Settings saved successfully!');
    } catch (err) {
      console.error('Failed to save:', err);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl text-[#F5EBD8]">Site Settings</h1>
          <p className="text-[#A89272] font-body text-sm mt-1">Update website content and information</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-[#C9A84C] text-[#1A0A0A] font-heading rounded-lg hover:bg-[#DFC07A] disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </button>
      </div>

      <div className="space-y-8">
        {/* Hero Section */}
        <div className="bg-[#2D1810] border border-[#C9A84C]/10 rounded-lg p-6">
          <h2 className="font-heading text-lg text-[#C9A84C] mb-4">Hero Section</h2>
          <div className="grid gap-4">
            <div>
              <label className="block text-[#A89272] text-sm mb-2">Title Line 1</label>
              <input
                type="text"
                value={settings.hero_title_line1 || ''}
                onChange={(e) => updateSetting('hero_title_line1', e.target.value)}
                className="w-full px-4 py-3 bg-[#1A0A0A] border border-[#C9A84C]/20 rounded-lg text-[#F5EBD8]"
              />
            </div>
            <div>
              <label className="block text-[#A89272] text-sm mb-2">Title Line 2</label>
              <input
                type="text"
                value={settings.hero_title_line2 || ''}
                onChange={(e) => updateSetting('hero_title_line2', e.target.value)}
                className="w-full px-4 py-3 bg-[#1A0A0A] border border-[#C9A84C]/20 rounded-lg text-[#F5EBD8]"
              />
            </div>
            <div>
              <label className="block text-[#A89272] text-sm mb-2">Subtitle</label>
              <input
                type="text"
                value={settings.hero_subtitle || ''}
                onChange={(e) => updateSetting('hero_subtitle', e.target.value)}
                className="w-full px-4 py-3 bg-[#1A0A0A] border border-[#C9A84C]/20 rounded-lg text-[#F5EBD8]"
              />
            </div>
            <div>
              <label className="block text-[#A89272] text-sm mb-2">Description</label>
              <textarea
                value={settings.hero_description || ''}
                onChange={(e) => updateSetting('hero_description', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-[#1A0A0A] border border-[#C9A84C]/20 rounded-lg text-[#F5EBD8]"
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-[#2D1810] border border-[#C9A84C]/10 rounded-lg p-6">
          <h2 className="font-heading text-lg text-[#C9A84C] mb-4">About Section</h2>
          <div className="grid gap-4">
            <div>
              <label className="block text-[#A89272] text-sm mb-2">About Title</label>
              <input
                type="text"
                value={settings.about_title || ''}
                onChange={(e) => updateSetting('about_title', e.target.value)}
                className="w-full px-4 py-3 bg-[#1A0A0A] border border-[#C9A84C]/20 rounded-lg text-[#F5EBD8]"
              />
            </div>
            <div>
              <label className="block text-[#A89272] text-sm mb-2">About Description</label>
              <textarea
                value={settings.about_description || ''}
                onChange={(e) => updateSetting('about_description', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-[#1A0A0A] border border-[#C9A84C]/20 rounded-lg text-[#F5EBD8]"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-[#2D1810] border border-[#C9A84C]/10 rounded-lg p-6">
          <h2 className="font-heading text-lg text-[#C9A84C] mb-4">Contact Information</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#A89272] text-sm mb-2">Business Name</label>
              <input
                type="text"
                value={settings.business_name || ''}
                onChange={(e) => updateSetting('business_name', e.target.value)}
                className="w-full px-4 py-3 bg-[#1A0A0A] border border-[#C9A84C]/20 rounded-lg text-[#F5EBD8]"
              />
            </div>
            <div>
              <label className="block text-[#A89272] text-sm mb-2">Phone</label>
              <input
                type="text"
                value={settings.phone || ''}
                onChange={(e) => updateSetting('phone', e.target.value)}
                className="w-full px-4 py-3 bg-[#1A0A0A] border border-[#C9A84C]/20 rounded-lg text-[#F5EBD8]"
              />
            </div>
            <div>
              <label className="block text-[#A89272] text-sm mb-2">Email</label>
              <input
                type="email"
                value={settings.email || ''}
                onChange={(e) => updateSetting('email', e.target.value)}
                className="w-full px-4 py-3 bg-[#1A0A0A] border border-[#C9A84C]/20 rounded-lg text-[#F5EBD8]"
              />
            </div>
            <div>
              <label className="block text-[#A89272] text-sm mb-2">WhatsApp (with country code)</label>
              <input
                type="text"
                value={settings.whatsapp || ''}
                onChange={(e) => updateSetting('whatsapp', e.target.value)}
                className="w-full px-4 py-3 bg-[#1A0A0A] border border-[#C9A84C]/20 rounded-lg text-[#F5EBD8]"
              />
            </div>
            <div>
              <label className="block text-[#A89272] text-sm mb-2">Instagram Username</label>
              <input
                type="text"
                value={settings.instagram || ''}
                onChange={(e) => updateSetting('instagram', e.target.value)}
                className="w-full px-4 py-3 bg-[#1A0A0A] border border-[#C9A84C]/20 rounded-lg text-[#F5EBD8]"
              />
            </div>
            <div>
              <label className="block text-[#A89272] text-sm mb-2">Reviews Count</label>
              <input
                type="text"
                value={settings.reviews_count || ''}
                onChange={(e) => updateSetting('reviews_count', e.target.value)}
                className="w-full px-4 py-3 bg-[#1A0A0A] border border-[#C9A84C]/20 rounded-lg text-[#F5EBD8]"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-[#A89272] text-sm mb-2">Business Address</label>
            <textarea
              value={settings.address || ''}
              onChange={(e) => updateSetting('address', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-[#1A0A0A] border border-[#C9A84C]/20 rounded-lg text-[#F5EBD8]"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-8 py-3 bg-[#C9A84C] text-[#1A0A0A] font-heading rounded-lg hover:bg-[#DFC07A] disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save All Changes
        </button>
      </div>
    </div>
  );
}