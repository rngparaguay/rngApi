export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      HOSTDB: string;
      USERNAMEDB: string;
      PASSWORDDB: string;
      DATABASE: string;
      SERVER: string;
      ENV: 'test' | 'dev' | 'prod';
    }
  }
}
