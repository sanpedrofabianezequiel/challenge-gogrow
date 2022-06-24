import { Router } from "express";
import { getAllUsers, updateUserById, createNewUser, deleteUserById } from "../controllers/users.controller";
import { check } from "express-validator";
import { emailExiste, esRolValido, existeUsuarioId } from "../helpers/db-validators";

import { esAdminRole, tieneRole, validarCampos, validarJwt } from "../middlewares";

const router = Router();

router.get("", getAllUsers);

//Middleware need the names's request was the same
router.post(
  "",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe de ser mas de 6 caracteres").isLength({ min: 6 }),
    check("correo", "El email no es valido").isEmail(),
    //check('rol','El rol no es valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    //check("rol").custom((item) => esRolValido(item)),
    check("correo").custom((item) => emailExiste(item)),
    validarCampos,
  ],
  createNewUser
);
router.put("/:id", [check("id", "No es ID valido").isMongoId(), check("id").custom((item) => existeUsuarioId(item)), validarCampos], updateUserById);

router.delete(
  "/:id",
  [
    validarJwt,
    //esAdminRole,
    tieneRole("ADMIN_ROLE", "VENTA_ROLE"),
    check("id", "No es ID valido").isMongoId(),
    check("id").custom((item) => existeUsuarioId(item)),
    validarCampos,
  ],
  deleteUserById
);

export { router };
