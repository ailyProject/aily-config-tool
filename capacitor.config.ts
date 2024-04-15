import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'tool.aily.pro',
  appName: 'aily Config Tool',
  webDir: 'www',
  bundledWebRuntime: true,
  server: {
    androidScheme: 'https'
  }
};

export default config;
