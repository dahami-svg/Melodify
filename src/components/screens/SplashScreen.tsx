import { motion } from 'motion/react';
import { Music } from 'lucide-react';

export default function SplashScreen({ onComplete }: { onComplete: () => void, key?: string }) {
  return (
    <motion.main 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-surface"
    >
      {/* Background Immersive Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary-dim/20 blur-[120px]"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[50%] h-[50%] rounded-full bg-secondary-container/10 blur-[100px]"></div>
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
          <img 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUX_MA8ManC0Bwcjd2wLkvCV84p2GhX1G7jVZsHNpcCXkO3nOX9RdFYox4kTgMs_fNoHXko31iUFFdjxZu-drkdSs4ydcgwrcvghj98PmqQp2PSs1P1wmCw7M9oOSC9D_4YJa4MV6K4l0DcZFXy1gOqMGFchH9zoHvyIgYlslTmMoSipMHRZq_almKEQtJsmfd5R8hz8NDd3ItrC41nsYKXbYIEecImJliCEl_yVGQSxqtxy1Uj4LVB1VXr7RVttm_QUQ46dKqeQ"
            alt="Abstract background"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 group"
        >
          <div className="relative flex items-center justify-center p-8">
            <div className="absolute inset-0 bg-primary/20 blur-[48px] rounded-full"></div>
            <div className="absolute inset-0 border border-white/5 rounded-full scale-110"></div>
            <div className="relative w-24 h-24 bg-gradient-to-br from-primary to-primary-dim rounded-xl flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.5)]">
              <Music className="text-on-primary-fixed w-12 h-12" />
            </div>
          </div>
        </motion.div>

        <div className="space-y-4">
          <h1 className="font-headline text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Melodify
          </h1>
          <p className="font-sans text-xl text-zinc-400 font-light tracking-[0.2em] uppercase mt-2">
            Feel Music Together
          </p>
        </div>

        {/* Loader */}
        <div className="mt-24 w-48 h-1 bg-surface-container rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            onAnimationComplete={onComplete}
            className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]"
          />
        </div>

        {/* User Profile Entry */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex items-center gap-3 bg-surface-container-high/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/5"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJH4G0NDuTbLKaOc6FH_8ZDIg7zzccyEpypHSUWVyePw9WBtEq6djXt4WXNqSX3bwwRpRUWewqqlRjAnjcTOKpbRoKKJw3D2Lu7Iigm9WzAF5CcN917mJ9H964YmKGsY_fwtoqDTDR1ATp_kCP-DrP9FpOpEDcsy54WetpvpDjJD7WDsg9m2siBHUceRjIDKOWr5uYs7igf88pv2TEb6-FPBhf5-txZGRtJvCLmP03Jei9KEJkpwavUIPIgvKxiutHfh_hsCaeMg"
              alt="Alex Rivera"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="text-left">
            <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">Resuming Session</p>
            <p className="text-sm font-semibold text-white">Alex Rivera</p>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
