import { RolModel } from "../models/rol.model";
import { UserModel } from "../models/user.model";

const esRolValido = async (item = "") => {
  const rolFind = await RolModel.findOne({ rol: item });
  console.log(item);
  console.log(rolFind);

  if (!rolFind) {
    throw new Error(`El ${item} no esta registrado en la BD`);
  }
};

const emailExiste = async (correo = "") => {
  const exitsEmail = await UserModel.findOne({ correo });
  if (exitsEmail) {
    throw new Error(`El ${correo}  esta registrado en la BD`);
  }
};

const existeUsuarioId = async (id: any) => {
  const usuario = await UserModel.findById(id);
  if (!usuario) {
    throw new Error(`El ${usuario}  no existe en la BD`);
  }
};

export { esRolValido, emailExiste, existeUsuarioId };
