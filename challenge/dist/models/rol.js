"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolModel = void 0;
var mongoose_1 = require("mongoose");
var RolSchema = new mongoose_1.Schema({
    rol: {
        type: String,
        required: [true, "El rol es obligatario"],
    },
});
//The first param is the name into the BD
var RolModel = (0, mongoose_1.model)("role", RolSchema);
exports.RolModel = RolModel;
