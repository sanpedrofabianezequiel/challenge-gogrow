import express, { Application } from "express";
import cors from "cors";
import { router as routerUsuarios } from "../routes/users.routes";
import { router as routerAuth } from "../routes/auth.routes";

import { ConnectionDataBase } from "../database/config";
import fileUpload from "express-fileupload";

class Server {
  private app: Application;
  private port: string | number;
  private path: {
    usuarioPath: string;
    authPath: string;
  };
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.path = {
      usuarioPath: "/api/users",
      authPath: "/api/auth",
    };
    this.connectDataBase();
    this.middlewares();
    this.routes();
  }

  async connectDataBase() {
    await ConnectionDataBase();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }
  routes() {
    this.app.use(this.path.usuarioPath, routerUsuarios);
    this.app.use(this.path.authPath, routerAuth);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
export { Server };
