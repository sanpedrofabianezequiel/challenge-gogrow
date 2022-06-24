import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import bcryptjs from "bcryptjs";
import { validationResult } from "express-validator";

const getAllUsers = async (req: Request, res: Response) => {
  const { limit = 5, desde = 0 } = req.query;
  const query = { estado: true };
  try {
    const [usuarios, total] = await Promise.all([UserModel.find(query).skip(Number(desde)).limit(Number(limit)), UserModel.countDocuments(query)]);

    return res.status(200).json({
      ok: true,
      msg: "get",
      total,
      usuarios,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Check your server",
    });
  }
};

const updateUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...props } = req.body;

  try {
    if (password) {
      const salt = bcryptjs.genSaltSync();
      props.password = bcryptjs.hashSync(password, salt);
    }
    const respMongoDb = await UserModel.findByIdAndUpdate(id, props, { new: true });
    return res.status(200).json({
      ok: true,
      msg: "Update",
      respMongoDb,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Check your server",
    });
  }
};

const createNewUser = async (req: Request, res: Response) => {
  const { google, password, correo, ...props } = req.body;
  const usuario = new UserModel({
    ...props,
    password,
    correo,
  });

  //Check if the email exist into the helpers

  try {
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    const respMongoDb = await usuario.save();

    return res.status(200).json({
      ok: true,
      respMongoDb,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "revisar tu servidor",
    });
  }
};

const deleteUserById = async (req: any, res: Response) => {
  //Envio el token verificado como parametro NUEVO ala request
  //Ya que estos middleware se ejecutan antes de llegarle al controllador
  //const usuario = await UserModel.findById({uid:uid});
  const { id } = req.params;
  const usuarioAutenticado = req.usuario;
  try {
    const usuarioDelete = await UserModel.findByIdAndUpdate(id, { estado: false });

    return res.status(200).json({
      ok: true,
      msg: "Delete",
      usuarioDelete,
      usuarioAutenticado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "revisar tu servidor",
    });
  }
};


export { getAllUsers, updateUserById, createNewUser, deleteUserById };
