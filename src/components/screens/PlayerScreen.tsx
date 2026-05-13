import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, MoreHorizontal, Shuffle, SkipBack, Play, Pause, SkipForward, Repeat, Share2, ListMusic, Heart, Volume2 } from 'lucide-react';

export default function PlayerScreen({ onClose, song, isPlaying, setIsPlaying, currentTime, duration, key }: { onClose: () => void, song: any, isPlaying: boolean, setIsPlaying: (val: boolean) => void, currentTime: number, duration: number, key?: string }) {
  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <motion.div 
      initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
      className="fixed inset-0 z-[100] bg-surface flex flex-col"
    >
      <div className="absolute inset-0 z-0">
        <img className="w-full h-full object-cover blur-[100px] opacity-30 scale-150" src={song?.img} alt="" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/40 via-surface/80 to-surface"></div>
      </div>
      <header className="relative z-10 p-8 flex justify-between items-center">
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full"><ChevronDown className="w-8 h-8" /></button>
        <div className="text-center">
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-500">Playing From Playlist</p>
          <p className="text-sm font-bold text-white">{song?.sub || "Solaris Beats"}</p>
        </div>
        <button className="p-2 hover:bg-white/10 rounded-full"><MoreHorizontal className="w-8 h-8" /></button>
      </header>
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-8">
        <div className="w-full max-w-sm aspect-square rounded-2xl overflow-hidden shadow-2xl mb-12">
          <img className="w-full h-full object-cover" src={song?.img} alt="" referrerPolicy="no-referrer" />
        </div>
        <div className="w-full max-w-sm flex justify-between items-end mb-10">
          <div className="space-y-1">
            <h2 className="font-headline text-4xl font-bold tracking-tight">{song?.title}</h2>
            <p className="text-xl text-primary font-medium">{song?.artist || song?.sub}</p>
          </div>
          <button className="text-tertiary"><Heart className="w-8 h-8 fill-current" /></button>
        </div>
        <div className="w-full max-w-sm space-y-2 mb-10">
          <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-primary" style={{ width: `${(currentTime / duration) * 100 || 0}%` }}></div>
          </div>
          <div className="flex justify-between text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
            <span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span>
          </div>
        </div>
        <div className="w-full max-w-sm flex justify-between items-center mb-12">
          <button className="text-zinc-500 hover:text-white"><Shuffle className="w-6 h-6" /></button>
          <div className="flex items-center gap-8">
            <button className="text-white hover:text-primary"><SkipBack className="w-10 h-10 fill-current" /></button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center shadow-lg"
            >
              {isPlaying ? <Pause className="w-10 h-10 fill-current" /> : <Play className="w-10 h-10 fill-current ml-1" />}
            </button>
            <button className="text-white hover:text-primary"><SkipForward className="w-10 h-10 fill-current" /></button>
          </div>
          <button className="text-zinc-500 hover:text-white"><Repeat className="w-6 h-6" /></button>
        </div>
        <div className="w-full max-w-sm flex justify-between items-center">
          <button className="text-zinc-500 hover:text-white"><Share2 className="w-6 h-6" /></button>
          <div className="flex items-center gap-6">
            <button className="text-zinc-500 hover:text-white"><ListMusic className="w-6 h-6" /></button>
            <button className="text-zinc-500 hover:text-white"><Volume2 className="w-6 h-6" /></button>
          </div>
        </div>
      </main>
      <footer className="relative z-10 p-8 pt-0">
        <div className="glass p-6 rounded-2xl border border-white/5 h-32 overflow-hidden relative">
          <p className="text-zinc-500 text-lg font-medium leading-relaxed">I see the stars in your eyes... <br/><span className="text-white">Reflecting the light of a thousand suns...</span></p>
          <div className="absolute inset-0 bg-gradient-to-t from-surface-variant to-transparent opacity-60"></div>
          <div className="absolute top-4 right-6 text-[10px] font-bold tracking-widest uppercase text-primary">Lyrics</div>
        </div>
      </footer>
    </motion.div>
  );
}
