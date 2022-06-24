"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var usuarios_controller_1 = require("../controllers/usuarios.controller");
var express_validator_1 = require("express-validator");
var db_validators_1 = require("../helpers/db-validators");
var middlewares_1 = require("../middlewares");
var router = (0, express_1.Router)();
exports.router = router;
router.get('', usuarios_controller_1.usuarioGet);
router.put('/:id', [
    (0, express_validator_1.check)('id', 'No es ID valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(function (item) { return (0, db_validators_1.existeUsuarioId)(item); }),
    middlewares_1.validarCampos
], usuarios_controller_1.usuarioPut);
//Middleware need the names's request was the same
router.post('', [
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('password', 'El password debe de ser mas de 6 caracteres').isLength({ min: 6 }),
    (0, express_validator_1.check)('correo', 'El email no es valido').isEmail(),
    //check('rol','El rol no es valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    (0, express_validator_1.check)('rol').custom(function (item) { return (0, db_validators_1.esRolValido)(item); }),
    (0, express_validator_1.check)('correo').custom(function (item) { return (0, db_validators_1.emailExiste)(item); }),
    middlewares_1.validarCampos
], usuarios_controller_1.usuarioPost);
router.delete('/:id', [
    middlewares_1.validarJwt,
    //esAdminRole,
    (0, middlewares_1.tieneRole)('ADMIN_ROLE', 'VENTA_ROLE'),
    (0, express_validator_1.check)('id', 'No es ID valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(function (item) { return (0, db_validators_1.existeUsuarioId)(item); }),
    middlewares_1.validarCampos
], usuarios_controller_1.usuarioDelete);
router.patch('', usuarios_controller_1.usuariosPath);
