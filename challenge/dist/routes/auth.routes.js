"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var auth_controller_1 = require("../controllers/auth.controller");
var validar_campos_1 = require("../middlewares/validar-campos");
var router = (0, express_1.Router)();
exports.router = router;
router.post('/login', [
    (0, express_validator_1.check)('correo', 'El correo es obligatior').isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña es obligatoria').not().isEmpty(),
    validar_campos_1.validarCampos
], auth_controller_1.loginPost);
router.post('/google', [
    (0, express_validator_1.check)('id_token', 'El token google es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], auth_controller_1.loginGoogle);
