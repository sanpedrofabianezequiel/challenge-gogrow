import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../helpers/generar-jwt";
import { googleVerify } from "../helpers/google-verify";

const login = async (req: Request, res: Response) => {
  const { correo, password } = req.body;
  try {
    const usuario = await UserModel.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - correo",
      });
    }
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - estado: false",
      });
    }

    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(500).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }

    const token = await generarJWT(usuario.id);

    return res.status(200).json({
      ok: true,
      msg: "login",
      usuario: usuario,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error with the login",
    });
  }
};

const loginGoogle = async (req: Request, resp: Response, next: any) => {
  const { id_token } = req.body;
  try {
    const { nombre, img, correo } = await googleVerify(id_token);
    let usuario = await UserModel.findOne({ correo });

    if (!usuario) {
      const data = {
        nombre,
        img,
        correo,
        password: ":p",
        google: true,
      };
      usuario = new UserModel(data); 
      await usuario.save();
    }

    if (!usuario.estado) {
      return resp.status(401).json({
        msg: "User is not active",
      });
    }
    const token = await generarJWT(usuario.id);
    return resp.status(200).json({
      ok: true,
      msg: "login google",
      token,
      usuario,
    });
  } catch (error) {
    console.log(error);
    return resp.status(400).json({
      ok: false,
      msg: "Error with the login google, token invalid",
      id_token,
    });
  }
};

export { login, loginGoogle };
