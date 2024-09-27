"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../../controllers/user.controller"));
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new user_controller_1.default();
        this.iniatizeRoutes();
    }
    iniatizeRoutes() {
        this.router.post("/register", this.controller.create);
        this.router.post("/login", this.controller.logIn);
        this.router.get("/", this.controller.findAll);
        this.router.get("/logout", this.controller.logOut);
        this.router.get("/:id", this.controller.findOne);
        this.router.put("/:id", this.controller.update);
        this.router.delete("/:id", this.controller.delete);
    }
}
exports.default = new UserRoutes().router;
