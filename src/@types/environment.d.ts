declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      NODE_DEV:string;
      DB_PORT: string;
      DB_NAME: string;
      DB_USER: string;
      DB_PASS: string;
      DB_HOST: string;
      SOCKET_EVENT_NAME: string;
      SOCKET_CLIENT_SERVER: string;
    }
  }
}

export {}