import { motion } from 'motion/react';
import { ChevronLeft, Plus, Music, Heart, Clock, ListMusic, User, Mic2, Podcast } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';

export default function LibraryScreen({ onClose, key }: { onClose: () => void, key?: string }) {
  const sections = [
    { icon: Heart, label: 'Liked Songs', count: '248 items', color: 'text-tertiary' },
    { icon: Music, label: 'Your Playlists', count: '84 items', color: 'text-primary' },
    { icon: User, label: 'Artists', count: '156 items', color: 'text-secondary' },
    { icon: Podcast, label: 'Podcasts', count: '12 items', color: 'text-orange-400' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-surface flex flex-col overflow-y-auto no-scrollbar pb-32"
    >
      <header className="p-6 flex justify-between items-center bg-surface/60 backdrop-blur-3xl sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full"><ChevronLeft className="w-6 h-6" /></button>
          <h2 className="font-headline text-3xl font-bold">Library</h2>
        </div>
        <button className="p-2 hover:bg-white/10 rounded-full"><Plus className="w-6 h-6" /></button>
      </header>

      <main className="px-6 space-y-10">
        <section className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {['Playlists', 'Artists', 'Albums', 'Podcasts', 'Downloaded'].map((tab) => (
            <button key={tab} className="px-6 py-2 bg-surface-container-high rounded-full text-sm font-bold whitespace-nowrap hover:bg-surface-container-highest transition-colors">
              {tab}
            </button>
          ))}
        </section>

        <section className="grid grid-cols-2 gap-4">
          {sections.map((item, i) => (
            <Card key={i} variant="glass" className="p-6 flex flex-col items-center text-center space-y-4 hover:bg-surface-container-highest transition-colors cursor-pointer group">
              <div className={`p-4 rounded-2xl bg-surface-container-highest ${item.color} group-hover:scale-110 transition-transform shadow-lg`}>
                <item.icon className="w-8 h-8" />
              </div>
              <div>
                <p className="font-bold text-lg">{item.label}</p>
                <p className="text-xs text-zinc-500 font-medium">{item.count}</p>
              </div>
            </Card>
          ))}
        </section>

        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-xl">Recently Played</h3>
            <button className="text-primary text-sm font-semibold">See All</button>
          </div>
          <div className="space-y-4">
            {[
              { title: "Solaris Beats", sub: "Playlist", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCYA_3Z3_jcOFE7pbu13CIfMgvP_WTJKmxjD2G_vRS9FF8fbwuMVvHNUuEiiw5C5r9h7eAbvRy-skBsMuy0mPoHdQ5DiuUUSOMMeCuVvySqBXuGhJemof1ywBNYSy-mWgqYI-l67fGIHUwej852ZAdAGspG-7W-OreR_3aBVSOdWCKv4MkrujC1TJ5DV_kIJZy6ZEe0JZi6xUkDgRkeL-Mh6oHp-VRorW9-bXvjzE_uA0D0Emeov9KK5BvDj3hzTSz0t-51VgYRQ" },
              { title: "Midnight Funk", sub: "Vibe Collective", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQHvB1XhqED1P4F-6I3CNkEYa2ia2BIBso-A09tldGUZ4wQoWsZO6-j8V7Vlt4V9QXfOYh1RZ3vpgARmDisxZQJ8a3XsRnNpxEZQOaWKjii2Q5EsNbig3SJtR315wqADmvJm0vDkKzo7lnDgAFZ1561JG5od0u_gNzGxNEdNRI_rIlq-0futr4vhb9g5TrMPFSmZT9pAZXYdXeC-EtttJIaXOsWuhVce910aBc8lT_zP27YYCxrP21n9LwteO8_xpltaQ1mX2rFA" },
              { title: "Daily Mix 1", sub: "For You", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIfyNpdYA-u7VsuPdDtQq64R_LuiyHWlOaARBHfUiGGHavO2LwaIBmUuno_BuQHuKJyKxr5hucy0W1_L9-szqyXp89cuBR99zlVeyAAehkrC_nC27SDc0HDFlD1VDkNTSMGw18AQEJOqyxrdiFzQxyuP_XiZ2QVhu4HgtNAE-jA73mlm8OLWvpZXd3XPQFK9Nwvt5jhN--c1Qd1cOtzaA_ejQ254NHfSq2mBjYM5zLZH5ovB-_lvUfKrxZEj8wTfRuxADohSqnQQ" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer group">
                <div className="w-14 h-14 rounded-md overflow-hidden bg-surface-container shadow-lg">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{item.title}</p>
                  <p className="text-xs text-zinc-500">{item.sub}</p>
                </div>
                <ListMusic className="w-5 h-5 text-zinc-600 group-hover:text-primary transition-colors" />
              </div>
            ))}
          </div>
        </section>

        <Button variant="glass" className="w-full h-16 rounded-2xl gap-3 border-dashed border-zinc-800">
          <Plus className="w-6 h-6" />
          <span>Create New Playlist</span>
        </Button>
      </main>
    </motion.div>
  );
}
