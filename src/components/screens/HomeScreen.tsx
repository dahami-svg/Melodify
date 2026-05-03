import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Bell, Play, ChevronLeft, ChevronRight, Pause, Shuffle, SkipBack, SkipForward, Heart, Home, MessageSquare, Library, User, Send, Sparkles } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { cn } from '@/src/lib/utils';
import { toast } from 'sonner';
import PlayerScreen from '@/src/components/screens/PlayerScreen';
import ChatScreen from '@/src/components/screens/ChatScreen';
import ProfileScreen from '@/src/components/screens/ProfileScreen';
import SearchScreen from '@/src/components/screens/SearchScreen';
import LibraryScreen from '@/src/components/screens/LibraryScreen';

export default function HomeScreen({ onLogout, key }: { onLogout: () => void, key?: string }) {
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'chat' | 'library' | 'profile'>('home');
  const [showPlayer, setShowPlayer] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [recentlyPlayed, setRecentlyPlayed] = useState<any[]>([]);
  const [trendingPlaylists, setTrendingPlaylists] = useState<any[]>([]);
  const [currentSong, setCurrentSong] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/music/home')
      .then(res => res.json())
      .then(data => {
        setRecentlyPlayed(data.recentlyPlayed);
        setTrendingPlaylists(data.trendingPlaylists);
        // Default first song to mini player if none selected
        if (data.recentlyPlayed.length > 0) setCurrentSong(data.recentlyPlayed[0]);
      })
      .catch(err => console.error("Error fetching home data:", err));
  }, []);

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback }),
      });

      if (response.ok) {
        toast.success("Feedback submitted to backend! Thank you.");
        setFeedback("");
      }
    } catch (error) {
      toast.error("Failed to connect to backend");
    }
  };

  const handleMagicAlert = () => {
    toast("✨ Magic Alert!", {
      description: "You've unlocked a secret rhythm! Keep exploring.",
      icon: <Sparkles className="w-5 h-5 text-purple-400" />,
    });
  };

  return (
    <div className="bg-surface text-white font-sans min-h-screen pb-44 md:pb-0 md:pl-64">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-surface-container border-r border-white/5 flex-col p-8 z-50">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Play className="w-5 h-5 fill-black text-black" />
          </div>
          <h1 className="font-headline text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Melodify
          </h1>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: 'home', label: 'Home', icon: Home },
            { id: 'search', label: 'Search', icon: Search },
            { id: 'chat', label: 'Chat', icon: MessageSquare },
            { id: 'library', label: 'Library', icon: Library },
            { id: 'profile', label: 'Profile', icon: User },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-medium",
                activeTab === item.id ? "bg-primary text-black" : "text-zinc-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-white/5">
          <Card variant="glass" className="p-4 space-y-4">
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Premium</p>
            <p className="text-sm font-medium">Get 3 months of Premium for free.</p>
            <Button size="sm" className="w-full">Upgrade</Button>
          </Card>
        </div>
      </aside>

      {/* Top App Bar */}
      <header className="fixed top-0 left-0 md:left-64 right-0 z-50 bg-surface/60 backdrop-blur-3xl py-6">
        <div className="flex justify-between items-center w-full px-8 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-4">
            <div 
              onClick={() => setActiveTab('profile')}
              className="w-10 h-10 rounded-full overflow-hidden scale-95 active:scale-90 transition-transform cursor-pointer border-2 border-primary/20"
            >
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjhzIsGelZsGG4xoCP6OVro4FrFtV5iUze-8O72Sj95Gdq4GkXIVW3CofL1ovrxVi58xDulCdBg2qLecGDJ0-3Uf0CdemCNBUxjWp6--yC1bO1zFPDMZcHkFJ33D6OAcuX1CxFtB10spwVQIA2rgbPYdpg7f0aKG9VT5TbpVL-TEK5HPI_9TlDMLGc3cfjyot9FXg6EIk4fUGSdjyFyIpACQgWdzm63MX6IHy_4M38aXP6uNFzZrE16R3CLQOFh8czfKgKRI8DdQ"
                alt="User"
                referrerPolicy="no-referrer"
              />
            </div>
            <h1 className="font-headline text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Melodify
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-zinc-400 hover:text-purple-300 transition-colors">
              <Bell className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <main className="pt-28 px-6 md:px-12 max-w-screen-2xl mx-auto space-y-12">
        {/* Greeting & Search */}
        <section className="space-y-8">
          <div>
            <h2 className="font-headline text-5xl font-extralight tracking-tight text-white mb-2">Good Evening, Alex</h2>
            <p className="text-zinc-400 font-medium tracking-wide">Ready for your nightly rhythm?</p>
          </div>
          <div className="relative group max-w-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-primary transition-colors" />
            <input 
              className="w-full bg-surface-container border-none rounded-lg py-5 pl-14 pr-6 focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-zinc-600 text-white" 
              placeholder="Search artists, songs, podcasts..." 
              type="text"
            />
          </div>
        </section>

        {/* Featured Banner */}
        <section className="relative h-[400px] rounded-lg overflow-hidden group cursor-pointer" onClick={() => setShowPlayer(true)}>
          <img 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDW9Ckoxxm6Mhd_gfUOFO64RUcbIO0OqLfoSZEflCn89TPm180iGi-9dsbx6ebV_JI0SQBqPg2avb0w4V-94OdXqXLvZf18qnE3SXpSj6EmhpbtI-xr5l3IOIgxXLewt237gP5zRnOHiBao_4S6AOKo0c8Wh7WXcTKWPtrUD6m0r7hulEhrc29f3NZlGbd0r3kukHTo33kLbV5nCamUj5_Ow9NLu8o2Sr_kC1Vx0kU7to_Hsz5OIFyz1uuMBkbFIMBWW-HxdJa3Rg"
            alt="Featured"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
          <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="max-w-xl">
              <span className="px-4 py-1 bg-primary text-on-primary-fixed text-[10px] font-bold tracking-widest uppercase rounded-full mb-4 inline-block">New Music</span>
              <h3 className="font-headline text-6xl font-extrabold tracking-tighter leading-tight">THE VELVET <br/>ECLIPSE</h3>
              <p className="text-zinc-400 mt-4 text-lg max-w-md">Experience the haunting new album from Luna Ray. Now streaming exclusively on Melodify.</p>
            </div>
            <Button size="xl" className="gap-3" onClick={(e) => { e.stopPropagation(); setShowPlayer(true); }}>
              <Play className="fill-current" />
              Listen Now
            </Button>
          </div>
        </section>

        {/* Recently Played */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <h4 className="font-headline text-2xl font-bold">Recently Played</h4>
            <button className="text-primary text-sm font-semibold hover:underline">See All</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {recentlyPlayed.map((item, i) => (
              <Card 
                key={i} 
                variant="glass" 
                className="p-3 flex items-center gap-4 hover:bg-surface-container-highest transition-colors cursor-pointer group" 
                onClick={() => {
                  setCurrentSong(item);
                  setShowPlayer(true);
                }}
              >
                <div className="w-14 h-14 rounded-md overflow-hidden flex-shrink-0">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="truncate">
                  <p className="font-bold text-sm truncate">{item.title}</p>
                  <p className="text-zinc-400 text-xs truncate">{item.sub}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Trending Playlists */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <h4 className="font-headline text-3xl font-bold tracking-tight">Trending Playlists</h4>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-primary transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-primary transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex gap-8 overflow-x-auto pb-4 -mx-2 px-2 snap-x no-scrollbar">
            {trendingPlaylists.map((item, i) => (
              <div 
                key={i} 
                className="snap-start flex-shrink-0 w-64 space-y-4 cursor-pointer group" 
                onClick={() => {
                  setCurrentSong(item);
                  setShowPlayer(true);
                }}
              >
                <div className="relative aspect-square rounded-lg overflow-hidden bg-surface-container shadow-2xl">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      <Play className="fill-black text-black w-8 h-8" />
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="font-bold text-lg">{item.title}</h5>
                  <p className="text-zinc-400 text-sm">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Feedback Section */}
        <section className="bg-surface-container rounded-2xl p-8 border border-white/5 space-y-8 max-w-4xl">
          <div className="space-y-2">
            <h4 className="font-headline text-3xl font-bold tracking-tight">Help us improve</h4>
            <p className="text-zinc-400 font-medium">Share your thoughts or report a bug. We're all ears.</p>
          </div>
          
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleFeedbackSubmit}>
            <div className="flex-1 relative group">
              <input 
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                type="text" 
                placeholder="What's on your mind?" 
                className="w-full bg-surface-container-highest border-none rounded-xl py-5 px-6 focus:ring-2 focus:ring-primary/30 transition-all outline-none text-white placeholder:text-zinc-600"
                required
              />
            </div>
            <Button type="submit" className="h-auto py-5 px-8 gap-2">
              <Send className="w-4 h-4" />
              Submit
            </Button>
          </form>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <p className="font-bold text-lg">Feeling lucky?</p>
              <p className="text-zinc-500 text-sm">Click the button to trigger a magic alert.</p>
            </div>
            <Button variant="secondary" onClick={handleMagicAlert} className="gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Magic Alert
            </Button>
          </div>
        </section>
      </main>

      {/* Mini Player */}
      <div 
        onClick={() => setShowPlayer(true)}
        className="fixed bottom-[112px] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-4xl z-40 glass rounded-lg p-3 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.8)] border border-white/5 cursor-pointer hover:bg-surface-variant/80 transition-all"
      >
        <div className="flex items-center gap-4 truncate">
          <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
            <img 
              className="w-full h-full object-cover" 
              src={currentSong?.img || "https://lh3.googleusercontent.com/aida-public/AB6AXuC1s3pjWExy3dZFO8DceJdPl-L2NS6cidk4zkum96sCM6f2UXzZy0DYo68ZJKyiawgD9Fi5pA8-sa2oCuRQrmfYecDl4-SAOp3AHOJpO7RvG2HCrmPuaw-46xZQKlYeDDhLKNzaRDir_beliRIYWtez9mS-hAevjfkyMR9Q-bx67fsHQUH4Yh_iI-5zMvI6qH7ANM3G1fTtWhzp3pvt6GbmqHj-ennChE8y1tX3IOzupJ4P3du03ZKkf_s215lOrA7BuoxA7OeJEQ"}
              alt="Song"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="truncate">
            <p className="font-bold text-sm truncate">{currentSong?.title || "Stardust Echoes"}</p>
            <p className="text-zinc-400 text-xs truncate">{currentSong?.artist || currentSong?.sub || "Luna Ray"}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-6" onClick={(e) => e.stopPropagation()}>
          <button className="text-zinc-400 hover:text-white hidden sm:block"><Shuffle className="w-5 h-5" /></button>
          <button className="text-zinc-400 hover:text-white"><SkipBack className="w-5 h-5 fill-current" /></button>
          <button className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center scale-100 active:scale-90 transition-transform">
            <Pause className="w-5 h-5 fill-current" />
          </button>
          <button className="text-zinc-400 hover:text-white"><SkipForward className="w-5 h-5 fill-current" /></button>
          <button className="text-tertiary ml-2 hidden sm:block"><Heart className="w-5 h-5 fill-current" /></button>
        </div>
        <div className="absolute bottom-0 left-0 h-[2px] bg-primary rounded-full transition-all" style={{ width: '45%' }}></div>
      </div>

      {/* Bottom Nav (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-6 pb-8 pt-4 bg-[#191919]/70 backdrop-blur-[40px] rounded-t-[2.5rem] shadow-[0_-4px_24px_rgba(168,85,247,0.15)]">
        <button 
          onClick={() => setActiveTab('home')}
          className={cn(
            "flex flex-col items-center justify-center transition-all p-2 rounded-2xl",
            activeTab === 'home' ? "text-purple-300 relative after:content-[''] after:absolute after:-bottom-1 after:w-1 after:h-1 after:bg-purple-300 after:rounded-full" : "text-zinc-500 hover:bg-zinc-800/50"
          )}
        >
          <Home className={cn("w-6 h-6", activeTab === 'home' && "fill-current")} />
          <span className="font-sans text-[10px] font-semibold tracking-widest uppercase mt-1">Home</span>
        </button>
        <button 
          onClick={() => setActiveTab('search')}
          className={cn(
            "flex flex-col items-center justify-center transition-all p-2 rounded-2xl",
            activeTab === 'search' ? "text-purple-300 relative after:content-[''] after:absolute after:-bottom-1 after:w-1 after:h-1 after:bg-purple-300 after:rounded-full" : "text-zinc-500 hover:bg-zinc-800/50"
          )}
        >
          <Search className="w-6 h-6" />
          <span className="font-sans text-[10px] font-semibold tracking-widest uppercase mt-1">Search</span>
        </button>
        <button 
          onClick={() => setActiveTab('chat')}
          className={cn(
            "flex flex-col items-center justify-center transition-all p-2 rounded-2xl",
            activeTab === 'chat' ? "text-purple-300 relative after:content-[''] after:absolute after:-bottom-1 after:w-1 after:h-1 after:bg-purple-300 after:rounded-full" : "text-zinc-500 hover:bg-zinc-800/50"
          )}
        >
          <MessageSquare className={cn("w-6 h-6", activeTab === 'chat' && "fill-current")} />
          <span className="font-sans text-[10px] font-semibold tracking-widest uppercase mt-1">Chat</span>
        </button>
        <button 
          onClick={() => setActiveTab('library')}
          className={cn(
            "flex flex-col items-center justify-center transition-all p-2 rounded-2xl",
            activeTab === 'library' ? "text-purple-300 relative after:content-[''] after:absolute after:-bottom-1 after:w-1 after:h-1 after:bg-purple-300 after:rounded-full" : "text-zinc-500 hover:bg-zinc-800/50"
          )}
        >
          <Library className={cn("w-6 h-6", activeTab === 'library' && "fill-current")} />
          <span className="font-sans text-[10px] font-semibold tracking-widest uppercase mt-1">Library</span>
        </button>
        <button 
          onClick={() => setActiveTab('profile')}
          className={cn(
            "flex flex-col items-center justify-center transition-all p-2 rounded-2xl",
            activeTab === 'profile' ? "text-purple-300 relative after:content-[''] after:absolute after:-bottom-1 after:w-1 after:h-1 after:bg-purple-300 after:rounded-full" : "text-zinc-500 hover:bg-zinc-800/50"
          )}
        >
          <User className={cn("w-6 h-6", activeTab === 'profile' && "fill-current")} />
          <span className="font-sans text-[10px] font-semibold tracking-widest uppercase mt-1">Profile</span>
        </button>
      </nav>

      {/* Overlay Screens */}
      <AnimatePresence>
        {showPlayer && (
          <PlayerScreen key="player" song={currentSong} onClose={() => setShowPlayer(false)} />
        )}
        {activeTab === 'search' && (
          <SearchScreen key="search" onClose={() => setActiveTab('home')} />
        )}
        {activeTab === 'chat' && (
          <ChatScreen key="chat" onClose={() => setActiveTab('home')} />
        )}
        {activeTab === 'library' && (
          <LibraryScreen key="library" onClose={() => setActiveTab('home')} />
        )}
        {activeTab === 'profile' && (
          <ProfileScreen key="profile" onClose={() => setActiveTab('home')} onLogout={onLogout} />
        )}
      </AnimatePresence>
    </div>
  );
}
