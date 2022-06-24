import { Schema, model } from "mongoose";

interface User {
  nombre: string;
  correo: string;
  password: string;
  img?: string;
  rol?: string;
  estado: boolean;
  google: boolean;
}

const UsuarioSchema = new Schema<User>({
  nombre: {
    type: String,
    required: [true, "The name is required"],
  },
  correo: {
    type: String,
    required: [true, "The email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "The password is required"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: false,
    emun: ["ADMIN_ROLE", "USER_ROLE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UsuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};

//The first param is the name into the BD

const UserModel = model<User>("usuario", UsuarioSchema);

export { UserModel };
