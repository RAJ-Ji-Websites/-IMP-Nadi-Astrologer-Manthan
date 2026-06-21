import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    const [blogsResult, servicesResult, testimonialsResult, messagesResult, unreadResult] = await Promise.all([
      supabase.from('blogs').select('id', { count: 'exact' }),
      supabase.from('services').select('id', { count: 'exact' }),
      supabase.from('testimonials').select('id', { count: 'exact' }),
      supabase.from('contact_messages').select('id', { count: 'exact' }),
      supabase.from('contact_messages').select('id', { count: 'exact' }).eq('is_read', false)
    ]);

    res.status(200).json({
      blogs: blogsResult.count || 0,
      services: servicesResult.count || 0,
      testimonials: testimonialsResult.count || 0,
      messages: messagesResult.count || 0,
      unreadMessages: unreadResult.count || 0
    });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}