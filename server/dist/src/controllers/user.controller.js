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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = __importDefault(require("../repository/user.repository"));
class UserController {
    logOut(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.session.destroy((err) => {
                if (err) {
                    return res.status(500).json({ message: 'Failed to log out' });
                }
                res.clearCookie('connect.sid');
                return res.status(200).json({ message: 'Logged out' });
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body.email) {
                res.status(400).send({
                    message: "Content can not be empty!"
                });
                return;
            }
            try {
                const user = req.body;
                const existingUser = yield user_repository_1.default.retrieveAll({ email: user.email });
                if (existingUser.length > 0) {
                    res.status(500).send("User with that email already exists");
                    return;
                }
                const savedUser = yield user_repository_1.default.save(user);
                res.status(201).send(savedUser);
            }
            catch (err) {
                res.status(500).json({
                    message: "Internal Server Error!"
                });
            }
        });
    }
    logIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body;
                const loggedUser = yield user_repository_1.default.login(user);
                if (loggedUser) {
                    console.log("Logged in");
                    req.session.user = { 'username': loggedUser.username };
                    res.status(200).send(loggedUser);
                }
                else {
                    console.log("Not the right credentials");
                    res.status(401).json("Your credentials weren't good");
                }
            }
            catch (err) {
                console.log("error");
                res.status(500).json({
                    message: "Internal Server Error!"
                });
            }
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = typeof req.query.email === "string" ? req.query.email : "";
            const password = typeof req.query.password === "string" ? req.query.password : "";
            try {
                const users = yield user_repository_1.default.retrieveAll({ email: email, password: password });
                res.status(200).send(users);
            }
            catch (err) {
                res.status(500).json({
                    message: "Internal Server Error!"
                });
            }
        });
    }
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json({
                    message: "findOne OK",
                    reqParamId: req.params.id
                });
            }
            catch (err) {
                res.status(500).json({
                    message: "Internal Server Error!"
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json({
                    message: "update OK",
                    reqParamId: req.params.id,
                    reqBody: req.body
                });
            }
            catch (err) {
                res.status(500).json({
                    message: "Internal Server Error!"
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json({
                    message: "delete OK",
                    reqParamId: req.params.id,
                });
            }
            catch (err) {
                res.status(500).json({
                    message: "Internal Server Error!"
                });
            }
        });
    }
    deleteAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    findAllEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = UserController;
