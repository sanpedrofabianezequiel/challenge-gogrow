"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarArchivoSubir = void 0;
var validarArchivoSubir = function (req, res, next) {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json('No files were uploaded.');
        return;
    }
    next();
};
exports.validarArchivoSubir = validarArchivoSubir;
