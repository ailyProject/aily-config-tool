import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 't.aily.pro',
  appName: 'aily Config Tool',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https'
  }
};

export default config;
