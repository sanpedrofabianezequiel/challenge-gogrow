import { Router } from "express";
import { check } from "express-validator";
import { login, loginGoogle } from "../controllers/auth.controller";
import { validarCampos } from "../middlewares/validar-campos";

const router = Router();

router.post("/login", [check("correo", "El correo es obligatorio").isEmail(), check("password", "La contraseña es obligatoria").not().isEmpty(), validarCampos], login);

router.post("/google", [check("id_token", "El token google es obligatorio").not().isEmpty(), validarCampos], loginGoogle);

export { router };
