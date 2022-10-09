import pino from 'pino';
import environmentKeys from '../../constants/tech/environmentKeys';

const environment = environmentKeys.NODE_ENV;

const logger = pino({
   transport: {
    target: "pino-pretty"
   },
   base: {
    pid: environment.toUpperCase()
   },
   timestamp: () => `,"time":"${new Intl.DateTimeFormat("pt-br", {
      dateStyle: "short",
      timeStyle: "long",
    }).format(new Date())}"`
});

export default logger;