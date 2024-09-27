"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import {upload} from "../../server";
class HomeRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.iniatizeRoutes();
    }
    iniatizeRoutes() {
        // this.router.get("/", welcome);
    }
}
exports.default = new HomeRoutes().router;
