"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var server_model_1 = require("./src/models/server.model");
dotenv_1.default.config();
var server = new server_model_1.Server();
server.listen();
