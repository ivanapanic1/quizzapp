"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const welcome_controller_1 = require("../../controllers/welcome.controller");
const fileUpload_1 = require("../../config/fileUpload");
// import {upload} from "../../server";
class HomeRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.iniatizeRoutes();
    }
    iniatizeRoutes() {
        this.router.get("/", welcome_controller_1.welcome);
        this.router.post("/pictrue", fileUpload_1.upload.single('file'), welcome_controller_1.pictureTest);
        this.router.get("/pictrue/:path", welcome_controller_1.pictureTestReturn);
    }
}
exports.default = new HomeRoutes().router;
