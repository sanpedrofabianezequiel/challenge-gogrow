import { Schema, model } from "mongoose";

interface Rol {
  rol: string;
}

const RolSchema = new Schema<Rol>({
  rol: {
    type: String,
    required: [true, "El rol es obligatario"],
  },
});
//The first param is the name into the BD
const RolModel = model<Rol>("role", RolSchema);

export { RolModel };
