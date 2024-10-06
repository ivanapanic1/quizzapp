import { Application } from "express";
import UserRoutes from "./routers/user.routes";
import HomeRoutes from "./routers/home.routes";
import MathQuestionRoutes from "./routers/mathQuestion.routes";
import CountryMatchingRoutes from "./routers/CountryMatching.routes";
import wordRoutes from "./routers/wordGenerator.routes";
import flagGuessingRoutes from "./routers/flagGuessing.routes";

export default class Routes {
    constructor(app: Application) {
        app.use("/api", HomeRoutes);
        app.use("/api/users", UserRoutes);
        app.use("/api/math",MathQuestionRoutes);
        app.use("/api/country",CountryMatchingRoutes);
        app.use("/api/word",wordRoutes);
        app.use("/api/flag",flagGuessingRoutes);
    }
}