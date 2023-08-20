import './config';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { bot } from './loaders';
import router from './routes';
import { errorHandler } from './middlewares/error-handler';

class Server {
  app: express.Application;

  constructor() {
    this.app = express();
    if (process.env.NODE_ENV === 'development') {
      this.app.use(
        cors({
          origin: true,
          credentials: true,
        }),
      );
    } else {
      const whitelist = ['https://www.guheyo.com'];
      this.app.use(
        cors({
          origin: whitelist,
          credentials: true,
        }),
      );
    }
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use('/', router());
    this.app.use(errorHandler);
  }

  listen(port: number): void {
    const { app } = this;
    app.listen(port);
    console.log('Express: Listening to port', port);
  }
}

const server = new Server();
server.listen(Number(process.env.PORT));

if (process.env.NODE_APP_INSTANCE === '0') {
  bot.sync();
}
