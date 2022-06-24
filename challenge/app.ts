import env from "dotenv";
import { Server } from "./src/models/server.model";
env.config();
const server = new Server();
server.listen();
