import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { slug, published } = req.query;
      
      if (slug) {
        const { data, error } = await supabase.from('blogs').select('*').eq('slug', slug).single();
        if (error) throw error;
        return res.status(200).json(data);
      }
      
      let query = supabase.from('blogs').select('*').order('created_at', { ascending: false });
      if (published === 'true') query = query.eq('is_published', true);
      const { data, error } = await query;
      if (error) throw error;
      return res.status(200).json(data);
    }
    if (req.method === 'POST') {
      const blog = {
        ...req.body,
        slug: req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        published_at: req.body.is_published ? new Date().toISOString() : null
      };
      const { data, error } = await supabase.from('blogs').insert(blog).select().single();
      if (error) throw error;
      return res.status(201).json(data);
    }
    if (req.method === 'PUT') {
      const { id, ...updates } = req.body;
      updates.updated_at = new Date().toISOString();
      if (updates.is_published && !updates.published_at) {
        updates.published_at = new Date().toISOString();
      }
      const { data, error } = await supabase.from('blogs').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return res.status(200).json(data);
    }
    if (req.method === 'DELETE') {
      const { id } = req.body;
      const { error } = await supabase.from('blogs').delete().eq('id', id);
      if (error) throw error;
      return res.status(200).json({ success: true });
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}