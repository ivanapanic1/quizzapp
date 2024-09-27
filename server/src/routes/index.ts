import { Application } from "express";
import HomeRoutes from "./routers/home.routes";
import UserRoutes from "./routers/user.routes";

export default class Routes {
    constructor(app: Application) {
        app.use("/api", HomeRoutes);
        app.use("/api/users", UserRoutes)
    }
}