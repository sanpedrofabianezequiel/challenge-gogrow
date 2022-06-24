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
exports.ProductoModel = void 0;
var mongoose_1 = require("mongoose");
var ProductoSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'usuario',
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'categoria',
        required: true
    },
    descripcion: { type: String },
    disponible: { type: Boolean, default: true },
    img: { type: String }
});
ProductoSchema.methods.toJSON = function () {
    var _a = this.toObject(), __v = _a.__v, estado = _a.estado, data = __rest(_a, ["__v", "estado"]);
    return data;
};
var ProductoModel = (0, mongoose_1.model)('producto', ProductoSchema);
exports.ProductoModel = ProductoModel;
