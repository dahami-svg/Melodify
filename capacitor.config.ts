import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.melodify.app',
  appName: 'Melodify',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
