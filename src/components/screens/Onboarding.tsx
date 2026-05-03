import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { cn } from '@/src/lib/utils';

const slides = [
  {
    title: "Chat While Listening",
    highlight: "Listening",
    description: "Stay connected and share your thoughts as you enjoy your favorite tracks.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuI7Xn7l6VfwlNV6uRz_JqPGbXK5BRtyuo51NfdmCQxLs-PecJ6_c2LQ7Vrke3vK-tdtCtvVB1GQjvV0FkNdTDfq7SOK_C-sJ4GPEJIqEQ3i_RMzL60oUQhUoFwx0gyt0Tb4PMLrdEbuIpC7Rb2k2fCClvJfkq8QQXZ8AtaXjqxTbxOTNxd1sF7BxahA9f9a12OMO7Znzx1mYsDkVok31eWdkoouHiUMFlp5H-tBGwE_2446QArPyMGLAxTqX6xeWGu_DByaypBA",
    chat: true
  },
  {
    title: "Discover New Vibes",
    highlight: "New Vibes",
    description: "Explore millions of songs, albums, and playlists curated just for you by our advanced sonic intelligence.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4gkoGQ6gSTu8Rh6GbjSSiSscjTGw02fx7OVIdlH-0iJR6Ht5ZeOgt7pD2Wgz-Lc7Jfu5CYtcGxHtXTJ4Z6RGVPC7wRo9BQEqE5hHN9FEZEGZM3wI0NZYAg5i0Op-Uu5ylWKl7WV438Sewm3HO97wqgXFfNxnkUIDd5FNoA5RsY9pnA7IaX4WB4oCnHzjcV7SU3lAcyNdfdRTmmBm4TcSFPRAipJnOmiec_kWn3A-skgY6-_etcr5vokiLBfdaepyseUz09NYQfg",
    tags: ["Top Chart", "Midnight Jazz", "Curated for you"]
  },
  {
    title: "Share Every Beat",
    highlight: "Beat",
    description: "Experience music together with real-time synchronized playback. Your connection, amplified.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTYo8M6gWAN1hxfrU24CPfZ64Z8W3M3LBBBEV8RDbYlklKE17eLvbmtzRJ8eehcAZ-nG07dtpB0YaUSLe5oBAqdW0f79b4tAR71f_IfcA-OKHleNilcqUMkIcCsEV7PuNDyoNsr602fzrsY6pZiVtgT7DJJp-tqhPOOAuaygvjZR1J2Slk_bRyRudtCLjWHsZoPiCqySkqSDTVVBNYRZ0FjyT4qCeXsqen3JAr4WR-62Q0OhwireNnCdKcZ9j4wFHtWcxSu5bLjA",
    sync: true
  }
];

export default function Onboarding({ onComplete }: { onComplete: () => void, key?: string }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const next = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const slide = slides[currentSlide];

  return (
    <div className="relative h-screen w-full bg-surface flex flex-col overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(at_0%_0%,_rgba(119,153,255,0.15)_0px,_transparent_50%),_radial-gradient(at_100%_0%,_rgba(255,134,195,0.15)_0px,_transparent_50%)]"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 py-6 px-8 flex justify-between items-center bg-surface/60 backdrop-blur-3xl">
        <div className="font-headline text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          Melodify
        </div>
        <button 
          onClick={onComplete}
          className="text-zinc-400 font-sans tracking-widest uppercase text-[10px] hover:text-purple-300 transition-colors"
        >
          Skip
        </button>
      </header>

      <main className="flex-1 relative flex flex-col items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-lg flex flex-col items-center"
          >
            {/* Illustration Area */}
            <div className="relative w-full aspect-[4/5] mb-12">
              <div className="relative z-10 rounded-lg overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.6)] w-full h-full">
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {slide.chat && (
                  <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-3">
                    <div className="glass p-4 rounded-xl self-start max-w-[80%] border border-white/5">
                      <p className="text-sm text-white font-medium">"This drop is insane! 🎧"</p>
                      <span className="text-[10px] text-zinc-400 uppercase tracking-tighter mt-1 block">Leo • 2m ago</span>
                    </div>
                    <div className="glass p-4 rounded-xl self-end max-w-[80%] border border-white/5 bg-primary/20">
                      <p className="text-sm text-white font-medium">"Right? Adding it to our shared loop!"</p>
                      <span className="text-[10px] text-purple-200 uppercase tracking-tighter mt-1 block">You • Now</span>
                    </div>
                  </div>
                )}

                {slide.sync && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center neon-glow">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      >
                        <ChevronRight className="w-8 h-8 text-on-primary-fixed" />
                      </motion.div>
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-tertiary rounded-full mix-blend-screen blur-2xl opacity-20"></div>
            </div>

            {/* Text Content */}
            <div className="text-center max-w-md z-20">
              <h1 className="font-headline text-4xl md:text-5xl font-extralight tracking-tight mb-4 text-white">
                {slide.title.split(slide.highlight)[0]}
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  {slide.highlight}
                </span>
              </h1>
              <p className="text-zinc-400 text-lg leading-relaxed mb-10 px-4">
                {slide.description}
              </p>
            </div>

            {/* Pagination */}
            <div className="flex gap-2 mb-10">
              {slides.map((_, i) => (
                <div 
                  key={i}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === currentSlide ? "w-8 bg-primary neon-glow" : "w-2 bg-zinc-700"
                  )}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Actions */}
      <footer className="p-8 pb-12 flex items-center justify-between max-w-2xl mx-auto w-full">
        <button 
          onClick={onComplete}
          className="px-8 py-4 text-zinc-400 font-sans tracking-widest uppercase text-xs hover:text-white transition-colors"
        >
          Skip
        </button>
        <Button 
          onClick={next}
          size="lg"
          className="group"
        >
          <span>{currentSlide === slides.length - 1 ? "Get Started" : "Next"}</span>
          <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </footer>
    </div>
  );
}
