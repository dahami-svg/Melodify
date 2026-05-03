import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, MoreVertical, Send, Plus, Music, Mic } from 'lucide-react';

export default function ChatScreen({ onClose, key }: { onClose: () => void, key?: string }) {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/chat/history')
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(err => console.error("Error fetching chat:", err));
  }, []);

  return (
    <motion.div 
      initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
      className="fixed inset-0 z-[100] bg-surface flex flex-col"
    >
      <header className="p-6 flex justify-between items-center bg-surface-container border-b border-white/5">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full"><ChevronLeft className="w-6 h-6" /></button>
          <div>
            <h2 className="font-bold text-lg">Midnight Funk Group</h2>
            <p className="text-xs text-primary font-medium flex items-center gap-1"><Music className="w-3 h-3" /> Now Playing: Stardust Echoes</p>
          </div>
        </div>
        <button className="p-2 hover:bg-white/10 rounded-full"><MoreVertical className="w-6 h-6" /></button>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl ${msg.isMe ? 'bg-primary text-black rounded-tr-none' : 'bg-surface-container-highest text-white rounded-tl-none'}`}>
              <p className="text-sm font-medium">{msg.text}</p>
            </div>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter mt-2">{msg.user} • {msg.time}</span>
          </div>
        ))}
      </main>

      <footer className="p-6 bg-surface-container-high/50 backdrop-blur-xl border-t border-white/5">
        <div className="flex items-center gap-4">
          <button className="p-3 bg-surface-container-highest rounded-full text-zinc-400"><Plus className="w-6 h-6" /></button>
          <div className="flex-1 relative">
            <input 
              className="w-full bg-surface-container-highest border-none rounded-full py-4 pl-6 pr-12 text-sm focus:ring-1 focus:ring-primary/50 outline-none" 
              placeholder="Type a message..." 
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-primary"><Send className="w-5 h-5" /></button>
          </div>
          <button className="p-3 bg-primary text-black rounded-full"><Mic className="w-6 h-6" /></button>
        </div>
      </footer>
    </motion.div>
  );
}
