"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tieneRole = exports.esAdminRole = void 0;
var esAdminRole = function (req, resp, next) {
    //usuario deberia haber sido validado y agregado en la request
    //este usuario consultado con el modelo mongoose tiene toda la informacion apra consultar.
    if (!req.usuario) {
        return resp.status(500).json({ msg: 'Se requiere verificar el rol sin VALIDAR el token PRIMERO' });
    }
    var _a = req.usuario, rol = _a.rol, nombre = _a.nombre;
    if (rol !== 'ADMIN_ROLE') {
        return resp.status(401).json({
            msg: "El ".concat(nombre, " no es adminitrador para hace esto")
        });
    }
    next();
};
exports.esAdminRole = esAdminRole;
var tieneRole = function () {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
    return function (req, resp, next) {
        if (!req.usuario) {
            return resp.status(500).json({ msg: 'Se requiere verificar el rol sin VALIDAR el token PRIMERO' });
        }
        if (!rest.includes(req.usuario.rol)) {
            return resp.status(401).json({ msg: "El servicio requiere uno de los roles : ".concat(rest) });
        }
        next();
    };
};
exports.tieneRole = tieneRole;
