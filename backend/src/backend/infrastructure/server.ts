import express from "express";
import cors from "cors";
import { createServer, IncomingMessage, ServerResponse, Server as httpServer } from "http";
import { Server as WebSocketServer } from "socket.io";
import { connect } from "mongoose";
import path from 'path';
import { socketController } from "../application/socketsController";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { routerRegister } from "../application/routes/routesRegister";
import * as dotenv from 'dotenv';
import { routerChatroom } from "../application/routes/routesChatroom";
dotenv.config();


export class Server {
  private app: express.Application;
  public port: string;
  public server: httpServer<typeof IncomingMessage, typeof ServerResponse>;
  public io: WebSocketServer<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8080";
    this.server = createServer(this.app);
    this.io = new WebSocketServer(this.server);

    //database connection
    this.dbConnection();

    //middlewares
    this.middlewares();

    //Routes
    this.routes();

    //Sockets
    this.sockets();
  }

  async dbConnection() {
    try {
      await connect("mongodb://127.0.0.1:27017/sockets-s7");
      console.log('Database online!');
    } catch (error) {
      console.log(error);
    }
  }

  middlewares() {
    //CORS
    this.app.use(cors());
    this.app.use(express.json());

    //Path public, frontend
    const frontendPath = path.resolve(__dirname, '../../public');
    this.app.use(express.static(frontendPath));
    
  }

  routes() {
    this.app.use('/user', routerRegister);
    this.app.use('/chatroom', routerChatroom);
  }

  sockets() {
    this.io.on('connection', socketController);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log("Server connected on port", this.port);
    });
  }
};
