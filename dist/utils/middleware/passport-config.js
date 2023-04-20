"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passSign = exports.passLog = void 0;
const winston_1 = __importDefault(require("../logger/winston"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const users_1 = require("../../model/users");
function isValidPassword(user, password) {
    return bcrypt_1.default.compareSync(password, user.password);
}
function createHash(password) {
    return bcrypt_1.default.hashSync(password, bcrypt_1.default.genSaltSync(10), null);
}
exports.passLog = new passport_local_1.Strategy((username, password, done) => {
    users_1.userModel.findOne({ username }, (err, user) => {
        if (err)
            return done(err);
        if (!user) {
            winston_1.default.warn("User Not Found with username " + username);
            return done(null, false);
        }
        if (!isValidPassword(user, password)) {
            winston_1.default.error("Invalid Password");
            return done(null, false);
        }
        return done(null, user);
    });
});
exports.passSign = new passport_local_1.Strategy({
    passReqToCallback: true,
}, (req, username, password, done) => {
    users_1.userModel.findOne({ username: username }, (err, user) => {
        if (err) {
            winston_1.default.error("Error in SignUp: " + err);
            return done(err);
        }
        if (user) {
            winston_1.default.warn("User already exists");
            return done(null, false);
        }
        const newUser = {
            username: username,
            password: createHash(password),
            name: req.body.name,
            surname: req.body.surname,
            age: req.body.age,
            address: req.body.address,
            number: req.body.number,
            avatar: req.body.avatar,
        };
        users_1.userModel.create(newUser, (err, userWithId) => {
            if (err) {
                winston_1.default.error("Error in Saving user: " + err);
                return done(err);
            }
            winston_1.default.info("Username sign up: " + newUser.username);
            winston_1.default.info("User Registration succesful");
            return done(null, userWithId);
        });
    });
});
passport_1.default.serializeUser((user, done) => {
    done(null, user._id);
});
passport_1.default.deserializeUser((id, done) => {
    users_1.userModel.findById(id, done);
});
exports.default = passport_1.default;
