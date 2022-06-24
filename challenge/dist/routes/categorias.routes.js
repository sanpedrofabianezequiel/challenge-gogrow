"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var categorias_controller_1 = require("../controllers/categorias.controller");
var db_validators_1 = require("../helpers/db-validators");
var middlewares_1 = require("../middlewares");
var validar_campos_1 = require("../middlewares/validar-campos");
var router = (0, express_1.Router)();
exports.router = router;
router.get('/', categorias_controller_1.obtenerCategorias);
router.get('/:id', [
    (0, express_validator_1.check)('id', 'No es un id de Mongo Valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existeCategoriaId),
    validar_campos_1.validarCampos
], categorias_controller_1.obtenerCategoria);
router.post('/', [
    middlewares_1.validarJwt,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], categorias_controller_1.crearCategoria);
router.put('/:id', [
    middlewares_1.validarJwt,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existeCategoriaId),
    validar_campos_1.validarCampos
], categorias_controller_1.actualizarCategoria);
router.delete('/:id', [
    middlewares_1.validarJwt,
    middlewares_1.esAdminRole,
    (0, express_validator_1.check)('id', 'No es un id de Mongo valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existeCategoriaId),
    validar_campos_1.validarCampos
], categorias_controller_1.borrarCategoria);
