"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var middlewares_1 = require("../middlewares");
var productos_controller_1 = require("../controllers/productos.controller");
var db_validators_1 = require("../helpers/db-validators");
var express_validator_1 = require("express-validator");
var router = (0, express_1.Router)();
exports.router = router;
router.get('/', productos_controller_1.obtenerProductos);
router.get(':id', [
    (0, express_validator_1.check)('id', 'No es un id de mongo valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existeProductoId),
    middlewares_1.validarCampos
], productos_controller_1.obtenerProducto);
router.post('/', [
    middlewares_1.validarJwt,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('categoria', 'No es un id de Mongo').isMongoId(),
    (0, express_validator_1.check)('categoria').custom(db_validators_1.existeCategoriaId),
    middlewares_1.validarCampos
], productos_controller_1.crearProducto);
router.put('/:id', [
    middlewares_1.validarJwt,
    // check('categoria','No es un id de Mongo').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existeProductoId),
    middlewares_1.validarCampos
], productos_controller_1.actualizarProducto);
router.delete('/:id', [
    middlewares_1.validarJwt,
    middlewares_1.esAdminRole,
    (0, express_validator_1.check)('id', 'No e sun id de mongo valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existeProductoId),
    middlewares_1.validarCampos
], productos_controller_1.borrarProducto);
