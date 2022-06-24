import * as jwt from "jsonwebtoken";

const generarJWT = (uid: string = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY!,
      {
        expiresIn: "4h",
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject(`No se pudo generar el Token ${error}`);
        } else {
          resolve(token);
        }
      }
    );
  });
};

export { generarJWT };
