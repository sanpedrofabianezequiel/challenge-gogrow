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
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrarProducto = exports.actualizarProducto = exports.crearProducto = exports.obtenerProducto = exports.obtenerProductos = void 0;
var producto_1 = require("../models/producto");
var obtenerProductos = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, limite, _c, desde, query, _d, total, productos;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = req.query, _b = _a.limite, limite = _b === void 0 ? 5 : _b, _c = _a.desde, desde = _c === void 0 ? 0 : _c;
                query = { estado: true };
                return [4 /*yield*/, Promise.all([
                        producto_1.ProductoModel.countDocuments(query),
                        producto_1.ProductoModel.find(query)
                            .populate('usuario', 'nombre')
                            .populate('categoria', 'nombre')
                            .skip(Number(desde))
                            .limit(Number(limite))
                    ])];
            case 1:
                _d = _e.sent(), total = _d[0], productos = _d[1];
                return [2 /*return*/, resp.json({
                        total: total,
                        productos: productos
                    })];
        }
    });
}); };
exports.obtenerProductos = obtenerProductos;
var obtenerProducto = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var id, producto;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, producto_1.ProductoModel.findById(id)
                        .populate('usuario', 'nombre')
                        .populate('categoria', 'nombre')];
            case 1:
                producto = _a.sent();
                return [2 /*return*/, resp.json({
                        producto: producto
                    })];
        }
    });
}); };
exports.obtenerProducto = obtenerProducto;
var crearProducto = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, estado, usuario, body, productoDB, data, producto;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, estado = _a.estado, usuario = _a.usuario, body = __rest(_a, ["estado", "usuario"]);
                return [4 /*yield*/, producto_1.ProductoModel.findOne({ nombre: body.nombre })];
            case 1:
                productoDB = _b.sent();
                if (productoDB) {
                    return [2 /*return*/, resp.status(400).json({
                            msg: "El producto ".concat(productoDB.nombre, " ya existe")
                        })];
                }
                ;
                data = __assign(__assign({}, body), { nombre: body.nombre.toUpperCase(), usuario: req.usuario._id });
                producto = new producto_1.ProductoModel(data);
                return [4 /*yield*/, producto.save()];
            case 2:
                _b.sent();
                resp.status(201).json(producto);
                return [2 /*return*/];
        }
    });
}); };
exports.crearProducto = crearProducto;
var actualizarProducto = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, estado, usuario, data, producto;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, estado = _a.estado, usuario = _a.usuario, data = __rest(_a, ["estado", "usuario"]);
                if (data.nombre) {
                    data.nombre = data.nombre.toUpperCase();
                }
                data.usuario = req.usuario._id;
                return [4 /*yield*/, producto_1.ProductoModel.findByIdAndUpdate(id, data, { new: true })];
            case 1:
                producto = _b.sent();
                return [2 /*return*/, resp.json({ producto: producto })];
        }
    });
}); };
exports.actualizarProducto = actualizarProducto;
var borrarProducto = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var id, productoBorrado;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, producto_1.ProductoModel.findByIdAndUpdate(id, { estado: true }, { new: true })];
            case 1:
                productoBorrado = _a.sent();
                return [2 /*return*/, resp.json(productoBorrado)];
        }
    });
}); };
exports.borrarProducto = borrarProducto;
