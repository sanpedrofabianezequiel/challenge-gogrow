"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var upload_controller_1 = require("../controllers/upload.controller");
var db_validators_1 = require("../helpers/db-validators");
var validar_campos_1 = require("../middlewares/validar-campos");
var validar_archivo_1 = require("../middlewares/validar-archivo");
var router = (0, express_1.Router)();
exports.router = router;
router.post('/uploads', [], upload_controller_1.cargarArchivo);
router.put('/:coleccion/:id', [
    validar_archivo_1.validarArchivoSubir,
    (0, express_validator_1.check)('id', 'El id debe de ser de mongo').isMongoId(),
    (0, express_validator_1.check)('coleccion').custom(function (c) { return (0, db_validators_1.coleccionesPermitidas)(c, ['usuarios', 'productos']); }),
    validar_campos_1.validarCampos
], upload_controller_1.actualizarImagenCloudDinary);
router.get('/:coleccion/:id', [
    (0, express_validator_1.check)('id', 'El id debe de ser de mongo').isMongoId(),
    (0, express_validator_1.check)('coleccion').custom(function (c) { return (0, db_validators_1.coleccionesPermitidas)(c, ['usuarios', 'productos']); }),
    validar_campos_1.validarCampos
], upload_controller_1.mostartImagen);
