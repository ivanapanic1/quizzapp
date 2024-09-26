import { Application } from "express";
import HomeRoutes from "./routers/home.routes";

export default class Routes {
    constructor(app: Application) {
        app.use("/api", HomeRoutes);
    }
}