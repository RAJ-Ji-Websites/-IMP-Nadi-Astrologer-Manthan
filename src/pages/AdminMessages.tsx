import { useState, useEffect } from 'react';
import { Mail, Check, CheckCheck, Phone, User } from 'lucide-react';

interface Message {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  service_interest: string;
  is_read: boolean;
  created_at: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: number) => {
    try {
      await fetch('/api/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_read: true })
      });
      fetchMessages();
    } catch (err) {
      console.error('Failed to update:', err);
    }
  };

  const unreadCount = messages.filter(m => !m.is_read).length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="font-heading text-2xl text-[#F5EBD8]">Messages</h1>
        <p className="text-[#A89272] font-body text-sm mt-1">
          {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}` : 'All messages read'}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center h-64"><div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" /></div>
      ) : messages.length === 0 ? (
        <div className="text-center py-12 text-[#A89272]">No messages yet</div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-5 bg-[#2D1810] border rounded-lg ${msg.is_read ? 'border-[#C9A84C]/10' : 'border-[#C9A84C]/30 bg-[#C9A84C]/5'}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#C9A84C]/20 flex items-center justify-center">
                    <User className="w-6 h-6 text-[#C9A84C]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading text-lg text-[#F5EBD8]">{msg.name}</h3>
                      {!msg.is_read && <span className="px-2 py-0.5 bg-[#C9A84C] text-[#1A0A0A] text-xs rounded-full">New</span>}
                    </div>
                    <div className="flex flex-wrap gap-4 mt-1 text-sm text-[#A89272]">
                      {msg.email && <span className="flex items-center gap-1"><Mail className="w-4 h-4" />{msg.email}</span>}
                      {msg.phone && <span className="flex items-center gap-1"><Phone className="w-4 h-4" />{msg.phone}</span>}
                    </div>
                    {msg.service_interest && (
                      <p className="text-[#C9A84C] text-sm mt-2">Interested in: {msg.service_interest}</p>
                    )}
                    <p className="text-[#F5EBD8] mt-3">{msg.message}</p>
                    <p className="text-[#A89272]/50 text-xs mt-2">
                      {new Date(msg.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                {!msg.is_read && (
                  <button
                    onClick={() => markAsRead(msg.id)}
                    className="p-2 text-[#A89272] hover:text-[#C9A84C]"
                    title="Mark as read"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}