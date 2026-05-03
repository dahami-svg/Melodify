import { motion } from 'motion/react';
import { ChevronLeft, MoreVertical, Settings, Grid, List, Music, Heart, Clock, LogOut } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';

export default function ProfileScreen({ onClose, onLogout, key }: { onClose: () => void, onLogout: () => void, key?: string }) {
  return (
    <motion.div 
      initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
      className="fixed inset-0 z-[100] bg-surface flex flex-col overflow-y-auto no-scrollbar"
    >
      <header className="p-6 flex justify-between items-center bg-surface/60 backdrop-blur-3xl fixed top-0 left-0 w-full z-50">
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full"><ChevronLeft className="w-6 h-6" /></button>
        <h2 className="font-bold text-lg">Profile</h2>
        <button className="p-2 hover:bg-white/10 rounded-full"><Settings className="w-6 h-6" /></button>
      </header>

      <main className="pt-24 px-8 space-y-12 pb-12">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 blur-[48px] rounded-full"></div>
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/30 p-1">
              <img 
                className="w-full h-full object-cover rounded-full" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjhzIsGelZsGG4xoCP6OVro4FrFtV5iUze-8O72Sj95Gdq4GkXIVW3CofL1ovrxVi58xDulCdBg2qLecGDJ0-3Uf0CdemCNBUxjWp6--yC1bO1zFPDMZcHkFJ33D6OAcuX1CxFtB10spwVQIA2rgbPYdpg7f0aKG9VT5TbpVL-TEK5HPI_9TlDMLGc3cfjyot9FXg6EIk4fUGSdjyFyIpACQgWdzm63MX6IHy_4M38aXP6uNFzZrE16R3CLQOFh8czfKgKRI8DdQ"
                alt="Profile"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div>
            <h3 className="font-headline text-4xl font-bold tracking-tight">Alex Rivera</h3>
            <p className="text-zinc-500 font-medium tracking-widest uppercase text-xs mt-2">Premium Listener • Since 2022</p>
          </div>
          <div className="flex gap-8">
            <div className="text-center"><p className="font-bold text-xl">1.2k</p><p className="text-[10px] text-zinc-500 uppercase tracking-widest">Followers</p></div>
            <div className="text-center"><p className="font-bold text-xl">458</p><p className="text-[10px] text-zinc-500 uppercase tracking-widest">Following</p></div>
            <div className="text-center"><p className="font-bold text-xl">84</p><p className="text-[10px] text-zinc-500 uppercase tracking-widest">Playlists</p></div>
          </div>
        </div>

        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-xl">Top Artists</h4>
            <Grid className="w-5 h-5 text-zinc-500" />
          </div>
          <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4">
            {[
              { name: "Luna Ray", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDW9Ckoxxm6Mhd_gfUOFO64RUcbIO0OqLfoSZEflCn89TPm180iGi-9dsbx6ebV_JI0SQBqPg2avb0w4V-94OdXqXLvZf18qnE3SXpSj6EmhpbtI-xr5l3IOIgxXLewt237gP5zRnOHiBao_4S6AOKo0c8Wh7WXcTKWPtrUD6m0r7hulEhrc29f3NZlGbd0r3kukHTo33kLbV5nCamUj5_Ow9NLu8o2Sr_kC1Vx0kU7to_Hsz5OIFyz1uuMBkbFIMBWW-HxdJa3Rg" },
              { name: "Solaris", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCYA_3Z3_jcOFE7pbu13CIfMgvP_WTJKmxjD2G_vRS9FF8fbwuMVvHNUuEiiw5C5r9h7eAbvRy-skBsMuy0mPoHdQ5DiuUUSOMMeCuVvySqBXuGhJemof1ywBNYSy-mWgqYI-l67fGIHUwej852ZAdAGspG-7W-OreR_3aBVSOdWCKv4MkrujC1TJ5DV_kIJZy6ZEe0JZi6xUkDgRkeL-Mh6oHp-VRorW9-bXvjzE_uA0D0Emeov9KK5BvDj3hzTSz0t-51VgYRQ" },
              { name: "Echo", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0lvWuuwnTNTKcTcPBwAACxRlC6XmhV5H8CsarYvizjM4O1daF7shzL-a0S0nKVVLHnpdXoN7bbDlUYegLMYnAcAP54X34qJkbHLOuO8CKLByLQTDSa5vrSE6ylsr7qm5TVv0zXMJHwYbVCfE_6OTpltHKWgnVeIjxZvA4RjoAeAthf7plO5bNZEIIXf0-Y1_F27G4thtOYu9Aw3snraztK0HmfvZMePfktEiFhq-MrTbfQZEylA5eQ1EaXSTa13b0QCr8kR3qxQ" },
            ].map((artist, i) => (
              <div key={i} className="flex-shrink-0 flex flex-col items-center space-y-3">
                <div className="w-20 h-20 rounded-full overflow-hidden border border-white/5 shadow-xl">
                  <img src={artist.img} alt={artist.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <p className="text-xs font-bold">{artist.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex justify-between items-center"><h4 className="font-bold text-xl">Library</h4><List className="w-5 h-5 text-zinc-500" /></div>
          <div className="space-y-2">
            {[
              { icon: Heart, label: "Liked Songs", count: "248 items", color: "text-tertiary" },
              { icon: Music, label: "Your Playlists", count: "84 items", color: "text-primary" },
              { icon: Clock, label: "Listening History", count: "Last 30 days", color: "text-secondary" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-surface-container-high/40 rounded-xl border border-white/5 hover:bg-surface-container-highest transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg bg-surface-container-highest ${item.color}`}><item.icon className="w-6 h-6" /></div>
                  <div><p className="font-bold">{item.label}</p><p className="text-xs text-zinc-500 font-medium">{item.count}</p></div>
                </div>
                <ChevronLeft className="w-5 h-5 text-zinc-600 rotate-180 group-hover:text-white transition-colors" />
              </div>
            ))}
          </div>
        </section>

        <Button variant="secondary" className="w-full h-14 rounded-xl gap-3 text-zinc-400 hover:text-red-400" onClick={onLogout}>
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </Button>
      </main>
    </motion.div>
  );
}
