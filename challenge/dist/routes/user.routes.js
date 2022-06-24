"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var router = (0, express_1.Router)();
exports.router = router;
router.get('', function (req, res) {
    res.status(200).json({
        ok: true,
        msg: 'get'
    });
});
router.put('', function (req, res) {
    res.status(200).json({
        ok: true,
        msg: 'put'
    });
});
router.post('/api', function (req, res) {
    res.status(200).json({
        ok: true,
        msg: 'post'
    });
});
router.delete('', function (req, res) {
    res.status(200).json({
        ok: true,
        msg: 'delete'
    });
});
router.patch('', function (req, res) {
    res.status(200).json({
        ok: true,
        msg: 'patch'
    });
});
