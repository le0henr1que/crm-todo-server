import { environment } from "./tech";

const {
   NODE_ENV, 
   DB_NAME,
   DB_PASS,
   DB_PORT,
   DB_USER,
   DB_HOST,
   SOCKET_EVENT_NAME,
   SOCKET_CLIENT_SERVER,
} = process.env;


console.log( NODE_ENV, 
  DB_NAME,
  DB_PASS,
  DB_PORT,
  DB_USER,
  DB_HOST,
  SOCKET_EVENT_NAME,
  SOCKET_CLIENT_SERVER,)

/**
 * @typedef {Object} Keys 
 * @property {String} NODE_DEV
 * @property {String} MONGO_URL
 * @property {String} SOCKET_EVENT_NAME
 * @property {String} SOCKET_CLIENT_SERVER
 * 
 * @param [nodeEnv=dev] 
 * @returns Keys
 */
const keys = (nodeEnv = environment.DEV) => {
  const baseKeys = {
    NODE_ENV: nodeEnv,
    MONGO_URL: `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
    SOCKET_EVENT_NAME,
    SOCKET_CLIENT_SERVER,
  };
  
  const environmentKeys = {
    [environment.DEV]: {
      ...baseKeys,
      MONGO_URL: `mongodb://localhost:${DB_PORT}/${DB_NAME}`
    },
    [environment.TEST]: {
      ...baseKeys,
    },
    [environment.PROD]: {
      ...baseKeys
    },
  };

  return environmentKeys[nodeEnv];
}

export default keys(NODE_ENV);