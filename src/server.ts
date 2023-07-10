import './config';
import cors from 'cors';
import { bot, redisClient } from './loaders';
import express from 'express'
import router from './routes';
import bodyParser from 'body-parser';
import { errorHandler } from './middlewares/errorHandler';

class Server {
  app: express.Application;

  constructor() {
    this.app = express();
    const whitelist = ['http://localhost:3000', 'https://www.wtb.kr'];
    this.app.use(cors({
      origin: whitelist,
      credentials: true
    }));
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use('/', router());
    this.app.use(errorHandler);
    if (process.env.NODE_ENV === 'production' && process.env.NODE_APP_INSTANCE === '0') {
      this.initializeBot();
    }
  }

  initializeBot(): void {
    bot.sync();
    console.log('Loading discord bot');
  }

  listen(port: number): void {
    const { app } = this;
    app.listen(port);
    console.log('Express: Listening to port', port);
  }
};

const server = new Server();
server.listen(Number(process.env.PORT));