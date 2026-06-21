import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase.from('site_settings').select('*');
      if (error) throw error;
      // Convert to key-value object
      const settings = {};
      data.forEach(item => { settings[item.setting_key] = item.setting_value; });
      return res.status(200).json(settings);
    }
    if (req.method === 'POST') {
      const { settings } = req.body;
      for (const [key, value] of Object.entries(settings)) {
        await supabase
          .from('site_settings')
          .upsert({ setting_key: key, setting_value: value, updated_at: new Date().toISOString() }, { onConflict: 'setting_key' });
      }
      return res.status(200).json({ success: true });
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}