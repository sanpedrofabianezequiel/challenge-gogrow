"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var mongoose_1 = require("mongoose");
var UsuarioSchema = new mongoose_1.Schema({
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
    var _a = this.toObject(), __v = _a.__v, password = _a.password, _id = _a._id, usuario = __rest(_a, ["__v", "password", "_id"]);
    usuario.uid = _id;
    return usuario;
};
//The first param is the name into the BD
var UserModel = (0, mongoose_1.model)("usuario", UsuarioSchema);
exports.UserModel = UserModel;
