"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var users_controller_1 = require("../controllers/users.controller");
var express_validator_1 = require("express-validator");
var db_validators_1 = require("../helpers/db-validators");
var middlewares_1 = require("../middlewares");
var router = (0, express_1.Router)();
exports.router = router;
router.get("", users_controller_1.getAllUsers);
//Middleware need the names's request was the same
router.post("", [
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("password", "El password debe de ser mas de 6 caracteres").isLength({ min: 6 }),
    (0, express_validator_1.check)("correo", "El email no es valido").isEmail(),
    //check('rol','El rol no es valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    //check("rol").custom((item) => esRolValido(item)),
    (0, express_validator_1.check)("correo").custom(function (item) { return (0, db_validators_1.emailExiste)(item); }),
    middlewares_1.validarCampos,
], users_controller_1.createNewUser);
router.put("/:id", [(0, express_validator_1.check)("id", "No es ID valido").isMongoId(), (0, express_validator_1.check)("id").custom(function (item) { return (0, db_validators_1.existeUsuarioId)(item); }), middlewares_1.validarCampos], users_controller_1.updateUserById);
router.delete("/:id", [
    middlewares_1.validarJwt,
    //esAdminRole,
    (0, middlewares_1.tieneRole)("ADMIN_ROLE", "VENTA_ROLE"),
    (0, express_validator_1.check)("id", "No es ID valido").isMongoId(),
    (0, express_validator_1.check)("id").custom(function (item) { return (0, db_validators_1.existeUsuarioId)(item); }),
    middlewares_1.validarCampos,
], users_controller_1.deleteUserById);
