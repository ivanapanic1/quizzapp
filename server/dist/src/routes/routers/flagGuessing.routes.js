"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fileUpload_1 = require("../../config/fileUpload");
const flagGuessingController_1 = __importDefault(require("../../controllers/flagGuessingController"));
class FlagGuessingRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new flagGuessingController_1.default();
        this.iniatizeRoutes();
    }
    iniatizeRoutes() {
        this.router.post("/", fileUpload_1.upload.single('file'), this.controller.create);
        this.router.get("/random", this.controller.getRandom);
        this.router.post("/check", this.controller.checkAnswer);
    }
}
exports.default = new FlagGuessingRoutes().router;
