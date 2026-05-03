import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Toaster } from 'sonner';
import SplashScreen from '@/src/components/screens/SplashScreen';
import Onboarding from '@/src/components/screens/Onboarding';
import Login from '@/src/components/screens/Login';
import HomeScreen from '@/src/components/screens/HomeScreen';

type Screen = 'splash' | 'onboarding' | 'login' | 'home';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');

  return (
    <div className="min-h-screen bg-surface">
      <Toaster position="top-center" theme="dark" />
      <AnimatePresence mode="wait">
        {currentScreen === 'splash' && (
          <SplashScreen key="splash" onComplete={() => setCurrentScreen('onboarding')} />
        )}
        {currentScreen === 'onboarding' && (
          <Onboarding key="onboarding" onComplete={() => setCurrentScreen('login')} />
        )}
        {currentScreen === 'login' && (
          <Login 
            key="login" 
            onLogin={() => setCurrentScreen('home')} 
            onSwitch={() => {}} // Placeholder for signup
          />
        )}
        {currentScreen === 'home' && (
          <HomeScreen key="home" onLogout={() => setCurrentScreen('login')} />
        )}
      </AnimatePresence>
    </div>
  );
}
