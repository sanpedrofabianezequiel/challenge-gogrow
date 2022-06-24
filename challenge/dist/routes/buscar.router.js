"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var buscar_controller_1 = require("../controllers/buscar.controller");
var router = (0, express_1.Router)();
exports.router = router;
router.get('/:coleccion/:termino', [], buscar_controller_1.buscar);
