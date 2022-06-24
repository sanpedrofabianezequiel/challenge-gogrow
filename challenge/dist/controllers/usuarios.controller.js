"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuariosPath = exports.usuarioDelete = exports.usuarioPost = exports.usuarioPut = exports.usuarioGet = void 0;
var usuario_1 = require("../models/usuario");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var usuarioGet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, limit, _c, desde, query, _d, usuarios, total;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = req.query, _b = _a.limit, limit = _b === void 0 ? 5 : _b, _c = _a.desde, desde = _c === void 0 ? 0 : _c;
                query = { estado: true };
                return [4 /*yield*/, Promise.all([
                        usuario_1.UserModel.find(query)
                            .skip(Number(desde))
                            .limit(Number(limit)),
                        usuario_1.UserModel.countDocuments(query)
                    ])];
            case 1:
                _d = _e.sent(), usuarios = _d[0], total = _d[1];
                return [2 /*return*/, res.status(200).json({
                        ok: true,
                        msg: 'get',
                        total: total,
                        usuarios: usuarios
                    })];
        }
    });
}); };
exports.usuarioGet = usuarioGet;
var usuarioPut = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, _id, password, google, correo, resto, salt, respMongoDb, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, _id = _a._id, password = _a.password, google = _a.google, correo = _a.correo, resto = __rest(_a, ["_id", "password", "google", "correo"]);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                if (password) {
                    salt = bcryptjs_1.default.genSaltSync();
                    resto.password = bcryptjs_1.default.hashSync(password, salt);
                }
                return [4 /*yield*/, usuario_1.UserModel.findByIdAndUpdate(id, resto)];
            case 2:
                respMongoDb = _b.sent();
                return [2 /*return*/, res.status(200).json({
                        ok: true,
                        respMongoDb: respMongoDb
                    })];
            case 3:
                error_1 = _b.sent();
                console.log(error_1);
                return [2 /*return*/, res.status(500).json({
                        ok: false,
                        msg: 'revisar tu servidor'
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.usuarioPut = usuarioPut;
var usuarioPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, google, password, correo, rest, usuario, salt, respMongoDb, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, google = _a.google, password = _a.password, correo = _a.correo, rest = __rest(_a, ["google", "password", "correo"]);
                usuario = new usuario_1.UserModel(__assign(__assign({}, rest), { password: password, correo: correo }));
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                salt = bcryptjs_1.default.genSaltSync();
                usuario.password = bcryptjs_1.default.hashSync(password, salt);
                return [4 /*yield*/, usuario.save()];
            case 2:
                respMongoDb = _b.sent();
                return [2 /*return*/, res.status(200).json({
                        ok: true,
                        respMongoDb: respMongoDb
                    })];
            case 3:
                error_2 = _b.sent();
                console.log(error_2);
                return [2 /*return*/, res.status(500).json({
                        ok: false,
                        msg: 'revisar tu servidor'
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.usuarioPost = usuarioPost;
var usuarioDelete = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, usuarioAutenticado, usuarioDelete_1, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                usuarioAutenticado = req.usuario;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, usuario_1.UserModel.findByIdAndUpdate(id, { estado: false })];
            case 2:
                usuarioDelete_1 = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        ok: true,
                        msg: 'Delete',
                        usuarioDelete: usuarioDelete_1,
                        usuarioAutenticado: usuarioAutenticado
                    })];
            case 3:
                error_3 = _a.sent();
                console.log(error_3);
                return [2 /*return*/, res.status(500).json({
                        ok: false,
                        msg: 'revisar tu servidor'
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.usuarioDelete = usuarioDelete;
var usuariosPath = function (req, res) {
    res.status(200).json({
        ok: true,
        msg: 'patch'
    });
};
exports.usuariosPath = usuariosPath;
