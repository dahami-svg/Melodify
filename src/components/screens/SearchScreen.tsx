import { motion } from 'motion/react';
import { Search, ChevronLeft, Clock, TrendingUp, Star } from 'lucide-react';
import { Card } from '@/src/components/ui/Card';

export default function SearchScreen({ onClose, key }: { onClose: () => void, key?: string }) {
  const categories = [
    { name: 'Pop', color: 'bg-pink-500' },
    { name: 'Hip-Hop', color: 'bg-orange-500' },
    { name: 'Rock', color: 'bg-red-600' },
    { name: 'Electronic', color: 'bg-blue-500' },
    { name: 'Jazz', color: 'bg-yellow-600' },
    { name: 'Classical', color: 'bg-emerald-600' },
    { name: 'Ambient', color: 'bg-purple-600' },
    { name: 'Lo-fi', color: 'bg-indigo-500' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-surface flex flex-col overflow-y-auto no-scrollbar pb-32"
    >
      <header className="p-6 space-y-6 bg-surface/60 backdrop-blur-3xl sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full"><ChevronLeft className="w-6 h-6" /></button>
          <h2 className="font-headline text-3xl font-bold">Search</h2>
        </div>
        <div className="relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-primary transition-colors" />
          <input 
            autoFocus
            className="w-full bg-surface-container border-none rounded-xl py-5 pl-14 pr-6 focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-zinc-600 text-white" 
            placeholder="Artists, songs, or podcasts" 
            type="text"
          />
        </div>
      </header>

      <main className="px-6 space-y-10">
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-zinc-400">
            <Clock className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-widest">Recent Searches</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Luna Ray', 'Solaris', 'Midnight Funk', 'Techno State'].map((item) => (
              <button key={item} className="px-4 py-2 bg-surface-container-high rounded-full text-sm hover:bg-surface-container-highest transition-colors">
                {item}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="font-bold text-xl">Browse All</h3>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((cat) => (
              <Card key={cat.name} className={`${cat.color} h-28 relative overflow-hidden cursor-pointer group`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                <h4 className="absolute top-4 left-4 font-bold text-lg">{cat.name}</h4>
                <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-2 text-primary">
            <TrendingUp className="w-5 h-5" />
            <h3 className="font-bold text-xl">Trending Now</h3>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                <span className="text-zinc-500 font-bold w-4">{i}</span>
                <div className="w-12 h-12 bg-surface-container rounded-md"></div>
                <div className="flex-1">
                  <p className="font-bold text-sm">Trending Track {i}</p>
                  <p className="text-xs text-zinc-500">Artist Name</p>
                </div>
                <Star className="w-4 h-4 text-zinc-600" />
              </div>
            ))}
          </div>
        </section>
      </main>
    </motion.div>
  );
}
