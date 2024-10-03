"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wordGeneratorQuestion_controller_1 = __importDefault(require("../../controllers/wordGeneratorQuestion.controller"));
class WordRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new wordGeneratorQuestion_controller_1.default();
        this.iniatizeRoutes();
    }
    iniatizeRoutes() {
        this.router.post("/", this.controller.create);
        this.router.get("/random", this.controller.getRandom);
        this.router.post("/check", this.controller.checkAnswer);
    }
}
exports.default = new WordRoutes().router;
