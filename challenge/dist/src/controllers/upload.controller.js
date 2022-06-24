"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mostartImagen = exports.actualizarImagenCloudDinary = exports.actualizarImagen = exports.cargarArchivo = void 0;
var path_1 = __importDefault(require("path"));
var subir_archivo_1 = require("../helpers/subir-archivo");
var usuario_1 = require("../models/usuario");
var fs_1 = __importDefault(require("fs"));
var cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: 'dgtatdswf',
    api_key: '899544685697964',
    api_secret: 'UOBlvcjrhkjv3Hn_u1RbEt3B4l8'
});
var cargarArchivo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var nombre, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, subir_archivo_1.subirArchivo)(req.files)];
            case 1:
                nombre = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        nombre: nombre
                    })];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(400).json({
                        msg: error_1
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.cargarArchivo = cargarArchivo;
var actualizarImagen = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, coleccion, modelo, _b, pathImagen, nombre;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.params, id = _a.id, coleccion = _a.coleccion;
                _b = coleccion;
                switch (_b) {
                    case 'usuarios': return [3 /*break*/, 1];
                    case 'productos': return [3 /*break*/, 3];
                }
                return [3 /*break*/, 5];
            case 1: return [4 /*yield*/, usuario_1.UserModel.findById(id)];
            case 2:
                modelo = _c.sent();
                if (!modelo) {
                    return [2 /*return*/, res.status(400).json({
                            msg: "No existe un usuario con el id ".concat(id)
                        })];
                }
                return [3 /*break*/, 6];
            case 3: return [4 /*yield*/, ProductoModel.findById(id)];
            case 4:
                modelo = _c.sent();
                if (!modelo) {
                    return [2 /*return*/, res.status(400).json({
                            msg: "No existe un producto con el id ".concat(id)
                        })];
                }
                return [3 /*break*/, 6];
            case 5: return [2 /*return*/, res.status(500).json({
                    msg: "Error Update image"
                })];
            case 6:
                //Limpiar images previas
                if (modelo.img) {
                    pathImagen = path_1.default.join(__dirname, '../uploads', coleccion, modelo.img);
                    if (fs_1.default.existsSync(pathImagen)) {
                        fs_1.default.unlinkSync(pathImagen);
                    }
                }
                return [4 /*yield*/, (0, subir_archivo_1.subirArchivo)(req.files, undefined, coleccion)];
            case 7:
                nombre = _c.sent();
                modelo.img = nombre;
                console.log(modelo.img);
                return [4 /*yield*/, modelo.save()];
            case 8:
                _c.sent();
                return [2 /*return*/, res.status(201).json({
                        modelo: modelo
                    })];
        }
    });
}); };
exports.actualizarImagen = actualizarImagen;
var actualizarImagenCloudDinary = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, coleccion, modelo, _b, nombreArr, nombre, public_id, tempFilePath, secure_url, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.params, id = _a.id, coleccion = _a.coleccion;
                _b = coleccion;
                switch (_b) {
                    case 'usuarios': return [3 /*break*/, 1];
                    case 'productos': return [3 /*break*/, 3];
                }
                return [3 /*break*/, 5];
            case 1: return [4 /*yield*/, usuario_1.UserModel.findById(id)];
            case 2:
                modelo = _c.sent();
                if (!modelo) {
                    return [2 /*return*/, res.status(400).json({
                            msg: "No existe un usuario con el id ".concat(id)
                        })];
                }
                return [3 /*break*/, 6];
            case 3: return [4 /*yield*/, ProductoModel.findById(id)];
            case 4:
                modelo = _c.sent();
                if (!modelo) {
                    return [2 /*return*/, res.status(400).json({
                            msg: "No existe un producto con el id ".concat(id)
                        })];
                }
                return [3 /*break*/, 6];
            case 5: return [2 /*return*/, res.status(500).json({
                    msg: "Error Update image"
                })];
            case 6:
                //Limpiar images previas
                if (modelo.img) { //Se busca el Id en la base de Mongo en el Swithc y luego extraigo la imgen, y obtenco el nombre publico
                    nombreArr = modelo.img.split('/');
                    nombre = nombreArr[nombreArr.length - 1];
                    public_id = nombre.split('.')[0];
                    cloudinary_1.v2.uploader.destroy(public_id);
                }
                tempFilePath = req.files.archivo.tempFilePath;
                _c.label = 7;
            case 7:
                _c.trys.push([7, 10, , 11]);
                return [4 /*yield*/, cloudinary_1.v2.uploader.upload(tempFilePath)];
            case 8:
                secure_url = (_c.sent()).secure_url;
                modelo.img = secure_url;
                return [4 /*yield*/, modelo.save()];
            case 9:
                _c.sent();
                return [2 /*return*/, res.status(201).json({
                        modelo: modelo
                    })];
            case 10:
                error_2 = _c.sent();
                console.log(error_2);
                return [2 /*return*/, res.status(201).json({
                        msg: "It has error when you try to update the photo"
                    })];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.actualizarImagenCloudDinary = actualizarImagenCloudDinary;
var mostartImagen = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, coleccion, modelo, _b, pathImagen_1, pathImagen;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.params, id = _a.id, coleccion = _a.coleccion;
                _b = coleccion;
                switch (_b) {
                    case 'usuarios': return [3 /*break*/, 1];
                    case 'productos': return [3 /*break*/, 3];
                }
                return [3 /*break*/, 5];
            case 1: return [4 /*yield*/, usuario_1.UserModel.findById(id)];
            case 2:
                modelo = _c.sent();
                if (!modelo) {
                    return [2 /*return*/, res.status(400).json({
                            msg: "No existe un usuario con el id ".concat(id)
                        })];
                }
                return [3 /*break*/, 6];
            case 3: return [4 /*yield*/, ProductoModel.findById(id)];
            case 4:
                modelo = _c.sent();
                if (!modelo) {
                    return [2 /*return*/, res.status(400).json({
                            msg: "No existe un producto con el id ".concat(id)
                        })];
                }
                return [3 /*break*/, 6];
            case 5: return [2 /*return*/, res.status(500).json({
                    msg: "Error Update image"
                })];
            case 6:
                //Limpiar images previas
                if (modelo.img) {
                    pathImagen_1 = path_1.default.join(__dirname, '../uploads', coleccion, modelo.img);
                    if (fs_1.default.existsSync(pathImagen_1)) {
                        return [2 /*return*/, res.sendFile(pathImagen_1)]; //
                    }
                }
                pathImagen = path_1.default.join(__dirname, '../assets/no-image.jpg');
                return [2 /*return*/, res.sendFile(pathImagen)];
        }
    });
}); };
exports.mostartImagen = mostartImagen;
