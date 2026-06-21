import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, EyeOff, Search, X, Save } from 'lucide-react';

interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  is_published: boolean;
  created_at: string;
}

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'Astrology',
    tags: '',
    is_published: false
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const blogData = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        id: editingBlog?.id
      };

      if (editingBlog) {
        await fetch('/api/blogs', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(blogData)
        });
      } else {
        await fetch('/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(blogData)
        });
      }

      setShowEditor(false);
      setEditingBlog(null);
      setFormData({ title: '', content: '', excerpt: '', category: 'Astrology', tags: '', is_published: false });
      fetchBlogs();
    } catch (err) {
      console.error('Failed to save blog:', err);
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content || '',
      excerpt: blog.excerpt || '',
      category: blog.category || 'Astrology',
      tags: (blog.tags || []).join(', '),
      is_published: blog.is_published
    });
    setShowEditor(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    try {
      await fetch('/api/blogs', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      fetchBlogs();
    } catch (err) {
      console.error('Failed to delete blog:', err);
    }
  };

  const togglePublish = async (blog: Blog) => {
    try {
      await fetch('/api/blogs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: blog.id, is_published: !blog.is_published })
      });
      fetchBlogs();
    } catch (err) {
      console.error('Failed to update blog:', err);
    }
  };

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-heading text-2xl text-[#F5EBD8]">Blog Posts</h1>
          <p className="text-[#A89272] font-body text-sm mt-1">Manage your blog articles</p>
        </div>
        <button
          onClick={() => { setShowEditor(true); setEditingBlog(null); setFormData({ title: '', content: '', excerpt: '', category: 'Astrology', tags: '', is_published: false }); }}
          className="flex items-center gap-2 px-4 py-2 bg-[#C9A84C] text-[#1A0A0A] font-heading text-sm rounded-lg hover:bg-[#DFC07A] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New Post
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A89272]" />
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-[#2D1810] border border-[#C9A84C]/20 rounded-lg text-[#F5EBD8] font-body focus:outline-none focus:border-[#C9A84C]/50"
        />
      </div>

      {/* Blog Editor Modal */}
      {showEditor && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-3xl bg-[#2D1810] rounded-xl border border-[#C9A84C]/20 max-h-[90vh] overflow-auto"
          >
            <div className="sticky top-0 bg-[#2D1810] p-4 border-b border-[#C9A84C]/10 flex items-center justify-between">
              <h2 className="font-heading text-xl text-[#F5EBD8]">
                {editingBlog ? 'Edit Post' : 'New Blog Post'}
              </h2>
              <button onClick={() => setShowEditor(false)} className="text-[#A89272] hover:text-[#F5EBD8]">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-[#A89272] font-body text-sm mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-[#1A0A0A] border border-[#C9A84C]/20 rounded-lg text-[#F5EBD8] font-body focus:outline-none focus:border-[#C9A84C]/50"
                  required
                />
              </div>

              <div>
                <label className="block text-[#A89272] font-body text-sm mb-2">Excerpt</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-3 bg-[#1A0A0A] border border-[#C9A84C]/20 rounded-lg text-[#F5EBD8] font-body focus:outline-none focus:border-[#C9A84C]/50"
                  placeholder="Brief summary for blog listing..."
                />
              </div>

              <div>
                <label className="block text-[#A89272] font-body text-sm mb-2">Content (HTML)</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={10}
                  className="w-full px-4 py-3 bg-[#1A0A0A] border border-[#C9A84C]/20 rounded-lg text-[#F5EBD8] font-body focus:outline-none focus:border-[#C9A84C]/50 font-mono text-sm"
                  placeholder="<p>Your content here...</p>"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#A89272] font-body text-sm mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1A0A0A] border border-[#C9A84C]/20 rounded-lg text-[#F5EBD8] font-body focus:outline-none focus:border-[#C9A84C]/50"
                  >
                    <option value="Astrology">Astrology</option>
                    <option value="Numerology">Numerology</option>
                    <option value="Palmistry">Palmistry</option>
                    <option value="Services">Services</option>
                    <option value="General">General</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#A89272] font-body text-sm mb-2">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1A0A0A] border border-[#C9A84C]/20 rounded-lg text-[#F5EBD8] font-body focus:outline-none focus:border-[#C9A84C]/50"
                    placeholder="nadi, astrology, predictions"
                  />
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                  className="w-5 h-5 rounded border-[#C9A84C]/30 bg-[#1A0A0A] text-[#C9A84C] focus:ring-[#C9A84C]"
                />
                <span className="text-[#F5EBD8] font-body">Publish immediately</span>
              </label>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowEditor(false)}
                  className="flex-1 py-3 border border-[#C9A84C]/30 text-[#A89272] font-heading rounded-lg hover:bg-[#C9A84C]/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#C9A84C] text-[#1A0A0A] font-heading rounded-lg hover:bg-[#DFC07A] transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {editingBlog ? 'Update' : 'Save'} Post
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Blog List */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="p-4 bg-[#2D1810] border border-[#C9A84C]/10 rounded-lg hover:border-[#C9A84C]/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-heading text-lg text-[#F5EBD8]">{blog.title}</h3>
                    {blog.is_published ? (
                      <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full font-body">Published</span>
                    ) : (
                      <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded-full font-body">Draft</span>
                    )}
                  </div>
                  <p className="text-[#A89272] text-sm font-body">{blog.excerpt || 'No excerpt'}</p>
                  <p className="text-[#A89272]/50 text-xs font-body mt-2">
                    {blog.category} • {new Date(blog.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => togglePublish(blog)}
                    className="p-2 text-[#A89272] hover:text-[#C9A84C] transition-colors"
                    title={blog.is_published ? 'Unpublish' : 'Publish'}
                  >
                    {blog.is_published ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => handleEdit(blog)}
                    className="p-2 text-[#A89272] hover:text-[#C9A84C] transition-colors"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="p-2 text-[#A89272] hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredBlogs.length === 0 && (
            <div className="text-center py-12 text-[#A89272] font-body">
              No blog posts found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}