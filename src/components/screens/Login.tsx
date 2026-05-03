import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Eye, ArrowRight } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';

export default function Login({ onLogin, onSwitch }: { onLogin: () => void, onSwitch: () => void, key?: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // In a real app, save data.token to localStorage/context
        onLogin();
      } else {
        alert(data.error || "Login failed");
      }
    } catch (error) {
      alert("Could not connect to the authentication server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface text-white font-sans min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-dim opacity-10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-secondary-container opacity-10 rounded-full blur-[150px]"></div>
      </div>

      <header className="fixed top-0 left-0 w-full z-50 py-8 px-8 flex justify-center md:justify-start">
        <h1 className="font-headline text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          Melodify
        </h1>
      </header>

      <main className="flex-grow flex items-center justify-center px-6 py-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-10">
            <h2 className="font-headline text-5xl font-extralight tracking-tight mb-2">Welcome Back</h2>
            <p className="text-zinc-400 font-sans text-sm tracking-wide">Enter the nocturne of sound</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block text-xs font-semibold tracking-widest uppercase text-zinc-500 px-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-primary transition-colors" />
                <input 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-surface-container-highest/40 backdrop-blur-md w-full h-14 pl-12 pr-4 rounded-md border-none focus:ring-1 focus:ring-primary/50 text-white placeholder:text-zinc-600 transition-all outline-none" 
                  placeholder="name@example.com" 
                  type="email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between px-1">
                <label className="block text-xs font-semibold tracking-widest uppercase text-zinc-500">Password</label>
                <a className="text-xs font-semibold tracking-widest uppercase text-primary-dim hover:text-primary transition-colors" href="#">Forgot?</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-primary transition-colors" />
                <input 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-surface-container-highest/40 backdrop-blur-md w-full h-14 pl-12 pr-12 rounded-md border-none focus:ring-1 focus:ring-primary/50 text-white placeholder:text-zinc-600 transition-all outline-none" 
                  placeholder="••••••••" 
                  type={showPassword ? "text" : "password"}
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>

            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-gradient-to-r from-primary-dim to-primary text-on-primary-fixed font-bold rounded-md neon-glow"
            >
              <span>{isLoading ? "Signing In..." : "Sign In"}</span>
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </Button>
          </form>

          <div className="relative my-10 flex items-center justify-center">
            <div className="w-full h-[1px] bg-zinc-800"></div>
            <span className="absolute bg-surface px-4 text-xs font-semibold tracking-widest uppercase text-zinc-500">Or continue with</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="secondary" className="h-14 rounded-md gap-3">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcrzAg_h4lT4yutWoGE2jmxHiAAo-4uX4fdvDqK3L0OqZmYIaM6lIjAMY5tNW0LdoPTiHlFDxQQM0K-PY9X231ZwVDgse_mEC2gvtJ5j3jukXQS3jtzxPO3mi5lM8DauR8rrJtZoJNIbsgXlFMunJreaDfZVGPQHyYBs7kSkrzSQIOnsEJQB8SZ4fDSPa6VuiauSsuEDaPB7l1sYZF8kHLWPYaxT-sL_bXC2NUSoTPgayhkTapk87MIhZk5YooxN8joc4q9T8lRg" alt="Google" className="w-5 h-5" referrerPolicy="no-referrer" />
              <span>Google</span>
            </Button>
            <Button variant="secondary" className="h-14 rounded-md gap-3">
              <span className="font-bold">Apple</span>
            </Button>
          </div>

          <p className="mt-12 text-center text-sm text-zinc-400">
            New to the stage? 
            <button onClick={onSwitch} className="text-primary font-bold ml-1 hover:underline">Create Account</button>
          </p>
        </motion.div>
      </main>

      <footer className="fixed bottom-0 left-0 w-full py-8 text-center px-6">
        <p className="text-[10px] font-semibold tracking-widest uppercase text-zinc-600">
          © 2024 Melodify Inc. Immersive Audio Protocol.
        </p>
      </footer>
    </div>
  );
}
