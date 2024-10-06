"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_routes_1 = __importDefault(require("./routers/user.routes"));
const home_routes_1 = __importDefault(require("./routers/home.routes"));
const mathQuestion_routes_1 = __importDefault(require("./routers/mathQuestion.routes"));
const CountryMatching_routes_1 = __importDefault(require("./routers/CountryMatching.routes"));
const wordGenerator_routes_1 = __importDefault(require("./routers/wordGenerator.routes"));
const flagGuessing_routes_1 = __importDefault(require("./routers/flagGuessing.routes"));
class Routes {
    constructor(app) {
        app.use("/api", home_routes_1.default);
        app.use("/api/users", user_routes_1.default);
        app.use("/api/math", mathQuestion_routes_1.default);
        app.use("/api/country", CountryMatching_routes_1.default);
        app.use("/api/word", wordGenerator_routes_1.default);
        app.use("/api/flag", flagGuessing_routes_1.default);
    }
}
exports.default = Routes;
