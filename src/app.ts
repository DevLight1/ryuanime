require('dotenv').config();
import * as express from "express";
import * as cors from 'cors';
import * as bodyparser from 'body-parser';
import { router } from './api/index';
import middleware from "./middleware/index";

class App {
  public app: express.Application = express();

  constructor() {
    this.config();
  }

  private config(): void {
    this.app.use(cors());
    this.app.use(bodyparser.json());
    this.app.use(bodyparser.urlencoded({ extended: false }));
    this.app.get('/', (req: express.Request, res: express.Response) => {
      res.json({
        message: 'ᕦ(ò_óˇ)ᕤ'
      });
    });
    this.app.use('/api/v1', router);
    this.app.use(middleware);
  }
}

export default new App().app;


//const app = express();
//
//
//app.use(cors());
//app.use(bodyparser.json());
//
//app.get('/', (req: express.Request, res: express.Response) => {
//  res.json({
//    message: 'ᕦ(ò_óˇ)ᕤ'
//  });
//});
//
//app.use('/api/v1', router);
//
//app.use(middleware.requestLoggerMiddleware)
//app.use(middleware.notFound);
//app.use(middleware.errorHandler);
