import { Application } from "express";
import HomeRoutes from "./routers/home.routes";
import UserRoutes from "./routers/user.routes";
import MathQuestionRoutes from "./routers/mathQuestion.routes";
import CountryMatchingRoutes from "./routers/CountryMatching.routes";


export default class Routes {
    constructor(app: Application) {
        app.use("/api", HomeRoutes);
        app.use("/api/users", UserRoutes);
        app.use("/api/math",MathQuestionRoutes);
        app.use("/api/country",CountryMatchingRoutes);
    }
}