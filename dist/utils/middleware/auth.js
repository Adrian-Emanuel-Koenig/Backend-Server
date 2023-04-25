"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.json({ status: false });
    }
};
exports.isAuth = isAuth;
