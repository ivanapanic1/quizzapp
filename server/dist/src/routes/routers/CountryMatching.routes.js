"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CountryFlagMatchingQuestion_controller_1 = __importDefault(require("../../controllers/CountryFlagMatchingQuestion.controller"));
const fileUpload_1 = require("../../config/fileUpload");
class CountryMatchingRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new CountryFlagMatchingQuestion_controller_1.default();
        this.iniatizeRoutes();
    }
    iniatizeRoutes() {
        this.router.post("/", fileUpload_1.upload.array('files', 4), this.controller.create);
        this.router.get("/random", this.controller.getRandom);
        this.router.post("/check", this.controller.checkAnswer);
    }
}
exports.default = new CountryMatchingRoutes().router;
