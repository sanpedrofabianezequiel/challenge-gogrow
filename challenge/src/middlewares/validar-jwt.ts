import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { UserModel } from "../models/user.model";

interface RequestJwt extends Request {
    [key: string]: any;
}

const validarJwt = async (req: RequestJwt, resp: Response, next: any) => {
  const token = req.header("Authorization");
  if (!token) {
    return resp.status(401).json({
      msg: "No hay token en la peticion",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY!) as any;
    //Envio el token verificado como parametro NUEVO ala request
    //Ya que estos middleware se ejecutan antes de llegarle al controllador
    const usuario = await UserModel.findById({ _id: uid });

    if (!usuario) {
      return resp.status(401).json({ msg: "Token no valido - usuario no existe en la BD" });
    }
    if (!usuario.estado) {
      return resp.status(401).json({ msg: "Token no valido - usuario con estado : False" });
    }

    //req.uid  = uid;
    req.usuario = usuario;
    console.log("token valido");
    next();
  } catch (error) {
    console.log(error);
    return resp.status(401).json({
      msg: "token no valido",
    });
  }
};

export { validarJwt };
